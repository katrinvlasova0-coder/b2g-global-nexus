const SECTION_IDS = new Set(['top', 'who-we-seek', 'expertise', 'capabilities', 'contact']);

export function sectionTo(hash) {
  const raw = String(hash || '').trim();
  const id = raw.startsWith('#') ? raw.slice(1) : raw;
  return { pathname: '/', hash: `#${id}` };
}

export function isSectionHash(hash) {
  const raw = String(hash || '').trim();
  const id = raw.startsWith('#') ? raw.slice(1) : raw;
  return SECTION_IDS.has(id);
}
