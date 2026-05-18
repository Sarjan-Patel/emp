# EMP — Design Studio Brief

A Next.js website that presents the design brief for **Electro Magnetic Products, Inc.** (a 14-question questionnaire with competitor analysis and an interactive 75-product catalog), and records every visitor's selections to **Vercel Blob** storage.

Built with Next.js 16 (App Router), React 19, TypeScript, and `@vercel/blob`.

## Project structure

```
emp/
├── app/
│   ├── layout.tsx              # Fonts (Fraunces, DM Sans, JetBrains Mono), metadata
│   ├── page.tsx                # Renders <BriefPage />
│   ├── globals.css             # Faithful port of the source HTML stylesheet
│   └── api/submissions/
│       └── route.ts            # POST handler → Vercel Blob
├── components/
│   ├── brief/                  # Brief page UI (cards, summary, catalog, etc.)
│   └── catalog/                # Product catalog data (75 items)
├── lib/
│   ├── blob.ts                 # Thin wrapper around @vercel/blob put()
│   └── types.ts                # Shared TS types
└── docs/plans/                 # Plan document for this build
```

## Local development

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

To exercise the submission API locally against real Vercel Blob storage, you need a `BLOB_READ_WRITE_TOKEN` in `.env.local`:

```bash
pnpm dlx vercel link              # link to your Vercel project
pnpm dlx vercel env pull .env.local
```

Without the token the page renders fine, but clicking **Submit selections** will return a 500 from `/api/submissions`.

## Submission storage

Every successful submission is written to Vercel Blob at:

```
submissions/YYYY/MM/DD/<uuid>.json
```

Each JSON object contains:

```jsonc
{
  "id":          "f0c2…",        // server-generated UUID
  "receivedAt":  "2026-05-18T…", // server timestamp
  "submittedAt": "2026-05-18T…", // client timestamp
  "userAgent":   "Mozilla/…",    // optional
  "answers":     {
    "1":  "Text-only hero with strong headline and CTA",
    "14": ["Equipment list with specs", "FAQ page"]
    // … one entry per answered question
  }
}
```

To browse or export submissions, use the **Storage → Blob** tab in your Vercel dashboard, or the [`@vercel/blob`](https://vercel.com/docs/storage/vercel-blob) SDK's `list()` from a server script.

## Deploying to Vercel

```bash
pnpm dlx vercel link
pnpm dlx vercel deploy            # preview
pnpm dlx vercel deploy --prod     # production
```

Before the first deploy, install the **Vercel Blob** integration on the project (Storage tab in the Vercel dashboard). This auto-provisions `BLOB_READ_WRITE_TOKEN` in every environment.

## Smoke test checklist

1. `pnpm dev` boots without errors.
2. The page renders the cover, competitor table, and all 14 question cards.
3. Selecting answers updates the live summary, top-bar counter, and progress bar.
4. The product catalog (inside Q3) supports search, family filtering, and inline part detail.
5. Clicking **Submit selections** with `BLOB_READ_WRITE_TOKEN` set returns a success message with a UUID; the blob is visible in the Vercel dashboard.
6. The **Print / Save as PDF** button still triggers the browser print dialog.

## Notes on the port

- The source HTML was a single-file prototype with some markup typos. They've been fixed in the React port:
  - `'JetBrains no'` → `'JetBrains Mono'` (CSS variable).
  - Malformed `<td>ty</strong></td>` row → restored as **Certifications / Quality**.
  - The orphan **Equipment List / Gallery** row outside a `<tr>` was reattached.
  - `name: "29EI",ily: "EI"` → `family: "EI"` in the products data.
- The visual design is preserved 1:1. All original CSS class names are retained so future restyles only need to touch `app/globals.css`.
