import {
  FormFieldBox,
  SketchButton,
  SketchCard,
  SketchHeading,
} from "@/components/wireframe/primitives";

const VALUE_PROPS = [
  {
    title: "Quick quote",
    body: "48-hour turnaround on prototype quotes. Send a drawing or a sketch, get a number.",
  },
  {
    title: "Short lead time",
    body: "Prototype tooling cut in days, not weeks. First articles in your hands fast.",
  },
  {
    title: "Low-cost tooling",
    body: "Soft-die and single-stage options reduce up-front spend for proof builds.",
  },
  {
    title: "Material availability",
    body: "M-19, Permeability 49, Hipernom 80, and Hy Mu 80 in stock for immediate stamping.",
  },
];

export default function WireframePrototype() {
  return (
    <>
      <section className="wf-section wf-hero">
        <SketchHeading
          kicker="PROTOTYPE & SHORT RUN"
          label="Quick-turn laminations for engineering teams iterating on a design."
          size="page"
        />
        <p className="wf-lead">
          You have a deadline. We have a press, a tool shop, and the material
          in stock. Send a drawing — we&apos;ll quote in 48 hours and ship a
          first article fast.
        </p>
      </section>

      <section className="wf-section">
        <SketchHeading kicker="WHY EMP FOR PROTOTYPES" label="Built around iteration speed." />
        <div className="wf-grid-4">
          {VALUE_PROPS.map((vp) => (
            <SketchCard key={vp.title}>
              <div className="wf-card-title">{vp.title}</div>
              <p className="wf-card-body">{vp.body}</p>
            </SketchCard>
          ))}
        </div>
      </section>

      <section className="wf-section">
        <SketchHeading kicker="PROTOTYPE RFQ" label="Send us what you have." />
        <p className="wf-lead">
          A separate quick-quote channel — no need to fill out the full RFQ if
          you&apos;re early in design.
        </p>
        <SketchCard emphasis>
          <div className="wf-grid-2">
            <FormFieldBox label="Company" />
            <FormFieldBox label="Engineering contact" />
            <FormFieldBox label="Email" />
            <FormFieldBox label="Phone" />
            <FormFieldBox label="Target quantity" />
            <FormFieldBox label="Target first-article date" />
          </div>
          <FormFieldBox label="Drawing or sketch (paste a description)" multiline />
          <div className="wf-row" style={{ marginTop: 8 }}>
            <SketchButton label="Send to the prototype desk" variant="primary" />
          </div>
        </SketchCard>
      </section>
    </>
  );
}
