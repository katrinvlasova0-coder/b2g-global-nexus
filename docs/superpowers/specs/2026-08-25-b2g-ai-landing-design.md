# B2G AI Landing (`/ai`) — Design Spec

**Date:** 2026-08-25  
**Status:** Approved (user: keep zip visual, funnel polish, single Deployment form, cross-nav A)

## Goal

Ship `https://b2g.org/ai` as a product funnel for selling AI tender specialists (AI employee / Head of Tenders / Department), keeping the visual system from the provided zip, wiring leads into the shared Google Sheets webhook, meeting site SEO standards, and preparing (not running) content-factory base for “AI in public procurement.”

## Decisions locked

| Topic | Choice |
|-------|--------|
| Visual | Keep zip navy/white/electric style (not restyle to dark `b2g-*` marketing shell) |
| Structure | Keep almost all zip sections; polish copy/order/CTAs; remove Request Form |
| Lead form | Single Deployment form (`#deploy`) |
| Cross-nav | Main Navbar/Footer → AI; `/ai` logo → `/`; Human specialists → `/` |
| Hosting | Same SPA / GitHub Pages root (`b2g.org/ai`), not a separate subdomain deploy |
| Content factory | Prep only (cluster + plan slots + internal links); no article generation this pass |

## Architecture

Isolated “island” inside `b2g-global-nexus`:

- Route: `/ai` → `src/pages/Ai.jsx`
- Components: `src/components/ai/*` (ported from zip `src/components/b2g/*`)
- Page-local i18n: `src/pages/ai/i18n/*` (zip languages), independent of main `LanguageContext`
- Styles: scoped under `.b2g-ai` + Tailwind tokens `navy` / `electric` / `cyan` (zip palette) so the dark homepage is not polluted
- Shared site chrome only via cross-links — `/ai` keeps its own Header/Footer from zip (adapted)

## Funnel structure (order)

Keep zip section order with these edits:

1. Header (logo → `/`, add Human specialists → `/`, remove broken `/login`, primary CTA → `#deploy`)
2. Hero — primary CTA “Hire AI Tender Specialist” → `#deploy`; secondary “See how it works” → `#lifecycle`
3. Solutions, NotAChatbot, Lifecycle, capability blocks… (as in zip)
4. Pricing — all tier CTAs → `#deploy` (preselect product via hash query or button data if cheap; else scroll + note in copy)
5. RoiCalculator CTA → `#deploy`
6. **DeploymentForm only** (id=`deploy`) — remove RequestForm / `#contact` form
7. Faq — CTA → `#deploy`
8. FinalCta — single primary CTA → `#deploy` (drop dual contact/deploy)
9. Footer — working anchors; Company/About → `/`; Legal links → existing site policies if present, else `#deploy` or omit dead `#`

Nav item formerly “Contact” points to `#deploy`.

### Copy / CTA principles

- One job: hire/deploy an AI tender employee, not “request a soft demo.”
- Prefer verbs: Hire / Deploy / Start deployment over Request a demo.
- Clarify vs main site: humans at `/`, AI workforce at `/ai`.
- No overclaim vs content-factory forbidden patterns (no guaranteed win rates).
- EN is source of truth for SEO meta; other zip locales keep parity where translations exist.

## Leads

Do **not** use Base44 `Lead` / `DeploymentApplication` entities.

Use `src/lib/leads.js` → `VITE_LEADS_WEBHOOK_URL` (same sheet as home/blog).

Mapping from Deployment fields:

| Sheet field | Source |
|-------------|--------|
| `name` | `contact_person` |
| `email` | `email` |
| `country` | `country` |
| `role` | `preferred_solution` |
| `message` | Structured block: company, phone, industry, tender_volume, team_size, additional_requirements |
| `source` | `ai-landing` |
| `form` | `ai-deploy` |
| `page` | full URL |
| UTM / device / language / consents | same as `LeadForm` |

Fire Meta Pixel `trackLead` on success (reuse `src/lib/metaPixel.js`).

Include consent checkbox consistent with main lead policy if required by existing form UX; if main form has it, AI form must too.

## SEO / indexing

- `SeoHead` on `/ai`: title, description, canonical `https://b2g.org/ai/`, `type=website`, OG image (`og-image.jpg` or dedicated `og-ai.jpg` if added)
- JSON-LD: SoftwareApplication or Organization + WebPage for AI tender workforce
- Favicon: existing site assets in `public/` (no Base44 logo)
- Add `/ai/` to `content-factory/src/sitemap.ts` `staticEntries` and refresh `public/sitemap.xml`
- `robots.txt` already allows `/` — no disallow for `/ai`
- Indexable: no `noindex`

## Main-site navigation

- `Navbar` + `Footer` + `translations.js`: add AI item (`/ai`) label e.g. “AI” / “AI Tender Specialist”
- Optional: Platform CTA area may mention AI — not required for v1

## Content-factory base (no generation)

1. Add cluster `AI` (or `Technology`) to `cluster-tags.ts`
2. Add 3–6 **pending** plan rows in `content-plan.json` on AI-in-procurement topics, with `ctaTarget` / internal link intent toward `/ai` documented in plan notes or `internal-links.json` keys for planned slugs
3. Seed `internal-links.json` with planned slug → title entries (pages not generated yet)
4. Do **not** run the factory pipeline / write MDX in this pass

## Out of scope

- Content generation / publishing blog posts
- Restyling to dark B2G marketing tokens
- Separate subdomain / second deploy pipeline
- Base44 backend entities for leads
- Auth / Admin pages from the zip

## Success criteria

- `/ai` renders zip visual, all section anchors work, no dead `#` / `/login` / `/#contact` form links
- Single form submits into shared leads sheet with identifiable `source`/`form`
- SEO head + sitemap include `/ai/`
- Main nav links to `/ai`; `/ai` logo and Human specialists link to `/`
- Content-factory configs ready for future AI cluster work
- `npm test` / `npm run build` pass
