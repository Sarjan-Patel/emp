import Link from "next/link";

export function Cover() {
  return (
    <div className="cover">
      <div className="cover-label">Website Design Brief</div>
      <h1>
        Building the new <em>empmags.com</em>
      </h1>
      <p className="cover-sub">
        We&apos;ve studied your market, analyzed what your competitors are doing,
        and mapped out every section your new website needs. Below are the
        decisions that will shape the final product. Pick your preferences —
        we&apos;ll handle the rest.
      </p>
      <Link
        href="/wireframe"
        target="_blank"
        rel="noopener noreferrer"
        className="cover-cta"
      >
        Preview the proposed empmags.com →
      </Link>
      <p className="cover-cta-note">
        Opens our recommended direction in a new tab — your answers stay put.
      </p>
      <div className="cover-meta">
        <span>
          <strong>Client:</strong> Electro Magnetic Products, Inc.
        </span>
        <span>
          <strong>Date:</strong> May 2026
        </span>
        <span>
          <strong>Decisions:</strong> 14 questions
        </span>
      </div>
    </div>
  );
}
