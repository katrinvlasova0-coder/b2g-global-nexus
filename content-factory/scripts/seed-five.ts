import fs from 'fs';
import path from 'path';
import { SAFE_TEMPLATES } from '../src/safe-fallback-templates';
import { regenerateSitemap } from '../src/sitemap';

const CONTENT_DIR = path.resolve('../content/blog');
const CTA =
  'Leave your contacts for a consultation on tender selection and documentation preparation.';
const DISCLAIMER =
  '*This material is for informational and educational purposes only. It is not legal, tax, or financial advice and it is not an official statement of any contracting authority. B2G Global Services Corp. is not a government agency. Outcomes in public procurement depend on published criteria, local law, and the bidder’s own evidence. Readers should verify primary sources as of the action date.*';

const DEPTH = [
  'Readers preparing a briefing should open a file with three tabs: legal basis, contracting party, open questions. Each tab carries the same as-of date. Call-centre remarks enter only as notes, never as a substitute for the official text.',
  'Separate brand, legal entity and product name. LEI, registry number and the exact name in the account contract are the reliable fields. If one is missing, the research is incomplete.',
  'Language does not equal legal regime. Competence follows the supervised entity and the applicable statute, not the browser translator.',
  'Figures should be stored with unit, currency and as-of date. A cap without a currency or a deadline without a calendar day is useless in the file.',
  'Mandatory texts and marketing belong in different folders. If they conflict, the incorporated contract prevails and the mismatch is flagged as an open question.',
  'A four-eyes rule helps: one person fetches the source, a second checks that the legal entity matches. Those few minutes prevent expensive mis-attribution.',
  'Archive with a date in the filename. Prefer PDF over screenshots because metadata and page numbers remain citable.',
  'Draw a line in the summary: what is established, what is assumption, what still needs a question to the competent body.',
  'Keep a calendar on the file: when the document was issued, when it was read, when it was shared. Without those dates later disputes arise over what should already have been known.',
  'Treat external links as signposts. Save the downloaded file, not only the hyperlink.',
  'B2G Global Services Corp. appears here as an editorial desk, not as a government agency, a bank or a substitute for the tender file. Official notices stay on the authority’s portal.',
  'Where evidence is missing, keep the question open. A gap between a briefing and a live bid should stay visible instead of being closed by habit.',
  'Internal training should use the firm’s own account structure and the named legal entity, not generic slides without a citation.',
  'Auditors and future bid managers need the same snapshot. Separate spreadsheets with different as-of dates create later explanation work.',
  'If website, app and PDF annex disagree, the contractually incorporated text prevails. Put the PDF date in the local archive.',
  'Cross-country comparisons help only if currency, cap logic and the payout or submission process stay separate. A table cell without a legal-basis footnote is incomplete.',
  'A dummy upload, a named role and a saved PDF of the latest addendum belong in the file before the last day. That is operational hygiene, not a promised award.',
];

const BATCH = [
  {
    id: 'read-tender-notice',
    date: '2026-08-19',
    cover: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80&auto=format&fit=crop',
    mid: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'bid-file-map',
    date: '2026-08-20',
    cover: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80&auto=format&fit=crop',
    mid: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'eligibility-evidence',
    date: '2026-08-21',
    cover: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80&auto=format&fit=crop',
    mid: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'e-procurement-portals',
    date: '2026-08-22',
    cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80&auto=format&fit=crop',
    mid: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b35d16?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'named-subcontractors',
    date: '2026-08-23',
    cover: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80&auto=format&fit=crop',
    mid: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
  },
];

function yamlString(value: string): string {
  return JSON.stringify(value);
}

function faqYaml(items: Array<{ question: string; answer: string }>): string {
  return items
    .map(
      (item) =>
        `  - question: ${yamlString(item.question)}\n    answer: ${yamlString(item.answer)}`,
    )
    .join('\n');
}

function buildBody(template: (typeof SAFE_TEMPLATES)[number], mid: { url: string; alt: string }): string {
  const headings = template.headingsEn;
  const facts = template.factsEn;
  const list = template.listEn.map((item, i) => `${i + 1}. ${item}`).join('\n');
  const headers = template.tableHeadersEn;
  const table = [
    `| ${headers[0]} | ${headers[1]} | ${headers[2]} |`,
    '|---|---|---|',
    ...template.tableRows.map((row) => `| ${row[0]} | ${row[1]} | ${row[2]} |`),
  ].join('\n');

  return [
    facts[0],
    '',
    `## ${headings[0]}`,
    '',
    facts[1],
    '',
    DEPTH[0],
    '',
    DEPTH[1],
    '',
    `## ${headings[1]}`,
    '',
    facts[2],
    '',
    facts[3],
    '',
    DEPTH[2],
    '',
    DEPTH[3],
    '',
    `## ${headings[2]}`,
    '',
    `The numbered list below is a working aid on ${template.keywordEn}, not a legally binding checklist.`,
    '',
    list,
    '',
    `## ${headings[3]}`,
    '',
    `The table compresses ${template.keywordEn} into three comparison rows. It does not replace an official information sheet.`,
    '',
    table,
    '',
    `![${mid.alt}](${mid.url})`,
    '',
    `## ${headings[4]}`,
    '',
    facts[4],
    '',
    facts[5],
    '',
    DEPTH[4],
    '',
    DEPTH[5],
    '',
    `## ${headings[5]}`,
    '',
    facts[6],
    '',
    facts[7],
    '',
    DEPTH[6],
    '',
    DEPTH[7],
    '',
    DEPTH[8],
    '',
    DEPTH[9],
    '',
    DEPTH[10],
    '',
    DEPTH[11],
    '',
    DEPTH[12],
    '',
    DEPTH[13],
    '',
    DEPTH[14],
    '',
    DEPTH[15],
    '',
    DEPTH[16],
    '',
    '## A working file workflow',
    '',
    'Before a decision is drafted, collect documents only. Only then write three sentences in your own words. The folder name includes the date so nobody forwards an old version as current.',
    '',
    'Mark contradictions in colour: contract versus website, app versus PDF. Each contradiction becomes a numbered question with an addressee.',
    '',
    'Omit what is not evidenced. Missing caps and undated screenshots do not enter the conclusion. Record “Not evidenced, follow-up open.”',
    '',
    'Date the file and name the next review. Keep the portal URL from the notice, not from an advertisement.',
    '',
    CTA,
    '',
    DISCLAIMER,
    '',
  ].join('\n');
}

fs.mkdirSync(CONTENT_DIR, { recursive: true });
const slugs: string[] = fs
  .readdirSync(CONTENT_DIR)
  .filter((file) => file.endsWith('.mdx'))
  .map((file) => file.replace(/\.mdx$/, ''));

for (const item of BATCH) {
  const template = SAFE_TEMPLATES.find((entry) => entry.id === item.id);
  if (!template) throw new Error(`missing template ${item.id}`);
  const slug = `fallback-${template.id}-${item.date}`;
  const body = buildBody(template, { url: item.mid, alt: `${template.keywordEn} — working file` });
  const content = `---
title: ${yamlString(template.titleEn)}
titleEn: ${yamlString(template.titleEn)}
description: ${yamlString(template.descriptionEn)}
descriptionEn: ${yamlString(template.descriptionEn)}
datePublished: ${yamlString(item.date)}
dateModified: ${yamlString(item.date)}
author:
  name: "B2G Editorial"
  role: "Editorial"
category: ${yamlString(template.category)}
readTime: "8 min"
coverImage: ${yamlString(item.cover)}
featured: false
tags: ${JSON.stringify([template.keywordEn, template.category, 'public procurement', '2026'])}
tagsEn: ${JSON.stringify([template.keywordEn, template.category, 'public procurement', '2026'])}
faq:
${faqYaml(template.faqEn)}
---

${body}
`;
  fs.writeFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), content);
  if (!slugs.includes(slug)) slugs.push(slug);
  console.log('wrote', slug, body.split(/\s+/).filter(Boolean).length, 'words');
}

regenerateSitemap(slugs.sort(), '2026-08-23');
