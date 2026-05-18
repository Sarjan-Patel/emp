"use client";

import { useEffect, useState } from "react";
import type { Answers } from "@/lib/types";
import { Cover } from "./Cover";
import { CompetitorTable } from "./CompetitorTable";
import { ProductCatalog } from "./ProductCatalog";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";
import { MultiQuestionCard } from "./MultiQuestionCard";
import { SummarySection } from "./SummarySection";
import { TopBar } from "./TopBar";
import { questions } from "./questions-data";

function isAnswered(value: string | string[] | undefined): boolean {
  if (Array.isArray(value)) return value.length > 0;
  return typeof value === "string" && value.length > 0;
}

export function BriefPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [openId, setOpenId] = useState<number | null>(null);

  // Match the source HTML's "open Q1 on load" behavior.
  useEffect(() => {
    const t = setTimeout(() => setOpenId((cur) => cur ?? 1), 400);
    return () => clearTimeout(t);
  }, []);

  const answeredCount = questions.filter((q) =>
    isAnswered(answers[q.id])
  ).length;
  const pct = (answeredCount / questions.length) * 100;

  function selectSingle(qid: number, label: string) {
    setAnswers((prev) => ({ ...prev, [qid]: label }));
  }

  function toggleMulti(qid: number, label: string) {
    setAnswers((prev) => {
      const current = prev[qid];
      const list = Array.isArray(current) ? current : [];
      const next = list.includes(label)
        ? list.filter((l) => l !== label)
        : [...list, label];
      const copy = { ...prev };
      if (next.length === 0) {
        delete copy[qid];
      } else {
        copy[qid] = next;
      }
      return copy;
    });
  }

  function toggleOpen(qid: number) {
    setOpenId((prev) => (prev === qid ? null : qid));
  }

  return (
    <>
      <ProgressBar pct={pct} />
      <TopBar answered={answeredCount} total={questions.length} />

      <Cover />
      <CompetitorTable />

      <div className="section">
        <div className="section-num">02 — YOUR DECISIONS</div>
        <h2>Section-by-section choices</h2>
        <p className="section-lead">
          Click a card to expand it. Select your preferred option. Your choices
          will compile into a summary at the bottom.
        </p>

        {questions.map((q) => {
          if (q.multi) {
            const sel = answers[q.id];
            const selected = Array.isArray(sel) ? sel : [];
            return (
              <MultiQuestionCard
                key={q.id}
                question={q}
                selected={selected}
                onToggle={(label) => toggleMulti(q.id, label)}
                open={openId === q.id}
                onToggleOpen={() => toggleOpen(q.id)}
              />
            );
          }
          const sel = answers[q.id];
          const selected = Array.isArray(sel) ? undefined : sel;
          return (
            <QuestionCard
              key={q.id}
              question={q}
              selected={selected}
              onSelect={(label) => selectSingle(q.id, label)}
              open={openId === q.id}
              onToggleOpen={() => toggleOpen(q.id)}
              extra={q.catalog ? <ProductCatalog /> : undefined}
            />
          );
        })}
      </div>

      <SummarySection answers={answers} />

      <div
        style={{
          textAlign: "center",
          padding: 40,
          fontSize: 12,
          color: "var(--ink-30)",
        }}
      >
        Design Brief prepared for Electro Magnetic Products, Inc. — Confidential
      </div>
    </>
  );
}
