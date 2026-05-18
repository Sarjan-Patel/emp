import {
  FormFieldBox,
  SketchButton,
  SketchCard,
  SketchHeading,
} from "@/components/wireframe/primitives";

export default function WireframeRFQ() {
  return (
    <>
      <section className="wf-section wf-hero">
        <SketchHeading
          kicker="REQUEST A QUOTE"
          label="Two channels — one for general questions, one for detailed RFQs."
          size="page"
        />
        <p className="wf-lead">
          Not every conversation starts with a drawing. Casual inquiries route
          to the left form. Production-shaped requests with material, quantity,
          and tolerances go in the right form so the quoting desk can respond fast.
        </p>
      </section>

      <section className="wf-section">
        <div className="wf-grid-2 wf-rfq-grid">
          <SketchCard>
            <SketchHeading kicker="GENERAL INQUIRY" label="Just have a question." size="sub" />
            <p className="wf-card-body" style={{ marginBottom: 16 }}>
              Use this if you&apos;re scoping options, want a callback, or
              aren&apos;t ready to share a drawing yet.
            </p>
            <FormFieldBox label="Name" />
            <FormFieldBox label="Email" />
            <FormFieldBox label="Company (optional)" />
            <FormFieldBox label="Message" multiline />
            <div className="wf-row" style={{ marginTop: 8 }}>
              <SketchButton label="Send inquiry" variant="secondary" />
            </div>
          </SketchCard>

          <SketchCard emphasis>
            <SketchHeading kicker="DETAILED RFQ" label="You have specs. We want them." size="sub" />
            <p className="wf-card-body" style={{ marginBottom: 16 }}>
              The fastest way to a quote is the most complete RFQ — share
              everything below and you&apos;ll hear back the same business day.
            </p>
            <div className="wf-grid-2">
              <FormFieldBox label="Company" />
              <FormFieldBox label="Email" />
              <FormFieldBox label="Material type" />
              <FormFieldBox label="Part dimensions" />
              <FormFieldBox label="Quantity" />
              <FormFieldBox label="Target lead time" />
            </div>
            <FormFieldBox label="Tolerances and notes" multiline />
            <div className="wf-upload" aria-hidden="true">
              <div className="wf-upload-icon">↑</div>
              <div className="wf-upload-text">
                <strong>Drop a drawing here</strong>
                <span>PDF, DXF, STEP, or DWG · up to 25 MB</span>
              </div>
            </div>
            <div className="wf-row" style={{ marginTop: 14 }}>
              <SketchButton label="Send RFQ" variant="primary" />
            </div>
          </SketchCard>
        </div>
      </section>
    </>
  );
}
