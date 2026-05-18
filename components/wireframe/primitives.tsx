import type { ReactNode } from "react";

type GreyboxProps = {
  aspect?: string;
  label: string;
  variant?: "default" | "dark";
};

export function Greybox({ aspect = "16 / 9", label, variant = "default" }: GreyboxProps) {
  return (
    <div
      className={`wf-greybox${variant === "dark" ? " wf-greybox-dark" : ""}`}
      style={{ aspectRatio: aspect }}
      aria-hidden="true"
    >
      <span className="wf-greybox-label">{label}</span>
    </div>
  );
}

type SketchCardProps = {
  children: ReactNode;
  emphasis?: boolean;
};

export function SketchCard({ children, emphasis = false }: SketchCardProps) {
  return (
    <div className={`wf-card${emphasis ? " wf-card-emphasis" : ""}`}>{children}</div>
  );
}

type SketchHeadingProps = {
  kicker?: string;
  label: string;
  size?: "page" | "section" | "sub";
};

export function SketchHeading({ kicker, label, size = "section" }: SketchHeadingProps) {
  const Tag = size === "page" ? "h1" : size === "sub" ? "h3" : "h2";
  return (
    <div className={`wf-heading wf-heading-${size}`}>
      {kicker ? <div className="wf-kicker">{kicker}</div> : null}
      <Tag className="wf-heading-text">{label}</Tag>
    </div>
  );
}

type FormFieldBoxProps = {
  label: string;
  multiline?: boolean;
};

export function FormFieldBox({ label, multiline = false }: FormFieldBoxProps) {
  return (
    <div className="wf-field">
      <div className="wf-field-label">{label}</div>
      <div className={`wf-field-input${multiline ? " wf-field-multiline" : ""}`} aria-hidden="true" />
    </div>
  );
}

type SketchButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
};

export function SketchButton({ label, variant = "primary" }: SketchButtonProps) {
  return <span className={`wf-btn wf-btn-${variant}`}>{label}</span>;
}
