"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
  ones: number;
  twenties: number;
  rule: string;
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
  const [diceCount, setDiceCount] = useState(1);
  const [diceSize, setDiceSize] = useState(20);
  const [status, setStatus] = useState("Loading current roll prompt...");

  const activePrompt = state?.activePrompt ?? null;
  const secondsRemaining = useMemo(() => {
    if (!activePrompt?.closesAt) {
      return 0;
    }

    return Math.max(0, Math.ceil((new Date(activePrompt.closesAt).getTime() - Date.now()) / 1000));
  }, [activePrompt, state?.serverTime]);

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
          diceCount,
          diceSize,
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

        <div className={styles.diceGrid}>
          <label>
            <span>Dice count</span>
            <input
              max={20}
              min={1}
              onChange={(event) => setDiceCount(Number(event.target.value))}
              type="number"
              value={diceCount}
            />
          </label>
          <label>
            <span>Dice size</span>
            <input
              max={100}
              min={2}
              onChange={(event) => setDiceSize(Number(event.target.value))}
              type="number"
              value={diceSize}
            />
          </label>
        </div>

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
            {activePrompt.diceCount}d{activePrompt.diceSize} /{" "}
            {activePrompt.collectionStartedAt ? `${secondsRemaining}s left` : "waiting for first roll"} /{" "}
            {state?.outcome.submissionCount ?? 0} submitted
          </p>
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
