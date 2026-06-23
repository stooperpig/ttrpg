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
  promptId: string;
  rolls: number[];
  total: number;
};

type CrowdState = {
  activePrompt: RollPrompt | null;
  submissions: RollSubmission[];
  serverTime: string;
};

function getParticipantId() {
  const existingId = window.sessionStorage.getItem("crowd-roll-participant-id");

  if (existingId) {
    return existingId;
  }

  const newId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.sessionStorage.setItem("crowd-roll-participant-id", newId);
  return newId;
}

function rollDice(diceCount: number, diceSize: number) {
  return Array.from(
    { length: diceCount },
    () => Math.floor(Math.random() * diceSize) + 1
  );
}

export default function MobileCrowdForm() {
  const [state, setState] = useState<CrowdState | null>(null);
  const [participantId, setParticipantId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [localRoll, setLocalRoll] = useState<number[] | null>(null);
  const [seenPromptId, setSeenPromptId] = useState("");
  const [submittedPromptId, setSubmittedPromptId] = useState("");
  const [message, setMessage] = useState("");

  const activePrompt = state?.activePrompt ?? null;
  const secondsRemaining = useMemo(() => {
    if (!activePrompt?.closesAt) {
      return 0;
    }

    return Math.max(0, Math.ceil((new Date(activePrompt.closesAt).getTime() - Date.now()) / 1000));
  }, [activePrompt]);
  const localTotal = localRoll?.reduce((sum, roll) => sum + roll, 0) ?? null;
  const hasSubmitted = activePrompt ? submittedPromptId === activePrompt.id : false;

  useEffect(() => {
    setParticipantId(getParticipantId());
  }, []);

  useEffect(() => {
    let ignore = false;

    const refresh = async () => {
      const response = await fetch("/api/crowd-results", { cache: "no-store" });
      const body = await response.json();

      if (!ignore) {
        setState(body);
      }
    };

    refresh();
    const timer = window.setInterval(refresh, 1000);

    return () => {
      ignore = true;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (activePrompt && activePrompt.id !== seenPromptId) {
      setSeenPromptId(activePrompt.id);
      setLocalRoll(null);
      setSubmittedPromptId("");
      setMessage("");
    }
  }, [activePrompt, seenPromptId]);

  const handleRoll = async () => {
    if (!activePrompt || (activePrompt.closesAt && secondsRemaining <= 0)) {
      setMessage("This roll window has closed.");
      return;
    }

    const rolls = rollDice(activePrompt.diceCount, activePrompt.diceSize);
    setLocalRoll(rolls);
    setMessage("Roll made. Sending it to the results page.");

    try {
      const response = await fetch("/api/crowd-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submitRoll",
          promptId: activePrompt.id,
          participantId,
          participantName,
          rolls,
        }),
      });

      if (!response.ok) {
        const body = await response.json();
        setMessage(body.error || "The roll could not be sent.");
        return;
      }
    } catch {
      setMessage("The roll could not reach the server.");
      return;
    }

    setSubmittedPromptId(activePrompt.id);
    setMessage("Roll sent. Watch the results page.");
  };

  return (
    <section className={styles.form}>
      <section className={styles.intro}>
        <p className={styles.eyebrow}>Live Dice Input</p>
        <h1>{activePrompt ? activePrompt.label : "Waiting for the roll"}</h1>
        <p>
          {activePrompt
            ? `Roll ${activePrompt.diceCount}d${activePrompt.diceSize} before the window closes.`
            : "The control page will send the next dice prompt here."}
        </p>
      </section>

      <label className={styles.field}>
        <span>Your name</span>
        <input
          autoComplete="name"
          onChange={(event) => setParticipantName(event.target.value)}
          placeholder="Optional"
          type="text"
          value={participantName}
        />
      </label>

      {activePrompt ? (
        <div className={styles.rollPanel}>
          <div className={styles.timer}>
            {activePrompt.collectionStartedAt ? `${secondsRemaining}s` : "Ready"}
          </div>
          <button
            className={styles.rollButton}
            disabled={
              hasSubmitted ||
              Boolean(activePrompt.closesAt && secondsRemaining <= 0) ||
              !participantId
            }
            onClick={handleRoll}
            type="button"
          >
            {hasSubmitted ? "Roll submitted" : `Roll ${activePrompt.diceCount}d${activePrompt.diceSize}`}
          </button>

          {localRoll && (
            <div className={styles.localResult}>
              <span>Your roll</span>
              <strong>{localTotal}</strong>
              <p>{localRoll.join(" + ")}</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.waitingPanel}>Keep this page open for the next prompt.</div>
      )}

      {message && <p className={styles.successMessage}>{message}</p>}
    </section>
  );
}
