---
title: "feat: EMP design-brief site in Next.js with selection recording"
status: active
created: 2026-05-18
type: feat
depth: Standard
---

# feat: EMP design-brief site in Next.js with selection recording

## Summary

Port the existing single-file HTML design brief for Electro Magnetic Products (the 14-question questionnaire + competitor table + interactive product catalog + selection summary) into a Next.js App Router project. Add a server endpoint that durably records every submission as a JSON object in Vercel Blob storage. Preserve the existing visual design 1:1 — only the implementation moves from inline DOM scripting to React state.

## Problem Frame

The current artifact is a single static HTML file. It collects user selections in browser memory only — close the tab and the answers are gone. The team needs:

1. A real deployable site (Next.js on Vercel).
2. Durable capture of every visitor's answers, not just a "Print to PDF" affordance.
3. A clean, maintainable codebase to extend later (industries pages, RFQ flow, real catalog, etc.).

## Goals

- Convert the HTML into a Next.js App Router app with no visual regressions.
- Replace the inline `onclick` scripting with proper React state.
- Persist every submission server-side via Vercel Blob, keyed by submission id and timestamp.
- Keep the existing "Print / Save as PDF" affordance intact.
- Deployable to Vercel with zero custom infrastructure.

## Non-Goals

- No admin UI to view submissions. (Out of scope per scoping discussion — submissions are read directly from Vercel Blob storage when needed.)
- No email delivery of submissions.
- No authentication or user accounts.
- No CMS or content-editing UI for the questions themselves.
- No redesign — visual fidelity is faithful 1:1 port.

## Key Technical Decisions

- **Next.js App Router**, TypeScript, Node.js runtime. App Router is the current Next.js default and matches Vercel's recommendations for new projects.
- **Vercel Blob** as durable storage (per user decision). Each submission writes one JSON object under a `submissions/` prefix with a generated id + ISO timestamp in the key. Reads happen offline via the Vercel dashboard or `@vercel/blob` SDK when the team needs to export.
- **Faithful HTML port**: keep the existing CSS verbatim in `app/globals.css`. No Tailwind, no shadcn/ui — adding either would force restyling and break the 1:1 promise. The original CSS already covers responsive behavior.
- **React state, not DOM manipulation**: replace the inline `onclick` / `getElementById` patterns with `useState`. Each question component owns its selection; a parent `BriefPage` holds the full answers map.
- **One server action / route handler** at `app/api/submissions/route.ts` that validates the payload and writes to Blob. POST-only, JSON body.
- **No client-side ID generation for submissions**. The server generates `crypto.randomUUID()` and returns it so the client can show a confirmation.
- **Fonts via `next/font/google`** for `Fraunces`, `DM Sans`, `JetBrains Mono` — matches the existing `<link>` tags and gets CLS-safe loading for free.
- **`vercel.ts`** for project config (per Vercel 2026 guidance). Minimal — framework + Node runtime.

## Output Structure

```
emp/
├── app/
│   ├── layout.tsx              # HTML shell, font loading, metadata
│   ├── page.tsx                # Brief page composition
│   ├── globals.css             # Verbatim CSS from the source HTML
│   └── api/
│       └── submissions/
│           └── route.ts        # POST handler → Vercel Blob
├── components/
│   ├── brief/
│   │   ├── ProgressBar.tsx
│   │   ├── TopBar.tsx
│   │   ├── Cover.tsx
│   │   ├── CompetitorTable.tsx
│   │   ├── QuestionCard.tsx    # Accordion w/ single-select options
│   │   ├── MultiQuestionCard.tsx
│   │   ├── ProductCatalog.tsx  # Search + family filter + inline detail
│   │   ├── SummarySection.tsx  # Live answer summary + Submit + Print
│   │   └── questions-data.ts   # Question/option content
│   └── catalog/
│       └── products-data.ts    # 75-item product list
├── lib/
│   ├── blob.ts                 # Thin wrapper around @vercel/blob put()
│   └── types.ts                # Submission, Answer, Product types
├── public/
│   └── favicon.ico
├── vercel.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

The tree is a scope declaration. The implementer may adjust if a cleaner layout emerges, but per-unit `**Files:**` sections are authoritative.

---

## Implementation Units

### U1. Scaffold Next.js project

**Goal:** Get a runnable empty Next.js App Router project on disk with TypeScript, the right runtime, and the chosen fonts wired into a root layout.

**Dependencies:** none.

**Files:**
- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `vercel.ts`
- `app/layout.tsx`
- `app/page.tsx` (placeholder)
- `app/globals.css` (paste verbatim from source HTML's `<style>` block; strip the `:root` variable typo `--ff-mono: 'JetBrains no'` → `'JetBrains Mono'`)
- `.gitignore`
- `README.md`

**Approach:**
- `pnpm create next-app@latest` (App Router, TypeScript, no Tailwind, no ESLint defaults override).
- Set `experimental.typedRoutes` if available; otherwise vanilla config.
- Configure `next/font/google` in `app/layout.tsx` for `Fraunces`, `DM Sans`, `JetBrains Mono`. Expose them as CSS variables (`--ff-display`, `--ff-body`, `--ff-mono`) so the verbatim CSS keeps working without changes.
- `vercel.ts` exports a minimal `VercelConfig` with `framework: 'nextjs'`.
- `app/page.tsx` renders a single "Brief page goes here" placeholder so `next dev` boots cleanly.

**Patterns to follow:** Next.js App Router defaults; Vercel `vercel.ts` config format (see session-context Vercel knowledge update).

**Test scenarios:** none — pure scaffold. Verified by U6.

**Verification:** `pnpm dev` boots without errors; placeholder page renders at `/`; no console errors; fonts load (DevTools Network).

---

### U2. Static layout shell, cover, and competitor table

**Goal:** Render the non-interactive page structure: progress bar, top bar, cover hero, and the competitive landscape table. All visuals must match the source HTML.

**Dependencies:** U1.

**Files:**
- `app/page.tsx` (compose the page)
- `components/brief/ProgressBar.tsx`
- `components/brief/TopBar.tsx`
- `components/brief/Cover.tsx`
- `components/brief/CompetitorTable.tsx`

**Approach:**
- These are dumb presentational components. Keep them as Server Components — no client state.
- The progress bar fill (`width: X%`) becomes a prop; default `0`. It will be wired by U5.
- The top bar counter (`0 of 14 answered`) takes `answered` / `total` props with default placeholders.
- Competitor table content is verbatim from source. Hardcode the table rows in JSX — no data file needed (single-use content).
- Preserve the source HTML's CSS class names so `globals.css` continues to drive styling untouched.
- Fix the malformed rows in the source HTML (e.g., the broken `<td>ty</strong></td>` row should clearly render as the "Quality / Certifications" row — restore that label).

**Patterns to follow:** Standard React Server Components; semantic HTML preserved.

**Test scenarios:** none for these (no behavior). Visual verified in U6.

**Verification:** Page renders top bar, cover, and the competitive landscape table at the correct visual fidelity. No layout shift on font load.

---

### U3. Interactive question cards with selection state

**Goal:** Render all 14 questions as expandable cards. Single-select questions (Q1–Q13) record exactly one answer. Q14 is multi-select. State lives in the parent `BriefPage`.

**Dependencies:** U2.

**Files:**
- `components/brief/QuestionCard.tsx` (`"use client"`)
- `components/brief/MultiQuestionCard.tsx` (`"use client"`)
- `components/brief/questions-data.ts` (typed question + option content)
- `lib/types.ts` (`Question`, `Option`, `Answers`)
- `app/page.tsx` (wire `useState<Answers>` and pass setters down — convert to `"use client"` for this section, or extract into a `BriefShell` client component so the rest of the page stays server-rendered)

**Approach:**
- `questions-data.ts` is the single source of truth for question text, subtitle, context blocks, preview strips, and options. Each question is `{ id: number; title: string; subtitle: string; context?: string; previews?: PreviewCard[]; options: Option[]; multi?: boolean }`.
- `Answers` shape: `Record<number, string | string[]>` — string for single-select (the option label), array for multi.
- `QuestionCard` manages its own open/closed accordion state locally. Selection state is lifted to the parent so the summary and progress bar can read it.
- Match the visual states: `.q-card.answered` when an answer exists; `.opt.selected` on the chosen option; `.q-card.open` toggles the accordion.
- "Open first card on load" behavior from the source HTML stays — pass `defaultOpen` prop to Q1.
- Convert option `onclick` handlers into React `onClick` event handlers calling the lifted setter.

**Patterns to follow:** Standard controlled-component pattern; lift state up; the source HTML's CSS classes drive all visuals (no inline styles).

**Test scenarios:**
- Selecting an option in Q1 sets `answers[1]` to that option's label and visually marks the card as answered.
- Selecting a different option in Q1 replaces the previous answer (single-select semantics).
- Q14 multi-select: toggling two options yields an array of two labels in `answers[14]`; clicking a selected option deselects it; deselecting all removes the card's "answered" state.
- Accordion toggle: clicking the header opens the card; clicking again closes it; opening another card auto-closes the previously open one (matches source behavior — verify, then drop the auto-close if it feels worse in React).
- Initial mount: Q1 opens automatically after first render (matches `setTimeout` behavior in source).

**Verification:** All 14 cards render. Each card's selected option persists in component tree state and is observable via React DevTools.

---

### U4. Product catalog (search + family filter + inline detail)

**Goal:** Port the interactive 75-product catalog inside Q3. Users can search by part number, filter by family, and click a part to expand an inline detail panel with the spec table and action buttons.

**Dependencies:** U3.

**Files:**
- `components/brief/ProductCatalog.tsx` (`"use client"`)
- `components/catalog/products-data.ts` (75-item array, faithfully ported from source; fix the typo `name: "29EI",ily: "EI"` → `family: "EI"`)
- `lib/types.ts` (extend with `Product`)

**Approach:**
- Local component state: `activeFamily` (string), `search` (string), `expandedPart` (string | null).
- Render the toolbar (search input + family filter buttons), then a grid of cards filtered by the two predicates.
- When `expandedPart` is set, render the detail panel directly after the matching card (use CSS grid `grid-column: 1 / -1` as in source).
- Detail panel content is verbatim from source: drawing placeholder, spec table with material options and thickness, and the two action buttons. The "Request Quote for {part}" button is a no-op for now (or scrolls to Q9) — note in code comment.
- Family filter button "F / FB / FG" filters to the `F` family (which includes FB/FG/FM variants per source data); "LE / UI" filters to `LE` (includes UI variants). Match source semantics exactly.

**Patterns to follow:** Controlled inputs; derived state via `useMemo` for filtered list.

**Test scenarios:**
- Default state shows all 75 products in the grid.
- Typing `75EI` in search narrows to two products (`75EI`, `75HSEI`); clearing the search restores the full list.
- Clicking the "EE Series" filter shows only EE-family products; clicking "All" restores the full list.
- Clicking a product card expands the detail panel beneath it, showing the part's name in the spec table heading.
- Clicking the same product again collapses the detail panel.
- Clicking a different product moves the detail panel to that product's position.
- Switching family filters collapses any open detail panel.

**Verification:** Behavior matches the source HTML demo. Visual styling unchanged from source CSS.

---

### U5. Summary, submission flow, and progress wiring

**Goal:** Render the live summary section that compiles selections as they change, wire the top-bar counter and progress bar, and add a "Submit selections" button that POSTs to the API and shows a confirmation state.

**Dependencies:** U3, U4.

**Files:**
- `components/brief/SummarySection.tsx` (`"use client"`)
- `app/page.tsx` (or the client shell from U3 — pass `answers` to summary)

**Approach:**
- Summary derives entirely from `answers`. Render one `.sum-item` per question; "Pending" when missing, truncated answer label when present.
- Progress bar fill = `answered / total * 100`. Top-bar counter mirrors the same numbers. Both update reactively from `answers`.
- Add a "Submit selections" button next to the existing "Print / Save as PDF" button. Button states: `idle`, `submitting`, `success` (shows submission id), `error` (shows message + retry).
- On click:
  1. POST `{ answers, submittedAt: new Date().toISOString(), userAgent: navigator.userAgent }` to `/api/submissions`.
  2. On 200, swap button copy to "Submitted ✓ (id: abc123)".
  3. On failure, surface a brief error inline; do not lose the in-memory selections.
- The existing `window.print()` button stays as-is.
- Do not block submission on incomplete answers — partial answers are still useful research signal. Optionally show a soft hint ("X questions unanswered").

**Patterns to follow:** Standard `useState` for submission UI; native `fetch`; no React Query for a single POST.

**Test scenarios:**
- Selecting answers in any question updates the matching summary row from "Pending" to the truncated label and turns the row badge green.
- Top-bar counter increments correctly as answers change (including Q14 multi-select counted as one answered question).
- Progress bar fill width tracks `answered / 14` in percent.
- Clicking "Submit selections" with valid state: button enters `submitting` then `success` and the submission id is visible.
- Submit failure: button enters `error`, the error message is visible, retry works, and the user's selections remain in state.
- Print button still triggers `window.print()` and is unaffected by submission state.

**Verification:** Manual flow: answer some questions, watch summary fill in, click submit, see confirmation, refresh page, confirm summary resets (we are not persisting client-side).

---

### U6. Submission API route → Vercel Blob

**Goal:** Server-side handler that accepts a submission payload, validates it, and writes one JSON blob to Vercel Blob under a stable key. Returns the generated submission id.

**Dependencies:** U5 (consumer); can be developed in parallel.

**Files:**
- `app/api/submissions/route.ts`
- `lib/blob.ts`
- `lib/types.ts` (extend with `SubmissionPayload`, `StoredSubmission`)
- `.env.example` (document `BLOB_READ_WRITE_TOKEN`)
- `package.json` (add `@vercel/blob`)

**Approach:**
- POST-only handler. Reject non-POST with `405`.
- Parse + validate JSON body with a thin handwritten validator (or zod if already in deps — no need to add a library just for this). Required fields: `answers` (object with numeric-string keys), `submittedAt` (ISO 8601 string). Optional: `userAgent`.
- Generate `id = crypto.randomUUID()` on the server.
- Compose blob key: `submissions/${YYYY}/${MM}/${DD}/${id}.json` — date-partitioned for easier offline browsing.
- Write with `put(key, JSON.stringify(stored), { access: 'public', addRandomSuffix: false, contentType: 'application/json' })`. Use `access: 'private'` instead if/when private blobs are available and the team prefers — note the trade-off in code: public blobs are unguessable by key but technically accessible to anyone with the URL.
- Wrap the SDK call in `lib/blob.ts` so storage can be swapped later (e.g., for Neon Postgres) without touching the route handler.
- Respond `200 { id, key }` on success. Respond `400` for validation errors with a structured `{ error: string }`. Respond `500` only for unexpected failures.
- Do not log the raw answers in production (keep submission contents out of Vercel logs).

**Patterns to follow:** Next.js App Router route handlers; `@vercel/blob` SDK `put()` (see `vercel:vercel-storage` skill for current usage).

**Test scenarios:**
- Valid POST returns 200 and a UUID-shaped id; the response key follows the `submissions/YYYY/MM/DD/<uuid>.json` pattern.
- GET / PUT / DELETE return 405.
- Missing `answers` returns 400 with a clear error.
- Missing `submittedAt` returns 400.
- Malformed JSON body returns 400.
- `answers` containing only numeric-string keys and string-or-string-array values is accepted; other shapes are rejected.
- When `BLOB_READ_WRITE_TOKEN` is missing in the runtime env, the handler returns a 500 with a server-side log explaining the missing token (the SDK throws — catch and translate).

**Verification:** Local dev with a Vercel-linked project (`vercel link` + `vercel env pull`) hits the endpoint successfully; the resulting blob is visible in the Vercel Blob dashboard for the project.

---

### U7. Deploy and verify on Vercel

**Goal:** Get the site live on a Vercel preview deployment with the Blob integration provisioned, and confirm end-to-end submission works against real storage.

**Dependencies:** U6.

**Files:**
- `README.md` (deploy instructions, env var list)
- `vercel.ts` (verify final shape)

**Approach:**
- Run `vercel link` to attach the local project to a Vercel project.
- Provision Vercel Blob from the Marketplace (or via `vercel:bootstrap` skill). This auto-creates `BLOB_READ_WRITE_TOKEN` in project env.
- `vercel env pull .env.local` so `next dev` can write to real Blob locally.
- `vercel deploy` to push a preview deployment.
- README documents: required env vars, local dev setup, where submissions land in Vercel Blob, and how to export them later.

**Patterns to follow:** `vercel:deploy` and `vercel:bootstrap` skills.

**Test scenarios:** none authored — verified by manual smoke test below.

**Verification:**
- Preview deployment URL loads and renders identically to local.
- A full submission from the preview deployment lands in Vercel Blob (verify in dashboard).
- Production deployment (`vercel deploy --prod`) shows the same behavior.
- No secrets in client-bundle (`grep`-able from build output).

---

## Scope Boundaries

### In scope
- Single-page brief at `/` with all 14 questions, competitor table, and product catalog.
- Submission endpoint writing to Vercel Blob.
- Faithful visual port — same fonts, colors, layout, responsive breakpoints.
- Local development workflow + Vercel preview/production deployment.

### Deferred to Follow-Up Work
- An admin page to browse submissions in-browser (user explicitly declined for v1).
- Email notification on new submission.
- Rate limiting / abuse protection on the submission endpoint (Vercel BotID or WAF rules).
- Validation that all 14 questions are answered before submission.
- Localization / i18n.
- Real industry, capabilities, certifications, RFQ, and About pages — this plan only ports the design brief itself, not the actual EMP marketing site sections being designed by the brief.

### Not in scope
- Authentication or user accounts.
- A CMS for editing questions.
- Analytics beyond Vercel's built-in metrics.
- A redesign or restyle.

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Source HTML contains visible typos and broken markup (e.g., `<diass="preview-card">`, malformed `<td>ty</strong>`, `name: "29EI",ily: "EI"`). | Faithful port could propagate broken DOM. | Fix obvious markup errors during U2/U3/U4 port. Document each fix in the unit's commit. |
| Vercel Blob `public` access means submission URLs are technically world-readable if someone discovers the random key. | Mild privacy risk for collected answers. | Keys include UUIDs (unguessable); plus we never expose keys back to the client beyond the submitting user. Revisit if private Blob access becomes preferred and document in README. |
| Submission contents could end up in logs unintentionally. | Privacy leak. | Explicitly avoid `console.log(payload)` in the route handler; log only the id and success/failure. |
| `next/font/google` loads three families — could affect LCP. | Slower first paint than the inline `<link>` approach. | Use `display: swap` and preload the body font only; let display and mono fall back briefly. |
| Inline `onclick` → React conversion may miss subtle source behaviors (e.g., the auto-close-other-cards effect). | Functional regression. | U3 test scenarios explicitly enumerate the behaviors to preserve. |

---

## System-Wide Impact

This is a greenfield project — no existing code to disrupt. Future impacts to consider:

- **Storage migration path.** If submission volume grows or the team wants in-browser admin, swapping Vercel Blob for Neon Postgres is a one-file change inside `lib/blob.ts` — keep the storage interface narrow (`storeSubmission(payload) => { id, key }`).
- **Form additions.** New questions are added by editing `questions-data.ts` only. The summary, progress bar, and submission shape adapt automatically.
- **Marketing site sections.** When the real EMP site sections (Industries, Capabilities, Certifications, Catalog, RFQ) get built later, this app's scaffold (`app/`, `components/`, `lib/`) is reusable; the brief page becomes one route, not the whole app.

---

## Verification Plan

1. `pnpm dev` runs locally with no errors. (U1)
2. Visual diff against the source HTML in two viewports (desktop 1280px, mobile 375px) — no obvious regressions in spacing, color, typography. (U2–U4)
3. Selecting answers updates the live summary, counter, and progress bar in real time. (U3, U5)
4. Submitting a complete set of answers produces a 200 response with a UUID and writes a JSON blob to Vercel Blob storage. (U6, U7)
5. Submitting a partial set of answers also succeeds. (U5, U6)
6. Submitting twice from the same session creates two distinct blob keys. (U6)
7. Production deployment loads under 2s on a fast connection and the submission flow works end-to-end. (U7)
