import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildArticleJsonLd,
  canonicalBlogIndexUrl,
  canonicalBlogUrl,
  canonicalForPost,
  filterIndexablePosts,
  isFallbackPost,
  robotsForPost,
  ROBOTS_INDEX,
  ROBOTS_NOINDEX,
  SITE_ORIGIN,
  withRobotsMeta,
} from './blog-seo.js';

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

test('fallback slug, frontmatter.fallback, and mode fallback/mock are non-indexable', () => {
  assert.equal(isFallbackPost('fallback-read-tender-notice-2026-09-21'), true);
  assert.equal(isFallbackPost('/blog/fallback-bid-security-basics-2026-08-18/'), true);
  assert.equal(isFallbackPost({ slug: 'how-to-find-public-tenders-worldwide' }), false);
  assert.equal(isFallbackPost({ slug: 'not-fallback-post' }), false);
  assert.equal(isFallbackPost({ slug: 'real-topic', fallback: true }), true);
  assert.equal(isFallbackPost({ slug: 'real-topic', mode: 'fallback' }), true);
  assert.equal(isFallbackPost({ slug: 'real-topic', mode: 'mock' }), true);
  assert.equal(isFallbackPost({ slug: 'real-topic', mode: 'claude' }), false);
  assert.equal(robotsForPost({ slug: 'fallback-e-procurement-portals-2026-09-01' }), ROBOTS_NOINDEX);
  assert.equal(robotsForPost({ slug: 'how-to-find-public-tenders-worldwide' }), ROBOTS_INDEX);
});

test('fallback canonical points at a published topic article, otherwise the blog index', () => {
  const fallback = { slug: 'fallback-read-tender-notice-2026-09-21' };
  const real = { slug: 'how-to-find-public-tenders-worldwide' };
  const topic = { slug: 'how-to-read-a-tender-notice' };

  assert.equal(canonicalForPost(fallback, [fallback, real]), canonicalBlogIndexUrl());
  assert.equal(canonicalForPost(fallback, [fallback, real, topic]), canonicalBlogUrl(topic.slug));
  assert.equal(canonicalForPost(real, [fallback, real]), canonicalBlogUrl(real.slug));
  assert.equal(
    canonicalForPost(
      { slug: 'fallback-bid-file-map-2026-08-20', topicSlug: 'how-to-prepare-tender-documentation' },
      [{ slug: 'how-to-prepare-tender-documentation' }],
    ),
    canonicalBlogUrl('how-to-prepare-tender-documentation'),
  );
  assert.equal(
    canonicalForPost({ slug: 'notes', mode: 'mock', topicSlug: 'missing-article' }, [real]),
    canonicalBlogIndexUrl(),
  );
});

test('filterIndexablePosts hides fallback copies and keeps real articles', () => {
  const posts = filterIndexablePosts([
    { slug: 'fallback-read-tender-notice-2026-09-21' },
    { slug: 'how-to-find-public-tenders-worldwide' },
    { slug: 'pipeline-check', mode: 'mock' },
  ]);
  assert.deepEqual(posts.map((post) => post.slug), ['how-to-find-public-tenders-worldwide']);
});

test('withRobotsMeta rewrites the site robots tag to noindex,follow', () => {
  const html = '<head>\n    <meta name="robots" content="index,follow" />\n  </head>';
  const next = withRobotsMeta(html, ROBOTS_NOINDEX);
  assert.match(next, /<meta name="robots" content="noindex,follow" \/>/);
  assert.equal(next.match(/<meta name="robots"/g).length, 1);
  assert.doesNotMatch(next, /content="index,follow"/);
});
