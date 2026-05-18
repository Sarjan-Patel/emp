export type ProductFamily = "EI" | "EE" | "L" | "DU" | "F" | "LE";

export interface Product {
  name: string;
  family: ProductFamily;
  center: string;
  desc: string;
}

export interface OptionTag {
  label: string;
  kind: "rec" | "pop";
}

export interface QuestionOption {
  label: string;
  desc: string;
  tag?: OptionTag;
}

export interface PreviewCard {
  variant: "dark" | "navy" | "warm";
  visualLines: string[];
  label: string;
  sub: string;
}

export interface Question {
  id: number;
  title: string;
  subtitle: string;
  contextLabel?: string;
  contextBody?: React.ReactNode;
  previews?: PreviewCard[];
  options: QuestionOption[];
  multi?: boolean;
  catalog?: boolean;
}

/** Maps question id → label (single-select) or labels (multi-select). */
export type Answers = Record<number, string | string[]>;

export interface SubmissionPayload {
  answers: Answers;
  submittedAt: string;
  userAgent?: string;
}

export interface StoredSubmission extends SubmissionPayload {
  id: string;
  receivedAt: string;
}
