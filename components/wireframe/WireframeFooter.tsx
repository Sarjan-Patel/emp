import Link from "next/link";

export function WireframeFooter() {
  return (
    <footer className="wf-footer">
      <div className="wf-footer-inner">
        <div className="wf-footer-label">
          Wireframe — not final design — May 2026
        </div>
        <Link href="/" className="wf-footer-back">
          ← Back to brief
        </Link>
      </div>
    </footer>
  );
}
