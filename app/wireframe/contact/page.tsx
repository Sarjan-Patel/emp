import {
  FormFieldBox,
  Greybox,
  SketchButton,
  SketchCard,
  SketchHeading,
} from "@/components/wireframe/primitives";

const NAMED_CONTACTS = [
  {
    role: "President & CEO",
    name: "[Name]",
    email: "ceo@empmags.com",
    note: "Strategic conversations, partnerships.",
  },
  {
    role: "Sales Manager",
    name: "[Name]",
    email: "sales@empmags.com",
    note: "Customer programs, quoting, lead times.",
  },
  {
    role: "General inquiries",
    name: "Front desk",
    email: "info@empmags.com",
    note: "Anything that doesn't fit above.",
  },
];

export default function WireframeContact() {
  return (
    <>
      <section className="wf-section wf-hero">
        <SketchHeading
          kicker="CONTACT EMP"
          label="One shop, one phone number, and people who pick up."
          size="page"
        />
        <p className="wf-lead">
          Stop by, send a message, or call. The map and form are below; the
          named contacts are on the right so you can route by topic.
        </p>
      </section>

      <section className="wf-section">
        <div className="wf-grid-2 wf-contact-grid">
          <div className="wf-stack">
            <SketchCard>
              <Greybox aspect="16 / 10" label="Map — 1115 East Main Street, Moorestown, NJ" />
              <div className="wf-card-meta" style={{ marginTop: 12 }}>
                <span>
                  1115 East Main Street, Moorestown, NJ 08057<br />
                  Phone (856) 555-0142 · Fax (856) 555-0143
                </span>
              </div>
            </SketchCard>
            <SketchCard>
              <SketchHeading kicker="QUICK CONTACT" label="Drop us a line." size="sub" />
              <FormFieldBox label="Name" />
              <FormFieldBox label="Email" />
              <FormFieldBox label="Subject" />
              <FormFieldBox label="Message" multiline />
              <div className="wf-row" style={{ marginTop: 8 }}>
                <SketchButton label="Send message" variant="primary" />
              </div>
            </SketchCard>
          </div>

          <SketchCard>
            <SketchHeading kicker="WHO TO ASK" label="Named contacts." size="sub" />
            <ul className="wf-named-list">
              {NAMED_CONTACTS.map((c) => (
                <li key={c.role} className="wf-named-item">
                  <div className="wf-named-role">{c.role}</div>
                  <div className="wf-named-name">{c.name}</div>
                  <div className="wf-named-email">{c.email}</div>
                  <div className="wf-named-note">{c.note}</div>
                </li>
              ))}
            </ul>
          </SketchCard>
        </div>
      </section>
    </>
  );
}
