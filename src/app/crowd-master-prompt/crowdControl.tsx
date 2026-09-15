"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type RollPrompt = {
  id: string;
  label: string;
  rollMode: "d20" | "daggerheart";
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
  rollMode: "d20" | "daggerheart";
  finalResult: number | null;
  average: number | null;
  submissionCount: number;
  ones: number;
  twenties: number;
  rule: string;
  daggerheartResult: {
    roundedHope: number;
    roundedFear: number;
    roundedTotal: number;
    hopeDominantCount: number;
    fearDominantCount: number;
    criticalCount: number;
    finalTone: "hope" | "fear" | "critical" | "mixed";
  } | null;
};

type CrowdState = {
  activePrompt: RollPrompt | null;
  submissions: RollSubmission[];
  outcome: RollOutcome;
  serverTime: string;
};

export default function CrowdControl() {
  const [state, setState] = useState<CrowdState | null>(null);
  const [label, setLabel] = useState("Group check");
  const [rollMode, setRollMode] = useState<"d20" | "daggerheart">("d20");
  const [status, setStatus] = useState("Loading current roll prompt...");

  const activePrompt = state?.activePrompt ?? null;
  const secondsRemaining = useMemo(() => {
    if (!activePrompt?.closesAt) {
      return 0;
    }

    return Math.max(0, Math.ceil((new Date(activePrompt.closesAt).getTime() - Date.now()) / 1000));
  }, [activePrompt]);

  const refresh = async () => {
    try {
      const response = await fetch("/api/crowd-results", { cache: "no-store" });
      const body = await response.json();
      setState(body);
      setStatus(body.activePrompt ? "Roll prompt is active." : "No roll prompt is active.");
    } catch {
      setStatus("Could not reach the roll API. Check the dev server console.");
    }
  };

  const createPrompt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Sending prompt to mobile page...");

    try {
      const response = await fetch("/api/crowd-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "createPrompt",
          label,
          rollMode,
        }),
      });

      const body = await response.json();
      setState(body);
      setStatus("Prompt sent. Results are collecting for 10 seconds.");
    } catch {
      setStatus("Could not send the prompt. Check the dev server console.");
    }
  };

  const clearResult = async () => {
    setStatus("Clearing prompt and rolls...");
    try {
      const response = await fetch("/api/crowd-results", { method: "DELETE" });
      setState(await response.json());
      setStatus("Prompt and rolls cleared.");
    } catch {
      setStatus("Could not clear the prompt. Check the dev server console.");
    }
  };

  const clearHistory = async () => {
    setStatus("Clearing result history...");
    try {
      const response = await fetch("/api/crowd-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clearHistory" }),
      });
      setState(await response.json());
      setStatus("Result history cleared.");
    } catch {
      setStatus("Could not clear history. Check the dev server console.");
    }
  };

  useEffect(() => {
    refresh();
    const timer = window.setInterval(refresh, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={styles.panel}>
      <p className={styles.eyebrow}>Direct Link Control</p>
      <h1>Prompt a live roll</h1>
      <p className={styles.status}>{status}</p>

      <form className={styles.promptForm} onSubmit={createPrompt}>
        <label>
          <span>Prompt label</span>
          <input
            onChange={(event) => setLabel(event.target.value)}
            required
            type="text"
            value={label}
          />
        </label>

        <fieldset className={styles.modeSelector}>
          <legend>Roll mode</legend>
          <label>
            <input
              checked={rollMode === "d20"}
              name="rollMode"
              onChange={() => setRollMode("d20")}
              type="radio"
              value="d20"
            />
            <span>d20 Crowd Roll</span>
          </label>
          <label>
            <input
              checked={rollMode === "daggerheart"}
              name="rollMode"
              onChange={() => setRollMode("daggerheart")}
              type="radio"
              value="daggerheart"
            />
            <span>Daggerheart Hope/Fear Roll</span>
          </label>
        </fieldset>

        <button type="submit">Send roll prompt</button>
      </form>

      <div className={styles.linkGrid}>
        <Link href="/crowd-control">Open mobile input</Link>
        <Link href="/crowd-results">Open results display</Link>
      </div>

      {activePrompt ? (
        <div className={styles.currentResult}>
          <p className={styles.eyebrow}>Current Prompt</p>
          <h2>{activePrompt.label}</h2>
          <p>
            {activePrompt.rollMode === "daggerheart" ? "Hope/Fear d12" : "1d20"} /{" "}
            {activePrompt.collectionStartedAt ? `${secondsRemaining}s left` : "waiting for first roll"} /{" "}
            {state?.outcome.submissionCount ?? 0} submitted
          </p>
          {state?.outcome.daggerheartResult && (
            <p>
              Hope {state.outcome.daggerheartResult.hopeDominantCount} / Fear{" "}
              {state.outcome.daggerheartResult.fearDominantCount} / Critical{" "}
              {state.outcome.daggerheartResult.criticalCount}
            </p>
          )}
          <small>{state?.outcome.rule}</small>
        </div>
      ) : (
        <p className={styles.emptyNote}>Create a prompt to wake up the mobile roll page.</p>
      )}

      <div className={styles.actions}>
        <button onClick={refresh} type="button">
          Refresh
        </button>
        <button className={styles.secondaryButton} onClick={clearResult} type="button">
          Clear prompt
        </button>
        <button className={styles.secondaryButton} onClick={clearHistory} type="button">
          Clear history
        </button>
      </div>
    </section>
  );
}
