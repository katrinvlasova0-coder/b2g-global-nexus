import type { ArticleRequest } from './prompts/types';
import { clusterTagEn } from '../config/cluster-tags';
import type { UnsplashImage } from './images';

const DEPTH = [
  'Public procurement is a rules-based market. The notice, the tender documents and the evaluation grid are the primary sources — not a sales conversation.',
  'Eligibility is usually split into exclusion grounds, economic and financial standing, and technical capacity. Missing one annex can make a bid administratively non-responsive even if the price is competitive.',
  'Deadlines are timestamps in a named timezone. Clarification questions have their own cut-off. A late upload on an e-procurement portal is typically treated as a non-submission.',
  'Bid bonds, performance bonds and advance-payment guarantees are separate instruments with different start dates and wording. A bank’s credit review is independent of the contracting authority’s award decision.',
  'B2G Global Services Corp. is a private company. It is not a government agency and it does not replace the official portal of the contracting authority.',
  'Cross-border bids add language, legalisation and local-content questions. Those are documentary issues first, not marketing issues.',
];

function faqItems(req: ArticleRequest): Array<{ q: string; a: string }> {
  const kw = req.keywordEn || req.keywordDe;
  return [
    {
      q: `What is ${kw}?`,
      a: `${kw} is an educational topic in public procurement. The published notice and tender documents remain the primary source for any live procedure.`,
    },
    {
      q: `Does B2G guarantee a win if I study ${kw}?`,
      a: 'No. There is no guaranteed win. Outcomes depend on published criteria, local law and the evidence in the bid file.',
    },
    {
      q: 'Is B2G a government agency?',
      a: 'No. B2G Global Services Corp. is a private company. Official notices are issued by contracting authorities on their own portals.',
    },
    {
      q: 'Can you guarantee financing for my bid?',
      a: 'No. Bank guarantees and loans are subject to the bank’s own review. Approval is not automatic and is not promised here.',
    },
    {
      q: 'How do I get help with tender selection and documents?',
      a: 'Leave your contacts for a consultation on tender selection and documentation preparation.',
    },
    {
      q: 'Where should I verify facts?',
      a: 'Use the contracting authority’s portal, TED where applicable, and the tender documents as of the action date.',
    },
    {
      q: 'What is the minimum reading checklist?',
      a: 'Scope, CPV or equivalent, lots, eligibility, evaluation method, submission channel, bonds, and the clarification deadline.',
    },
  ];
}

export function generateMockArticle(req: ArticleRequest, images: UnsplashImage[]): string {
  const cover = images[0]?.url.replace('w=800', 'w=1200') ?? images[0]?.url ?? '';
  const kw = req.keywordEn || req.keywordDe;
  const title = req.titleEn || req.titleDe;
  const img2 = images[1] ?? images[0];
  const faqs = faqItems(req);
  const faqYaml = faqs.map((f) => `  - question: "${f.q}"\n    answer: "${f.a}"`).join('\n');

  return `---
title: "${title}"
titleEn: "${title}"
description: "${title.slice(0, 120)} Educational briefing on ${kw} for public-procurement teams in 2026."
descriptionEn: "${title.slice(0, 120)} Educational briefing on ${kw} for public-procurement teams in 2026."
datePublished: "${req.plannedDate}"
dateModified: "${req.plannedDate}"
author:
  name: "B2G Editorial"
  role: "Editorial"
category: "${req.category}"
readTime: "8 min"
coverImage: "${cover}"
featured: false
tags: ["${kw}", "${clusterTagEn(req.cluster)}", "public procurement", "2026"]
tagsEn: ["${kw}", "${clusterTagEn(req.cluster)}", "public procurement", "2026"]
faq:
${faqYaml}
---

**${kw}** is a working topic for teams that bid on public contracts. The first job is to read the notice and the tender file, not to assume a result. This briefing explains how to map ${kw} without treating any platform as an official authority.

**At a glance:**
- Primary source: the published notice and tender documents
- Typical split: eligibility, technical file, financial file, bonds
- B2G is a private company, not a government agency

## What ${kw} means in a live procedure

${DEPTH[0]} ${DEPTH[1]}

| Item | Where it lives | Why it matters |
|------|----------------|----------------|
| Notice | Official portal / TED | Scope, dates, lots |
| Eligibility | Tender documents | Administrative responsiveness |
| Evaluation | Award criteria | Scoring method |
| Bonds | Forms + bank | Bid security vs performance |

## Why ${kw} matters in 2026

${DEPTH.join('\n\n')}

![${img2.altText} — public procurement file](${img2.url})

## How to work through ${kw} — five steps

1. **Identify the contracting authority and the legal entity named in the notice.**
2. **List lots, CPV codes or equivalent, and the submission channel.**
3. **Extract exclusion grounds, capacity tests and certificate lists.**
4. **Calendar the clarification cut-off, site visit and upload timestamp.**
5. **Separate bid security, performance security and any advance-payment instrument.**

## Risks and limits

There is no guaranteed win. Win rates vary by market and evaluator weighting; nobody should publish a personalised percentage as a promise. Financing instruments are not guaranteed financing. B2G Global Services Corp. is not a government agency and does not replace the official portal.

Sources: [TED](https://ted.europa.eu), [OECD procurement](https://www.oecd.org/governance/procurement/), [UNCITRAL](https://uncitral.un.org).

## Conclusion

Treat ${kw} as a file-and-calendar problem. Verify the primary source as of the action date. Leave your contacts for a consultation on tender selection and documentation preparation.

*This material is for informational and educational purposes only. It is not legal, tax, or financial advice and it is not an official statement of any contracting authority. B2G Global Services Corp. is not a government agency. Outcomes in public procurement depend on published criteria, local law, and the bidder’s own evidence. Readers should verify primary sources as of the action date.*

## Frequently asked questions about ${kw}

${faqs.map((item) => `### ${item.q}\n\n${item.a}`).join('\n\n')}
`;
}
