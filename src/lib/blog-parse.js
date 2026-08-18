export const BLOG_CATEGORIES = ['Tenders', 'Documentation', 'Financing', 'Contractors'];

function unquote(value) {
  const trimmed = String(value ?? '').trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseInlineArray(value) {
  const match = String(value).match(/^\[(.*)\]$/);
  if (!match) return [];
  return match[1]
    .split(',')
    .map((item) => unquote(item.trim()))
    .filter(Boolean);
}

function parseFrontmatter(raw) {
  const data = {};
  const lines = raw.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const faqMatch = line.match(/^faq(?:En)?:\s*$/);
    if (faqMatch) {
      const items = [];
      i += 1;
      while (i < lines.length) {
        const q = lines[i].match(/^\s*-\s+question:\s*(.*)$/);
        if (!q) break;
        const question = unquote(q[1]);
        i += 1;
        const a = lines[i]?.match(/^\s+answer:\s*(.*)$/);
        const answer = a ? unquote(a[1]) : '';
        if (a) i += 1;
        items.push({ question, answer });
      }
      data.faq = items;
      continue;
    }

    const authorMatch = line.match(/^author:\s*$/);
    if (authorMatch) {
      const author = {};
      i += 1;
      while (i < lines.length) {
        const nested = lines[i].match(/^\s{2}(\w+):\s*(.*)$/);
        if (!nested) break;
        author[nested[1]] = unquote(nested[2]);
        i += 1;
      }
      data.author = author;
      continue;
    }

    const kv = line.match(/^([A-Za-z][\w]*)\s*:\s*(.*)$/);
    if (kv) {
      const key = kv[1];
      const value = kv[2];
      if (value.startsWith('[')) data[key] = parseInlineArray(value);
      else if (value === 'true' || value === 'false') data[key] = value === 'true';
      else data[key] = unquote(value);
    }
    i += 1;
  }

  return data;
}

export function parseBlogMdx(slug, raw) {
  const text = String(raw ?? '');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const frontmatter = match ? parseFrontmatter(match[1]) : {};
  const body = match ? match[2].trim() : text.trim();

  return {
    slug,
    title: frontmatter.title || frontmatter.titleEn || slug,
    description: frontmatter.description || frontmatter.descriptionEn || '',
    datePublished: frontmatter.datePublished || '',
    dateModified: frontmatter.dateModified || frontmatter.datePublished || '',
    author: {
      name: frontmatter.author?.name || 'B2G Editorial',
      role: frontmatter.author?.role || 'Editorial',
    },
    category: frontmatter.category || 'Tenders',
    readTime: String(frontmatter.readTime || ''),
    coverImage: frontmatter.coverImage || '',
    featured: Boolean(frontmatter.featured),
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    faq: Array.isArray(frontmatter.faq) ? frontmatter.faq : [],
    body,
  };
}

export function sortPosts(posts) {
  return [...posts].sort((a, b) => String(b.datePublished).localeCompare(String(a.datePublished)));
}

export function filterPostsByCategory(posts, category) {
  if (!category || !BLOG_CATEGORIES.includes(category)) return posts;
  return posts.filter((post) => post.category === category);
}
