# B2G Content Factory

Autonomous TypeScript pipeline: content plan → queue → English MDX in git → site deploy.

Publication is a git commit of `content/blog/{slug}.mdx`, not a CMS write. The Vite app reads those files at build time and prerenders HTML for SEO/GEO.

## Commands

```bash
cd content-factory
cp .env.example .env
npm install
npm run init
npm run queue:list
npm run generate -- how-to-find-public-tenders-worldwide --dry-run --mock
npm run batch -- -n 1
npm run test:compliance
npm run test:fallback
```

`--mock` is for pipeline tests only. Production articles need `ANTHROPIC_API_KEY`.

## Environment

See `.env.example`. `SITE_BASE_URL` defaults to `https://b2g.org`.

### GitHub Actions secrets (production cron)

Repo → **Settings → Secrets and variables → Actions**. Names only (never commit values):

| Secret | Required | Purpose |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | **yes** for real articles | Claude generation. If missing/empty on **schedule**, the job **fails** with `mode=missing-key` (no automatic `fallback-*` posts). Manual `workflow_dispatch` can still use fallback-only / mock. |
| `ANTHROPIC_MODEL` | optional | Defaults to `claude-sonnet-5` in code/`.env.example`. |
| `UNSPLASH_ACCESS_KEY` | optional | Cover images (stock fallbacks if unset). |
| `RESEND_API_KEY` | optional | Email notify on publish. |
| `NOTIFY_EMAIL` | optional | Notify recipient. |

Local: `cp .env.example .env` and fill the same names. Do not commit `.env`.

Schedule: cron `0 8 * * *` (08:00 UTC daily), publish every other day from anchor `2026-08-18`.

## Contract

- English only (no `---en---` block)
- Author: `B2G Editorial`
- Categories: Tenders, Documentation, Financing, Contractors
- Required CTA: *Leave your contacts for a consultation on tender selection and documentation preparation.*
- Required disclaimer: informational / educational purposes only
- Blocked: guaranteed wins, numeric win-rates, guaranteed financing, B2G as a government body, invented experts
