import { NextRequest, NextResponse } from "next/server";
import { WORLD_CUP_TEAM_ELOS, TeamName } from "@/lib/tippingElo";

type MatchResult = {
    match_id: string;
    stage: "group" | "round_of_32" | "round_of_16" | "quarterfinal" | "semifinal" | "third_place" | "final";
    team_a: string;
    team_b: string;
    score_a: number;
    score_b: number;
    winner: string;
};

type Payload = {
    team_a: TeamName;
    team_b: TeamName;
    stage: "group" | "round_of_32" | "round_of_16" | "quarterfinal" | "semifinal" | "third_place" | "final";
    previous_results: MatchResult[];
};

function computeForm(team: string, previous_results: MatchResult[]) {
    let points = 0;

    for (let i = 0; i < previous_results.length; i++) {
        const m = previous_results[i];
        const weight = (i + 1) / previous_results.length;

        if (m.team_a === team || m.team_b === team) {
            const isA = m.team_a === team;

            const gf = isA ? m.score_a : m.score_b;
            const ga = isA ? m.score_b : m.score_a;

            if (gf > ga) points += 3 * weight;
            else if (gf === ga) points += 1 * weight;
        }
    }

    return points;
}

function predictScore(strength: number) {
    if (strength > 1.2) return [3, 0];
    if (strength > 0.8) return [2, 0];
    if (strength > 0.3) return [2, 1];
    if (strength > -0.3) return [1, 1];
    if (strength > -0.8) return [1, 2];
    return [0, 2];
}

export async function POST(req: NextRequest) {
    const payload = (await req.json()) as Payload;

    const { team_a, team_b, stage, previous_results } = payload;

    const ratingA = WORLD_CUP_TEAM_ELOS[team_a] ?? 1500;
    const ratingB = WORLD_CUP_TEAM_ELOS[team_b] ?? 1500;

    const diff = ratingA - ratingB;
    const expectedGoalDiff = diff / 400;

    const formA = computeForm(team_a, previous_results);
    const formB = computeForm(team_b, previous_results);
    const formDiff = (formA - formB) / 10;

    const strength =
        0.75 * expectedGoalDiff +
        0.25 * formDiff;

    const [scoreA, scoreB] = predictScore(strength);

    let winner = null;

    if (stage !== "group") {
        winner = scoreA === scoreB
            ? (strength > 0 ? team_a : team_b)
            : (scoreA > scoreB ? team_a : team_b);
    }

    const confidence = Math.min(0.95, Math.abs(strength) / 2);

    return NextResponse.json({
        predicted_score_a: scoreA,
        predicted_score_b: scoreB,
        predicted_winner: winner,
        confidence
    });
}