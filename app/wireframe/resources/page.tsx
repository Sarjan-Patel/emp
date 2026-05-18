import {
  SketchCard,
  SketchHeading,
} from "@/components/wireframe/primitives";

type Resource = { title: string; desc: string; meta: string };

const GROUPS: Array<{ heading: string; items: Resource[] }> = [
  {
    heading: "Charts",
    items: [
      {
        title: "Cross-reference chart",
        desc: "EI/EE/L/DU equivalents across competitor part numbers.",
        meta: "PDF · 240 KB · Updated Feb 2026",
      },
      {
        title: "Weight chart",
        desc: "Stack-height to weight conversion across standard families.",
        meta: "PDF · 180 KB · Updated Jan 2026",
      },
      {
        title: "Material chart",
        desc: "Material grades, thicknesses, and typical applications.",
        meta: "PDF · 320 KB · Updated Dec 2025",
      },
    ],
  },
  {
    heading: "Materials",
    items: [
      {
        title: "Permeability 49 data",
        desc: "Magnetic properties, permeability curves, saturation flux density.",
        meta: "PDF · 410 KB · Updated Nov 2025",
      },
      {
        title: "Hy Mu 80 data",
        desc: "80% NiFe high-permeability alloy properties and processing notes.",
        meta: "PDF · 380 KB · Updated Oct 2025",
      },
      {
        title: "Hipernom 80 data",
        desc: "High-permeability nickel-iron data for shielding and instrument transformers.",
        meta: "PDF · 360 KB · Updated Oct 2025",
      },
    ],
  },
  {
    heading: "Product groups",
    items: [
      {
        title: "EI laminations — full family",
        desc: "Drawings and spec tables for every EI standard part.",
        meta: "PDF · 2.4 MB · Updated Mar 2026",
      },
      {
        title: "DU/U laminations — full family",
        desc: "Drawings and spec tables for every DU/U standard part.",
        meta: "PDF · 1.8 MB · Updated Mar 2026",
      },
    ],
  },
];

export default function WireframeResources() {
  return (
    <>
      <section className="wf-section wf-hero">
        <SketchHeading
          kicker="RESOURCES"
          label="Technical references engineers actually use."
          size="page"
        />
        <p className="wf-lead">
          Cross-reference charts, material datasheets, and family drawings.
          Downloadable, no gate, no email required. New material datasheets
          land here when they&apos;re ready — no blog.
        </p>
      </section>

      {GROUPS.map((group) => (
        <section key={group.heading} className="wf-section">
          <SketchHeading kicker={group.heading.toUpperCase()} label={group.heading} />
          <div className="wf-grid-3">
            {group.items.map((item) => (
              <SketchCard key={item.title}>
                <div className="wf-card-title">{item.title}</div>
                <p className="wf-card-body">{item.desc}</p>
                <div className="wf-card-meta">
                  <span>{item.meta}</span>
                </div>
                <div className="wf-row" style={{ marginTop: 10 }}>
                  <span className="wf-textlink">Download →</span>
                </div>
              </SketchCard>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
