export const DATA_ROOM_FILES = [
  { title: 'Certificate of incorporation', folder: 'Legal', file: 'legal__certificate-of-incorporation.pdf' },
  { title: 'B2G EIN', folder: 'Legal', file: 'legal__b2g-global-services-corp-ein.pdf' },
  { title: 'B2G Pitch Deck', folder: 'Business and Market', file: 'pitch__b2g-pitch-deck.pdf' },
  { title: 'B2G Business plan', folder: 'Business and Market', file: 'business-market__b2g-business-plan.pdf' },
  { title: 'B2G Coin White Paper', folder: 'Business and Market', file: 'b2g-coin-concept__b2g-wp-v1.0.0.-.pdf' },
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
