---
title: "feat: Wireframe of proposed empmags.com linked from brief hero"
status: completed
created: 2026-05-18
type: feat
depth: Standard
origin: docs/brainstorms/2026-05-18-empmags-wireframe-from-brief-requirements.md
---

# feat: Wireframe of proposed empmags.com linked from brief hero

## Summary

Add a static, mid-fi, multi-route wireframe of the proposed empmags.com under `/wireframe` to the existing design-brief site. Each major site section gets its own route, sharing a wireframe `layout.tsx` that supplies a section nav and a footer signaling the page is a wireframe. The brief's Cover hero gains a primary CTA that opens the wireframe in a new tab so reviewers see EMP's *Recommended* direction before answering the 14 questions. Visual treatment: existing font stack, a scoped wireframe palette (cool greys + one muted accent) gated by a `.wireframe` namespace so it cannot leak into the brief's styles.

---

## Problem Frame

The brief at `/` asks the EMP stakeholder to make 14 directional decisions about hero style, section order, RFQ shape, certification placement, and more — in the abstract. Without a visual referent, the stakeholder is rating *descriptions* of section layouts rather than judging the layouts themselves. The team risks back-and-forth after submission because the choices were made without seeing what they imply. A static wireframe of EMP's Recommended direction — opened in a parallel tab, navigable section-by-section — gives the reviewer a concrete mental model before they commit to answers, and survives a stakeholder reading the brief alone (see origin: `docs/brainstorms/2026-05-18-empmags-wireframe-from-brief-requirements.md`).

---

## Goals

- Reviewer can preview EMP's Recommended-direction wireframe in a new tab from the brief Cover (covers F1, R1, R2).
- Eleven section routes exist under `/wireframe/...`, each rendering its section in mid-fi sketch form using greybox placeholders, real headlines, and short sample copy (covers R3, R6, R8, R9).
- A shared wireframe header (in-wireframe nav + "Back to brief" link) and footer ("Wireframe — not final design — May 2026") appear on every wireframe route (covers R4, R5).
- Wireframe typography matches the brief's font stack; wireframe palette is visually distinct and scoped so it cannot bleed into the brief (covers R7, R8).
- All wireframe routes are responsive at the brief's existing breakpoints with no horizontal overflow at 375px; the in-wireframe nav remains usable on mobile (covers R10, R11).
- Wireframe content does not react to brief selections — content is committed to the Recommended direction for each question (covers R6, R9; AE5).

---

## Non-Goals

- No live coupling between brief answers and wireframe content. (Per origin Scope Boundaries.)
- No real photography, finished marketing copy, or final visual design. Explicitly mid-fi.
- No functional components inside the wireframe — no working search/filter, accordions, live forms, modals, or routing logic beyond Next.js page navigation.
- No analytics on wireframe routes beyond Vercel's defaults.
- No print/export, PDF generation, or annotated-share link.
- No changes to the brief's question content, submission flow, or storage.

---

## Key Technical Decisions

- **One route file per section, not a dynamic segment.** Each `app/wireframe/<section>/page.tsx` owns its sketch markup. Per-section sketches diverge sharply — the Catalog page is a grid + expanded part card with a spec-table sketch; the RFQ page is two form-field greybox blocks; the About page is a timeline. A single dynamic segment fed by a content config would either compress that variety into a lowest-common-denominator template (defeating the wireframe's purpose) or push all the variety into giant per-key conditional rendering. Per-route files keep each section's structure isolated and easy to iterate.
- **Shared chrome lives in `app/wireframe/layout.tsx`.** This is the Next.js App Router idiom. The layout renders the wireframe header (in-wireframe nav + "Back to brief" link), the page slot, and the wireframe footer. Pages remain bodies only.
- **Scoped wireframe CSS under a `.wireframe` namespace, appended to `app/globals.css`.** The wireframe palette and sketch primitives are scoped under a `.wireframe-root` class applied by `app/wireframe/layout.tsx`. This co-locates wireframe styles with the rest of the project's global CSS (the convention this codebase already uses — no Tailwind, no scoped CSS modules) while guaranteeing they cannot leak into the brief.
- **Palette: cool greys plus one muted slate accent**, distinct from the brief's amber/teal/blue. Variables: `--wf-paper: #F2F2F0`, `--wf-surface: #FFFFFF`, `--wf-ink: #2A2D33`, `--wf-ink-60: #6E7278`, `--wf-line: #C9CBCE`, `--wf-greybox: #D9DBDD`, `--wf-greybox-dark: #BFC2C5`, `--wf-accent: #5B6573` (cool slate). Greyboxes use dashed `--wf-line` borders so they read unambiguously as placeholders.
- **Mobile nav: horizontal-scroll chip strip.** R6 forbids interactive components (no JS state). The static-only patterns that work at 375px are: (a) a wrapping multi-row strip (consumes vertical space and looks cluttered with 11 items) or (b) a horizontal-scrolling chip strip (`overflow-x: auto`, `scroll-snap-type: x mandatory`, no JS). The chip strip is the lightest static-compatible pattern and signals "wireframe" appropriately.
- **CTA target=`_blank` with `rel="noopener noreferrer"`** in the Cover hero. Preserves the reviewer's in-progress brief state in the original tab and follows the security default for new-tab links.
- **No test runner introduced.** The repo currently has no Jest/Vitest/Playwright setup (verified by absence of test deps in `package.json` and the prior plan shipping without tests). Adding one solely for a static, no-state, no-fetch wireframe is YAGNI. Verification is route-renders-cleanly via `pnpm dev` plus a 375px viewport check.

---

## Output Structure

```
emp/
├── app/
│   ├── globals.css                                  # +scoped .wireframe-root block
│   └── wireframe/
│       ├── layout.tsx                               # Wireframe shell (nav + footer)
│       ├── page.tsx                                 # Home
│       ├── industries/page.tsx
│       ├── catalog/page.tsx                         # Catalog + inline Part Detail sketch
│       ├── capabilities/page.tsx
│       ├── certifications/page.tsx
│       ├── prototype-short-run/page.tsx
│       ├── rfq/page.tsx
│       ├── about/page.tsx
│       ├── tape-wound-cores/page.tsx
│       ├── resources/page.tsx
│       └── contact/page.tsx
├── components/
│   ├── brief/
│   │   └── Cover.tsx                                # +primary CTA to /wireframe
│   └── wireframe/
│       ├── WireframeHeader.tsx                      # Used by layout.tsx
│       ├── WireframeFooter.tsx                      # Used by layout.tsx
│       └── primitives.tsx                           # Greybox, SketchCard, SketchHeading, FormFieldBox
```

The tree shows the expected output shape. Per-unit `Files:` sections remain authoritative.

---

## High-Level Technical Design

The wireframe sits as a sibling route group to the brief. It shares the root `app/layout.tsx` (fonts, html shell) but adds its own `app/wireframe/layout.tsx` that wraps every wireframe page in a `<div class="wireframe-root">` so the scoped palette and sketch primitives apply.

```
app/layout.tsx                  (root: <html>, fonts, metadata)
└── app/wireframe/layout.tsx    (wraps children in .wireframe-root, renders <WireframeHeader/> + slot + <WireframeFooter/>)
    ├── /wireframe              (Home)
    ├── /wireframe/industries
    ├── /wireframe/catalog      (renders catalog grid + one inline-expanded Part Detail sketch)
    └── ... 8 other sections
```

Sketch primitives (`<Greybox aspect="..." label="..."/>`, `<SketchCard/>`, `<SketchHeading kicker label/>`, `<FormFieldBox label/>`) are thin presentational components. They exist so per-section pages stay readable and so the wireframe vocabulary is consistent across sections. They are directional — implementation may inline simple greyboxes when a primitive adds no clarity.

This illustrates the intended approach and is directional guidance for review, not implementation specification.

---

## Implementation Units

### U1. Wireframe shell — layout, palette, nav, footer, sketch primitives

**Goal:** Establish the wireframe's shared scaffolding: scoped CSS, layout file with header+footer, and the small set of sketch primitives that the per-section pages will compose.

**Requirements:** R3 (route lives under `/wireframe`), R4 (shared header with in-wireframe nav + "Back to brief"), R5 (shared footer with wireframe label + date), R7 (font stack inherited from root layout), R8 (mid-fi palette distinct from brief), R10 (mobile-first; no horizontal overflow at 375px), R11 (mobile nav usable).

**Dependencies:** none.

**Files:**
- `app/wireframe/layout.tsx` (create)
- `components/wireframe/WireframeHeader.tsx` (create)
- `components/wireframe/WireframeFooter.tsx` (create)
- `components/wireframe/primitives.tsx` (create — exports `Greybox`, `SketchCard`, `SketchHeading`, `FormFieldBox`)
- `app/globals.css` (modify — append a `.wireframe-root { ... }` scoped block with palette CSS variables and sketch class names)

**Approach:**
- `app/wireframe/layout.tsx` is a Server Component that returns `<div className="wireframe-root"><WireframeHeader/>{children}<WireframeFooter/></div>`. It inherits `<html>` + fonts from the root `app/layout.tsx` — no new font wiring needed (R7).
- `WireframeHeader.tsx` renders the section nav as an `<ol>` of `<Link>` chips inside a horizontally-scrolling container plus a separate "Back to brief" `<Link href="/">`. Nav items: Home (`/wireframe`), Industries, Catalog, Capabilities, Certifications, Prototype & Short Run, RFQ, About, Tape Wound Cores, Resources, Contact.
- `WireframeFooter.tsx` renders a small label: "Wireframe — not final design — May 2026" plus a "Back to brief" link.
- `primitives.tsx`: pure presentational components. `<Greybox aspect="16 / 9" label="Hero image"/>` renders a dashed-border box with a centered mono-font label; `<SketchCard>` is a soft-bordered container with a header slot and body slot; `<SketchHeading kicker="..." label="..."/>` renders the consistent kicker+heading shape used across sections; `<FormFieldBox label="Material type"/>` renders a faux input with a label and a greybox slab.
- `globals.css`: scope everything under `.wireframe-root` and use the palette variables listed in Key Technical Decisions. Reset link styling under the namespace. Add a `.wireframe-nav { overflow-x: auto; scroll-snap-type: x mandatory; }` rule for the chip strip. Add a responsive rule for `<= 700px` mirroring the brief's existing breakpoint so per-section grids collapse to a single column.

**Patterns to follow:** Match `app/globals.css` for variable-driven palette and `@media (max-width: 700px)` breakpoint convention. Mirror the existing component file shape used in `components/brief/*.tsx` (named export, no default export).

**Technical design:**

```
.wireframe-root {
  --wf-paper: #F2F2F0;
  --wf-surface: #FFFFFF;
  --wf-ink: #2A2D33;
  --wf-ink-60: #6E7278;
  --wf-line: #C9CBCE;
  --wf-greybox: #D9DBDD;
  --wf-greybox-dark: #BFC2C5;
  --wf-accent: #5B6573;
  background: var(--wf-paper);
  color: var(--wf-ink);
  min-height: 100vh;
}
.wireframe-root .wf-greybox {
  border: 1px dashed var(--wf-line);
  background: var(--wf-greybox);
  /* centered mono label */
}
```

Directional only — exact selectors and rules to be refined during implementation.

**Test scenarios:** Test expectation: none — repo has no test runner; this unit introduces a scoped CSS namespace and presentational components with no behavioral logic. Verification is visual at the dev server.

**Verification:**
- `/wireframe` returns 200 with the new layout's header and footer visible.
- Brief route `/` renders unchanged — no visible style regression in the brief Cover, question cards, or summary section.
- At 375px viewport, the wireframe nav chips scroll horizontally without forcing the page to overflow horizontally.

---

### U2. Cover CTA → wireframe entrypoint

**Goal:** Add a primary CTA to the brief Cover linking to `/wireframe` in a new tab.

**Requirements:** R1 (Cover renders wireframe CTA), R2 (new-tab target preserves brief state). Covers AE1.

**Dependencies:** U1 (`/wireframe` must exist before the CTA is meaningful, though wiring the CTA before U1 lands is fine if work is sequenced via PR rather than commit; in commit order, U1 first).

**Files:**
- `components/brief/Cover.tsx` (modify)
- `app/globals.css` (modify — add `.cover-cta` rule consistent with the existing `.submit-btn` amber primary button)

**Approach:**
- Add a `<Link href="/wireframe" target="_blank" rel="noopener noreferrer" className="cover-cta">Preview the proposed empmags.com →</Link>` element between `.cover-sub` and `.cover-meta` in `Cover.tsx`. Use `next/link` (mirrors the rest of the app).
- Style `.cover-cta` as an amber primary button matching the brief's existing CTA voice (uses `var(--amber)` already in `globals.css`). Include focus/hover states.
- Microcopy: "Preview the proposed empmags.com →" (the arrow signals new-tab navigation without an icon dependency).

**Patterns to follow:** Existing `.submit-btn` rule in `app/globals.css` is the closest visual analog — re-use the same padding/radius/typography ratios.

**Test scenarios:** Test expectation: none — repo has no test runner; behavior is a single link with static attributes. Verification is manual.

**Verification:**
- Loading `/` shows the CTA in the Cover, visually consistent with the existing typography and amber palette.
- Clicking the CTA opens `/wireframe` in a new tab; the original tab retains any in-progress answer selections (AE1).
- The link is keyboard-focusable and shows a visible focus state.

---

### U3. Home — `/wireframe`

**Goal:** Sketch the homepage reflecting EMP's Recommended directions across the relevant homepage-touching questions.

**Requirements:** R3, R6, R7, R8, R9, R10. Covers AE4 (text-only hero, not video or photo).

**Dependencies:** U1.

**Files:**
- `app/wireframe/page.tsx` (create)

**Approach:**
- Compose the page from primitives in this stacked order, each as a `<section>`:
  1. **Hero (Q1 Recommended — text-only):** large `<SketchHeading kicker="ELECTRO MAGNETIC PRODUCTS" label="Precision laminations for aerospace, defense, and high-reliability motors."/>` + sample subhead + a sketch "Request a Quote" button block. No imagery placeholder — committing to the text-only direction is the AE4 signal.
  2. **Certification trust strip (Q6 Recommended — homepage trust bar):** a horizontal row of 5 greybox cert-logo placeholders labeled "NADCAP", "MIL-45208A", "MIL-Q-9858A", "MIL-STD-45662", "ASTM-346-64".
  3. **Industries teaser (Q2 Recommended — dedicated pages, teased on home):** 5 sketch cards (Aerospace, Defense, Telecom, Motors/Generators, Industrial) each linking conceptually to its industry page.
  4. **Capabilities teaser (Q5 Recommended — process flow):** a short horizontal flow strip (Slitting → Stamping → Annealing → Assembly → Shipping) as small greybox tiles linked by chevrons.
  5. **Catalog teaser (Q3 Recommended):** a small grid of sample part-number cards (e.g., "75EI", "112EE", "150DU") with "See full catalog →" sketch link.
  6. **Prototype & Short Run callout (Q8 Recommended — featured):** a single banner-sized SketchCard with sample copy and CTA.
  7. **About-stat strip (Q10 — trust-signal foreshadow):** small row showing "Founded 1966", "Moorestown, NJ", "60 years of operation".
  8. **Footer CTA region:** "Request a Quote" + "Contact" sketch buttons.
- Headlines are real sample copy in EMP's voice ("Precision laminations for aerospace, defense, and high-reliability motors."); body text is short and placeholder-flavored.

**Patterns to follow:** Reuse the section spacing and max-width rhythm from `.section` in `app/globals.css` (60px vertical padding, 960px max-width) but with the wireframe palette so it visually reads as a wireframe.

**Test scenarios:** Test expectation: none — static content page with no behavior. Verification is visual.

**Verification:**
- `/wireframe` renders the text-led hero with no photo or video placeholder in the hero band (AE4).
- All sections appear in the listed order; the page is scrollable end-to-end with no horizontal overflow at 375px (AE3).
- Wireframe nav header and footer are visible per U1 (AE2 transitive).

---

### U4. Catalog + inline Part Detail — `/wireframe/catalog`

**Goal:** Sketch the Recommended interactive-catalog direction (Q3) with the inline Part Detail (Q4 Recommended) shown as one expanded card within the grid.

**Requirements:** R3, R6, R7, R8, R9, R10.

**Dependencies:** U1.

**Files:**
- `app/wireframe/catalog/page.tsx` (create)

**Approach:**
- Top of page: section heading + sample lead copy describing the catalog ("80+ standard part numbers across EI, EE, L, DU/U, LE, UI, F, FB, FG, FM families").
- Toolbar sketch: a non-functional search-input greybox with a magnifier glyph + a row of family-filter chip greyboxes ("All", "EI", "EE", "L", "DU/U", "LE", "UI"). No interactivity — these are static visual sketches.
- Grid of `<SketchCard>` items showing sample part numbers ("75EI", "100EI", "112EE", "150DU", "200L", "75LE") with a `<cat-family>`-style family tag and a few greyboxed dimension lines.
- Inline expanded Part Detail (Q4 Recommended) shown beneath one of the cards, spanning the full grid width: split into a left column with a dimensional-drawing `<Greybox aspect="4 / 3" label="Dimensional drawing — 75EI"/>` and a right column with a sketch spec table (3-column rows: dimension name / nominal / tolerance). Below the split, a row of two button sketches: "Request Quote for this Part" (primary) and "Download PDF" (secondary).
- Mobile (`<= 700px`): grid collapses to one column; the split inside the expanded detail stacks vertically.

**Patterns to follow:** Visual rhythm of `.catalog-demo` / `.catalog-grid` / `.cat-detail-inner` in `app/globals.css` is the right shape — the wireframe version is the same skeleton with the scoped palette and greyboxes in place of real data.

**Test scenarios:** Test expectation: none — static sketch. Verification is visual.

**Verification:**
- `/wireframe/catalog` renders the toolbar, grid, and one expanded Part Detail card without errors.
- At 375px, the grid is single-column, the expanded detail's drawing+spec split stacks, and no element causes horizontal overflow (AE3).

---

### U5. Narrative content pages — Industries, About, Tape Wound Cores

**Goal:** Sketch three section pages that share a narrative content shape (hero → 2-3 content blocks → CTA), reflecting Q2, Q10, and Q11 Recommended directions.

**Requirements:** R3, R6, R7, R8, R9, R10. Covers AE2 (Industries route exists and shares the nav).

**Dependencies:** U1.

**Files:**
- `app/wireframe/industries/page.tsx` (create)
- `app/wireframe/about/page.tsx` (create)
- `app/wireframe/tape-wound-cores/page.tsx` (create)

**Approach:**
- **Industries (`/wireframe/industries`):** Hero with kicker + headline. Below: a vertical list of 5 SketchCards, one per industry (Aerospace, Defense, Telecom, Motors/Generators, Industrial). Each card has a small greybox icon slot, the industry name, a 1-2 sentence sample description, and a "View industry detail →" sketch link. Reflects Q2 Recommended (dedicated pages per industry — this page is the index; the per-industry pages themselves are deferred).
- **About (`/wireframe/about`):** Hero "Sixty years of precision laminations." Below: a horizontal sketch timeline (1966 founding → 1980s expansion → 2000s certifications → 2026 today) as a strip of greyboxed milestone tiles. Below the timeline: a leadership block (2-3 greyboxed headshot placeholders with name+title sketch). Below leadership: a facility-overview SketchCard with a wide greybox image placeholder. Reflects Q10 Recommended (full About: history timeline, leadership, facility).
- **Tape Wound Cores (`/wireframe/tape-wound-cores`):** Hero noting that tape wound cores are a distinct product line. Below: a 2x3 sketch gallery of greyboxed toroidal-core placeholders with sample size labels. Below the gallery: a small sketch spec table for single vs. three-phase cores. Below the table: a "Tape Cores Inquiry" sketch form block (3-4 FormFieldBoxes) clearly distinct from the main RFQ. Reflects Q11 Recommended (dedicated page with gallery + separate RFQ).

**Patterns to follow:** Section rhythm and 960px max-width from `.section` in `app/globals.css`, ported to the wireframe palette.

**Test scenarios:** Test expectation: none — static sketches. Verification is visual.

**Verification:**
- Each of `/wireframe/industries`, `/wireframe/about`, `/wireframe/tape-wound-cores` renders cleanly with the shared header and footer (AE2).
- From `/wireframe/industries`, clicking the "Capabilities" item in the wireframe nav routes to `/wireframe/capabilities` and the nav remains visible at the top (AE2).
- At 375px, multi-column grids on each page collapse to a single column with no horizontal overflow (AE3).

---

### U6. Process / featured-service pages — Capabilities, Prototype & Short Run

**Goal:** Sketch the two pages that share a "featured workflow" shape, reflecting Q5 (process flow) and Q8 (featured prototype page) Recommended directions.

**Requirements:** R3, R6, R7, R8, R9, R10.

**Dependencies:** U1.

**Files:**
- `app/wireframe/capabilities/page.tsx` (create)
- `app/wireframe/prototype-short-run/page.tsx` (create)

**Approach:**
- **Capabilities (`/wireframe/capabilities`):** Hero kicker + headline ("How we make a lamination, end to end."). Below: a vertical process-flow stack of 8 sketch steps (Stamping → Annealing → Slitting → Coating → QC → Tooling → Shipping → Value-Added Services), each as a numbered SketchCard with a small greybox visual slot and a 2-3 line sample description. Connect adjacent steps visually with a thin `--wf-line` rule or chevron. Reflects Q5 Recommended (connected production pipeline; each step expands to reveal full detail — in the wireframe, each step's "full detail" is rendered inline as the SketchCard body).
- **Prototype & Short Run (`/wireframe/prototype-short-run`):** Hero kicker "Quick-turn prototypes." + headline. Below: a 4-up grid of value-prop SketchCards ("Quick quote", "Short lead time", "Low-cost tooling", "Material availability"). Below: a dedicated CTA region with a sketch RFQ form (4-5 FormFieldBoxes) labeled "Prototype RFQ" — reflects Q8 Recommended (featured page with separate CTA and RFQ form).

**Patterns to follow:** Numbered list rhythm — borrow visual cues from the brief's `.q-num` badge for step numbering, adapted to the wireframe palette.

**Test scenarios:** Test expectation: none — static sketches. Verification is visual.

**Verification:**
- Both routes render cleanly with shared header and footer.
- Process-flow steps stack readably at 375px (no chevron overflow) (AE3).

---

### U7. Reference & downloads pages — Certifications, Resources

**Goal:** Sketch the two pages that share a "list of downloadable items + brief lead copy" shape, reflecting Q6 (dedicated Certifications page) and Q12 (resources/downloads only, no blog) Recommended directions.

**Requirements:** R3, R6, R7, R8, R9, R10.

**Dependencies:** U1.

**Files:**
- `app/wireframe/certifications/page.tsx` (create)
- `app/wireframe/resources/page.tsx` (create)

**Approach:**
- **Certifications (`/wireframe/certifications`):** Hero "Certifications and quality standards." Below: a vertical list of 5 SketchCard rows, one per certification (NADCAP, MIL-45208A, MIL-Q-9858A, MIL-STD-45662, ASTM-346-64), each with a greybox cert-logo slot, the cert name + 1-line description sketch, and a sketch "Download certificate (PDF)" link. Reflects Q6 Recommended (dedicated page + downloadable PDFs). The homepage trust-bar partner-version of this lives in U3.
- **Resources (`/wireframe/resources`):** Hero "Technical resources and downloads." Below: 2-3 grouped lists — "Charts" (cross-reference chart, weight chart, material chart), "Materials" (Permeability 49, Hy Mu 80, Hipernom 80), "Product groups" — each group rendered as a SketchCard with a download-link row per item. Reflects Q12 Recommended (resources/downloads page, no blog).

**Patterns to follow:** Mirror the visual treatment of `.summary-grid` / `.sum-item` in `app/globals.css` for the row-of-downloadable-items shape, ported to the wireframe palette.

**Test scenarios:** Test expectation: none — static sketches. Verification is visual.

**Verification:**
- Both routes render cleanly with shared header and footer.
- Lists collapse to single column at 375px (AE3).

---

### U8. Form pages — RFQ, Contact

**Goal:** Sketch the two pages that share a "form + supporting info" shape, reflecting Q9 (two forms: contact + detailed RFQ) and Q13 (full contact: map + form + named contacts) Recommended directions.

**Requirements:** R3, R6, R7, R8, R9, R10.

**Dependencies:** U1.

**Files:**
- `app/wireframe/rfq/page.tsx` (create)
- `app/wireframe/contact/page.tsx` (create)

**Approach:**
- **RFQ (`/wireframe/rfq`):** Hero "Request a quote." Below: two side-by-side sketch form blocks (single column at mobile):
  - **Left, "General inquiry":** 3 FormFieldBoxes (Name, Email, Message-as-textarea greybox) + Submit sketch button.
  - **Right, "Detailed RFQ":** 6-7 FormFieldBoxes (Company, Email, Material type, Part dimensions, Quantity, Target lead time) + a distinct "Drawing file upload" sketch zone (dashed-border greybox) + Submit sketch button.
  Reflects Q9 Recommended (two separate forms).
- **Contact (`/wireframe/contact`):** Hero "Contact us." Below: a 2-column layout (single column at mobile):
  - **Left:** a wide greybox map placeholder labeled "Map — 1115 East Main Street, Moorestown, NJ" + a phone/fax/address block in mono type.
  - **Right:** a sketch contact form (4 FormFieldBoxes + Submit button) + a "Named contacts" SketchCard listing 3 placeholder rows (Name / Title / Email) for President-CEO, Sales Manager, and General Inquiries.
  Reflects Q13 Recommended (embedded map + form + phone + named contacts).

**Patterns to follow:** Use `<FormFieldBox/>` from `components/wireframe/primitives.tsx` (U1) for every field — uniformity reinforces the wireframe vocabulary.

**Test scenarios:** Test expectation: none — static sketches; no `<form>` submission, fields are non-interactive. Verification is visual.

**Verification:**
- Both routes render cleanly with shared header and footer.
- Two-column layouts on each page collapse to single column at 375px with no horizontal overflow (AE3).
- AE5: a deliberate cross-tab check — change an answer in the brief (`/`), reload `/wireframe/rfq`, confirm the RFQ sketch content is unchanged (it is static and reads no brief state).

---

## System-Wide Impact

- **Brief route (`/`):** one additive change to the Cover component (CTA link). No change to the brief's logic, state, or styles outside the new `.cover-cta` rule.
- **Global CSS (`app/globals.css`):** appended `.wireframe-root` scoped block. All wireframe rules are guarded by the namespace so no existing brief selector matches the new content — the brief page does not get a `.wireframe-root` ancestor.
- **Routing:** new `/wireframe/*` paths. No middleware involvement. No effect on `/api/submissions` or any other existing route.
- **Fonts and metadata:** inherited from the root `app/layout.tsx` — no new font loads.
- **Build size:** 11 new static pages with no client components, no fetch, no data dependencies. Negligible bundle and runtime cost.
- **Deployment:** static-only addition; no environment variables, no Vercel project configuration change required.

---

## Risk Analysis & Mitigation

- **Wireframe palette bleeds into the brief.** Mitigation: every wireframe rule is namespaced under `.wireframe-root`, applied only by `app/wireframe/layout.tsx`. Verify by visually inspecting the brief at `/` after each unit lands.
- **Mobile nav chips feel awkward.** With 11 items, even a horizontal scroll strip is noticeable at 375px. Mitigation: a scroll-snap configuration + a visual edge-fade hint signals scrollability. If reviewers report it as confusing in practice, escalate to a wrapping multi-row strip as a follow-up.
- **Wireframe is mistaken for a finished design.** Mitigation: dashed borders on every greybox, a cool-grey palette markedly different from the brief's amber/teal/blue, the persistent footer "Wireframe — not final design — May 2026", and explicit kickers ("DRAFT WIREFRAME") on the Home hero.
- **Sample copy reads as marketing-final.** Mitigation: keep sample copy short and explicit ("Precision laminations for aerospace, defense, and high-reliability motors." is fine; do not embed paragraph-length finished narratives). Reviewers should feel they are reading a sketch.

---

## Dependencies / Assumptions

- The `Recommended` tag in `components/brief/questions-data.tsx` is canonical at the time of writing. If product opinion shifts later, the wireframe content shifts with it — a content edit, not a structural change.
- The wireframe CSS namespace can co-exist in `app/globals.css` without restructuring the file. The existing file already uses CSS variables on `:root` with no scoping conflict.
- No new external dependencies. `next/link`, `next/font/google`, and the existing React/Next.js install are sufficient.
- The repo has no test runner today; this plan does not add one. If a future plan introduces Vitest or Playwright, the wireframe routes can be exercised with smoke tests at that point.

---

## Outstanding Questions

### Deferred to Implementation

- Exact `aspect` ratios for individual greyboxes per section — refine while sketching each page; whatever reads cleanest at 375px and at desktop.
- Whether the homepage trust-strip uses the same greybox sizing as the Certifications page's cert rows — easier to tune once both are visible side-by-side.
- The precise wording of sample headlines per section. Plan commits to voice ("EMP, precision laminations") but exact copy refinement happens during the sketch pass.
- Whether the wireframe nav chips need explicit edge-fade visual affordance (linear gradient on the scroll container) — try without first; add only if user testing shows the scrollability is missed.

### Deferred to Follow-Up Work

- Per-industry detail pages (`/wireframe/industries/aerospace`, etc.) — Q2 Recommended is "dedicated page for each industry"; this plan ships the index only.
- Per-part-number detail pages — Q4 Best-for-SEO is an alternative ("dedicated page per part"); this plan reflects only the Recommended (inline-expansion) direction.
- Live coupling between brief answers and wireframe variants — explicitly out of scope per origin Scope Boundaries.
- A working RFQ form, search/filter, or accordion behavior — wireframe is explicitly mid-fi and static.
- Real photography and finished copy — not part of this plan.
