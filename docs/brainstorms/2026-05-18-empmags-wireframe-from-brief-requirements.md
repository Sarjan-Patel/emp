---
date: 2026-05-18
topic: empmags-wireframe-from-brief
---

# Wireframe of proposed empmags.com, linked from brief hero

## Summary

Add a static, multi-route wireframe of the proposed empmags.com to the design-brief site. Each major site section gets its own route under `/wireframe`, sharing a common nav header and footer. The brief's Cover hero gains a CTA linking to the wireframe so reviewers can see EMP's proposed direction before answering the 14 questions.

---

## Problem Frame

The brief currently asks the EMP stakeholder to make 14 directional decisions (hero style, section order, RFQ shape, certification placement, etc.) in the abstract. Without a visual referent, the stakeholder is rating *descriptions* of section layouts rather than judging the layouts themselves. The team risks back-and-forth after submission because the choices were made without seeing what they imply — and today the only way to communicate the proposed shape is to walk through it on a call, which doesn't survive a stakeholder reading the brief alone.

---

## Key Flows

- F1. Reviewer previews the wireframe from the brief
  - **Trigger:** Reviewer lands on the brief at `/`.
  - **Actors:** EMP stakeholder reviewing the brief.
  - **Steps:** Sees the Cover hero with a CTA to view the proposed wireframe. Clicks the CTA — the wireframe opens in a new tab at the wireframe home. Navigates between section routes using the in-wireframe nav. Switches back to the brief tab to answer questions with a clearer mental model.
  - **Outcome:** Reviewer has formed a visual mental model of EMP's proposal before recording answers; brief tab retains any in-progress selections.
  - **Covered by:** R1, R2, R3, R4, R9, R10.

---

## Requirements

**Entrypoint from the brief**
- R1. The Cover hero (`components/brief/Cover.tsx`) renders a CTA that links to the wireframe home route.
- R2. The CTA opens the wireframe in a new browser tab so the reviewer's brief state is preserved.

**Wireframe routes and shared chrome**
- R3. The wireframe lives under a top-level `/wireframe` path with one route per site section. The section set: Home, Industries, Catalog (with an inline Part Detail sketch), Capabilities, Certifications, Prototype & Short Run, RFQ, About, Tape Wound Cores, Resources, Contact.
- R4. All wireframe routes share a common header containing an in-wireframe nav linking between sections, plus a "Back to brief" link.
- R5. All wireframe routes share a common footer that visually signals the page is a wireframe (e.g., a small "Wireframe — not final design" label with the date).
- R6. The wireframe is static — no fetch, no interactive components, no persisted state.

**Visual treatment**
- R7. Wireframe pages use the brief's existing font stack (`Fraunces`, `DM Sans`, `JetBrains Mono`) so typography is consistent with the brief.
- R8. Section content is rendered as mid-fi sketch: greybox placeholders for imagery and logos, real headlines and short sample copy, neutral palette distinct from the brief's accent colors so the page reads unmistakably as a wireframe.
- R9. Each section's content reflects EMP's *Recommended* direction from the corresponding brief question — one committed direction per section, not a variant explorer.

**Responsiveness**
- R10. Wireframe routes are responsive at the same breakpoints the brief already supports — mobile-first layout, header collapses gracefully, no horizontal overflow at 375px viewport width.
- R11. The wireframe nav remains usable on mobile (the specific mechanism — wrapping strip, dropdown, or drawer — is a planning decision).

---

## Acceptance Examples

- AE1. **Covers R1, R2.** Given the brief is open in a single tab, when the reviewer clicks the wireframe CTA in the Cover, a new tab opens at `/wireframe` and the original brief tab keeps any in-progress answers.
- AE2. **Covers R4.** Given a reviewer is on `/wireframe/industries`, when they click the "Capabilities" item in the wireframe nav, the route changes to `/wireframe/capabilities` and the nav remains visible at the top of the new page.
- AE3. **Covers R10, R11.** Given the wireframe is viewed at 375px width, when the reviewer scrolls any section route, all content remains within the viewport with no horizontal scrollbar and the nav remains operable.
- AE4. **Covers R9.** Given the Recommended answer for Q1 is the text-only hero, when the reviewer opens `/wireframe`, the home page shows a text-led hero (headline + CTA), not a video or photo hero.
- AE5. **Covers R6, R9.** Given a reviewer changes any answer in the brief tab, when they reload the wireframe tab, the wireframe content does not change in response to the brief selection.

---

## Success Criteria

- A stakeholder unfamiliar with the brief can open `/wireframe` and articulate what the proposed site does without reading the brief first.
- Stakeholders return submitted briefs faster and with fewer follow-up questions about what each option visually means.
- The next downstream agent (planning) can implement this without inventing section structure or content shape — every required section is named and every required behavior is observable.

---

## Scope Boundaries

- The wireframe is static — it does not react to brief selections. Reviewers who pick non-Recommended answers will not see those reflected.
- No real photography, finished marketing copy, or final visual design — explicitly mid-fi.
- No functional components inside the wireframe (no working search, filters, accordions, or live forms).
- No analytics on the wireframe routes beyond what Vercel provides by default.
- No print/export, PDF generation, or shareable annotated link beyond the route URL itself.
- No changes to the brief's question content, submission flow, or storage as part of this work.

---

## Key Decisions

- **Static, not live-coupled to answers.** A live preview would multiply the design surface (every option × every section variant) and tightly couple `components/brief/questions-data.tsx` to wireframe content. The static "Recommended direction" version delivers most of the value at a fraction of the cost; variant exploration can be added later if reviewers ask for it.
- **Multi-page routes, not one long scroll.** Each section is a separate route so the wireframe IA mirrors how the real site will be organized — reviewers experience navigation, not a one-page brochure.
- **Match brief typography, distinct palette.** Reusing fonts keeps the wireframe visually coherent with the brief; the neutral palette + greyboxes prevent reviewers from mistaking it for a finished design.
- **Primary button CTA in the hero, new-tab target.** Discoverability plus state preservation — the reviewer can flip back to the brief without losing scroll position or any in-progress selection.

---

## Dependencies / Assumptions

- Assumes the `Recommended` tag in `components/brief/questions-data.tsx` is treated as canonical for each question. If product opinion shifts later, the wireframe content shifts with it (a content edit, not a structural one).
- Assumes wireframe styling can co-exist in `app/globals.css` (or a scoped file) without conflicting with the brief's existing styles — to be validated during planning.
- No new external dependencies are expected beyond what Next.js + `next/font/google` already provide.

---

## Outstanding Questions

### Deferred to Planning

- [Affects R3][Technical] Whether each wireframe route is its own file under `app/wireframe/<section>/page.tsx` or a single dynamic segment with shared data — both work; the call depends on how varied the per-section sketches end up being.
- [Affects R4, R5][Technical] Whether the shared header and footer use a Next.js `app/wireframe/layout.tsx` or a top-level component composed by each page — layout file is the obvious default; flag during planning if there's a reason to deviate.
- [Affects R8][Needs research] What specific palette best signals "wireframe" without clashing with the brief's accent colors — likely cool greys plus a single muted accent, but worth a small spike with two or three options.
- [Affects R11][Technical] The specific mobile nav pattern (wrapping strip vs. dropdown vs. drawer) — pick the lightest pattern that works at 375px.
