import type { Question } from "@/lib/types";

export const questions: Question[] = [
  {
    id: 1,
    title: "What should visitors see first when they land on empmags.com?",
    subtitle:
      "This is the homepage hero — the first 3 seconds that determine if someone stays or bounces.",
    contextLabel: "What competitors do",
    contextBody: (
      <>
        <strong>Tempel</strong> uses a full-screen video of production lines.{" "}
        <strong>Thomson Lamination</strong> uses a large hero image with headline.{" "}
        <strong>Sotek</strong> uses a photo hero with overlay text. None of them lead
        with company history.
      </>
    ),
    previews: [
      {
        variant: "dark",
        visualLines: ["Dark background", "Bold headline", "+ CTA buttons"],
        label: "Text Hero",
        sub: "Fast loading, no photo needed",
      },
      {
        variant: "navy",
        visualLines: ["Full-width photo", "of factory/products", "with text overlay"],
        label: "Photo Hero",
        sub: "Requires professional photography",
      },
      {
        variant: "warm",
        visualLines: ["Looping video", "of presses running,", "laminations being made"],
        label: "Video Hero",
        sub: "Highest impact, needs video production",
      },
    ],
    options: [
      {
        label: "Text-only hero with strong headline and CTA",
        desc: 'Professional, fast, works immediately. No media production needed. Headline communicates what EMP does + "Request a Quote" button.',
        tag: { label: "Recommended", kind: "rec" },
      },
      {
        label: "Photo hero with factory/product imagery",
        desc: "Background photo of your facility or close-up of laminations. More visual but requires a professional photographer on-site.",
      },
      {
        label: "Looping video hero",
        desc: "Short video showing your presses in action. Highest impact, but requires video production (cost + timeline).",
      },
    ],
  },
  {
    id: 2,
    title: 'Should the site have an "Industries Served" section?',
    subtitle:
      "4 out of 5 competitors organize content by industry. It helps buyers self-qualify.",
    contextLabel: "Why this matters",
    contextBody: (
      <>
        An aerospace procurement officer looking for NADCAP-certified lamination
        suppliers thinks in terms of <strong>&ldquo;aerospace laminations&rdquo;</strong>{" "}
        — not &quot;EI&quot; or &quot;DU&quot; part numbers. Industry pages let buyers
        find themselves. They also create SEO landing pages for searches like{" "}
        <strong>&ldquo;aerospace lamination manufacturer NJ.&rdquo;</strong>
      </>
    ),
    options: [
      {
        label: "Yes — dedicated page for each industry with tailored content",
        desc: "Separate pages for Aerospace, Defense, Telecom, Motors/Generators, and Industrial. Each page highlights relevant materials, certifications, and capabilities for that sector.",
        tag: { label: "Recommended", kind: "rec" },
      },
      {
        label: "Yes — but as a homepage section only, not separate pages",
        desc: "Icon cards on the homepage listing the industries you serve. Signals breadth without needing dedicated content for each.",
      },
      {
        label: "Skip for launch — add later",
        desc: "Focus on product catalog and capabilities first. Industry pages can come in Phase 2.",
      },
    ],
  },
  {
    id: 3,
    title: "How should your 80+ product catalog be organized and displayed?",
    subtitle:
      "This is the core of the site. Below is a working prototype of how it could look.",
    contextLabel: "The product challenge",
    contextBody: (
      <>
        EMP has <strong>80+ standard part numbers</strong> across families: EI, EE, L,
        DU/U, LE, UI, F, FB, FG, FM. Each part has dimensional data and drawings. No
        competitor in your tier has a catalog this deep — it&apos;s an asset, but only
        if buyers can actually navigate it. Below is a live prototype of how it could
        work.
      </>
    ),
    catalog: true,
    options: [
      {
        label: "Interactive catalog with search and filter (as shown above)",
        desc: 'Searchable grid with family filters. Clicking a part shows the dimensional drawing and spec table inline. Engineers can find any part in seconds. Includes a "Request Quote for this Part" button on each detail view.',
        tag: { label: "Recommended", kind: "rec" },
      },
      {
        label: "Family-grouped pages with expandable part details",
        desc: "One page per family (EI page, EE page, etc.). Each part is an accordion that expands to show specs. Simpler to build but more clicking for users.",
      },
      {
        label: "Downloadable PDF catalog with web overview",
        desc: "A summary page on the website with family descriptions. Each family links to a downloadable PDF with all part specs and drawings. Low web maintenance but less interactive.",
      },
    ],
  },
  {
    id: 4,
    title: "When someone clicks on a specific part number, what should they see?",
    subtitle:
      "Each part has a dimensional drawing and specifications. How should we deliver that data?",
    contextLabel: "How it works in the prototype above",
    contextBody: (
      <>
        Click any part in the demo above — it shows a <strong>split view</strong> with
        the dimensional drawing on the left and a specification table on the right,
        plus buttons for &quot;Download PDF&quot; and &quot;Request Quote.&quot; This is
        the inline approach. Alternatives below.
      </>
    ),
    options: [
      {
        label: "Inline expansion with drawing + spec table (as shown in demo)",
        desc: "Part detail opens directly below the selected item. Drawing on one side, spec table on the other, with RFQ and PDF download buttons. No page navigation needed.",
        tag: { label: "Recommended", kind: "rec" },
      },
      {
        label: "Dedicated page per part number",
        desc: 'Each of the 80+ parts gets its own URL and page. Better for SEO (e.g. "75EI lamination dimensions" could rank). More pages to maintain.',
        tag: { label: "Best for SEO", kind: "pop" },
      },
      {
        label: "Modal / popup overlay",
        desc: "Clicking a part opens a lightbox overlay with drawing and specs. User stays on the catalog page but gets a focused view.",
      },
      {
        label: "Direct PDF download only",
        desc: "Clicking a part downloads or opens the spec sheet PDF. Simplest approach but least interactive web experience.",
      },
    ],
  },
  {
    id: 5,
    title: "How should the 8 manufacturing capabilities be presented?",
    subtitle:
      "Stamping, Annealing, Slitting, Coating, QC, Tooling, Shipping, Value-Added Services.",
    contextLabel: "What competitors do",
    contextBody: (
      <>
        <strong>Tempel</strong> gives each capability its own sub-page (10 total).{" "}
        <strong>Thomson Lamination</strong> presents them as a stepped process flow
        (Step 1: Prototyping → Step 2: Tooling → Step 3: Stamping, etc.).{" "}
        <strong>Sotek</strong> uses a combined capabilities page with an equipment list
        and image gallery.
      </>
    ),
    options: [
      {
        label: "Process flow — show capabilities as a connected production pipeline",
        desc: "Visual step-by-step: Raw Material → Slitting → Stamping → Annealing → Assembly → Shipping. Each step expands to reveal full detail. Tells the story of how parts are made.",
        tag: { label: "Recommended", kind: "rec" },
      },
      {
        label: "Card grid on one page with expandable details",
        desc: "All 8 capabilities as a visual grid. Click to expand each card for full description. Compact and scannable.",
      },
      {
        label: "Separate sub-pages for each capability",
        desc: "Like Tempel — each capability gets its own page with photos, specs, and equipment details. Most content but most pages to maintain.",
      },
    ],
  },
  {
    id: 6,
    title: "Certifications & Quality — how prominently should they feature?",
    subtitle: "NADCAP, MIL-45208A, MIL-Q-9858A, MIL-STD-45662, ASTM-346-64.",
    contextLabel: "Why this is a big deal",
    contextBody: (
      <>
        For aerospace and defense buyers,{" "}
        <strong>certifications are often the first filter</strong>. They won&apos;t even
        read your capabilities if they don&apos;t see NADCAP or AS9100 upfront. Thomson
        Lamination puts cert PDFs in their top navigation bar. Tempel has a dedicated
        certifications page. This is one of EMP&apos;s strongest differentiators.
      </>
    ),
    options: [
      {
        label: "Dedicated Quality & Certifications page + homepage trust bar",
        desc: "A full page listing all certifications with downloadable PDFs of certificates. Plus a certification logo strip on the homepage right below the hero.",
        tag: { label: "Recommended", kind: "rec" },
      },
      {
        label: "Section within the Capabilities page",
        desc: "Quality control as one section on the capabilities page. Cert logos on homepage. No separate page.",
      },
    ],
  },
  {
    id: 7,
    title:
      "Technical data resources — how should the 7 engineering references be delivered?",
    subtitle:
      "Cross-reference chart, weight chart, material chart, Permeability 49, Hy Mu 80, Hipernom 80, product groups.",
    contextLabel: "Your competitive edge",
    contextBody: (
      <>
        <strong>
          No competitor in your tier offers this depth of technical data publicly.
        </strong>{" "}
        Magworks has a generic &quot;Downloads&quot; page but nothing like EMP&apos;s
        cross-reference charts and material property data. This is a genuine
        differentiator that also creates SEO value — engineers searching for
        &quot;Permeability 49 nickel alloy data&quot; could land directly on your site.
      </>
    ),
    options: [
      {
        label: "Interactive web tables + PDF downloads",
        desc: "Searchable, sortable tables rendered on the website so engineers can reference data instantly. Plus a PDF download option for offline use. Most effort but highest value.",
        tag: { label: "Recommended", kind: "rec" },
      },
      {
        label: "Downloadable PDFs only (gated behind email)",
        desc: "Professional PDF datasheets available after entering an email. Generates leads but adds friction. Engineers may bounce.",
      },
      {
        label: "Downloadable PDFs (no gate)",
        desc: "Free PDF downloads, no email required. Lowest friction, no lead capture from this channel.",
      },
    ],
  },
  {
    id: 8,
    title: "Should Prototype & Short Run services get their own featured page?",
    subtitle:
      "EMP offers quick-turn prototype laminations. Thomson Lamination promotes this as a core service.",
    contextLabel: "Why this could matter",
    contextBody: (
      <>
        <strong>Thomson Lamination</strong> (your closest NJ competitor) lists
        &quot;Prototyping Services&quot; as their #1 capability with a dedicated page.
        Prototype/short-run work often leads to production contracts. It&apos;s also a
        strong SEO keyword: <strong>&ldquo;prototype motor lamination&rdquo;</strong> is
        a real search term with commercial intent.
      </>
    ),
    options: [
      {
        label: "Yes — give it a featured landing page",
        desc: "Dedicated page highlighting quick quote, short lead time, low-cost tooling, and material availability. Separate CTA and RFQ form. Linked from the main nav.",
        tag: { label: "Recommended", kind: "rec" },
      },
      {
        label: "No — keep it as a section within Products",
        desc: "Mention prototyping capabilities on the products page as one of the product types. Not separately promoted.",
      },
    ],
  },
  {
    id: 9,
    title: "What kind of quote request form should the site have?",
    subtitle:
      "Every competitor has one. This is the single most important addition to the new site.",
    contextLabel: "What competitors do",
    contextBody: (
      <>
        <strong>Thomson Lamination</strong> has a detailed RFQ form (separate from
        their general contact form) with fields for part details and file upload.{" "}
        <strong>Tempel</strong> uses a general inquiry form. <strong>Magworks</strong>{" "}
        uses a popup modal RFQ that&apos;s accessible from every page.
      </>
    ),
    options: [
      {
        label: "Two separate forms: General Contact + Detailed RFQ",
        desc: 'A simple contact form for general inquiries, plus a detailed "Request a Quote" form with fields for material type, quantity, tolerances, and drawing file upload. The RFQ button appears on every page.',
        tag: { label: "Recommended", kind: "rec" },
      },
      {
        label: "Single detailed form for everything",
        desc: "One form handles both inquiries and RFQs. Some fields optional. Simpler to manage but may intimidate casual visitors.",
      },
      {
        label: "Simple form only (name, email, message)",
        desc: "Lowest friction. More submissions but less qualified — you'll need to follow up for project details.",
      },
    ],
  },
  {
    id: 10,
    title: "What should the About page include?",
    subtitle:
      "EMP's history (founded 1966, nearly 60 years of operation) is a legitimate trust signal.",
    options: [
      {
        label:
          "Full About page: history timeline, leadership, facility overview, mission",
        desc: "Professional About page with a visual timeline from 1966 to present. Photos of facility and leadership team. Communicates stability and experience.",
        tag: { label: "Recommended", kind: "rec" },
      },
      {
        label: "Brief About section on homepage — no separate page",
        desc: "A few sentences and key stats on the homepage. Keeps the site leaner but sacrifices storytelling opportunity.",
      },
    ],
  },
  {
    id: 11,
    title: "Should Tape Wound Cores have their own section or page?",
    subtitle:
      "This is a distinct product line from the stamped laminations. It even has its own inquiry email.",
    options: [
      {
        label: "Dedicated page with product gallery and separate RFQ",
        desc: "Tape Wound Cores get their own page with toroidal core photos, specs for single and three-phase designs, and a dedicated inquiry form routed to the tape cores team.",
        tag: { label: "Recommended", kind: "rec" },
      },
      {
        label: "Section within the main Products page",
        desc: "Listed alongside other product families in the catalog. No special treatment.",
      },
    ],
  },
  {
    id: 12,
    title: "Should the site include a blog or resources section?",
    subtitle:
      "4 out of 5 competitors have a blog. But an empty blog is worse than no blog.",
    contextLabel: "Honest assessment",
    contextBody: (
      <>
        Blogs drive SEO traffic and position EMP as a thought leader.{" "}
        <strong>But only if you actually write content.</strong> An empty blog with one
        post from 2026 signals neglect. Thomson Lamination&apos;s blog has educational
        content about materials, processes, and FAQs — it&apos;s clearly maintained. If
        you can&apos;t commit to at least 1 post per quarter, skip it.
      </>
    ),
    options: [
      {
        label: "Yes — blog + resources hub (if committed to updating)",
        desc: "Blog for articles, plus a resources section for downloadable technical data, guides, and FAQs. Plan for at least 1 article per month.",
      },
      {
        label: "Resources/Downloads page only, no blog",
        desc: "A static page linking to technical datasheets, spec charts, and material guides. No dated content that can look stale.",
        tag: { label: "Recommended", kind: "rec" },
      },
      {
        label: "Skip entirely for launch",
        desc: "No blog, no resource hub. Technical data lives on the Technical page. Add a blog later if appetite exists.",
      },
    ],
  },
  {
    id: 13,
    title: "Contact page details — what should be shown?",
    subtitle:
      "Currently: address, phone, fax, 3 named contacts with emails, plus general inquiry email.",
    options: [
      {
        label: "Contact page with embedded map, form, phone, and named contacts",
        desc: "Full contact page: Google Map of Moorestown location, contact form, phone number, and named contacts (President/CEO, Sales Manager) with emails.",
        tag: { label: "Recommended", kind: "rec" },
      },
      {
        label: "Minimal contact — form + phone only, no named people",
        desc: "Just a contact form and phone number. No personal emails published (reduces spam). Inquiries are routed internally.",
      },
    ],
  },
  {
    id: 14,
    title: "Any of these optional extras worth including at launch?",
    subtitle:
      "These are nice-to-haves that some competitors include. Pick any that apply.",
    multi: true,
    options: [
      {
        label: "Equipment list with specs",
        desc: "Table of press tonnages, furnace types, and equipment capabilities. Sotek does this — signals transparency about what you can handle.",
      },
      {
        label: "Photo gallery of facility and products",
        desc: "Professional photos of the factory floor, presses in operation, finished products. Builds trust.",
      },
      {
        label: "Careers page",
        desc: "If currently hiring, a simple page with open positions. Tempel and Thomson both have this.",
      },
      {
        label: "FAQ page",
        desc: "Common questions about lead times, minimum orders, material capabilities, custom tooling. Good for SEO.",
      },
      {
        label: "None of these at launch",
        desc: "Focus on core pages only. Revisit these in Phase 2.",
      },
    ],
  },
];
