# B2G AI Landing (`/ai`) Implementation Plan

> **For agentic workers:** Execute task-by-task. Steps use checkbox syntax.

**Goal:** Ship `https://b2g.org/ai` from the zip landing (visual preserved), single Deployment lead form → shared Sheets webhook, SEO/sitemap, main-site cross-nav, content-factory AI cluster prep (no article generation).

**Architecture:** Isolated island under `src/pages/Ai.jsx` + `src/components/ai/*` + page-local i18n; shared `leads.js` / `SeoHead` / sitemap.

**Tech Stack:** Vite, React Router, Tailwind, Framer Motion, existing `src/lib/leads.js` webhook.

**Spec:** `docs/superpowers/specs/2026-08-25-b2g-ai-landing-design.md`

## Global Constraints

- Keep zip navy/white/electric visual; do not restyle to dark `b2g-*` marketing shell
- No Base44 Lead entities for submissions
- Remove RequestForm; only DeploymentForm `#deploy`
- All CTAs → `#deploy` (or in-page anchors that funnel to deploy)
- Do not generate MDX / run content-factory pipeline
- Do not commit unless user asks

## File map

| Path | Role |
|------|------|
| `src/pages/Ai.jsx` | Page shell, SeoHead, section composition |
| `src/components/ai/*` | Ported zip sections |
| `src/pages/ai/i18n/*` | Zip i18n (LanguageContext scoped to `/ai`) |
| `src/pages/ai/ai.css` | Zip utilities scoped `.b2g-ai` |
| `src/lib/aiLeads.js` | Map deployment fields → `buildLeadPayload` |
| `tailwind.config.js` | Add navy/electric/cyan + ai animations |
| `src/App.jsx` | Route `/ai` |
| `Navbar`/`Footer`/`translations.js` | Cross-nav |
| `content-factory/...` | sitemap + AI cluster prep |
| `public/sitemap.xml` | Include `/ai/` |

### Task 1: Scaffold tokens, CSS, i18n, copy components

- [ ] Add Tailwind colors/keyframes from zip
- [ ] Copy i18n + components from `/tmp/b2g-ai-extract`
- [ ] Drop RequestForm; fix imports to `@/components/ai` and `@/pages/ai/i18n`

### Task 2: Wire leads + funnel CTAs

- [ ] `aiLeads.js` + rewrite DeploymentForm to webhook + consent + Meta Pixel
- [ ] Header/Footer/Hero/FinalCta/Pricing/Faq/etc. CTAs → `#deploy`; logo → `/`; Human specialists; no `/login`
- [ ] Page `Ai.jsx` + route

### Task 3: Main-site nav + SEO + sitemap + content-factory prep

- [ ] Nav/footer translations + links
- [ ] SeoHead on Ai page; sitemap static entry; refresh public sitemap
- [ ] cluster-tags + content-plan rows + internal-links seeds

### Task 4: Verify

- [ ] `npm test`, `npm run build`, smoke `/ai`
