import test from 'node:test';
import assert from 'node:assert/strict';
import { generateMockArticle } from './mock-generator';
import { buildArticlePrompt } from './prompts/article-de';
import type { ArticleRequest } from './prompts/types';
import { readPublishedDate, stampPublishDates, utcPublishDate } from './publish-date';

const REQUEST: ArticleRequest = {
  id: 1,
  cluster: 'Tenders',
  slug: 'how-to-find-public-tenders-worldwide',
  titleDe: 'How to find public tenders worldwide',
  titleEn: 'How to find public tenders worldwide',
  keywordDe: 'find public tenders',
  searchVolDe: 2400,
  kd: 28,
  keywordEn: 'find public tenders',
  searchVolEn: 2400,
  lsiKeywords: ['public procurement portals'],
  format: 'Howto',
  targetLength: 1500,
  taSegments: ['contractors'],
  priority: 'high',
  plannedDate: '2026-08-20',
  language: 'EN',
  category: 'Tenders',
  status: 'pending',
  unsplashQuery: 'government building documents',
};

const STALE = `---
title: "Example"
datePublished: "2026-08-20"
dateModified: '2026-08-20'
featured: false
---

As-of date for this briefing: 2026-08-20.
`;

test('utcPublishDate uses the UTC calendar day', () => {
  assert.equal(utcPublishDate(new Date('2026-09-21T23:30:00Z')), '2026-09-21');
  assert.equal(utcPublishDate(new Date('2026-09-22T01:30:00+02:00')), '2026-09-21');
});

test('stampPublishDates overwrites a content-plan date and leaves the body alone', () => {
  const stamped = stampPublishDates(STALE, '2026-09-21');

  assert.equal(readPublishedDate(stamped), '2026-09-21');
  assert.match(stamped, /^dateModified: "2026-09-21"$/m);
  assert.doesNotMatch(stamped, /datePublished: "2026-08-20"/);
  assert.match(stamped, /As-of date for this briefing: 2026-08-20/);
  assert.match(stamped, /featured: false/);
});

test('stampPublishDates inserts missing publish dates', () => {
  const stamped = stampPublishDates('---\ntitle: "Example"\n---\n\nBody.\n', '2026-09-21');
  assert.equal(readPublishedDate(stamped), '2026-09-21');
  assert.match(stamped, /^dateModified: "2026-09-21"$/m);
  assert.match(stamped, /Body\./);
});

test('Claude prompt and mock article use the generation date, not plannedDate', () => {
  const image = {
    url: 'https://images.unsplash.com/photo-test?w=800',
    altText: 'Documents',
    photographer: 'Unsplash',
    photographerUrl: 'https://unsplash.com',
  };
  const prompt = buildArticlePrompt(REQUEST, [], [], '2026-09-21');
  const mock = generateMockArticle(REQUEST, [image], '2026-09-21');

  assert.match(prompt, /datePublished: "2026-09-21"/);
  assert.match(prompt, /dateModified: "2026-09-21"/);
  assert.doesNotMatch(prompt, /datePublished: "2026-08-20"/);
  assert.equal(readPublishedDate(mock), '2026-09-21');
  assert.match(mock, /^dateModified: "2026-09-21"$/m);
});
