import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { isFallbackArticle, isFallbackSlug, mdxMarksFallback } from './llms';
import { addArticleToSitemap, conditionalStaticRouteIsLive, regenerateSitemap } from './sitemap';

const REAL_SLUG = 'how-to-find-public-tenders-worldwide';
const FALLBACK_SLUG = 'fallback-read-tender-notice-2026-09-21';

function writeMdx(dir: string, slug: string, datePublished: string): void {
  const body = `---
title: "${slug} title"
datePublished: "${datePublished}"
---

Body for ${slug}.
`;
  fs.writeFileSync(path.join(dir, `${slug}.mdx`), body, 'utf-8');
}

test('fallback slugs match ^fallback- and real posts do not', () => {
  assert.equal(isFallbackSlug(FALLBACK_SLUG), true);
  assert.equal(isFallbackSlug('fallback-'), true);
  assert.equal(isFallbackSlug(REAL_SLUG), false);
  assert.equal(isFallbackSlug('not-fallback-post'), false);
});

test('frontmatter fallback/mock is non-indexable even without a fallback- slug', () => {
  assert.equal(mdxMarksFallback('---\nmode: "mock"\n---\n\nBody mentions fallback- once.\n'), true);
  assert.equal(mdxMarksFallback('---\nfallback: true\nmode: "claude"\n---\n\nBody.\n'), true);
  assert.equal(mdxMarksFallback('---\nmode: "fallback"\n---\n\nBody.\n'), true);
  assert.equal(mdxMarksFallback('---\ntitle: "Real"\n---\n\nNot a fallback article.\n'), false);
  assert.equal(isFallbackArticle('not-fallback-post'), false);
});

test('sitemap and llms omit fallback posts and unpublished static routes', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'b2g-sitemap-'));
  const publicDir = path.join(root, 'public');
  const distDir = path.join(root, 'dist');
  const contentDir = path.join(root, 'content');
  fs.mkdirSync(publicDir, { recursive: true });
  fs.mkdirSync(distDir, { recursive: true });
  fs.mkdirSync(contentDir, { recursive: true });
  writeMdx(contentDir, REAL_SLUG, '2026-09-21');
  writeMdx(contentDir, FALLBACK_SLUG, '2026-09-21');
  fs.writeFileSync(
    path.join(contentDir, 'pipeline-check.mdx'),
    `---
title: "Pipeline check"
datePublished: "2026-09-21"
mode: "mock"
---

Body mentions fallback handling but is itself a mock.
`,
    'utf-8',
  );

  const previous = {
    SITE_PUBLIC_DIR: process.env.SITE_PUBLIC_DIR,
    SITE_DIST_DIR: process.env.SITE_DIST_DIR,
    CONTENT_DIR: process.env.CONTENT_DIR,
    SITE_BASE_URL: process.env.SITE_BASE_URL,
  };
  process.env.SITE_PUBLIC_DIR = publicDir;
  process.env.SITE_DIST_DIR = distDir;
  process.env.CONTENT_DIR = contentDir;
  process.env.SITE_BASE_URL = 'https://b2g.org';

  try {
    assert.equal(conditionalStaticRouteIsLive('platform'), false);
    assert.equal(conditionalStaticRouteIsLive('ai'), false);
    assert.equal(conditionalStaticRouteIsLive('data-room'), false);

    const indexed = regenerateSitemap([FALLBACK_SLUG, REAL_SLUG, 'pipeline-check'], '2026-09-21');
    assert.equal(indexed, 1);

    const sitemap = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf-8');
    const llms = fs.readFileSync(path.join(publicDir, 'llms.txt'), 'utf-8');

    assert.match(sitemap, /<loc>https:\/\/b2g\.org\/<\/loc>/);
    assert.match(sitemap, /<loc>https:\/\/b2g\.org\/blog\/<\/loc>/);
    assert.match(sitemap, new RegExp(`<loc>https://b2g.org/blog/${REAL_SLUG}/</loc>`));
    assert.match(sitemap, /<priority>0\.9<\/priority>/);
    assert.doesNotMatch(sitemap, /fallback-/);
    assert.doesNotMatch(sitemap, /pipeline-check/);
    assert.doesNotMatch(sitemap, /\/platform\//);
    assert.doesNotMatch(sitemap, /\/ai\//);
    assert.doesNotMatch(sitemap, /\/data-room\//);

    assert.match(llms, new RegExp(`/blog/${REAL_SLUG}/`));
    assert.doesNotMatch(llms, /fallback-/);
    assert.doesNotMatch(llms, /pipeline-check/);

    fs.mkdirSync(path.join(publicDir, 'platform'), { recursive: true });
    fs.writeFileSync(path.join(publicDir, 'platform', 'index.html'), '<html></html>', 'utf-8');
    assert.equal(conditionalStaticRouteIsLive('platform'), true);

    regenerateSitemap([REAL_SLUG, FALLBACK_SLUG], '2026-09-21');
    const withPlatform = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf-8');
    assert.match(withPlatform, /<loc>https:\/\/b2g\.org\/platform\/<\/loc>/);
    assert.doesNotMatch(withPlatform, /\/ai\//);
    assert.doesNotMatch(withPlatform, /fallback-/);

    await addArticleToSitemap(FALLBACK_SLUG, '2026-09-21', 'medium');
    const afterFallback = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf-8');
    const afterLlms = fs.readFileSync(path.join(publicDir, 'llms.txt'), 'utf-8');
    assert.doesNotMatch(afterFallback, /fallback-/);
    assert.match(afterFallback, new RegExp(`<loc>https://b2g.org/blog/${REAL_SLUG}/</loc>`));
    assert.doesNotMatch(afterLlms, /fallback-/);
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    fs.rmSync(root, { recursive: true, force: true });
  }
});
