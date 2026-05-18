"use client";

import { useMemo, useState } from "react";
import { products } from "@/components/catalog/products-data";
import type { Product, ProductFamily } from "@/lib/types";

type FamilyFilter = "all" | ProductFamily;

const FAMILY_FILTERS: Array<{ value: FamilyFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "EI", label: "EI Series" },
  { value: "EE", label: "EE Series" },
  { value: "L", label: "L Series" },
  { value: "DU", label: "DU / U" },
  { value: "F", label: "F / FB / FG" },
  { value: "LE", label: "LE / UI" },
];

function ProductDetail({ p }: { p: Product }) {
  return (
    <div className="cat-detail">
      <div className="cat-detail-inner">
        <div className="cat-drawing">
          <div className="cat-drawing-placeholder">
            <div className="icon">📐</div>
            <p>
              <strong>{p.name} Dimensional Drawing</strong>
              <br />
              PDF / image will be displayed here
              <br />
              <br />
              <em style={{ color: "var(--ink-30)" }}>
                Actual engineering drawings from
                <br />
                EMP&apos;s spec sheets will go here
              </em>
            </p>
          </div>
        </div>
        <div className="cat-dim-table">
          <h3
            style={{
              fontSize: 16,
              marginBottom: 12,
              fontFamily: "var(--ff-display), Georgia, serif",
            }}
          >
            {p.name} Specifications
          </h3>
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Part Number</td>
                <td>
                  <strong>{p.name}</strong>
                </td>
              </tr>
              <tr>
                <td>Family</td>
                <td>{p.family} Series</td>
              </tr>
              <tr>
                <td>Center Leg</td>
                <td>{p.center}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{p.desc}</td>
              </tr>
              <tr>
                <td>Material Options</td>
                <td>Silicon Steel, 49% Ni, 80% Ni, Cobalt</td>
              </tr>
              <tr>
                <td>Thickness Range</td>
                <td>.004&quot; – .025&quot;</td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{
                    textAlign: "center",
                    color: "var(--ink-30)",
                    fontStyle: "italic",
                    padding: 16,
                  }}
                >
                  Full dimensional data (A, B, C, D, E, F dims) will populate
                  from your spec sheets
                </td>
              </tr>
            </tbody>
          </table>
          <div className="cat-actions">
            <button type="button" className="cat-btn primary">
              Request Quote for {p.name}
            </button>
            <button type="button" className="cat-btn secondary">
              Download PDF Spec Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCatalog() {
  const [activeFamily, setActiveFamily] = useState<FamilyFilter>("all");
  const [search, setSearch] = useState("");
  const [expandedPart, setExpandedPart] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) => {
      const matchFamily =
        activeFamily === "all" || p.family === activeFamily;
      const matchSearch = !q || p.name.toLowerCase().includes(q);
      return matchFamily && matchSearch;
    });
  }, [activeFamily, search]);

  function handleFamily(family: FamilyFilter) {
    setActiveFamily(family);
    setSearch("");
    setExpandedPart(null);
  }

  function handleExpand(name: string) {
    setExpandedPart((prev) => (prev === name ? null : name));
  }

  // Build rows; insert the detail panel right after the expanded product.
  const rendered: React.ReactNode[] = [];
  for (const p of filtered) {
    const isExpanded = expandedPart === p.name;
    rendered.push(
      <button
        type="button"
        key={p.name}
        className={`cat-item ${isExpanded ? "expanded" : ""}`}
        onClick={() => handleExpand(p.name)}
        data-part={p.name}
      >
        <div className="cat-head">
          <span className="cat-name">{p.name}</span>
          <span className="cat-family">{p.family}</span>
        </div>
        <div className="cat-specs">
          <span>
            <strong>Center:</strong> {p.center}
          </span>
          <span>
            <strong>Type:</strong> {p.desc}
          </span>
        </div>
      </button>
    );
    if (isExpanded) {
      rendered.push(<ProductDetail key={`${p.name}-detail`} p={p} />);
    }
  }

  return (
    <div className="catalog-demo">
      <div className="catalog-toolbar">
        <input
          className="catalog-search"
          type="text"
          placeholder="Search by part number (e.g. 75EI, 2425EE, 50DU...)"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setExpandedPart(null);
          }}
        />
        {FAMILY_FILTERS.map((f) => (
          <button
            type="button"
            key={f.value}
            className={`catalog-filter ${activeFamily === f.value ? "active" : ""}`}
            onClick={() => handleFamily(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="catalog-grid">{rendered}</div>
    </div>
  );
}
