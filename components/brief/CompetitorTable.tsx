type Cell =
  | { kind: "check"; text: string }
  | { kind: "dash" }
  | { kind: "emp"; text: string };

interface Row {
  label: string;
  cells: Cell[]; // length 5: Tempel, Thomson, Sotek, Magworks, Polaris
  emp: string;
}

const rows: Row[] = [
  {
    label: "Hero / Value Prop",
    cells: [
      { kind: "check", text: "✓ Video hero" },
      { kind: "check", text: "✓ Image hero" },
      { kind: "check", text: "✓ Image hero" },
      { kind: "check", text: "✓ Image hero" },
      { kind: "check", text: "✓ Text hero" },
    ],
    emp: "NEEDED",
  },
  {
    label: "Industries Served",
    cells: [
      { kind: "check", text: "✓ 4 pages" },
      { kind: "check", text: "✓ 6 pages" },
      { kind: "check", text: "✓ 6 pages" },
      { kind: "check", text: "✓ 3 pages" },
      { kind: "dash" },
    ],
    emp: "NEEDED",
  },
  {
    label: "Products / Catalog",
    cells: [
      { kind: "check", text: "✓ By type" },
      { kind: "dash" },
      { kind: "check", text: "✓ Service list" },
      { kind: "check", text: "✓ Product page" },
      { kind: "check", text: "✓ Service pages" },
    ],
    emp: "80+ SKUs to showcase",
  },
  {
    label: "Capabilities",
    cells: [
      { kind: "check", text: "✓ 10 sub-pages" },
      { kind: "check", text: "✓ 6 sub-pages" },
      { kind: "check", text: "✓ 4 sub-pages" },
      { kind: "dash" },
      { kind: "check", text: "✓ 6 pages" },
    ],
    emp: "8 capabilities",
  },
  {
    label: "Certifications / Quality",
    cells: [
      { kind: "check", text: "✓ Dedicated page" },
      { kind: "check", text: "✓ Page + PDF certs" },
      { kind: "check", text: "✓ ISO badge + PDF" },
      { kind: "check", text: "✓ ISO badge" },
      { kind: "check", text: "✓ ITAR cert page" },
    ],
    emp: "NADCAP + MIL specs",
  },
  {
    label: "About / History",
    cells: [
      { kind: "check", text: "✓" },
      { kind: "check", text: "✓" },
      { kind: "check", text: "✓ + History" },
      { kind: "check", text: "✓" },
      { kind: "dash" },
    ],
    emp: "Have content",
  },
  {
    label: "RFQ / Quote Form",
    cells: [
      { kind: "check", text: "✓ Inquiry form" },
      { kind: "check", text: "✓ Dedicated RFQ" },
      { kind: "check", text: "✓ Contact form" },
      { kind: "check", text: "✓ Modal popup" },
      { kind: "check", text: "✓ Form + email" },
    ],
    emp: "CRITICAL NEED",
  },
  {
    label: "Blog / Resources",
    cells: [
      { kind: "check", text: "✓ Resources hub + eBooks" },
      { kind: "check", text: "✓ Blog" },
      { kind: "check", text: "✓ Blog" },
      { kind: "check", text: "✓ FAQ" },
      { kind: "dash" },
    ],
    emp: "OPTIONAL",
  },
  {
    label: "Technical Data / Downloads",
    cells: [
      { kind: "dash" },
      { kind: "dash" },
      { kind: "dash" },
      { kind: "check", text: "✓ Downloads page" },
      { kind: "dash" },
    ],
    emp: "7 data resources (unique asset)",
  },
  {
    label: "Careers",
    cells: [
      { kind: "check", text: "✓" },
      { kind: "check", text: "✓ + Apprenticeship" },
      { kind: "dash" },
      { kind: "dash" },
      { kind: "dash" },
    ],
    emp: "OPTIONAL",
  },
  {
    label: "News / Events",
    cells: [
      { kind: "check", text: "✓ Events page" },
      { kind: "check", text: "✓ News section" },
      { kind: "check", text: "✓ News" },
      { kind: "check", text: "✓ Blog" },
      { kind: "dash" },
    ],
    emp: "OPTIONAL",
  },
  {
    label: "Equipment List / Gallery",
    cells: [
      { kind: "dash" },
      { kind: "dash" },
      { kind: "check", text: "✓ Equipment + Gallery" },
      { kind: "dash" },
      { kind: "dash" },
    ],
    emp: "OPTIONAL",
  },
];

function renderCell(cell: Cell, key: number) {
  if (cell.kind === "check")
    return (
      <td key={key} className="check">
        {cell.text}
      </td>
    );
  if (cell.kind === "dash")
    return (
      <td key={key} className="dash">
        —
      </td>
    );
  return (
    <td key={key} className="emp-col">
      {cell.text}
    </td>
  );
}

export function CompetitorTable() {
  return (
    <div className="section">
      <div className="section-num">01 — COMPETITIVE LANDSCAPE</div>
      <h2>What your competitors are doing</h2>
      <p className="section-lead">
        We analyzed the websites of five competitors in the magnetic lamination /
        stamping space. Here&apos;s what sections they include and where EMP has
        gaps to close.
      </p>

      <div className="comp-table-wrap">
        <table className="comp-table">
          <thead>
            <tr>
              <th style={{ minWidth: 180 }}>Website Section</th>
              <th>
                Tempel{" "}
                <span className="comp-badge leader">Market Leader</span>
              </th>
              <th>
                Thomson Lamination{" "}
                <span className="comp-badge niche">NJ Competitor</span>
              </th>
              <th>
                Sotek <span className="comp-badge mid">Mid-size</span>
              </th>
              <th>
                Magworks <span className="comp-badge mid">Mid-size</span>
              </th>
              <th>
                Polaris Laser{" "}
                <span className="comp-badge niche">Niche</span>
              </th>
              <th className="emp-head">EMP (New Site)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td>
                  <strong>{row.label}</strong>
                </td>
                {row.cells.map((cell, i) => renderCell(cell, i))}
                <td className="emp-col">{row.emp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="q-context" style={{ marginTop: 20 }}>
        <div className="q-context-label">Key Takeaway</div>
        <strong>
          EMP&apos;s biggest competitive gap is lead capture — every single
          competitor has an RFQ form.
        </strong>{" "}
        Beyond that, most competitors organize by Industries Served (helping
        buyers self-qualify), have dedicated Certifications pages, and lead with
        a clear hero section. EMP&apos;s unique advantage is the 80+ SKU product
        catalog and 7 technical data resources — no competitor in this tier
        offers that depth.
      </div>
    </div>
  );
}
