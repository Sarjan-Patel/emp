"use client";

import { type ReactNode } from "react";
import type { Question } from "@/lib/types";

interface Props {
  question: Question;
  selected: string | undefined;
  onSelect: (label: string) => void;
  open: boolean;
  onToggleOpen: () => void;
  /** Optional extra content rendered above the options (e.g. ProductCatalog for Q3). */
  extra?: ReactNode;
}

export function QuestionCard({
  question,
  selected,
  onSelect,
  open,
  onToggleOpen,
  extra,
}: Props) {
  const answered = !!selected;
  return (
    <div
      className={[
        "q-card",
        answered ? "answered" : "",
        open ? "open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-q={question.id}
    >
      <button
        type="button"
        className="q-header"
        onClick={onToggleOpen}
        aria-expanded={open}
      >
        <div className="q-num">
          {question.id.toString().padStart(2, "0")}
        </div>
        <div className="q-text">
          <div className="q-title">{question.title}</div>
          <div className="q-subtitle">{question.subtitle}</div>
        </div>
        <div className="q-toggle" aria-hidden="true">
          ▾
        </div>
      </button>
      <div className="q-body">
        <div className="q-content">
          {question.contextBody && (
            <div className="q-context">
              {question.contextLabel && (
                <div className="q-context-label">
                  {question.contextLabel}
                </div>
              )}
              {question.contextBody}
            </div>
          )}

          {question.previews && (
            <div className="preview-strip">
              {question.previews.map((p, i) => (
                <div className="preview-card" key={i}>
                  <div className={`prev-visual ${p.variant}`}>
                    {p.visualLines.map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < p.visualLines.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  <div className="prev-label">
                    {p.label}
                    <br />
                    <span className="prev-sub">{p.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {extra}

          <div className="options">
            {question.options.map((opt) => {
              const isSelected = selected === opt.label;
              return (
                <button
                  type="button"
                  key={opt.label}
                  className={`opt ${isSelected ? "selected" : ""}`}
                  onClick={() => onSelect(opt.label)}
                >
                  <div className="opt-radio" />
                  <div className="opt-body">
                    <div className="opt-label">{opt.label}</div>
                    <div className="opt-desc">{opt.desc}</div>
                  </div>
                  {opt.tag && (
                    <span className={`opt-tag ${opt.tag.kind}`}>
                      {opt.tag.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
