import {
  Greybox,
  SketchHeading,
} from "@/components/wireframe/primitives";

const STEPS = [
  {
    name: "Tooling",
    body:
      "In-house die design and progressive-die fabrication. Quick-turn prototype tools for proof builds, full progressive sets for production.",
  },
  {
    name: "Slitting",
    body:
      "Strip slit to width from master coils — silicon steel, nickel-iron, cobalt-iron. Edge condition and burr controlled per spec.",
  },
  {
    name: "Stamping",
    body:
      "Punch presses 30 to 200 ton. Single-stage for prototypes, progressive for volume. Burr height and stack-height controlled in-line.",
  },
  {
    name: "Annealing",
    body:
      "Hydrogen-atmosphere furnaces for stress relief and grain orientation. Controlled cool-down per material recipe. AS9100-aligned recordkeeping.",
  },
  {
    name: "Coating",
    body:
      "C-3 / C-5 interlaminar coatings applied per customer spec. Bond paint available for assembled cores.",
  },
  {
    name: "QC",
    body:
      "Dimensional inspection on coordinate measuring machines, magnetic-property testing on Epstein and toroid setups, full mat-cert traceability.",
  },
  {
    name: "Shipping",
    body:
      "Domestic ground, expedited air, and bonded export packaging. Lot-tagged and traceable from press to dock.",
  },
  {
    name: "Value-Added Services",
    body:
      "Bonding, riveting, welding, and full lamination stack assembly. Kanban and JIT release programs available.",
  },
];

export default function WireframeCapabilities() {
  return (
    <>
      <section className="wf-section wf-hero">
        <SketchHeading
          kicker="CAPABILITIES"
          label="How we make a lamination, end to end."
          size="page"
        />
        <p className="wf-lead">
          Eight steps, one shop floor. Each step is owned by EMP — there is no
          step we sub out, and that&apos;s what keeps lead times tight and
          quality traceable.
        </p>
      </section>

      <section className="wf-section">
        <ol className="wf-process">
          {STEPS.map((step, i) => (
            <li key={step.name} className="wf-process-step">
              <div className="wf-process-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="wf-process-content">
                <SketchHeading kicker="STEP" label={step.name} size="sub" />
                <p className="wf-card-body">{step.body}</p>
              </div>
              <div className="wf-process-visual">
                <Greybox aspect="4 / 3" label={`${step.name} visual`} />
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
