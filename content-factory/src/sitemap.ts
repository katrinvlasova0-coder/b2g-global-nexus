import fs from 'fs';
import path from 'path';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import contentPlan from '../config/content-plan.json';
import { isFallbackArticle, writeLlmsTxt } from './llms';

function getSitemapPath(): string {
  return path.join(process.env.SITE_PUBLIC_DIR || '../public', 'sitemap.xml');
}

function getContentDir(): string {
  return path.resolve(process.env.CONTENT_DIR || '../content/blog');
}

function getBaseUrl(): string {
  return (process.env.SITE_BASE_URL || 'https://b2g.org').replace(/\/$/, '');
}

function repoRoot(): string {
  return path.resolve(__dirname, '../..');
}

type ArticlePriority = 'high' | 'medium' | 'low';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  'xhtml:link'?: Array<{ '@_rel': string; '@_hreflang': string; '@_href': string }>;
}

/**
 * App routes that currently 404 as static HTML (soft SPA shell).
 * Advertise them again only after a prerender writes `<segment>/index.html`
 * into public/ or dist/. Home and /blog/ stay listed: both already return 200 HTML.
 */
const CONDITIONAL_STATIC_ROUTES: Array<{
  segment: string;
  changefreq: SitemapEntry['changefreq'];
  priority: string;
}> = [
  { segment: 'platform', changefreq: 'weekly', priority: '0.6' },
  { segment: 'ai', changefreq: 'weekly', priority: '0.8' },
  { segment: 'data-room', changefreq: 'weekly', priority: '0.5' },
];

function withTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

function hreflang(url: string): SitemapEntry['xhtml:link'] {
  const loc = withTrailingSlash(url);
  return [
    { '@_rel': 'alternate', '@_hreflang': 'en', '@_href': loc },
    { '@_rel': 'alternate', '@_hreflang': 'x-default', '@_href': loc },
  ];
}

/** True when public/ or dist/ contains a real HTML document for the route. */
export function conditionalStaticRouteIsLive(segment: string): boolean {
  const roots = [
    path.resolve(process.env.SITE_PUBLIC_DIR || path.join(repoRoot(), 'public')),
    path.resolve(process.env.SITE_DIST_DIR || path.join(repoRoot(), 'dist')),
  ];
  return roots.some((root) => fs.existsSync(path.join(root, segment, 'index.html')));
}

function staticEntries(lastmod: string): SitemapEntry[] {
  const BASE_URL = getBaseUrl();
  const entries: SitemapEntry[] = [
    {
      loc: withTrailingSlash(BASE_URL),
      lastmod,
      changefreq: 'weekly',
      priority: '1',
      'xhtml:link': hreflang(BASE_URL),
    },
    {
      loc: `${BASE_URL}/blog/`,
      lastmod,
      changefreq: 'daily',
      priority: '0.8',
      'xhtml:link': hreflang(`${BASE_URL}/blog/`),
    },
  ];

  for (const route of CONDITIONAL_STATIC_ROUTES) {
    if (!conditionalStaticRouteIsLive(route.segment)) continue;
    const loc = `${BASE_URL}/${route.segment}/`;
    entries.push({
      loc,
      lastmod,
      changefreq: route.changefreq,
      priority: route.priority,
      'xhtml:link': hreflang(loc),
    });
  }

  return entries;
}

function blogSlugFromLoc(loc: string): string | null {
  const prefix = `${getBaseUrl()}/blog/`;
  const normalized = withTrailingSlash(loc);
  if (!normalized.startsWith(prefix)) return null;
  const slug = normalized.slice(prefix.length).replace(/\/$/, '');
  if (!slug || slug.includes('/')) return null;
  return slug;
}

function isUnpublishedStaticLoc(loc: string): boolean {
  const normalized = withTrailingSlash(loc);
  const base = getBaseUrl();
  return CONDITIONAL_STATIC_ROUTES.some(
    (route) =>
      normalized === `${base}/${route.segment}/` && !conditionalStaticRouteIsLive(route.segment),
  );
}

function isAdvertisableEntry(entry: SitemapEntry): boolean {
  const slug = blogSlugFromLoc(entry.loc);
  if (slug && isFallbackArticle(slug)) return false;
  if (isUnpublishedStaticLoc(entry.loc)) return false;
  return true;
}

function priorityForSlug(slug: string, fallback: ArticlePriority = 'medium'): ArticlePriority {
  const article = (contentPlan as Array<{ slug?: string; priority?: string }>).find(
    (item) => item.slug === slug,
  );
  if (article?.priority === 'high' || article?.priority === 'medium' || article?.priority === 'low') {
    return article.priority;
  }
  return fallback;
}

function publishedDateForSlug(slug: string, fallback: string): string {
  const filePath = path.join(getContentDir(), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return fallback;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = raw.match(/^datePublished:\s*["']?(\d{4}-\d{2}-\d{2})/m);
  return match?.[1] ?? fallback;
}

function buildBlogEntry(
  slug: string,
  lastmod: string,
  priority: ArticlePriority = 'medium',
): SitemapEntry {
  const BASE_URL = getBaseUrl();
  const loc = `${BASE_URL}/blog/${slug}/`;
  const priorityMap = { high: '0.9', medium: '0.7', low: '0.5' };

  return {
    loc,
    lastmod,
    changefreq: 'monthly',
    priority: priorityMap[priority],
    'xhtml:link': hreflang(loc),
  };
}

function sortEntries(entries: SitemapEntry[]): SitemapEntry[] {
  return [...entries].sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority));
}

function readSitemap(): { urlset: { url: SitemapEntry[] } } {
  const SITEMAP_PATH = getSitemapPath();
  let sitemap: { urlset: { url: SitemapEntry[] } } = { urlset: { url: [] } };

  if (fs.existsSync(SITEMAP_PATH)) {
    const parser = new XMLParser({ ignoreAttributes: false });
    const parsed = parser.parse(fs.readFileSync(SITEMAP_PATH, 'utf-8'));
    const urls = parsed?.urlset?.url;
    sitemap.urlset.url = Array.isArray(urls) ? urls : urls ? [urls] : [];
  }

  return sitemap;
}

function writeSitemap(sitemap: { urlset: { url: SitemapEntry[] } }): void {
  const SITEMAP_PATH = getSitemapPath();
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    indentBy: '  ',
    suppressEmptyNode: true,
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${builder.build(sitemap.urlset)}
</urlset>`;

  fs.mkdirSync(path.dirname(SITEMAP_PATH), { recursive: true });
  fs.writeFileSync(SITEMAP_PATH, xml, 'utf-8');
}

export async function addArticleToSitemap(
  slug: string,
  datePublished: string,
  priority: ArticlePriority = 'medium',
): Promise<void> {
  const BASE_URL = getBaseUrl();
  const sitemap = readSitemap();
  sitemap.urlset.url = sitemap.urlset.url.filter(isAdvertisableEntry);

  if (isFallbackArticle(slug)) {
    sitemap.urlset.url = sortEntries(sitemap.urlset.url);
    writeSitemap(sitemap);
    writeLlmsTxt();
    console.log(`⏭️ Sitemap skipped fallback slug: /blog/${slug}/`);
    return;
  }

  const newEntry = buildBlogEntry(slug, datePublished, priority);
  const loc = `${BASE_URL}/blog/${slug}/`;
  sitemap.urlset.url = sitemap.urlset.url.filter((u) => withTrailingSlash(u.loc) !== loc);
  sitemap.urlset.url.push(newEntry);
  sitemap.urlset.url = sortEntries(sitemap.urlset.url);

  writeSitemap(sitemap);
  writeLlmsTxt();
  console.log(`✅ Sitemap updated: added /blog/${slug}/`);
}

export function regenerateSitemap(
  slugs: string[],
  defaultDate: string = new Date().toISOString().split('T')[0],
): number {
  const indexable = slugs.filter((slug) => !isFallbackArticle(slug));
  const blogEntries = indexable.map((slug) =>
    buildBlogEntry(slug, publishedDateForSlug(slug, defaultDate), priorityForSlug(slug)),
  );
  const sitemap = {
    urlset: {
      url: sortEntries([...staticEntries(defaultDate), ...blogEntries]),
    },
  };

  writeSitemap(sitemap);
  writeLlmsTxt(indexable);
  console.log(`✅ Sitemap regenerated with ${blogEntries.length} blog entries`);
  return blogEntries.length;
}
