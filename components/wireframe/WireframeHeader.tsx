import Link from "next/link";

const NAV_ITEMS = [
  { href: "/wireframe", label: "Home" },
  { href: "/wireframe/industries", label: "Industries" },
  { href: "/wireframe/catalog", label: "Catalog" },
  { href: "/wireframe/capabilities", label: "Capabilities" },
  { href: "/wireframe/certifications", label: "Certifications" },
  { href: "/wireframe/prototype-short-run", label: "Prototype & Short Run" },
  { href: "/wireframe/rfq", label: "RFQ" },
  { href: "/wireframe/about", label: "About" },
  { href: "/wireframe/tape-wound-cores", label: "Tape Wound Cores" },
  { href: "/wireframe/resources", label: "Resources" },
  { href: "/wireframe/contact", label: "Contact" },
];

export function WireframeHeader() {
  return (
    <header className="wf-header">
      <div className="wf-header-top">
        <div className="wf-header-brand">
          <span className="wf-header-mark">empmags</span>
          <span className="wf-header-tag">Wireframe</span>
        </div>
        <Link href="/" className="wf-header-back">
          ← Back to brief
        </Link>
      </div>
      <nav className="wf-nav" aria-label="Wireframe sections">
        <ol className="wf-nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="wf-nav-item">
              <Link href={item.href} className="wf-nav-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}
