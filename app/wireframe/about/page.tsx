import {
  Greybox,
  SketchCard,
  SketchHeading,
} from "@/components/wireframe/primitives";

const MILESTONES = [
  { year: "1966", label: "Founded in Moorestown, NJ" },
  { year: "1982", label: "Stamping capacity expanded" },
  { year: "1995", label: "Annealing line in-house" },
  { year: "2008", label: "NADCAP qualification" },
  { year: "2018", label: "Tape Wound Cores added" },
  { year: "2026", label: "60 years of operation" },
];

const LEADERSHIP = [
  { name: "President & CEO", title: "Operations, sales, and culture" },
  { name: "Sales Manager", title: "Customer programs and quoting" },
  { name: "QA Director", title: "Certifications and inspection" },
];

export default function WireframeAbout() {
  return (
    <>
      <section className="wf-section wf-hero">
        <SketchHeading
          kicker="ABOUT EMP"
          label="Sixty years of precision laminations."
          size="page"
        />
        <p className="wf-lead">
          Founded in 1966, Electro Magnetic Products has spent six decades
          stamping, annealing, and shipping laminations from one facility in
          Moorestown, New Jersey. The team is small, the standards are MIL-spec,
          and the part numbers we ran in 1972 still ship today.
        </p>
      </section>

      <section className="wf-section">
        <SketchHeading kicker="TIMELINE" label="From founding to today." />
        <ol className="wf-timeline">
          {MILESTONES.map((m) => (
            <li key={m.year} className="wf-timeline-item">
              <div className="wf-timeline-year">{m.year}</div>
              <div className="wf-timeline-dot" aria-hidden="true" />
              <div className="wf-timeline-label">{m.label}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wf-section">
        <SketchHeading kicker="LEADERSHIP" label="Who you'll be working with." />
        <div className="wf-grid-3">
          {LEADERSHIP.map((p) => (
            <SketchCard key={p.name}>
              <Greybox aspect="1 / 1" label="Headshot" />
              <div className="wf-card-title">{p.name}</div>
              <p className="wf-card-body">{p.title}</p>
            </SketchCard>
          ))}
        </div>
      </section>

      <section className="wf-section">
        <SketchHeading kicker="FACILITY" label="One shop, one team." />
        <SketchCard>
          <Greybox aspect="21 / 9" label="Facility — Moorestown, NJ" />
          <p className="wf-card-body" style={{ marginTop: 14 }}>
            Stamping presses, annealing furnaces, slitting lines, QC, and
            shipping under one roof. Tooling lives in-house, so prototype runs
            and production share the same shop floor.
          </p>
        </SketchCard>
      </section>
    </>
  );
}
