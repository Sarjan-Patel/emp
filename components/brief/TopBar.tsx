interface Props {
  answered: number;
  total: number;
}

export function TopBar({ answered, total }: Props) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="topbar-logo">Design Brief</span>
        <span className="topbar-divider" />
        <span className="topbar-title">
          Electro Magnetic Products — New Website
        </span>
      </div>
      <span className="topbar-counter">
        {answered} of {total} answered
      </span>
    </div>
  );
}
