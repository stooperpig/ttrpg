import { NextResponse } from "next/server";
import {
  addRollSubmission,
  calculateOutcome,
  clearCrowdRollState,
  clearRollHistory,
  createId,
  createRollPrompt,
  ensureFinalizedHistory,
  readCrowdRollState,
} from "@/app/_lib/crowdResults";
import type { CrowdRollState, RollSubmission } from "@/app/_lib/crowdResults";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const minDiceSize = 2;
const maxDiceSize = 100;
const minDiceCount = 1;
const maxDiceCount = 20;

function clampInteger(value: unknown, min: number, max: number) {
  const parsed = Number.parseInt(String(value), 10);

  if (Number.isNaN(parsed)) {
    return min;
  }

  return Math.min(Math.max(parsed, min), max);
}

async function getResponse(state: CrowdRollState) {
  const finalizedState = await ensureFinalizedHistory(state);

  return {
    ...finalizedState,
    outcome: calculateOutcome(finalizedState.activePrompt, finalizedState.submissions),
    serverTime: new Date().toISOString(),
  };
}

export async function GET() {
  const state = await readCrowdRollState();
  return NextResponse.json(await getResponse(state));
}

export async function POST(request: Request) {
  const body = await request.json();
  const action = String(body.action || "");

  if (action === "createPrompt") {
    const label = String(body.label || "Roll prompt").slice(0, 120);
    const diceCount = clampInteger(body.diceCount, minDiceCount, maxDiceCount);
    const diceSize = clampInteger(body.diceSize, minDiceSize, maxDiceSize);
    const prompt = await createRollPrompt(label, diceCount, diceSize);
    const state = await readCrowdRollState();

    return NextResponse.json({
      ...(await getResponse(state)),
      activePrompt: prompt,
    });
  }

  if (action === "submitRoll") {
    const state = await readCrowdRollState();

    if (!state.activePrompt || state.activePrompt.id !== body.promptId) {
      return NextResponse.json({ error: "That roll prompt is no longer active." }, { status: 409 });
    }

    if (
      state.activePrompt.closesAt &&
      Date.now() > new Date(state.activePrompt.closesAt).getTime()
    ) {
      return NextResponse.json({ error: "The 10-second roll window has closed." }, { status: 409 });
    }

    const rolls = Array.isArray(body.rolls)
      ? body.rolls.map((roll) => clampInteger(roll, 1, state.activePrompt!.diceSize))
      : [];

    if (rolls.length !== state.activePrompt.diceCount) {
      return NextResponse.json({ error: "Roll count does not match the prompt." }, { status: 400 });
    }

    const submission: RollSubmission = {
      id: createId(),
      promptId: state.activePrompt.id,
      participantId: String(body.participantId || createId()).slice(0, 120),
      participantName: String(body.participantName || "Anonymous").slice(0, 80),
      rolls,
      total: rolls.reduce((sum, roll) => sum + roll, 0),
      submittedAt: new Date().toISOString(),
    };

    const savedSubmission = await addRollSubmission(submission);

    if (!savedSubmission) {
      return NextResponse.json({ error: "The roll could not be saved." }, { status: 409 });
    }

    const nextState = await readCrowdRollState();
    return NextResponse.json({
      ...(await getResponse(nextState)),
      submission: savedSubmission,
    });
  }

  if (action === "clearHistory") {
    await clearRollHistory();
    const state = await readCrowdRollState();
    return NextResponse.json(await getResponse(state));
  }

  return NextResponse.json({ error: "Unknown crowd results action." }, { status: 400 });
}

export async function DELETE() {
  await clearCrowdRollState();
  const state = await readCrowdRollState();
  return NextResponse.json(await getResponse(state));
}
