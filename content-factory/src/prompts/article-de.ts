import type { ArticleRequest } from './types';
import { clusterTagEn } from '../../config/cluster-tags';

export function buildArticlePrompt(
  req: ArticleRequest,
  images: Array<{ url: string; altText: string }>,
  internalLinks: Array<{ slug: string; text: string }>,
): string {
  const imgMarkdown = images
    .map((img, i) => `Image ${i + 1}: ![${img.altText}](${img.url})`)
    .join('\n');

  const internalLinksText = internalLinks
    .map((l) => `- [${l.text}](/blog/${l.slug}/)`)
    .join('\n');

  const authorName = req.author?.name ?? 'B2G Editorial';
  const authorRole = req.author?.role ?? 'Editorial';
  const coverUrl = images[0]?.url?.replace('w=800', 'w=1200') ?? '';
  const title = req.titleEn || req.titleDe;
  const keyword = req.keywordEn || req.keywordDe;

  return `
Write a complete English educational article for the B2G Global blog (public procurement). No win promises.

## ARTICLE PARAMETERS
- **Slug:** ${req.slug}
- **Title:** ${title}
- **Primary keyword:** "${keyword}" (target density: 0.8–1.2%)
- **LSI keywords:** ${req.lsiKeywords.join(', ')}
- **Format:** ${req.format}
- **Target word count:** ${req.targetLength} words
- **Category:** ${req.category} (one of: Tenders, Documentation, Financing, Contractors)
- **Audience:** ${getSegmentDesc(req.taSegments)}

## IMAGES (place in the article at sensible points)
${imgMarkdown}

## INTERNAL LINKS (embed 3–5 naturally)
${internalLinksText}

## AUTHORITATIVE EXTERNAL SOURCES (use where relevant)
- TED / EU Tenders Electronic Daily: https://ted.europa.eu
- OECD public procurement: https://www.oecd.org/governance/procurement/
- World Bank procurement: https://www.worldbank.org/en/projects-operations/products-and-services/brief/procurement-debarment
- UNCITRAL Model Law on Public Procurement: https://uncitral.un.org
- ISO: https://www.iso.org

## REQUIRED CONTENTS

### 1. Frontmatter (exactly this shape)
\`\`\`
---
title: "${title}"
titleEn: "${title}"
description: "[150–160 characters, keyword '${keyword}', no win-rate claims]"
descriptionEn: "[same as description]"
datePublished: "${req.plannedDate}"
dateModified: "${req.plannedDate}"
author:
  name: "${authorName}"
  role: "${authorRole}"
category: "${req.category}"
readTime: "[X min]"
coverImage: "${coverUrl}"
featured: false
tags: ["${keyword}", "${clusterTagEn(req.cluster)}", "public procurement", "2026"]
tagsEn: ["${keyword}", "${clusterTagEn(req.cluster)}", "public procurement", "2026"]
faq:
  - question: "..."
    answer: "..."
---
\`\`\`

### 2. Article structure (required)
- Intro: hook + core answer in the first 150 words (GEO)
- Image 1 right after the intro
- At least 5 H2 headings
- At least 1 data table
- At least 1 numbered list (5+ items)
- Image 2 mid-article
- Risks / limits section (required) — no guaranteed win, no guaranteed financing
- Practical checklist or how-to
- Closing CTA, verbatim:
  Leave your contacts for a consultation on tender selection and documentation preparation.
- Required disclaimer (see system prompt)
- Image 3 optional

### 3. FAQ
At least 5 questions in frontmatter. First question must be the most common search query for "${keyword}".
FAQ answers must not promise a win or a win-rate.

## FORBIDDEN PATTERNS (AGAIN)
- ❌ {#anchor-id}
- ❌ [Section](#anchor)
- ❌ <AnyJSXComponent>
- ❌ <script>
- ❌ # H1 in the body
- ❌ YAML block arrays for tags
- ❌ ---en---
- ❌ "we guarantee that you will win" / "guaranteed to win" / "87% win rate"
- ❌ "guaranteed financing"
- ❌ B2G as a government agency
- ❌ invented expert authors

Write the complete article now. Start directly with the three dashes (---) of the frontmatter.
`;
}

function getSegmentDesc(segments: string[]): string {
  const map: Record<string, string> = {
    contractors: 'companies that bid for and deliver public contracts',
    partners: 'long-term partners building a procurement practice',
    consultants: 'advisors who support bidders with process and documents',
    employees: 'professionals considering work in public procurement',
    '1': 'companies that bid for and deliver public contracts',
    '2': 'long-term partners building a procurement practice',
    '3': 'advisors who support bidders with process and documents',
    '4': 'professionals considering work in public procurement',
  };
  return segments.map((s) => map[s] || s).join(', ');
}
