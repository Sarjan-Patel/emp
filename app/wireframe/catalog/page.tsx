import {
  Greybox,
  SketchButton,
  SketchHeading,
} from "@/components/wireframe/primitives";

const FAMILIES = ["All", "EI", "EE", "L", "DU/U", "LE", "UI", "F", "FB"];

type Part = { num: string; family: string; expanded?: boolean };
const PARTS: Part[] = [
  { num: "75EI", family: "EI", expanded: true },
  { num: "100EI", family: "EI" },
  { num: "112EI", family: "EI" },
  { num: "125EI", family: "EI" },
  { num: "150EI", family: "EI" },
  { num: "100EE", family: "EE" },
  { num: "112EE", family: "EE" },
  { num: "150EE", family: "EE" },
  { num: "200L", family: "L" },
  { num: "250L", family: "L" },
  { num: "150DU", family: "DU/U" },
  { num: "75LE", family: "LE" },
];

const EXPANDED = PARTS.find((p) => p.expanded)!;

const SPEC_ROWS = [
  { dim: "A (overall width)", nominal: "0.750 in", tol: "± 0.002" },
  { dim: "B (window width)", nominal: "0.250 in", tol: "± 0.002" },
  { dim: "C (window height)", nominal: "0.500 in", tol: "± 0.002" },
  { dim: "D (tongue width)", nominal: "0.250 in", tol: "± 0.002" },
  { dim: "Thickness", nominal: "0.014 in", tol: "± 0.0005" },
  { dim: "Material", nominal: "M-19 NGOES", tol: "—" },
];

export default function WireframeCatalog() {
  return (
    <>
      <section className="wf-section wf-hero">
        <SketchHeading
          kicker="PRODUCT CATALOG"
          label="80+ standard part numbers, indexed and searchable."
          size="page"
        />
        <p className="wf-lead">
          Browse EI, EE, L, DU/U, LE, UI, F, FB, FG, and FM families. Filter by
          family or search by part number. Each part has a dimensional drawing
          and spec table. Quote any part in one click.
        </p>
      </section>

      <section className="wf-section">
        {/* Toolbar */}
        <div className="wf-toolbar">
          <div className="wf-search">
            <span className="wf-search-icon" aria-hidden="true">⌕</span>
            <span className="wf-search-placeholder">Search by part number, dimension, or material…</span>
          </div>
          <div className="wf-filters" role="tablist" aria-label="Family filters">
            {FAMILIES.map((f, i) => (
              <span
                key={f}
                className={`wf-filter${i === 0 ? " wf-filter-active" : ""}`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Grid with one expanded card */}
        <div className="wf-catalog-grid">
          {PARTS.map((part) =>
            part.expanded ? (
              <div key={part.num} className="wf-catalog-expanded">
                <div className="wf-part-head">
                  <span className="wf-part-num">{part.num}</span>
                  <span className="wf-part-family">{part.family}</span>
                </div>
                <div className="wf-detail-split">
                  <Greybox aspect="4 / 3" label={`Dimensional drawing — ${part.num}`} />
                  <div>
                    <SketchHeading kicker="DIMENSIONS" label="Spec table" size="sub" />
                    <table className="wf-spec-table">
                      <thead>
                        <tr>
                          <th scope="col">Dimension</th>
                          <th scope="col">Nominal</th>
                          <th scope="col">Tol.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SPEC_ROWS.map((row) => (
                          <tr key={row.dim}>
                            <td>{row.dim}</td>
                            <td>{row.nominal}</td>
                            <td>{row.tol}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="wf-row" style={{ marginTop: 18 }}>
                  <SketchButton label={`Request quote for ${EXPANDED.num}`} variant="primary" />
                  <SketchButton label="Download PDF" variant="secondary" />
                </div>
              </div>
            ) : (
              <div key={part.num} className="wf-catalog-card">
                <div className="wf-part-head">
                  <span className="wf-part-num">{part.num}</span>
                  <span className="wf-part-family">{part.family}</span>
                </div>
                <Greybox aspect="4 / 3" label="Drawing" />
                <div className="wf-card-meta">
                  <span>Stock dim · Tolerance · Material</span>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}
