/** Patterns that break the MDX blog engine — used by validator and post-generation cleanup */
export const FORBIDDEN_PATTERNS = {
  jsxComponent: /<[A-Z][a-zA-Z]+[\s/>]/g,
  anchorId: /\{#[^}]+\}/,
  internalAnchorLink: /\[([^\]]+)\]\(#[^)]+\)/,
  scriptTag: /<script[\s>]/i,
  h1InBody: /^# [^#]/m,
  yamlBlockTags: /^tags:\s*\n\s*-/m,
  yamlBlockFaq: /^faq:\s*\n\s*-\s*question/m,
  imageJsx: /<Image[\s/>]/,
  keyTakeaways: /<KeyTakeaways/,
  callout: /<Callout/,
  mockAbsatzFiller: /Absatz \d+ vertieft/i,
  /** Solicitation-style win promises — educational “there is no guaranteed win” must pass. */
  guaranteedWin:
    /\b(?:we\s+guarantee(?:\s+that)?\s+you\s+will\s+win|guaranteed\s+to\s+win(?:\s+the\s+tender)?|you\s+will\s+definitely\s+win)\b/i,
  winRateClaim: /\b(?:\d{1,3}\s*%\s+win[- ]rate|win[- ]rate\s+of\s+\d{1,3}\s*%|100\s*%\s+(?:success|win)\s+rate)\b/i,
  guaranteedFinance:
    /\b(?:we\s+(?:offer|provide|arrange)\s+guaranteed\s+(?:financing|loans?|bank\s+guarantees?)|guaranteed\s+financing\s+for|we\s+guarantee\s+(?:the\s+)?(?:loan|financing|bank\s+guarantee|contract\s+award))\b/i,
  governmentBody:
    /\b(?:B2G(?:\s+Global)?(?:\s+Services)?(?:\s+Corp)?\s+is\s+(?:an?\s+)?(?:government|public)\s+(?:agency|authority|body)|we\s+are\s+(?:an?\s+)?official\s+government\s+(?:agency|authority|portal|body))\b/i,
  fakeExpertAuthor:
    /dr\.\s*(?:stefan\s+kaufmann|markus\s+hoffmann)|elena\s+(?:marchetti|kowalski|berger)|pierre\s+dijon|michael\s+weber|max\s+müller|ariel\s+kharan/i,
} as const;

export const FORBIDDEN_PATTERN_MESSAGES: Record<keyof typeof FORBIDDEN_PATTERNS, string> = {
  jsxComponent: 'JSX components found — not allowed in MDX',
  anchorId: 'Anchor IDs {#id} found — not allowed in MDX',
  internalAnchorLink: 'Internal anchor links [text](#id) found — not allowed',
  scriptTag: '<script> tag found — not allowed in MDX',
  h1InBody: 'H1 (# Heading) in article body — not allowed',
  yamlBlockTags: 'YAML block array for tags — use an inline array',
  yamlBlockFaq: 'YAML block array for faq — use list syntax in frontmatter',
  imageJsx: '<Image /> JSX — only ![alt](url) is allowed',
  keyTakeaways: '<KeyTakeaways> component — not allowed',
  callout: '<Callout> component — not allowed',
  mockAbsatzFiller: 'Mock copy-paste filler (Absatz N vertieft) — article invalid',
  guaranteedWin: 'Guaranteed tender win claim — not allowed',
  winRateClaim: 'Specific win-rate claim — not allowed',
  guaranteedFinance: 'Guaranteed financing / contract award claim — not allowed',
  governmentBody: 'B2G presented as a government body — not allowed',
  fakeExpertAuthor: 'Invented expert author — only B2G Editorial is allowed',
};
