import fs from 'fs';
import path from 'path';

function getLlmsPath(): string {
  return path.join(process.env.SITE_PUBLIC_DIR || '../public', 'llms.txt');
}

function getContentDir(): string {
  return path.resolve(process.env.CONTENT_DIR || '../content/blog');
}

function getBaseUrl(): string {
  return (process.env.SITE_BASE_URL || 'https://b2g.org').replace(/\/$/, '');
}

/** Dated safe-fallback copies are near-duplicates and must not be advertised. */
const FALLBACK_SLUG = /^fallback-/;

export function isFallbackSlug(slug: string): boolean {
  return FALLBACK_SLUG.test(slug);
}

/** Frontmatter `fallback: true` or `mode: fallback|mock` marks non-indexable copy. */
export function mdxMarksFallback(raw: string): boolean {
  const match = String(raw || '').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return false;
  const frontmatter = match[1];
  if (/^fallback:\s*["']?true["']?\s*$/m.test(frontmatter)) return true;
  return /^mode:\s*["']?(fallback|mock)["']?\s*$/m.test(frontmatter);
}

export function isFallbackArticle(slug: string, raw?: string): boolean {
  if (isFallbackSlug(slug)) return true;
  if (typeof raw === 'string') return mdxMarksFallback(raw);
  const filePath = path.join(getContentDir(), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return false;
  return mdxMarksFallback(fs.readFileSync(filePath, 'utf-8'));
}

function listSlugs(explicit?: string[]): string[] {
  const fromDisk = (): string[] => {
    const dir = getContentDir();
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace(/\.mdx$/, ''));
  };

  return (explicit ?? fromDisk()).filter((slug) => !isFallbackArticle(slug)).sort();
}

function titleFromMdx(slug: string): string {
  const filePath = path.join(getContentDir(), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return slug.replace(/-/g, ' ');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = raw.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  return match?.[1] ?? slug.replace(/-/g, ' ');
}

/** GEO: a crawlable index of articles for LLM/answer-engine bots. */
export function writeLlmsTxt(slugs?: string[]): void {
  const BASE_URL = getBaseUrl();
  const list = listSlugs(slugs);
  const lines = [
    '# B2G Global Services Corp.',
    '',
    '> Educational public-procurement explainers. B2G is a private company, not a government agency.',
    '',
    `Site: ${BASE_URL}/`,
    `Blog: ${BASE_URL}/blog/`,
    '',
    '## Articles',
    '',
    ...list.map((slug) => `- [${titleFromMdx(slug)}](${BASE_URL}/blog/${slug}/)`),
    '',
    '## Contact',
    '',
    'Leave your contacts for a consultation on tender selection and documentation preparation: ' +
      `${BASE_URL}/#contact`,
    '',
  ];

  const out = getLlmsPath();
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, lines.join('\n'), 'utf-8');
  console.log(`✅ llms.txt written (${list.length} articles)`);
}
