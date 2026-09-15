"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type RollMode = "d20" | "daggerheart";
type DaggerheartTone = "hope" | "fear" | "critical" | "mixed";

type RollPrompt = {
  id: string;
  label: string;
  rollMode: RollMode;
  diceCount: number;
  diceSize: number;
  collectionStartedAt: string | null;
  closesAt: string | null;
};

type DaggerheartCrowdResult = {
  roundedHope: number;
  roundedFear: number;
  roundedTotal: number;
  hopeDominantCount: number;
  fearDominantCount: number;
  criticalCount: number;
  finalTone: DaggerheartTone;
};

type RollSubmission = {
  id: string;
  participantName: string;
  rollMode: RollMode;
  d20?: number | null;
  hopeDie?: number | null;
  fearDie?: number | null;
  total: number;
};

type RollOutcome = {
  status: "waiting" | "final";
  rollMode: RollMode;
  finalResult: number | null;
  average: number | null;
  submissionCount: number;
  rollCount: number;
  ones: number;
  twenties: number;
  rule: string;
  daggerheartResult: DaggerheartCrowdResult | null;
};

type RollHistoryEntry = {
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

type CrowdState = {
  activePrompt: RollPrompt | null;
  submissions: RollSubmission[];
  outcome: RollOutcome;
  history: RollHistoryEntry[];
  serverTime: string;
};

function formatTone(tone: DaggerheartTone) {
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

export default function LiveResults() {
  const [state, setState] = useState<CrowdState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const activePrompt = state?.activePrompt ?? null;
  const outcome = state?.outcome ?? null;
  const secondsRemaining = useMemo(() => {
    if (!activePrompt?.closesAt) {
      return 0;
    }

    return Math.max(0, Math.ceil((new Date(activePrompt.closesAt).getTime() - Date.now()) / 1000));
  }, [activePrompt]);

  useEffect(() => {
    let ignore = false;

    const loadResult = async () => {
      const response = await fetch("/api/crowd-results", { cache: "no-store" });
      const body = await response.json();

      if (!ignore) {
        setState(body);
        setIsLoading(false);
      }
    };

    loadResult();
    const timer = window.setInterval(loadResult, 1000);

    return () => {
      ignore = true;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section className={styles.resultShell}>
      <p className={styles.eyebrow}>
        {activePrompt?.rollMode === "daggerheart" ? "Crowd Duality Roll" : "Live Dice Result"}
      </p>
      {activePrompt && outcome ? (
        <>
          <h1>{activePrompt.label}</h1>
          <div className={styles.metaRow}>
            <span>{activePrompt.rollMode === "daggerheart" ? "Hope/Fear d12" : "1d20"}</span>
            <span>{outcome.submissionCount} submitted</span>
            <span>
              {outcome.status === "final"
                ? "Final"
                : activePrompt.collectionStartedAt
                  ? `${secondsRemaining}s left`
                  : "Waiting"}
            </span>
          </div>

          {outcome.status === "final" ? (
            activePrompt.rollMode === "daggerheart" && outcome.daggerheartResult ? (
              <div className={styles.dualityResult}>
                <span>Hope: {outcome.daggerheartResult.roundedHope}</span>
                <span>Fear: {outcome.daggerheartResult.roundedFear}</span>
                <strong>Total: {outcome.daggerheartResult.roundedTotal}</strong>
                <p>Result: {formatTone(outcome.daggerheartResult.finalTone)}</p>
              </div>
            ) : (
              <div className={styles.finalResult}>
                <span>Crowd Result</span>
                <strong>{outcome.finalResult ?? "No rolls"}</strong>
              </div>
            )
          ) : (
            <div className={styles.finalResult}>
              <span>{activePrompt.collectionStartedAt ? "Collecting" : "Waiting"}</span>
              <strong>{activePrompt.collectionStartedAt ? secondsRemaining : "--"}</strong>
            </div>
          )}

          <p className={styles.resultText}>{outcome.rule}</p>

          {activePrompt.rollMode === "daggerheart" && outcome.daggerheartResult ? (
            <div className={styles.statsGrid}>
              <span>Total rollers: {outcome.submissionCount}</span>
              <span>With Hope: {outcome.daggerheartResult.hopeDominantCount}</span>
              <span>With Fear: {outcome.daggerheartResult.fearDominantCount}</span>
              <span>Criticals: {outcome.daggerheartResult.criticalCount}</span>
            </div>
          ) : (
            <div className={styles.statsGrid}>
              <span>Result: {outcome.average ?? "None"}</span>
              <span>1s: {outcome.ones}</span>
              <span>20s: {outcome.twenties}</span>
              <span>Rolls: {outcome.rollCount}</span>
            </div>
          )}
        </>
      ) : (
        <div className={styles.emptyState}>
          <h1>{isLoading ? "Checking for a prompt" : "Awaiting roll prompt"}</h1>
          <p>The control page will send the next dice prompt here automatically.</p>
        </div>
      )}

      {state?.history && state.history.length > 0 && (
        <section className={styles.historySection}>
          <p className={styles.eyebrow}>Last 10 Results</p>
          <ol className={styles.historyList}>
            {state.history.map((entry) => (
              <li key={entry.promptId}>
                <strong>
                  {entry.rollMode === "daggerheart" && entry.daggerheartResult
                    ? entry.daggerheartResult.roundedTotal
                    : entry.finalResult ?? "No rolls"}
                </strong>
                <span>{entry.label}</span>
                <small>
                  {entry.rollMode === "daggerheart" && entry.daggerheartResult
                    ? `${entry.dice} / ${entry.submissionCount} submitted / Result: ${formatTone(
                        entry.daggerheartResult.finalTone
                      )}`
                    : `${entry.dice} / ${entry.submissionCount} submitted / ${entry.rule}`}
                </small>
              </li>
            ))}
          </ol>
        </section>
      )}
    </section>
  );
}
