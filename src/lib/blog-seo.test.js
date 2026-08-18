import test from 'node:test';
import assert from 'node:assert/strict';
import { buildArticleJsonLd, canonicalBlogUrl, SITE_ORIGIN } from './blog-seo.js';

test('canonicalBlogUrl uses trailing slash for GitHub Pages directories', () => {
  assert.equal(canonicalBlogUrl('how-to-read-a-tender-notice'), `${SITE_ORIGIN}/blog/how-to-read-a-tender-notice/`);
});

test('buildArticleJsonLd emits Article, FAQPage and Organization', () => {
  const jsonLd = buildArticleJsonLd({
    slug: 'how-to-read-a-tender-notice',
    title: 'How to read a tender notice',
    description: 'Educational briefing',
    datePublished: '2026-08-18',
    dateModified: '2026-08-18',
    coverImage: 'https://example.com/cover.jpg',
    author: { name: 'B2G Editorial' },
    faq: [{ question: 'Is B2G a government agency?', answer: 'No.' }],
  });

  const types = jsonLd['@graph'].map((node) => node['@type']);
  assert.ok(types.includes('Article'));
  assert.ok(types.includes('FAQPage'));
  assert.ok(types.includes('Organization'));
  assert.ok(types.includes('BreadcrumbList'));
  const article = jsonLd['@graph'].find((node) => node['@type'] === 'Article');
  assert.equal(article.inLanguage, 'en');
  assert.equal(article.isAccessibleForFree, true);
});
