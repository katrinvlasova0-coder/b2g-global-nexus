export const SITE_ORIGIN = 'https://b2g.org';
export const ORGANIZATION_NAME = 'B2G Global Services Corp.';
export const ROBOTS_INDEX = 'index,follow';
export const ROBOTS_NOINDEX = 'noindex,follow';

/**
 * Safe-fallback template id → planned article slug.
 * Canonical uses this only when that non-fallback article is actually published.
 */
const FALLBACK_TOPIC_SLUG = {
  'read-tender-notice': 'how-to-read-a-tender-notice',
  'bid-file-map': 'how-to-prepare-tender-documentation',
  'bid-security-basics': 'bid-bonds-and-tender-guarantees',
  'eligibility-evidence': 'public-procurement-eligibility-checks',
  'e-procurement-portals': 'electronic-procurement-portals-explained',
  'named-subcontractors': 'how-to-select-subcontractors-public-works',
};

export function canonicalBlogUrl(slug) {
  return `${SITE_ORIGIN}/blog/${slug}/`;
}

export function canonicalBlogIndexUrl() {
  return `${SITE_ORIGIN}/blog/`;
}

function pathSegments(value) {
  return String(value || '')
    .split(/[?#]/)[0]
    .split('/')
    .filter(Boolean);
}

/** Slug or path segment is `fallback` or starts with `fallback-`. */
export function pathMarksFallback(value) {
  return pathSegments(value).some((segment) => {
    const normalized = segment.toLowerCase();
    return normalized === 'fallback' || normalized.startsWith('fallback-');
  });
}

/**
 * Non-indexable factory copy: slug/path starts with `fallback-`,
 * or frontmatter `fallback: true` / `mode: fallback|mock`.
 */
export function isFallbackPost(post) {
  if (typeof post === 'string') return pathMarksFallback(post);
  if (!post || typeof post !== 'object') return false;
  if (pathMarksFallback(post.slug) || pathMarksFallback(post.path)) return true;
  if (post.fallback === true || post.fallback === 'true') return true;
  const mode = String(post.mode || '').trim().toLowerCase();
  return mode === 'fallback' || mode === 'mock';
}

export function fallbackTemplateId(slug) {
  const segment = pathSegments(slug).pop() || '';
  const match = segment.match(/^fallback-(.+)-\d{4}-\d{2}-\d{2}$/i);
  return match ? match[1].toLowerCase() : '';
}

export function filterIndexablePosts(posts) {
  return (Array.isArray(posts) ? posts : []).filter((post) => !isFallbackPost(post));
}

export function robotsForPost(post) {
  return isFallbackPost(post) ? ROBOTS_NOINDEX : ROBOTS_INDEX;
}

/**
 * Fallback pages canonical to the published topic article when one exists,
 * otherwise to the blog index so they do not self-canonical.
 */
export function canonicalForPost(post, posts = []) {
  if (!post?.slug) return canonicalBlogIndexUrl();
  if (!isFallbackPost(post)) return canonicalBlogUrl(post.slug);

  const indexable = new Set(
    filterIndexablePosts(posts)
      .map((item) => item?.slug)
      .filter(Boolean),
  );
  const hinted = String(post.topicSlug || '').trim();
  if (hinted && indexable.has(hinted)) return canonicalBlogUrl(hinted);

  const templateId = fallbackTemplateId(post.slug);
  const mapped = FALLBACK_TOPIC_SLUG[templateId];
  if (mapped && indexable.has(mapped)) return canonicalBlogUrl(mapped);
  if (templateId && indexable.has(templateId)) return canonicalBlogUrl(templateId);

  return canonicalBlogIndexUrl();
}

export function withRobotsMeta(html, content) {
  const tag = `<meta name="robots" content="${String(content).replace(/"/g, '')}" />`;
  if (/<meta\s+name=["']robots["']\s+content=["'][^"']*["']\s*\/?>/i.test(html)) {
    return html.replace(/<meta\s+name=["']robots["']\s+content=["'][^"']*["']\s*\/?>/i, tag);
  }
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
  }
  return `${html}\n${tag}`;
}

export function buildArticleJsonLd(post) {
  const url = canonicalBlogUrl(post.slug);
  const orgId = `${SITE_ORIGIN}/#organization`;

  const graph = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: ORGANIZATION_NAME,
      url: `${SITE_ORIGIN}/`,
      email: 'hello@b2g.org',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '111 NE 1ST Street',
        addressLocality: 'Miami',
        addressRegion: 'FL',
        postalCode: '33132',
        addressCountry: 'US',
      },
    },
    {
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      datePublished: post.datePublished,
      dateModified: post.dateModified || post.datePublished,
      inLanguage: 'en',
      isAccessibleForFree: true,
      image: post.coverImage || undefined,
      mainEntityOfPage: url,
      author: {
        '@type': 'Organization',
        name: post.author?.name || 'B2G Editorial',
        url: `${SITE_ORIGIN}/`,
      },
      publisher: { '@id': orgId },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: canonicalBlogIndexUrl() },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (post.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: post.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
