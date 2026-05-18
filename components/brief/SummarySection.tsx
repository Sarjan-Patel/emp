"use client";

import { useState } from "react";
import type { Answers } from "@/lib/types";
import { questions } from "./questions-data";

interface Props {
  answers: Answers;
}

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; id: string }
  | { kind: "error"; message: string };

function truncate(value: string, max: number) {
  return value.length > max ? value.slice(0, max - 3) + "..." : value;
}

function formatAnswer(value: string | string[] | undefined) {
  if (value === undefined) return null;
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return value.join(", ");
  }
  return value;
}

export function SummarySection({ answers }: Props) {
  const [submit, setSubmit] = useState<SubmitState>({ kind: "idle" });
  const answeredCount = questions.filter((q) => {
    const v = answers[q.id];
    if (Array.isArray(v)) return v.length > 0;
    return typeof v === "string" && v.length > 0;
  }).length;

  async function handleSubmit() {
    setSubmit({ kind: "submitting" });
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          submittedAt: new Date().toISOString(),
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        }),
      });
      if (!res.ok) {
        let detail = `HTTP ${res.status}`;
        try {
          const body = (await res.json()) as { error?: string };
          if (body?.error) detail = body.error;
        } catch {
          // ignore
        }
        setSubmit({ kind: "error", message: detail });
        return;
      }
      const body = (await res.json()) as { id: string };
      setSubmit({ kind: "success", id: body.id });
    } catch (err) {
      setSubmit({
        kind: "error",
        message: err instanceof Error ? err.message : "Submission failed",
      });
    }
  }

  return (
    <div className="summary-section" id="summarySection">
      <div className="section-num">SUMMARY</div>
      <h2>Your selections</h2>
      <p className="section-lead">
        This compiles as you choose. When finished, submit your selections to
        record them — or use the print button to save a PDF for your own
        records.
      </p>
      <div className="summary-grid">
        {questions.map((q) => {
          const raw = formatAnswer(answers[q.id]);
          const done = !!raw;
          const titleShort = truncate(q.title, 60);
          const answerShort = done ? truncate(raw, 35) : "Pending";
          return (
            <div className="sum-item" key={q.id}>
              <div className={`sum-num ${done ? "done" : "pending"}`}>
                {q.id.toString().padStart(2, "0")}
              </div>
              <div className="sum-q">{titleShort}</div>
              <div className={`sum-a ${done ? "done" : "pending"}`}>
                {answerShort}
              </div>
            </div>
          );
        })}
      </div>

      <div className="submit-row">
        <button
          type="button"
          className={`submit-btn ${submit.kind === "success" ? "success" : ""}`}
          onClick={handleSubmit}
          disabled={submit.kind === "submitting"}
        >
          {submit.kind === "submitting"
            ? "Submitting…"
            : submit.kind === "success"
              ? "Submitted ✓"
              : "Submit selections"}
        </button>
        <button
          type="button"
          className="print-btn"
          onClick={() => window.print()}
        >
          🖨 Print / Save as PDF
        </button>
        {submit.kind === "success" && (
          <span className="submit-msg success">
            Thanks — your selections are recorded.{" "}
            <span className="submit-id">id: {submit.id}</span>
          </span>
        )}
        {submit.kind === "error" && (
          <span className="submit-msg error">
            Couldn&apos;t submit: {submit.message}
          </span>
        )}
        {submit.kind === "idle" && answeredCount < questions.length && (
          <span className="submit-msg">
            {questions.length - answeredCount} of {questions.length} questions
            unanswered — submit anyway when ready.
          </span>
        )}
      </div>
    </div>
  );
}
