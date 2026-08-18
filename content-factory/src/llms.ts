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

function listSlugs(explicit?: string[]): string[] {
  if (explicit) return explicit;
  const dir = getContentDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
    .sort();
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
