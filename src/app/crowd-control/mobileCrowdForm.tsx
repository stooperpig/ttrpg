"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type RollMode = "d20" | "daggerheart";
type DaggerheartTone = "hope" | "fear" | "critical";

type RollPrompt = {
  id: string;
  label: string;
  rollMode: RollMode;
  diceCount: number;
  diceSize: number;
  collectionStartedAt: string | null;
  closesAt: string | null;
};

type RollSubmission = {
  promptId: string;
  rollMode: RollMode;
  d20?: number | null;
  hopeDie?: number | null;
  fearDie?: number | null;
  total: number;
};

type CrowdState = {
  activePrompt: RollPrompt | null;
  submissions: RollSubmission[];
  serverTime: string;
};

type LocalResult =
  | {
      rollMode: "d20";
      d20: number;
      total: number;
    }
  | {
      rollMode: "daggerheart";
      hopeDie: number;
      fearDie: number;
      total: number;
      tone: DaggerheartTone;
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

function rollD20() {
  return Math.floor(Math.random() * 20) + 1;
}

function rollD12() {
  return Math.floor(Math.random() * 12) + 1;
}

function getDaggerheartTone(hopeDie: number, fearDie: number): DaggerheartTone {
  if (hopeDie > fearDie) {
    return "hope";
  }

  if (fearDie > hopeDie) {
    return "fear";
  }

  return "critical";
}

function rollDaggerheartDualityDice() {
  const hopeDie = rollD12();
  const fearDie = rollD12();

  return {
    rollMode: "daggerheart" as const,
    hopeDie,
    fearDie,
    total: hopeDie + fearDie,
    tone: getDaggerheartTone(hopeDie, fearDie),
  };
}

function formatTone(tone: DaggerheartTone) {
  switch (tone) {
    case "hope":
      return "With Hope";
    case "fear":
      return "With Fear";
    case "critical":
      return "Critical";
  }
}

export default function MobileCrowdForm() {
  const [state, setState] = useState<CrowdState | null>(null);
  const [participantId, setParticipantId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [localResult, setLocalResult] = useState<LocalResult | null>(null);
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
      setLocalResult(null);
      setSubmittedPromptId("");
      setMessage("");
    }
  }, [activePrompt, seenPromptId]);

  const handleRoll = async () => {
    if (!activePrompt || (activePrompt.closesAt && secondsRemaining <= 0)) {
      setMessage("This roll window has closed.");
      return;
    }

    const result: LocalResult =
      activePrompt.rollMode === "daggerheart"
        ? rollDaggerheartDualityDice()
        : {
            rollMode: "d20",
            d20: rollD20(),
            total: 0,
          };

    const resultWithTotal =
      result.rollMode === "d20" ? { ...result, total: result.d20 } : result;

    setLocalResult(resultWithTotal);
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
          rollMode: resultWithTotal.rollMode,
          d20: resultWithTotal.rollMode === "d20" ? resultWithTotal.d20 : null,
          hopeDie: resultWithTotal.rollMode === "daggerheart" ? resultWithTotal.hopeDie : null,
          fearDie: resultWithTotal.rollMode === "daggerheart" ? resultWithTotal.fearDie : null,
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
            ? activePrompt.rollMode === "daggerheart"
              ? "Roll Hope and Fear before the window closes."
              : "Roll the d20 before the window closes."
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
            {hasSubmitted
              ? "Roll submitted"
              : activePrompt.rollMode === "daggerheart"
                ? "ROLL HOPE & FEAR"
                : "ROLL THE D20"}
          </button>

          {localResult && (
            <div className={styles.localResult}>
              <span>Your roll</span>
              {localResult.rollMode === "daggerheart" ? (
                <>
                  <strong>{localResult.total}</strong>
                  <p>Hope: {localResult.hopeDie}</p>
                  <p>Fear: {localResult.fearDie}</p>
                  <p>Result: {formatTone(localResult.tone)}</p>
                </>
              ) : (
                <>
                  <strong>{localResult.d20}</strong>
                  <p>d20 result</p>
                </>
              )}
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
