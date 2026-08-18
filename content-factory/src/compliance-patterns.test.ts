import { FORBIDDEN_PATTERNS } from '../config/forbidden-patterns';

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function shouldMatch(pattern: RegExp, text: string, label: string): void {
  assert(pattern.test(text), `expected to MATCH (${label}): ${text}`);
}

function shouldNotMatch(pattern: RegExp, text: string, label: string): void {
  assert(!pattern.test(text), `expected NOT to match (${label}): ${text}`);
}

shouldNotMatch(
  FORBIDDEN_PATTERNS.guaranteedWin,
  'There is no guaranteed win in public procurement. Outcomes depend on the published criteria.',
  'educational no-guarantee sentence',
);

shouldMatch(
  FORBIDDEN_PATTERNS.guaranteedWin,
  'We guarantee that you will win the next tender.',
  'solicitation win promise',
);

shouldMatch(
  FORBIDDEN_PATTERNS.guaranteedWin,
  'This method is guaranteed to win the tender.',
  'guaranteed to win',
);

shouldNotMatch(
  FORBIDDEN_PATTERNS.winRateClaim,
  'Win rates vary by market, lot structure and evaluator weighting.',
  'educational win-rate discussion',
);

shouldMatch(
  FORBIDDEN_PATTERNS.winRateClaim,
  'Our clients enjoy an 87% win rate.',
  'numeric win-rate claim',
);

shouldNotMatch(
  FORBIDDEN_PATTERNS.guaranteedFinance,
  'There is no guaranteed financing and no guaranteed bank guarantee in this briefing.',
  'educational no-guarantee financing',
);

shouldMatch(
  FORBIDDEN_PATTERNS.guaranteedFinance,
  'We offer guaranteed financing for every awarded contract.',
  'guaranteed financing',
);

shouldNotMatch(
  FORBIDDEN_PATTERNS.governmentBody,
  'B2G Global Services Corp. helps companies participate in government procurement worldwide.',
  'B2G works with government procurement',
);

shouldMatch(
  FORBIDDEN_PATTERNS.governmentBody,
  'B2G Global Services Corp is a government agency for public tenders.',
  'false government identity',
);

console.log('✅ compliance-patterns.test.ts passed');
