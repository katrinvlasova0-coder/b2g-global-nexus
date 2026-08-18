export const DATA_ROOM_FILES = [
  { title: 'B2G WP V1.0.0.pdf', folder: 'B2G Coin Concept', file: 'b2g-coin-concept__b2g-wp-v1.0.0.-.pdf' },
  { title: 'B2G Business Plan.pdf', folder: 'Business & Market', file: 'business-market__b2g-business-plan.pdf' },
  { title: 'B2G Global Services Corp - Bylaws.pdf', folder: 'Legal', file: 'legal__b2g-global-services-corp-bylaws.pdf' },
  { title: 'Indemnification Agreement for Raymond Ratti.pdf', folder: 'Legal', file: 'legal__b2g-global-services-corp-indemnification-agreement-for-raymond-ratti.pdf' },
  { title: 'Stockholder Consent of Indemnification Agreements.pdf', folder: 'Legal', file: 'legal__b2g-global-services-corp-stockholder-consent-of-indemnification-agreements.pdf' },
  { title: 'Technology Assignment Agreement - Ariel Kharan.pdf', folder: 'Legal', file: 'legal__b2g-global-services-corp-technology-assignment-agreement-ariel-kharan.pdf' },
  { title: 'B2G Global Services Corp EIN.pdf', folder: 'Legal', file: 'legal__b2g-global-services-corp-ein.pdf' },
  { title: 'Certificate of Incorporation.pdf', folder: 'Legal', file: 'legal__certificate-of-incorporation.pdf' },
  { title: 'B2G (Telecombau) LT.docx', folder: 'Letters', file: 'letters__b2g-telecombau-lt.docx' },
  { title: 'B2G (Telecombau) LT.pdf', folder: 'Letters', file: 'letters__b2g-telecombau-lt.pdf' },
  { title: 'B2G (Telecombau) LV.docx', folder: 'Letters', file: 'letters__b2g-telecombau-lv.docx' },
  { title: 'B2G (Telecombau) LV.pdf', folder: 'Letters', file: 'letters__b2g-telecombau-lv.pdf' },
  { title: 'B2G (Telecombau) PL.docx', folder: 'Letters', file: 'letters__b2g-telecombau-pl.docx' },
  { title: 'B2G (Telecombau) PL.pdf', folder: 'Letters', file: 'letters__b2g-telecombau-pl.pdf' },
  { title: 'Competition.pdf', folder: 'Market Overview', file: 'market-overview__competition-.pdf' },
  { title: 'Sources.pdf', folder: 'Market Overview', file: 'market-overview__sources.pdf' },
  { title: 'B2G Pitch Deck.pdf', folder: 'Pitch', file: 'pitch__b2g-pitch-deck.pdf' },
  { title: 'Logo B2G.jpg', folder: 'General', file: 'general__logo-b2g.jpg' },
];

export const PITCH_DECK_FILE = 'docs/B2G-Pitch-Deck.pdf';

export function publicHref(path) {
  const base = import.meta.env?.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${String(path).replace(/^\//, '')}`;
}

export function localDataRoomHref(file) {
  return publicHref(`data-room/${file.file}`);
}

export function groupDataRoomFiles(files = DATA_ROOM_FILES) {
  const order = [];
  const byFolder = new Map();
  for (const file of files) {
    if (!byFolder.has(file.folder)) {
      byFolder.set(file.folder, []);
      order.push(file.folder);
    }
    byFolder.get(file.folder).push(file);
  }
  return order.map((folder) => ({ folder, files: byFolder.get(folder) }));
}
