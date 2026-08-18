import { validateArticle } from './validator';
import {
  SAFE_TEMPLATES,
  buildSafeFallbackArticle,
  selectTemplate,
} from './safe-fallback';

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

const dates = ['2026-08-18', '2026-08-19', '2026-08-20', '2026-08-21', '2026-08-22', '2026-08-23'];

for (const date of dates) {
  const selected = selectTemplate(date);
  assert(Boolean(selected?.id), `no template for ${date}`);
}

const used = new Set(dates.map((d) => selectTemplate(d).id));
assert(used.size === SAFE_TEMPLATES.length, 'rotation should hit every template across 6 days');

for (const template of SAFE_TEMPLATES) {
  const { slug, content, request } = buildSafeFallbackArticle(template, '2026-08-18', {
    links: [
      { slug: 'how-to-find-public-tenders-worldwide', text: 'How to find public tenders worldwide' },
      { slug: 'how-to-prepare-tender-documentation', text: 'How to prepare tender documentation' },
    ],
  });

  assert(slug === `fallback-${template.id}-2026-08-18`, `unexpected slug ${slug}`);
  assert(content.includes('educational purposes only'), `${slug} missing disclaimer`);
  assert(
    content.includes('Leave your contacts for a consultation on tender selection and documentation preparation'),
    `${slug} missing required CTA`,
  );
  assert(/name:\s*"B2G Editorial"/.test(content), `${slug} wrong author`);
  assert(!content.includes('---en---'), `${slug} still has bilingual marker`);
  assert(!/we guarantee that you will win/i.test(content), `${slug} contains win promise`);

  const result = validateArticle(content, request.keywordDe, 1500);
  if (!result.valid || result.warnings.length) {
    console.log(`\n--- ${slug} ---`);
    console.log('errors', result.errors);
    console.log('warnings', result.warnings);
    console.log('stats', result.stats);
  }
  assert(result.valid, `${slug} invalid:\n${result.errors.join('\n')}`);
  assert(
    result.stats.wordCountDe >= 1500,
    `${slug} word count ${result.stats.wordCountDe} < 1500`,
  );
  assert(!content.includes('## Further reading'), `${slug} still has Further reading`);
  assert(!content.includes('educational snapshot'), `${slug} still has snapshot dump`);
  assert(
    !/is an educational topic, not a promise of a contract award/.test(content),
    `${slug} still has factory lead paragraph`,
  );

  const body = content.split(/^---$/m).slice(2).join('---');
  const coverMatch = content.match(/^coverImage:\s+"?([^"\n]+)"?/m);
  const coverUrl = coverMatch?.[1]?.trim() ?? '';
  const coverPath = coverUrl.split('?')[0];
  const bodyImages = [...body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1]);
  assert(
    !bodyImages.some((url) => url.split('?')[0] === coverPath),
    `${slug} repeats cover image in the body`,
  );
}

console.log('✅ safe-fallback.test.ts passed');
