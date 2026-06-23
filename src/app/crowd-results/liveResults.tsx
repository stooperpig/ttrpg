"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type RollPrompt = {
  id: string;
  label: string;
  diceCount: number;
  diceSize: number;
  collectionStartedAt: string | null;
  closesAt: string | null;
};

type RollSubmission = {
  id: string;
  participantName: string;
  rolls: number[];
  total: number;
};

type RollOutcome = {
  status: "waiting" | "final";
  finalResult: number | null;
  average: number | null;
  submissionCount: number;
  rollCount: number;
  ones: number;
  twenties: number;
  rule: string;
};

type RollHistoryEntry = {
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

type CrowdState = {
  activePrompt: RollPrompt | null;
  submissions: RollSubmission[];
  outcome: RollOutcome;
  history: RollHistoryEntry[];
  serverTime: string;
};

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
      <p className={styles.eyebrow}>Live Dice Result</p>
      {activePrompt && outcome ? (
        <>
          <h1>{activePrompt.label}</h1>
          <div className={styles.metaRow}>
            <span>
              {activePrompt.diceCount}d{activePrompt.diceSize}
            </span>
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
            <div className={styles.finalResult}>
              <span>Result</span>
              <strong>{outcome.finalResult ?? "No rolls"}</strong>
            </div>
          ) : (
            <div className={styles.finalResult}>
              <span>{activePrompt.collectionStartedAt ? "Collecting" : "Waiting"}</span>
              <strong>{activePrompt.collectionStartedAt ? secondsRemaining : "--"}</strong>
            </div>
          )}

          <p className={styles.resultText}>{outcome.rule}</p>

          <div className={styles.statsGrid}>
            <span>Result: {outcome.average ?? "None"}</span>
            <span>1s: {outcome.ones}</span>
            <span>20s: {outcome.twenties}</span>
            <span>Rolls: {outcome.rollCount}</span>
          </div>
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
                <strong>{entry.finalResult ?? "No rolls"}</strong>
                <span>{entry.label}</span>
                <small>
                  {entry.dice} / {entry.submissionCount} submitted / {entry.rule}
                </small>
              </li>
            ))}
          </ol>
        </section>
      )}
    </section>
  );
}
