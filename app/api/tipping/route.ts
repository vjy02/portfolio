import { NextRequest, NextResponse } from "next/server";
import {
    WORLD_CUP_TEAM_ELOS,
    DARK_HORSE_TEAMS,
    DARK_HORSE_ELO_BONUS,
    DARK_HORSE_VARIANCE_BY_STAGE,
    TeamName,
} from "@/lib/tippingElo";

type Stage =
    | "group"
    | "round_of_32"
    | "round_of_16"
    | "quarterfinal"
    | "semifinal"
    | "third_place"
    | "final";

type MatchResult = {
    match_id: string;
    stage: Stage;
    team_a: string;
    team_b: string;
    score_a: number;
    score_b: number;
    winner: string;
};

type Payload = {
    match_id?: string;
    team_a: TeamName;
    team_b: TeamName;
    stage: Stage;
    previous_results: MatchResult[];
};

type PredictionResponse = {
    predicted_score_a: number;
    predicted_score_b: number;
    predicted_winner: string | null;
};

const KNOCKOUT_STAGES = new Set<Stage>([
    "round_of_32",
    "round_of_16",
    "quarterfinal",
    "semifinal",
    "third_place",
    "final",
]);

const AVG_ELO = 1800;
const TOURNAMENT_MULTIPLIER = 1.5;

function computeForm(team: string, previousResults: MatchResult[]): number {
    if (!previousResults.length) return 0;

    let points = 0;
    const n = previousResults.length;

    for (let i = 0; i < n; i++) {
        const m = previousResults[i];
        if (m.team_a !== team && m.team_b !== team) continue;

        const recencyWeight = (i + 1) / n;
        const isA = m.team_a === team;
        const gf = isA ? m.score_a : m.score_b;
        const ga = isA ? m.score_b : m.score_a;

        const opponentName = isA ? m.team_b : m.team_a;
        const opponentElo = WORLD_CUP_TEAM_ELOS[opponentName as TeamName] ?? AVG_ELO;

        const opponentWeight = Math.pow(opponentElo / AVG_ELO, 2);

        if (gf > ga) {
            points += 3 * recencyWeight * opponentWeight * TOURNAMENT_MULTIPLIER;
        } else if (gf === ga) {
            points += 1 * recencyWeight * opponentWeight * TOURNAMENT_MULTIPLIER;
        } else {
            points -= 1 * recencyWeight * (1 / opponentWeight) * TOURNAMENT_MULTIPLIER;
        }
    }
    return points;
}

function seededVariance(seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (Math.imul(31, hash) + seed.charCodeAt(i)) | 0;
    }
    return ((hash >>> 0) % 1000) / 500 - 1;
}

function poissonSample(lambda: number): number {
    // Knuth algorithm — natural Poisson sampler
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
        k++;
        p *= Math.random();
    } while (p > L);
    return k - 1;
}

function predictScore(strength: number, isKnockout: boolean): [number, number] {
    const AVG_GOALS = 1.25;
    const lambdaA = Math.max(0.2, AVG_GOALS + strength * 0.9);
    const lambdaB = Math.max(0.2, AVG_GOALS - strength * 0.9);

    let sA = Math.min(poissonSample(lambdaA), 7);
    let sB = Math.min(poissonSample(lambdaB), 7);

    if (sA === sB && isKnockout) {
        if (strength >= 0) sA++;
        else sB++;
    }

    return [sA, sB];
}

function predictPenalties(teamA: string, teamB: string, strength: number): string {
    let scoreA = 0;
    let scoreB = 0;
    const baseChanceA = 0.5 + strength * 0.08;

    for (let i = 0; i < 5; i++) {
        if (Math.random() < baseChanceA) scoreA++;
        else scoreB++;
    }

    let i = 0;
    while (scoreA === scoreB && i < 10) {
        if (Math.random() < baseChanceA) scoreA++;
        else scoreB++;
        i++;
    }

    return scoreA >= scoreB ? teamA : teamB;
}

export async function POST(req: NextRequest) {
    const payload = (await req.json()) as Payload;
    const { match_id, team_a, team_b, stage, previous_results } = payload;

    const ratingA = WORLD_CUP_TEAM_ELOS[team_a];
    const ratingB = WORLD_CUP_TEAM_ELOS[team_b];

    if (ratingA === undefined || ratingB === undefined) {
        const missing = [
            ratingA === undefined && team_a,
            ratingB === undefined && team_b,
        ].filter(Boolean);
        return NextResponse.json(
            { error: `Unknown team(s): ${missing.join(", ")}` },
            { status: 400 }
        );
    }

    const isKnockout = KNOCKOUT_STAGES.has(stage);
    const isDarkHorseA = DARK_HORSE_TEAMS.has(team_a);
    const isDarkHorseB = DARK_HORSE_TEAMS.has(team_b);
    const isDarkHorseMatch = isDarkHorseA || isDarkHorseB;

    const effectiveRatingA = ratingA + (isDarkHorseA ? DARK_HORSE_ELO_BONUS : 0);
    const effectiveRatingB = ratingB + (isDarkHorseB ? DARK_HORSE_ELO_BONUS : 0);

    const diff = effectiveRatingA - effectiveRatingB;
    const expectedGoalDiff = diff / 600;

    const formA = computeForm(team_a, previous_results);
    const formB = computeForm(team_b, previous_results);
    const formDiff = (formA - formB) / 25;

    const baseStrength = 0.75 * expectedGoalDiff + 0.25 * formDiff;

    let variance = 0;
    if (isDarkHorseMatch) {
        const varianceRange = DARK_HORSE_VARIANCE_BY_STAGE[stage];
        const seed = match_id ?? `${team_a}-${team_b}-${stage}`;
        variance = seededVariance(seed) * varianceRange;
    }

    const strength = baseStrength + variance;

    const [scoreA, scoreB] = predictScore(strength, isKnockout);

    let winner: string | null = null;

    if (isKnockout) {
        if (scoreA === scoreB) {
            winner = predictPenalties(team_a, team_b, strength);
        } else {
            winner = scoreA > scoreB ? team_a : team_b;
        }
    } else {
        if (scoreA !== scoreB) {
            winner = scoreA > scoreB ? team_a : team_b;
        }
    }

    const response: PredictionResponse = {
        predicted_score_a: scoreA,
        predicted_score_b: scoreB,
        predicted_winner: winner,
    };

    return NextResponse.json(response, {
        headers: {
            "Access-Control-Allow-Origin": "https://mburton.dev",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    })
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "https://mburton.dev",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    });
}