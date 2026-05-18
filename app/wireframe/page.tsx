import Link from "next/link";
import {
  Greybox,
  SketchButton,
  SketchCard,
  SketchHeading,
} from "@/components/wireframe/primitives";

const INDUSTRIES = [
  { name: "Aerospace", blurb: "NADCAP-qualified laminations for jet-engine and avionics applications." },
  { name: "Defense", blurb: "MIL-spec stamped cores for radar, sonar, and weapons platforms." },
  { name: "Telecom", blurb: "High-frequency lamination stacks for switching and signal infrastructure." },
  { name: "Motors & Generators", blurb: "EI, EE, and DU laminations across motor and generator OEMs." },
  { name: "Industrial", blurb: "Transformer cores and custom stampings for industrial power." },
];

const CAPABILITY_FLOW = [
  "Tooling",
  "Slitting",
  "Stamping",
  "Annealing",
  "QC",
  "Assembly",
  "Shipping",
];

const SAMPLE_PARTS = ["75EI", "100EI", "112EE", "150DU", "200L", "75LE"];

const CERTS = ["NADCAP", "MIL-45208A", "MIL-Q-9858A", "MIL-STD-45662", "ASTM-346-64"];

export default function WireframeHome() {
  return (
    <>
      {/* Hero — Q1 Recommended: text-only */}
      <section className="wf-section wf-hero">
        <SketchHeading
          kicker="DRAFT WIREFRAME"
          label="Precision laminations for aerospace, defense, and high-reliability motors."
          size="page"
        />
        <p className="wf-lead">
          Stamped, annealed, and finished in Moorestown, NJ since 1966. Eighty
          standard part numbers in stock and full custom tooling on demand.
        </p>
        <div className="wf-row">
          <SketchButton label="Request a quote" variant="primary" />
          <SketchButton label="Browse the catalog" variant="secondary" />
        </div>
      </section>

      {/* Trust strip — Q6 Recommended: homepage cert bar */}
      <section className="wf-section">
        <div className="wf-kicker">CERTIFIED &amp; QUALIFIED</div>
        <div className="wf-trust-strip">
          {CERTS.map((cert) => (
            <div key={cert} className="wf-trust-item">
              <Greybox aspect="3 / 2" label={cert} />
            </div>
          ))}
        </div>
      </section>

      {/* Industries teaser — Q2 Recommended: dedicated pages, teased here */}
      <section className="wf-section">
        <SketchHeading kicker="INDUSTRIES SERVED" label="Built for the buyers who care about pedigree." />
        <p className="wf-lead">
          From aerospace primes to motor OEMs, each industry gets a dedicated
          page with the certifications, materials, and parts that matter to it.
        </p>
        <div className="wf-grid-5">
          {INDUSTRIES.map((ind) => (
            <SketchCard key={ind.name}>
              <Greybox aspect="1 / 1" label={ind.name} />
              <div className="wf-card-title">{ind.name}</div>
              <p className="wf-card-body">{ind.blurb}</p>
            </SketchCard>
          ))}
        </div>
      </section>

      {/* Capabilities flow — Q5 Recommended: process flow */}
      <section className="wf-section">
        <SketchHeading kicker="HOW WE BUILD IT" label="Tooling to shipping, one shop." />
        <p className="wf-lead">
          A connected production pipeline — every step happens under one roof.
        </p>
        <ol className="wf-flow">
          {CAPABILITY_FLOW.map((step, i) => (
            <li key={step} className="wf-flow-step">
              <span className="wf-flow-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="wf-flow-label">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Catalog teaser — Q3 Recommended */}
      <section className="wf-section">
        <SketchHeading kicker="PRODUCT CATALOG" label="80+ standard part numbers, indexed and searchable." />
        <p className="wf-lead">
          Find a part by family, dimension, or part number. Each detail page
          includes a dimensional drawing, spec table, and one-click RFQ.
        </p>
        <div className="wf-grid-3">
          {SAMPLE_PARTS.map((part) => (
            <SketchCard key={part}>
              <div className="wf-part-head">
                <span className="wf-part-num">{part}</span>
                <span className="wf-part-family">{part.replace(/\d/g, "") || "—"}</span>
              </div>
              <Greybox aspect="4 / 3" label="Dimensional drawing" />
              <div className="wf-card-meta">
                <span>Stock dim · Tolerance · Material</span>
              </div>
            </SketchCard>
          ))}
        </div>
        <div className="wf-row" style={{ marginTop: 16 }}>
          <Link href="/wireframe/catalog" className="wf-textlink">
            See the full catalog →
          </Link>
        </div>
      </section>

      {/* Prototype & Short Run — Q8 Recommended: featured */}
      <section className="wf-section">
        <SketchCard emphasis>
          <div className="wf-kicker">PROTOTYPE &amp; SHORT RUN</div>
          <h3 className="wf-card-headline">
            Need a small batch fast? We&apos;ll quote in 48 hours.
          </h3>
          <p className="wf-card-body">
            Low-cost tooling, in-stock material, and a separate quick-quote
            channel for engineering teams iterating on a design.
          </p>
          <div className="wf-row" style={{ marginTop: 12 }}>
            <SketchButton label="Quick-quote a prototype" variant="primary" />
          </div>
        </SketchCard>
      </section>

      {/* About-stat strip — Q10 trust signal */}
      <section className="wf-section">
        <div className="wf-stats">
          <div className="wf-stat">
            <div className="wf-stat-num">1966</div>
            <div className="wf-stat-label">Founded</div>
          </div>
          <div className="wf-stat">
            <div className="wf-stat-num">60+</div>
            <div className="wf-stat-label">Years of operation</div>
          </div>
          <div className="wf-stat">
            <div className="wf-stat-num">Moorestown, NJ</div>
            <div className="wf-stat-label">One facility, one team</div>
          </div>
          <div className="wf-stat">
            <div className="wf-stat-num">80+</div>
            <div className="wf-stat-label">Standard part numbers</div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="wf-section wf-cta-band">
        <SketchHeading kicker="READY TO QUOTE?" label="Send us a drawing or a part number — we&rsquo;ll take it from there." />
        <div className="wf-row">
          <SketchButton label="Request a quote" variant="primary" />
          <SketchButton label="Contact sales" variant="secondary" />
        </div>
      </section>
    </>
  );
}
