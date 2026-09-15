import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type RollMode = "d20" | "daggerheart";
export type RollStatus = "waiting" | "final";
export type DaggerheartTone = "hope" | "fear" | "critical" | "mixed";

export type RollPrompt = {
  id: string;
  label: string;
  rollMode: RollMode;
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
  rollMode: RollMode;
  d20?: number | null;
  hopeDie?: number | null;
  fearDie?: number | null;
  rolls?: number[];
  total: number;
  submittedAt: string;
};

export type D20CrowdResult = {
  totalRolls: number;
  average: number;
  roundedAverage: number;
  nat20s: number;
  nat1s: number;
  critBalance: number;
  critType: "critical-success" | "critical-failure" | "chaos" | "normal";
};

export type DaggerheartCrowdRoll = {
  hopeDie: number;
  fearDie: number;
};

export type DaggerheartCrowdResult = {
  totalRolls: number;
  averageHope: number;
  averageFear: number;
  roundedHope: number;
  roundedFear: number;
  roundedTotal: number;
  hopeDominantCount: number;
  fearDominantCount: number;
  criticalCount: number;
  finalTone: DaggerheartTone;
};

export type RollOutcome = {
  status: RollStatus;
  rollMode: RollMode;
  finalResult: number | null;
  average: number | null;
  rollCount: number;
  submissionCount: number;
  ones: number;
  twenties: number;
  rule: string;
  d20Result: D20CrowdResult | null;
  daggerheartResult: DaggerheartCrowdResult | null;
};

export type RollHistoryEntry = {
  promptId: string;
  label: string;
  rollMode: RollMode;
  dice: string;
  finalResult: number | null;
  average: number | null;
  submissionCount: number;
  ones: number;
  twenties: number;
  rule: string;
  daggerheartResult: DaggerheartCrowdResult | null;
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

export function rollD20() {
  return Math.floor(Math.random() * 20) + 1;
}

export function isValidD20(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 20;
}

export function isValidDaggerheartDie(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 12;
}

export function rollD12() {
  return Math.floor(Math.random() * 12) + 1;
}

export function rollDaggerheartDualityDice() {
  const hopeDie = rollD12();
  const fearDie = rollD12();

  return {
    hopeDie,
    fearDie,
    total: hopeDie + fearDie,
    tone: getDaggerheartTone(hopeDie, fearDie),
  };
}

export function getDaggerheartTone(
  hopeDie: number,
  fearDie: number
): Exclude<DaggerheartTone, "mixed"> {
  if (hopeDie > fearDie) {
    return "hope";
  }

  if (fearDie > hopeDie) {
    return "fear";
  }

  return "critical";
}

function normalizePrompt(prompt: RollPrompt): RollPrompt {
  const rollMode = prompt.rollMode || "d20";

  return {
    ...prompt,
    rollMode,
    diceCount: rollMode === "daggerheart" ? 2 : 1,
    diceSize: rollMode === "daggerheart" ? 12 : 20,
    collectionStartedAt: prompt.collectionStartedAt ?? null,
    closesAt: prompt.closesAt ?? null,
  };
}

function normalizeSubmission(submission: RollSubmission): RollSubmission {
  const rollMode = submission.rollMode || "d20";
  const legacyD20 = submission.d20 ?? submission.rolls?.[0] ?? null;

  return {
    ...submission,
    rollMode,
    d20: rollMode === "d20" ? legacyD20 : null,
    hopeDie: submission.hopeDie ?? null,
    fearDie: submission.fearDie ?? null,
    rolls: submission.rolls ?? (legacyD20 ? [legacyD20] : undefined),
  };
}

export async function readCrowdRollState(): Promise<CrowdRollState> {
  try {
    const data = await readFile(resultsFile, "utf8");
    const parsed = { ...emptyState, ...JSON.parse(data) } as CrowdRollState;

    return {
      activePrompt: parsed.activePrompt ? normalizePrompt(parsed.activePrompt) : null,
      submissions: (parsed.submissions || []).map(normalizeSubmission),
      history: parsed.history || [],
    };
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

export async function createRollPrompt(label: string, rollMode: RollMode = "d20") {
  const previousState = await ensureFinalizedHistory(await readCrowdRollState());
  const now = Date.now();
  const prompt: RollPrompt = {
    id: createId(),
    label,
    rollMode,
    diceCount: rollMode === "daggerheart" ? 2 : 1,
    diceSize: rollMode === "daggerheart" ? 12 : 20,
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

  const alreadySubmitted = state.submissions.some(
    (current) =>
      current.promptId === submission.promptId &&
      current.participantId === submission.participantId
  );

  if (alreadySubmitted) {
    return null;
  }

  const submissions = [
    ...state.submissions,
    submission,
  ];

  await writeCrowdRollState({
    activePrompt,
    submissions,
    history: state.history,
  });

  return submission;
}

export function calculateD20CrowdResult(rolls: number[]): D20CrowdResult | null {
  if (rolls.length === 0) {
    return null;
  }

  const total = rolls.reduce((sum, roll) => sum + roll, 0);
  const average = total / rolls.length;
  const roundedAverage = Math.ceil(average);
  const nat20s = rolls.filter((roll) => roll === 20).length;
  const nat1s = rolls.filter((roll) => roll === 1).length;
  const critBalance = nat20s - nat1s;
  let critType: D20CrowdResult["critType"] = "normal";

  if (nat20s > 0 && nat1s > 0 && nat20s === nat1s) {
    critType = "chaos";
  } else if (nat20s > 0 && nat1s === 0) {
    critType = "critical-success";
  } else if (nat1s > 0 && nat20s === 0) {
    critType = "critical-failure";
  } else if (critBalance >= 2) {
    critType = "critical-success";
  } else if (critBalance <= -2) {
    critType = "critical-failure";
  }

  return {
    totalRolls: rolls.length,
    average,
    roundedAverage,
    nat20s,
    nat1s,
    critBalance,
    critType,
  };
}

export function calculateDaggerheartCrowdResult(
  rolls: DaggerheartCrowdRoll[]
): DaggerheartCrowdResult | null {
  if (rolls.length === 0) {
    return null;
  }

  const totalHope = rolls.reduce((sum, roll) => sum + roll.hopeDie, 0);
  const totalFear = rolls.reduce((sum, roll) => sum + roll.fearDie, 0);
  const averageHope = totalHope / rolls.length;
  const averageFear = totalFear / rolls.length;
  const roundedHope = Math.round(averageHope);
  const roundedFear = Math.round(averageFear);
  const roundedTotal = roundedHope + roundedFear;
  const hopeDominantCount = rolls.filter((roll) => roll.hopeDie > roll.fearDie).length;
  const fearDominantCount = rolls.filter((roll) => roll.fearDie > roll.hopeDie).length;
  const criticalCount = rolls.filter((roll) => roll.hopeDie === roll.fearDie).length;
  const maxCount = Math.max(hopeDominantCount, fearDominantCount, criticalCount);
  const numberOfTopOutcomes = [
    hopeDominantCount,
    fearDominantCount,
    criticalCount,
  ].filter((count) => count === maxCount).length;
  let finalTone: DaggerheartTone = "mixed";

  if (numberOfTopOutcomes > 1) {
    finalTone = "mixed";
  } else if (criticalCount === maxCount) {
    finalTone = "critical";
  } else if (hopeDominantCount === maxCount) {
    finalTone = "hope";
  } else if (fearDominantCount === maxCount) {
    finalTone = "fear";
  }

  return {
    totalRolls: rolls.length,
    averageHope,
    averageFear,
    roundedHope,
    roundedFear,
    roundedTotal,
    hopeDominantCount,
    fearDominantCount,
    criticalCount,
    finalTone,
  };
}

function emptyOutcome(prompt: RollPrompt | null, rule: string): RollOutcome {
  return {
    status: "waiting",
    rollMode: prompt?.rollMode ?? "d20",
    finalResult: null,
    average: null,
    rollCount: 0,
    submissionCount: 0,
    ones: 0,
    twenties: 0,
    rule,
    d20Result: null,
    daggerheartResult: null,
  };
}

function calculateD20Outcome(prompt: RollPrompt, submissions: RollSubmission[]): RollOutcome {
  const promptSubmissions = submissions.filter((submission) => submission.promptId === prompt.id);
  const d20Rolls = promptSubmissions
    .filter((submission) => typeof submission.d20 === "number")
    .map((submission) => submission.d20 as number);
  const d20Result = calculateD20CrowdResult(d20Rolls);
  const isFinal = prompt.closesAt ? Date.now() >= new Date(prompt.closesAt).getTime() : false;
  const waitingRule = prompt.collectionStartedAt
    ? "Collecting rolls for 10 seconds."
    : "Waiting for the first roll to start the 10-second window.";

  if (!d20Result) {
    return emptyOutcome(prompt, waitingRule);
  }

  if (!isFinal) {
    return {
      status: "waiting",
      rollMode: "d20",
      finalResult: null,
      average: d20Result.roundedAverage,
      rollCount: d20Result.totalRolls,
      submissionCount: promptSubmissions.length,
      ones: d20Result.nat1s,
      twenties: d20Result.nat20s,
      rule: waitingRule,
      d20Result,
      daggerheartResult: null,
    };
  }

  let finalResult = d20Result.roundedAverage;
  let rule =
    d20Result.critType === "chaos"
      ? "Both 1 and 20 were rolled equally, so the result uses the average."
      : "No 1 or 20 override was triggered, so the result uses the average.";

  if (d20Result.critType === "critical-failure") {
    finalResult = 1;
    rule = "OH NO! CRITICAL FAILURE!";
  } else if (d20Result.critType === "critical-success") {
    finalResult = 20;
    rule = "NATURAL 20!";
  }

  return {
    status: "final",
    rollMode: "d20",
    finalResult,
    average: d20Result.roundedAverage,
    rollCount: d20Result.totalRolls,
    submissionCount: promptSubmissions.length,
    ones: d20Result.nat1s,
    twenties: d20Result.nat20s,
    rule,
    d20Result,
    daggerheartResult: null,
  };
}

function formatDaggerheartTone(tone: DaggerheartTone) {
  switch (tone) {
    case "hope":
      return "With Hope";
    case "fear":
      return "With Fear";
    case "critical":
      return "Critical";
    case "mixed":
      return "Mixed";
  }
}

function calculateDaggerheartOutcome(
  prompt: RollPrompt,
  submissions: RollSubmission[]
): RollOutcome {
  const promptSubmissions = submissions.filter((submission) => submission.promptId === prompt.id);
  const daggerheartRolls = promptSubmissions
    .filter(
      (submission) =>
        typeof submission.hopeDie === "number" && typeof submission.fearDie === "number"
    )
    .map((submission) => ({
      hopeDie: submission.hopeDie as number,
      fearDie: submission.fearDie as number,
    }));
  const daggerheartResult = calculateDaggerheartCrowdResult(daggerheartRolls);
  const isFinal = prompt.closesAt ? Date.now() >= new Date(prompt.closesAt).getTime() : false;
  const waitingRule = prompt.collectionStartedAt
    ? "Collecting rolls for 10 seconds."
    : "Waiting for the first roll to start the 10-second window.";

  if (!daggerheartResult) {
    return emptyOutcome(prompt, waitingRule);
  }

  if (!isFinal) {
    return {
      status: "waiting",
      rollMode: "daggerheart",
      finalResult: null,
      average: daggerheartResult.roundedTotal,
      rollCount: daggerheartResult.totalRolls * 2,
      submissionCount: promptSubmissions.length,
      ones: 0,
      twenties: 0,
      rule: waitingRule,
      d20Result: null,
      daggerheartResult,
    };
  }

  return {
    status: "final",
    rollMode: "daggerheart",
    finalResult: daggerheartResult.roundedTotal,
    average: daggerheartResult.roundedTotal,
    rollCount: daggerheartResult.totalRolls * 2,
    submissionCount: promptSubmissions.length,
    ones: 0,
    twenties: 0,
    rule: `Result: ${formatDaggerheartTone(daggerheartResult.finalTone)}`,
    d20Result: null,
    daggerheartResult,
  };
}

export function calculateOutcome(
  prompt: RollPrompt | null,
  submissions: RollSubmission[]
): RollOutcome {
  if (!prompt) {
    return emptyOutcome(null, "No active roll prompt.");
  }

  if (prompt.rollMode === "daggerheart") {
    return calculateDaggerheartOutcome(prompt, submissions);
  }

  return calculateD20Outcome(prompt, submissions);
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
    rollMode: state.activePrompt.rollMode,
    dice: state.activePrompt.rollMode === "daggerheart" ? "Hope/Fear d12" : "1d20",
    finalResult: outcome.finalResult,
    average: outcome.average,
    submissionCount: outcome.submissionCount,
    ones: outcome.ones,
    twenties: outcome.twenties,
    rule: outcome.rule,
    daggerheartResult: outcome.daggerheartResult,
    finalizedAt: new Date().toISOString(),
  };

  const nextState = {
    ...state,
    history: [historyEntry, ...state.history].slice(0, 10),
  };

  await writeCrowdRollState(nextState);
  return nextState;
}

export function formatDaggerheartResultTone(tone: DaggerheartTone) {
  return formatDaggerheartTone(tone);
}
