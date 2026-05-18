import {
  FormFieldBox,
  Greybox,
  SketchButton,
  SketchCard,
  SketchHeading,
} from "@/components/wireframe/primitives";

const CORE_SIZES = [
  "0.5 in OD",
  "0.75 in OD",
  "1.0 in OD",
  "1.5 in OD",
  "2.0 in OD",
  "Custom",
];

const SPEC_ROWS = [
  { dim: "Strip thickness", single: "0.001–0.014 in", three: "0.001–0.014 in" },
  { dim: "OD range", single: "0.250–6.000 in", three: "0.500–8.000 in" },
  { dim: "Material options", single: "Hipernom 80, Hy Mu 80, Permeability 49", three: "Hipernom 80, M-19" },
  { dim: "Min batch", single: "10 cores", three: "10 cores" },
];

export default function WireframeTapeWoundCores() {
  return (
    <>
      <section className="wf-section wf-hero">
        <SketchHeading
          kicker="TAPE WOUND CORES"
          label="A separate product line with its own quoting team."
          size="page"
        />
        <p className="wf-lead">
          Single and three-phase toroidal cores wound from nickel-iron, cobalt-iron,
          and silicon-steel strip. Distinct from our stamped laminations — and
          quoted by a dedicated tape-cores inquiry channel.
        </p>
      </section>

      <section className="wf-section">
        <SketchHeading kicker="GALLERY" label="Standard and custom geometries." />
        <div className="wf-grid-3">
          {CORE_SIZES.map((size) => (
            <SketchCard key={size}>
              <Greybox aspect="1 / 1" label={`Tape wound core — ${size}`} />
              <div className="wf-card-title">{size}</div>
              <p className="wf-card-body">
                Wound, annealed, and tested to customer spec.
              </p>
            </SketchCard>
          ))}
        </div>
      </section>

      <section className="wf-section">
        <SketchHeading kicker="SPECS" label="Single vs. three-phase." />
        <SketchCard>
          <table className="wf-spec-table">
            <thead>
              <tr>
                <th scope="col">Dimension</th>
                <th scope="col">Single-phase</th>
                <th scope="col">Three-phase</th>
              </tr>
            </thead>
            <tbody>
              {SPEC_ROWS.map((row) => (
                <tr key={row.dim}>
                  <td>{row.dim}</td>
                  <td>{row.single}</td>
                  <td>{row.three}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SketchCard>
      </section>

      <section className="wf-section">
        <SketchHeading kicker="TAPE CORES INQUIRY" label="Quote a core directly with the tape-cores team." />
        <p className="wf-lead">
          Goes to a different inbox than the general RFQ — routed straight to
          the tape-cores engineers.
        </p>
        <SketchCard>
          <div className="wf-grid-2">
            <FormFieldBox label="Company" />
            <FormFieldBox label="Email" />
            <FormFieldBox label="Core OD (in)" />
            <FormFieldBox label="Strip thickness (in)" />
            <FormFieldBox label="Material preference" />
            <FormFieldBox label="Quantity" />
          </div>
          <FormFieldBox label="Notes for the tape cores team" multiline />
          <div className="wf-row" style={{ marginTop: 8 }}>
            <SketchButton label="Send to tape cores team" variant="primary" />
          </div>
        </SketchCard>
      </section>
    </>
  );
}
