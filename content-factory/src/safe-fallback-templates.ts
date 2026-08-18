export type FallbackCategory = 'Tenders' | 'Documentation' | 'Financing' | 'Contractors';

export interface SafeTemplate {
  id: string;
  category: FallbackCategory;
  cluster: string;
  keywordDe: string;
  keywordEn: string;
  titleDe: string;
  titleEn: string;
  descriptionDe: string;
  descriptionEn: string;
  unsplashQuery: string;
  headingsDe: [string, string, string, string, string, string];
  headingsEn: [string, string, string, string, string, string];
  factsDe: string[];
  factsEn: string[];
  listDe: string[];
  listEn: string[];
  tableHeadersDe: [string, string, string];
  tableHeadersEn: [string, string, string];
  tableRows: Array<[string, string, string]>;
  faqDe: Array<{ question: string; answer: string }>;
  faqEn: Array<{ question: string; answer: string }>;
}

function t(
  id: string,
  category: FallbackCategory,
  keyword: string,
  title: string,
  description: string,
  unsplashQuery: string,
  headings: SafeTemplate['headingsEn'],
  facts: string[],
  list: string[],
  tableHeaders: SafeTemplate['tableHeadersEn'],
  tableRows: Array<[string, string, string]>,
  faq: Array<{ question: string; answer: string }>,
): SafeTemplate {
  return {
    id,
    category,
    cluster: category,
    keywordDe: keyword,
    keywordEn: keyword,
    titleDe: title,
    titleEn: title,
    descriptionDe: description,
    descriptionEn: description,
    unsplashQuery,
    headingsDe: headings,
    headingsEn: headings,
    factsDe: facts,
    factsEn: facts,
    listDe: list,
    listEn: list,
    tableHeadersDe: tableHeaders,
    tableHeadersEn: tableHeaders,
    tableRows,
    faqDe: faq,
    faqEn: faq,
  };
}

const NOTICE_FACTS = [
  'A tender notice is an official invitation to compete under published rules. It names the contracting authority, the subject matter, the estimated timeline and the channel for documents. Marketing summaries on third-party websites are not the notice.',
  'Identification fields matter: official name, national ID, CPV or equivalent, lots, and the submission deadline with timezone. Copying only the title into a CRM loses the legal entity that will sign the contract.',
  'Lots can be awarded separately. Capacity tests may apply per lot or to the whole procedure. A bidder that treats a multi-lot notice as one job often mis-sizes bonds and staffing.',
  'Clarification questions have their own cut-off, earlier than submission. A question sent after that stamp is usually ignored. Answers published to all bidders become part of the file.',
  'Eligibility is not a vibe. Exclusion grounds, economic standing and technical capacity are documentary tests. A missing annex can make a bid administratively non-responsive.',
  'Evaluation methods differ: lowest price, price-quality, or a staged filter. The grid in the tender documents outranks a verbal hint from a helpdesk.',
  'E-procurement portals apply timestamps at upload, not at the moment you click “save draft”. Local digital-signature rules can block a file that looks complete on disk.',
  'B2G Global Services Corp. is a private company. It does not issue notices and it is not a government agency. Primary sources remain the authority’s portal and the tender file as of the action date.',
];

const FILE_FACTS = [
  'A bid file is a mapped set of evidence, not a pile of PDFs. Each requirement in the tender documents should point to a named annex, owner and as-of date.',
  'Administrative, technical and financial envelopes are often separated. Mixing price into a technical PDF can be grounds for rejection where envelopes must stay sealed.',
  'Templates supplied by the authority usually prevail over a bidder’s house style. Changing a mandatory form “for clarity” is a common cause of non-responsiveness.',
  'Certificates expire. ISO, licences, tax clearances and powers of attorney need a validity check against the submission date, not against the date the scan was made.',
  'Translations may be working copies or certified copies. The tender documents say which. Where the original language prevails, the certified original still belongs in the archive.',
  'Page limits and font rules are compliance, not design. Evaluators can stop reading at the limit. Extra brochures in the wrong envelope do not help.',
  'Internal version control should freeze a submission pack: filename, hash or print date, and who clicked upload. Chat screenshots are not an archive.',
  'This briefing does not replace local counsel. File maps differ by jurisdiction. The published tender documents remain the controlling list.',
];

const BOND_FACTS = [
  'A bid bond or tender guarantee is security for the bid period. A performance bond is security after award. They are different instruments with different start dates and wording.',
  'Amount, currency, validity and the named beneficiary must match the tender documents. A “similar” guarantee from another procedure is usually not interchangeable.',
  'On-demand wording and conditional wording are not the same. Banks and authorities read the text, not the email that asked for the instrument.',
  'Issuing-bank acceptability can be limited to local banks or to banks with a stated rating. SWIFT messages do not override a local-form requirement.',
  'Release conditions should be in the file: unsuccessful bid, contract signature, or expiry. Silent assumptions about automatic release cause disputes.',
  'A bank’s credit review is independent of the contracting authority’s award. There is no guaranteed financing and no guaranteed bank guarantee in this briefing.',
  'Advance-payment guarantees, if used, sit on a third timeline tied to mobilisation cash. Mixing them with bid security confuses both the bank and the bid manager.',
  'Primary sources are the tender documents and the bank’s own guarantee form. Third-party blogs are not wording you can submit.',
];

const ELIG_FACTS = [
  'Exclusion grounds typically cover convictions, tax default, insolvency and false statements. Self-cleaning rules, where they exist, are documentary and timed — not a slogan.',
  'Economic and financial standing is often turnover over n years, sometimes in a related CPV. Group figures may need a supporting letter that matches the legal entity that bids.',
  'Technical capacity is references, staff CVs, plant and licences. A reference that cannot be contacted, or that names a different legal entity, is a weak exhibit.',
  'Reliance on other entities (parent, subcontractor) usually requires a signed commitment that those resources will be available. A logo on a slide is not reliance.',
  'Sanctions and beneficial-owner checks sit beside classic KYC. They do not replace the authority’s own exclusion list, and they do not make B2G a public authority.',
  'Joint ventures and consortia must match the form required: joint and several liability, lead member, named shares of work. A handshake memo is not a consortium agreement.',
  'Past performance is evidence, not a promised percentage of awards. A personalised success statistic is not a substitute for references.',
  'Verify the authority’s standard forms. Local affidavits and notarial rules vary. The notice tells you which legalisation chain applies.',
];

const PORTAL_FACTS = [
  'Electronic government procurement portals are the submission channel. A bid emailed to a personal inbox is usually invalid even if it arrived on time.',
  'Registration, company profile, digital certificates and user roles should be completed days before the deadline. First-time logins fail at the worst hour.',
  'File-size caps, allowed extensions and virus scans reject packs that open fine on a laptop. Test uploads with dummy files where the portal allows.',
  'TED and national portals can carry the same procedure with different document packages. The notice states which package is binding.',
  'Timezones are explicit. A 17:00 local-time stamp is not 17:00 in the bidder’s office if the portal uses another zone.',
  'Clarifications published on the portal become part of the file. Saving only the original PDF without addenda is a common archive error.',
  'Helpdesk chats are not amendments. If an operator says “send it by email”, still check whether the documents allow that channel.',
  'B2G does not operate official portals. Bookmark the authority’s URL from the notice, not from an ad.',
];

const SUB_FACTS = [
  'Named subcontractors, if required, become part of the bid. Swapping them after award may need consent. Capacity claimed through a subcontractor needs a commitment letter.',
  'Licences must match the work package: electrical, medical, transport, or local contractor registration. A general construction licence may not cover a specialised lot.',
  'Labour rules, posted-worker notifications and local-content percentages are documentary. They are not solved by a lower unit price.',
  'Payment milestones and retention should be mirrored in subcontracts so cash does not stop at the prime while the site still works.',
  'KYC on subcontractors is part of bid hygiene: beneficial owners, sanctions, litigation. It does not make the prime a government inspector.',
  'Backup capacity for critical trades reduces execution risk. Evaluators may score methodology; they still need lawful substitution rules.',
  'Cross-border crews add visa, tax presence and insurance questions. Those belong in the file before mobilisation, not after a stop-work order.',
  'Escrow or measured payments can protect a chain. They are contractual tools, not a guarantee that any party will be paid on a wished date.',
];

const DEFAULT_FAQ = (topic: string): Array<{ question: string; answer: string }> => [
  {
    question: `What is ${topic}?`,
    answer: `${topic} is an educational public-procurement topic. The published notice and tender documents remain the primary source for any live procedure.`,
  },
  {
    question: 'Does this article guarantee that I will win?',
    answer:
      'No. There is no guaranteed win. Outcomes depend on published criteria, local law and the evidence in the bid file.',
  },
  {
    question: 'Is B2G a government agency?',
    answer:
      'No. B2G Global Services Corp. is a private company. Official notices are issued by contracting authorities on their own portals.',
  },
  {
    question: 'Can you guarantee financing or a bank guarantee?',
    answer:
      'No. Banks run their own credit review. This briefing does not offer guaranteed financing or a guaranteed bank guarantee.',
  },
  {
    question: 'How can I get help with a live tender?',
    answer:
      'Leave your contacts for a consultation on tender selection and documentation preparation.',
  },
  {
    question: 'Where do I verify the facts?',
    answer:
      'Use the contracting authority’s portal, TED where applicable, and the tender documents as of the action date.',
  },
];

export const SAFE_TEMPLATES: SafeTemplate[] = [
  t(
    'read-tender-notice',
    'Tenders',
    'read a tender notice',
    'How to read a tender notice: fields, lots and deadlines',
    'How to read a tender notice without treating a summary site as official. Educational briefing on fields, lots, clarifications and eligibility — no win promises.',
    'person reading official tender documents',
    [
      'What a tender notice actually is',
      'Fields that identify the procedure',
      'Five checks before you download the file',
      'Notice versus portal versus addenda',
      'Common misreads of lots and deadlines',
      'Sources and limits of this briefing',
    ],
    NOTICE_FACTS,
    [
      'Copy the legal name of the contracting authority, not only the project title.',
      'Record the deadline with timezone and the clarification cut-off.',
      'List lots and whether capacity is per lot or for the whole procedure.',
      'Bookmark the official portal URL from the notice.',
      'Download addenda after the original PDF.',
      'Keep a dated folder; do not overwrite the first notice.',
    ],
    ['Document', 'Owner', 'As-of check'],
    [
      ['Notice', 'Bid lead', 'Portal timestamp'],
      ['Addenda', 'Bid lead', 'After each publication'],
      ['Eligibility list', 'Compliance', 'Against submission date'],
    ],
    DEFAULT_FAQ('read a tender notice'),
  ),
  t(
    'bid-file-map',
    'Documentation',
    'prepare tender documentation',
    'How to map tender documentation before you write prose',
    'A file map for tender documentation: annex owners, envelopes, certificates and version control. Educational, with a consultation CTA and no win-rate claims.',
    'tender documentation binders on a desk',
    [
      'Why a file map beats a folder dump',
      'Administrative, technical and financial envelopes',
      'Five documentary checks before freeze',
      'Certificates, translations and page limits',
      'Version control at upload',
      'Sources and what this map cannot do',
    ],
    FILE_FACTS,
    [
      'Turn each tender requirement into a named annex.',
      'Assign an owner and a validity date to every certificate.',
      'Keep price out of the technical envelope where rules require it.',
      'Use the authority’s forms; do not redesign mandatory tables.',
      'Freeze a submission pack with date and uploader.',
      'Store addenda next to the original documents.',
    ],
    ['Annex', 'Envelope', 'Risk if missing'],
    [
      ['Power of attorney', 'Administrative', 'Signatory rejected'],
      ['Methodology', 'Technical', 'Non-scoring or non-responsive'],
      ['Price schedule', 'Financial', 'Wrong envelope / rejection'],
    ],
    DEFAULT_FAQ('prepare tender documentation'),
  ),
  t(
    'bid-security-basics',
    'Financing',
    'bid bonds',
    'Bid bonds and tender guarantees: amount, wording, release',
    'Bid bonds explained as documentary instruments: amount, beneficiary, wording and release. Educational finance briefing without guaranteed financing claims.',
    'bank guarantee letter on a desk',
    [
      'Bid security versus performance security',
      'Amount, currency and beneficiary',
      'Five wording checks with the bank',
      'Release, expiry and unsuccessful bids',
      'What banks review that authorities do not',
      'Sources and limits',
    ],
    BOND_FACTS,
    [
      'Copy amount, currency and validity from the tender documents.',
      'Match the beneficiary’s legal name, not the project nickname.',
      'Ask whether local-bank issuance is mandatory.',
      'Separate bid security from performance and advance-payment instruments.',
      'Diary the expiry against the bid validity period.',
      'Keep the SWIFT or paper original with the bid archive.',
    ],
    ['Instrument', 'Starts', 'Typical end'],
    [
      ['Bid bond', 'Bid submission', 'Award / expiry / unsuccessful'],
      ['Performance bond', 'Contract signature', 'Taking-over / defects period'],
      ['Advance-payment guarantee', 'Advance paid', 'Amortised against invoices'],
    ],
    DEFAULT_FAQ('bid bonds'),
  ),
  t(
    'eligibility-evidence',
    'Tenders',
    'procurement eligibility',
    'Procurement eligibility: exclusion, capacity and references',
    'How procurement eligibility is evidenced: exclusion grounds, turnover, references and reliance on others. Educational — no guaranteed win and no fake experts.',
    'compliance checklist public procurement',
    [
      'Exclusion grounds as a documentary list',
      'Economic standing versus technical capacity',
      'Five evidence checks before you cite a group',
      'Reliance, JV and named subcontractors',
      'Sanctions and beneficial owners',
      'Sources and limits',
    ],
    ELIG_FACTS,
    [
      'List exclusion grounds from the tender documents, not from memory.',
      'Match turnover years and CPV filters to the notice.',
      'Verify that references name the bidding legal entity.',
      'Collect signed reliance letters before you claim group capacity.',
      'Screen beneficial owners; keep the report dated.',
      'Do not treat past performance as a promised win-rate.',
    ],
    ['Test', 'Typical evidence', 'Failure mode'],
    [
      ['Exclusion', 'Affidavits / extracts', 'False statement'],
      ['Financial standing', 'Accounts / bank letter', 'Wrong entity'],
      ['Technical capacity', 'References / CVs', 'Unreachable client'],
    ],
    DEFAULT_FAQ('procurement eligibility'),
  ),
  t(
    'e-procurement-portals',
    'Tenders',
    'electronic procurement portals',
    'Electronic procurement portals: logins, timestamps, addenda',
    'How electronic procurement portals timestamp a bid. Educational notes on registration, file caps, timezones and official URLs — B2G is not the portal.',
    'laptop government procurement website',
    [
      'The portal is the channel, not a brochure',
      'Registration and digital certificates',
      'Five technical checks before deadline day',
      'TED versus national packages',
      'Helpdesks versus amendments',
      'Sources and limits',
    ],
    PORTAL_FACTS,
    [
      'Create the company profile days before the deadline.',
      'Test allowed file types and size caps.',
      'Record the portal timezone next to the diary date.',
      'Download addenda after every publication.',
      'Do not treat helpdesk chat as an amendment.',
      'Bookmark the URL printed in the notice.',
    ],
    ['Check', 'When', 'If it fails'],
    [
      ['Login / certificate', 'D-7', 'Cannot upload'],
      ['Dummy upload', 'D-3', 'File rejected'],
      ['Final timestamp', 'Deadline', 'Non-submission'],
    ],
    DEFAULT_FAQ('electronic procurement portals'),
  ),
  t(
    'named-subcontractors',
    'Contractors',
    'select subcontractors public works',
    'Selecting subcontractors for public works: licences, KYC, backups',
    'How to select subcontractors for public works without treating a logo slide as capacity. Licences, KYC, named parties and payment chains — educational only.',
    'construction team site meeting',
    [
      'When a subcontractor must be named',
      'Licences and work packages',
      'Five diligence checks before you list a firm',
      'Payment milestones and retention',
      'Cross-border crews and local content',
      'Sources and limits',
    ],
    SUB_FACTS,
    [
      'Match licences to the actual work package.',
      'Collect a signed commitment if you rely on their capacity.',
      'Run dated KYC and sanctions checks.',
      'Mirror payment milestones in the subcontract.',
      'Plan a backup for critical trades.',
      'Read local-content and labour notices before mobilisation.',
    ],
    ['Topic', 'Document', 'Owner'],
    [
      ['Licence', 'Scan + validity', 'Compliance'],
      ['Commitment letter', 'Signed PDF', 'Bid lead'],
      ['KYC pack', 'Dated report', 'Risk'],
    ],
    DEFAULT_FAQ('select subcontractors public works'),
  ),
];
