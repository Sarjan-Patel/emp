import {
  Greybox,
  SketchCard,
  SketchHeading,
} from "@/components/wireframe/primitives";

const INDUSTRIES = [
  {
    name: "Aerospace",
    blurb:
      "NADCAP-qualified laminations for jet-engine generators, avionics transformers, and starter-generator stacks. Full mat-cert traceability per AS9100 expectations.",
    materials: "M-19 · Hipernom 80 · Permeability 49",
  },
  {
    name: "Defense",
    blurb:
      "MIL-spec stamped cores for radar, sonar, weapons platforms, and ground vehicle power. MIL-45208A and MIL-Q-9858A on file.",
    materials: "M-19 · Hy Mu 80 · 50% NiFe",
  },
  {
    name: "Telecom",
    blurb:
      "High-frequency lamination stacks for switching infrastructure, base-station power, and signal isolation transformers.",
    materials: "Permeability 49 · M-15 · Cobalt-iron",
  },
  {
    name: "Motors & Generators",
    blurb:
      "EI, EE, and DU laminations across motor and generator OEMs. Short-run prototyping for design iterations and full production beyond.",
    materials: "M-19 · M-22 · M-43 NGOES",
  },
  {
    name: "Industrial",
    blurb:
      "Transformer cores and custom stampings for industrial power, control transformers, and reactor cores.",
    materials: "M-19 · Cold-rolled silicon steel",
  },
];

export default function WireframeIndustries() {
  return (
    <>
      <section className="wf-section wf-hero">
        <SketchHeading
          kicker="INDUSTRIES SERVED"
          label="Built for buyers who care about pedigree."
          size="page"
        />
        <p className="wf-lead">
          Each industry gets a dedicated page with the certifications, material
          choices, and standard part families that matter most to it. Self-qualify
          fast, then jump straight to the catalog or RFQ.
        </p>
      </section>

      <section className="wf-section">
        <div className="wf-stack">
          {INDUSTRIES.map((ind) => (
            <SketchCard key={ind.name}>
              <div className="wf-industry-row">
                <Greybox aspect="1 / 1" label={ind.name} />
                <div className="wf-industry-body">
                  <SketchHeading kicker="INDUSTRY" label={ind.name} size="sub" />
                  <p className="wf-card-body" style={{ marginBottom: 10 }}>
                    {ind.blurb}
                  </p>
                  <div className="wf-card-meta">
                    <span>Typical materials: {ind.materials}</span>
                  </div>
                  <div className="wf-row" style={{ marginTop: 12 }}>
                    <span className="wf-textlink">View {ind.name} detail →</span>
                  </div>
                </div>
              </div>
            </SketchCard>
          ))}
        </div>
      </section>
    </>
  );
}
