"use client";

import type { Question } from "@/lib/types";

interface Props {
  question: Question;
  selected: string[];
  onToggle: (label: string) => void;
  open: boolean;
  onToggleOpen: () => void;
}

export function MultiQuestionCard({
  question,
  selected,
  onToggle,
  open,
  onToggleOpen,
}: Props) {
  const answered = selected.length > 0;
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

          <div className="options">
            {question.options.map((opt) => {
              const isSelected = selected.includes(opt.label);
              return (
                <button
                  type="button"
                  key={opt.label}
                  className={`opt ${isSelected ? "selected" : ""}`}
                  onClick={() => onToggle(opt.label)}
                  aria-pressed={isSelected}
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
