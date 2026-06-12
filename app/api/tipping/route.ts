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
const TOURNAMENT_MULTIPLIER = 1.15;

/* ---------------- FORM ---------------- */

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

        const opponentWeight = Math.pow(opponentElo / AVG_ELO, 1.5);

        if (gf > ga) {
            points += 3 * recencyWeight * opponentWeight;
        } else if (gf === ga) {
            points += 1 * recencyWeight * opponentWeight;
        } else {
            points -= 1 * recencyWeight * (1 / opponentWeight);
        }
    }

    return Math.max(-6, Math.min(6, points));
}

/* ---------------- VARIANCE ---------------- */

function seededVariance(seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (Math.imul(31, hash) + seed.charCodeAt(i)) | 0;
    }
    return ((hash >>> 0) % 1000) / 500 - 1; // [-1, 1]
}

/* ---------------- POISSON ---------------- */

function poissonSample(lambda: number): number {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;

    do {
        k++;
        p *= Math.random();
    } while (p > L);

    return k - 1;
}

function adjustLambda(x: number): number {
    return Math.pow(Math.max(0.15, x), 0.92);
}

/* ---------------- SCORE MODEL ---------------- */

function predictScore(strength: number): [number, number] {
    const base = 1.25;

    const xGA = base + strength;
    const xGB = base - strength;

    const clamp = (x: number) => Math.min(3.0, Math.max(0.15, x));

    const a = clamp(xGA);
    const b = clamp(xGB);

    const sA = poissonSample(adjustLambda(a));
    const sB = poissonSample(adjustLambda(b));

    return [sA, sB];
}

/* ---------------- PENALTIES ---------------- */

function predictPenalties(teamA: string, teamB: string, strength: number): string {
    let scoreA = 0;
    let scoreB = 0;

    const baseChanceA = 0.5 + strength * 0.03;

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

/* ---------------- API ---------------- */

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

    const effectiveA = ratingA + (isDarkHorseA ? DARK_HORSE_ELO_BONUS : 0);
    const effectiveB = ratingB + (isDarkHorseB ? DARK_HORSE_ELO_BONUS : 0);

    const diff = effectiveA - effectiveB;
    const expectedGoalDiff = diff / 450;

    const formA = computeForm(team_a, previous_results);
    const formB = computeForm(team_b, previous_results);

    const formDiff = (formA - formB) / 30;

    const baseStrength = 0.8 * expectedGoalDiff + 0.2 * formDiff;

    /* ---------------- VARIANCE FIX ---------------- */

    let variance = 0;

    if (isDarkHorseA || isDarkHorseB) {
        const range = DARK_HORSE_VARIANCE_BY_STAGE[stage] ?? 0.2;
        const seed = match_id ?? `${team_a}-${team_b}-${stage}`;

        variance = seededVariance(seed) * range * 0.4; // 🔥 nerfed
    }

    const strength = baseStrength + variance;

    /* ---------------- SCORE ---------------- */

    let [scoreA, scoreB] = predictScore(strength);

    /* ---------------- DRAW REALISM ---------------- */

    const drawBias = 0.28;

    if (Math.random() < drawBias && Math.abs(scoreA - scoreB) === 1) {
        if (Math.random() < 0.5) scoreA = scoreB;
        else scoreB = scoreA;
    }

    /* ---------------- WINNER ---------------- */

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

    return NextResponse.json(
        {
            predicted_score_a: scoreA,
            predicted_score_b: scoreB,
            predicted_winner: winner,
        },
        {
            headers: {
                "Access-Control-Allow-Origin": "https://mburton.dev",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }
    );
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "https://mburton.dev",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}