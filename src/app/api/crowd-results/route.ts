import { NextResponse } from "next/server";
import {
  addRollSubmission,
  calculateOutcome,
  clearCrowdRollState,
  clearRollHistory,
  createId,
  createRollPrompt,
  ensureFinalizedHistory,
  isValidD20,
  isValidDaggerheartDie,
  readCrowdRollState,
} from "@/app/_lib/crowdResults";
import type { CrowdRollState, RollMode, RollSubmission } from "@/app/_lib/crowdResults";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function clampInteger(value: unknown, min: number, max: number) {
  const parsed = Number.parseInt(String(value), 10);

  if (Number.isNaN(parsed)) {
    return min;
  }

  return Math.min(Math.max(parsed, min), max);
}

function getRollMode(value: unknown): RollMode {
  return value === "daggerheart" ? "daggerheart" : "d20";
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
    const rollMode = getRollMode(body.rollMode);
    const prompt = await createRollPrompt(label, rollMode);
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

    const rollMode = state.activePrompt.rollMode;
    const d20 = body.d20 ?? (Array.isArray(body.rolls) ? body.rolls[0] : null);
    const hopeDie = body.hopeDie;
    const fearDie = body.fearDie;

    if (rollMode === "d20") {
      const d20Roll = clampInteger(d20, 1, 20);

      if (!isValidD20(d20Roll) || String(d20Roll) !== String(d20)) {
        return NextResponse.json({ error: "A d20 roll must be from 1 to 20." }, { status: 400 });
      }

      const submission: RollSubmission = {
        id: createId(),
        promptId: state.activePrompt.id,
        participantId: String(body.participantId || createId()).slice(0, 120),
        participantName: String(body.participantName || "Anonymous").slice(0, 80),
        rollMode,
        d20: d20Roll,
        hopeDie: null,
        fearDie: null,
        rolls: [d20Roll],
        total: d20Roll,
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

    const parsedHopeDie = clampInteger(hopeDie, 1, 12);
    const parsedFearDie = clampInteger(fearDie, 1, 12);

    if (
      !isValidDaggerheartDie(parsedHopeDie) ||
      !isValidDaggerheartDie(parsedFearDie) ||
      String(parsedHopeDie) !== String(hopeDie) ||
      String(parsedFearDie) !== String(fearDie)
    ) {
      return NextResponse.json(
        { error: "Hope and Fear dice must both be from 1 to 12." },
        { status: 400 }
      );
    }

    const submission: RollSubmission = {
      id: createId(),
      promptId: state.activePrompt.id,
      participantId: String(body.participantId || createId()).slice(0, 120),
      participantName: String(body.participantName || "Anonymous").slice(0, 80),
      rollMode,
      d20: null,
      hopeDie: parsedHopeDie,
      fearDie: parsedFearDie,
      rolls: [parsedHopeDie, parsedFearDie],
      total: parsedHopeDie + parsedFearDie,
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
