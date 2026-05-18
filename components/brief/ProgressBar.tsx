interface Props {
  pct: number;
}

export function ProgressBar({ pct }: Props) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}
