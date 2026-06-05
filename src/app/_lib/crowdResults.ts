import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type RollPrompt = {
  id: string;
  label: string;
  diceCount: number;
  diceSize: number;
  createdAt: string;
  collectionStartedAt: string | null;
  closesAt: string | null;
};

export type RollSubmission = {
  id: string;
  promptId: string;
  participantId: string;
  participantName: string;
  rolls: number[];
  total: number;
  submittedAt: string;
};

export type RollOutcome = {
  status: "waiting" | "final";
  finalResult: number | null;
  average: number | null;
  rollCount: number;
  submissionCount: number;
  ones: number;
  twenties: number;
  rule: string;
};

export type RollHistoryEntry = {
  promptId: string;
  label: string;
  dice: string;
  finalResult: number | null;
  average: number | null;
  submissionCount: number;
  ones: number;
  twenties: number;
  rule: string;
  finalizedAt: string;
};

export type CrowdRollState = {
  activePrompt: RollPrompt | null;
  submissions: RollSubmission[];
  history: RollHistoryEntry[];
};

const resultsFile = path.join(process.cwd(), ".data", "crowd-rolls.json");
const collectionWindowMs = 10_000;

const emptyState: CrowdRollState = {
  activePrompt: null,
  submissions: [],
  history: [],
};

export function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function readCrowdRollState(): Promise<CrowdRollState> {
  try {
    const data = await readFile(resultsFile, "utf8");
    return { ...emptyState, ...JSON.parse(data) };
  } catch {
    return emptyState;
  }
}

export async function writeCrowdRollState(state: CrowdRollState) {
  await mkdir(path.dirname(resultsFile), { recursive: true });
  await writeFile(resultsFile, JSON.stringify(state, null, 2), "utf8");
}

export async function clearCrowdRollState() {
  const state = await readCrowdRollState();
  await writeCrowdRollState({
    activePrompt: null,
    submissions: [],
    history: state.history,
  });
}

export async function clearRollHistory() {
  const state = await readCrowdRollState();
  await writeCrowdRollState({
    ...state,
    history: [],
  });
}

export async function createRollPrompt(label: string, diceCount: number, diceSize: number) {
  const previousState = await ensureFinalizedHistory(await readCrowdRollState());
  const now = Date.now();
  const prompt: RollPrompt = {
    id: createId(),
    label,
    diceCount,
    diceSize,
    createdAt: new Date(now).toISOString(),
    collectionStartedAt: null,
    closesAt: null,
  };

  await writeCrowdRollState({
    activePrompt: prompt,
    submissions: [],
    history: previousState.history,
  });

  return prompt;
}

export async function addRollSubmission(submission: RollSubmission) {
  const state = await readCrowdRollState();

  if (!state.activePrompt || state.activePrompt.id !== submission.promptId) {
    return null;
  }

  const now = Date.now();
  const activePrompt = state.activePrompt.collectionStartedAt
    ? state.activePrompt
    : {
        ...state.activePrompt,
        collectionStartedAt: new Date(now).toISOString(),
        closesAt: new Date(now + collectionWindowMs).toISOString(),
      };

  if (activePrompt.closesAt && now > new Date(activePrompt.closesAt).getTime()) {
    return null;
  }

  const submissions = [
    ...state.submissions.filter(
      (current) =>
        current.promptId !== submission.promptId ||
        current.participantId !== submission.participantId
    ),
    submission,
  ];

  await writeCrowdRollState({
    activePrompt,
    submissions,
    history: state.history,
  });

  return submission;
}

export function calculateOutcome(
  prompt: RollPrompt | null,
  submissions: RollSubmission[]
): RollOutcome {
  if (!prompt) {
    return {
      status: "waiting",
      finalResult: null,
      average: null,
      rollCount: 0,
      submissionCount: 0,
      ones: 0,
      twenties: 0,
      rule: "No active roll prompt.",
    };
  }

  const promptSubmissions = submissions.filter((submission) => submission.promptId === prompt.id);
  const individualRolls = promptSubmissions.flatMap((submission) => submission.rolls);
  const totals = promptSubmissions.map((submission) => submission.total);
  const average =
    totals.length > 0
      ? Math.ceil(totals.reduce((sum, total) => sum + total, 0) / totals.length)
      : null;
  const ones = individualRolls.filter((roll) => roll === 1).length;
  const twenties = individualRolls.filter((roll) => roll === 20).length;
  const isFinal = prompt.closesAt ? Date.now() >= new Date(prompt.closesAt).getTime() : false;

  if (!isFinal) {
    return {
      status: "waiting",
      finalResult: null,
      average,
      rollCount: individualRolls.length,
      submissionCount: promptSubmissions.length,
      ones,
      twenties,
      rule: prompt.collectionStartedAt
        ? "Collecting rolls for 10 seconds."
        : "Waiting for the first roll to start the 10-second window.",
    };
  }

  if (ones > 0 && twenties === 0) {
    return {
      status: "final",
      finalResult: 1,
      average,
      rollCount: individualRolls.length,
      submissionCount: promptSubmissions.length,
      ones,
      twenties,
      rule: "OH NO! CRITICAL FAILURE!",
    };
  }

  if (twenties > 0 && ones === 0) {
    return {
      status: "final",
      finalResult: 20,
      average,
      rollCount: individualRolls.length,
      submissionCount: promptSubmissions.length,
      ones,
      twenties,
      rule: "NATURAL 20!",
    };
  }

  if (ones > twenties) {
    return {
      status: "final",
      finalResult: 1,
      average,
      rollCount: individualRolls.length,
      submissionCount: promptSubmissions.length,
      ones,
      twenties,
      rule: "OH NO! CRITICAL FAILURE!",
    };
  }

  if (twenties > ones) {
    return {
      status: "final",
      finalResult: 20,
      average,
      rollCount: individualRolls.length,
      submissionCount: promptSubmissions.length,
      ones,
      twenties,
      rule: "NATURAL 20!",
    };
  }

  return {
    status: "final",
    finalResult: average,
    average,
    rollCount: individualRolls.length,
    submissionCount: promptSubmissions.length,
    ones,
    twenties,
    rule:
      ones > 0
        ? "Both 1 and 20 were rolled equally, so the result uses the average."
        : "No 1 or 20 override was triggered, so the result uses the average.",
  };
}

export async function ensureFinalizedHistory(state: CrowdRollState) {
  if (!state.activePrompt) {
    return state;
  }

  const outcome = calculateOutcome(state.activePrompt, state.submissions);

  if (outcome.status !== "final") {
    return state;
  }

  const alreadySaved = state.history.some(
    (entry) => entry.promptId === state.activePrompt?.id
  );

  if (alreadySaved) {
    return state;
  }

  const historyEntry: RollHistoryEntry = {
    promptId: state.activePrompt.id,
    label: state.activePrompt.label,
    dice: `${state.activePrompt.diceCount}d${state.activePrompt.diceSize}`,
    finalResult: outcome.finalResult,
    average: outcome.average,
    submissionCount: outcome.submissionCount,
    ones: outcome.ones,
    twenties: outcome.twenties,
    rule: outcome.rule,
    finalizedAt: new Date().toISOString(),
  };

  const nextState = {
    ...state,
    history: [historyEntry, ...state.history].slice(0, 10),
  };

  await writeCrowdRollState(nextState);
  return nextState;
}
