import test from 'node:test';
import assert from 'node:assert/strict';
import { BLOG_CATEGORIES, cleanBlogBody, getRelatedPosts, parseBlogMdx, splitBodyForBanner } from './blog-parse.js';

const FIXTURE = `---
title: "How to read a tender notice: fields, lots and deadlines"
titleEn: "How to read a tender notice: fields, lots and deadlines"
description: "Educational briefing on reading a public tender notice. No win promises; verify the official portal."
descriptionEn: "Educational briefing on reading a public tender notice. No win promises; verify the official portal."
datePublished: "2026-08-18"
dateModified: "2026-08-18"
author:
  name: "B2G Editorial"
  role: "Editorial"
category: "Tenders"
readTime: "8 min"
coverImage: "https://images.unsplash.com/photo-test?w=1200"
featured: false
tags: ["read a tender notice", "Tenders", "public procurement", "2026"]
faq:
  - question: "What is a tender notice?"
    answer: "The official invitation published by the contracting authority."
  - question: "Is B2G a government agency?"
    answer: "No. B2G Global Services Corp. is a private company."
---

A tender notice is the primary source.

## Fields that matter

Leave your contacts for a consultation on tender selection and documentation preparation.

*This material is for informational and educational purposes only.*
`;

test('parseBlogMdx reads frontmatter, FAQ list and body', () => {
  const post = parseBlogMdx('how-to-read-a-tender-notice', FIXTURE);

  assert.equal(post.slug, 'how-to-read-a-tender-notice');
  assert.equal(post.title, 'How to read a tender notice: fields, lots and deadlines');
  assert.equal(post.category, 'Tenders');
  assert.equal(post.author.name, 'B2G Editorial');
  assert.equal(post.datePublished, '2026-08-18');
  assert.equal(post.tags[0], 'read a tender notice');
  assert.equal(post.faq.length, 2);
  assert.equal(post.faq[0].question, 'What is a tender notice?');
  assert.match(post.body, /A tender notice is the primary source/);
  assert.equal(post.featured, false);
});

test('BLOG_CATEGORIES match the landing capability clusters', () => {
  assert.deepEqual(BLOG_CATEGORIES, ['Tenders', 'Documentation', 'Financing', 'Contractors']);
});

const MESSY_BODY = `bid bonds is an educational topic, not a promise of a contract award. As-of date for this briefing: 2026-08-18. This text explains terms.

![bid bonds — Public procurement documents](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop)

## Bid security versus performance security

Anyone mapping bid bonds should start with the legal source.

![charts](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800)

## Further reading

- [How to find public tenders worldwide](/blog/how-to-find-public-tenders-worldwide/)
- [How to read a tender notice](/blog/how-to-read-a-tender-notice/)

This educational snapshot of “Bid bonds and tender guarantees: amount, wording, release” is for 2026-08-18 and is not standing legal advice. Anyone acting should check the primary source from the competent body as of the action date and file a copy. Where this overview and the official text differ, the official text prevails. A later version replaces this note only if date and source are documented again.

Leave your contacts for a consultation on tender selection and documentation preparation.

*This material is for informational and educational purposes only.*
`;

test('cleanBlogBody drops factory lead, cover duplicate, further reading and snapshot', () => {
  const cleaned = cleanBlogBody(
    MESSY_BODY,
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop',
  );

  assert.doesNotMatch(cleaned, /educational topic, not a promise/);
  assert.doesNotMatch(cleaned, /photo-1554224155-6726b3ff858f/);
  assert.doesNotMatch(cleaned, /Further reading/);
  assert.doesNotMatch(cleaned, /How to find public tenders worldwide/);
  assert.doesNotMatch(cleaned, /educational snapshot/);
  assert.match(cleaned, /## Bid security versus performance security/);
  assert.match(cleaned, /Anyone mapping bid bonds/);
  assert.match(cleaned, /photo-1460925895917-afdab827c52f/);
  assert.match(cleaned, /Leave your contacts for a consultation/);
  assert.match(cleaned, /educational purposes only/);
});

test('parseBlogMdx applies body cleanup using the cover image', () => {
  const post = parseBlogMdx(
    'fallback-bid-security-basics-2026-08-18',
    `---
title: "Bid bonds"
coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop"
category: "Financing"
---

${MESSY_BODY}`,
  );

  assert.doesNotMatch(post.body, /Further reading/);
  assert.doesNotMatch(post.body, /educational snapshot/);
  assert.doesNotMatch(post.body, /photo-1554224155-6726b3ff858f/);
  assert.match(post.body, /## Bid security versus performance security/);
});

test('getRelatedPosts prefers the same category and skips the current slug', () => {
  const related = getRelatedPosts(
    [
      { slug: 'a', category: 'Tenders', title: 'A' },
      { slug: 'b', category: 'Tenders', title: 'B' },
      { slug: 'c', category: 'Financing', title: 'C' },
    ],
    'a',
    2,
  );
  assert.deepEqual(related.map((post) => post.slug), ['b', 'c']);
});

test('splitBodyForBanner inserts after the first section', () => {
  const split = splitBodyForBanner('Intro.\n\n## One\n\nAlpha.\n\n## Two\n\nBeta.');
  assert.match(split.before, /## One/);
  assert.doesNotMatch(split.before, /## Two/);
  assert.match(split.after, /## Two/);
});
