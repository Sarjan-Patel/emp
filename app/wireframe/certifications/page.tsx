import {
  Greybox,
  SketchHeading,
} from "@/components/wireframe/primitives";

const CERTS = [
  {
    name: "NADCAP",
    desc:
      "National Aerospace and Defense Contractors Accreditation — recognized by aerospace primes as the qualification floor for material processing.",
  },
  {
    name: "MIL-45208A",
    desc:
      "Inspection system requirements for material acceptance and verification across military programs.",
  },
  {
    name: "MIL-Q-9858A",
    desc:
      "Quality program requirements baseline used by US Department of Defense procurement.",
  },
  {
    name: "MIL-STD-45662",
    desc:
      "Calibration system requirements for inspection and test equipment used on government work.",
  },
  {
    name: "ASTM-346-64",
    desc:
      "Standard test methods for direct-current magnetic properties of nickel-iron alloys.",
  },
];

export default function WireframeCertifications() {
  return (
    <>
      <section className="wf-section wf-hero">
        <SketchHeading
          kicker="QUALITY & CERTIFICATIONS"
          label="Pedigreed for aerospace and defense procurement."
          size="page"
        />
        <p className="wf-lead">
          Certifications matter most to the buyers who will not even read a
          capabilities page without seeing them upfront. Every cert below is
          on file with a current expiry date and a downloadable certificate.
        </p>
      </section>

      <section className="wf-section">
        <div className="wf-stack">
          {CERTS.map((cert) => (
            <div key={cert.name} className="wf-cert-row">
              <div className="wf-cert-logo">
                <Greybox aspect="1 / 1" label={cert.name} />
              </div>
              <div className="wf-cert-body">
                <SketchHeading kicker="CERTIFICATION" label={cert.name} size="sub" />
                <p className="wf-card-body" style={{ marginBottom: 10 }}>
                  {cert.desc}
                </p>
                <div className="wf-card-meta">
                  <span>On file · Current expiry · Audit history available on request</span>
                </div>
                <div className="wf-row" style={{ marginTop: 10 }}>
                  <span className="wf-textlink">Download certificate (PDF) →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
