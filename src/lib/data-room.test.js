import test from 'node:test';
import assert from 'node:assert/strict';
import { DATA_ROOM_FILES, groupDataRoomFiles, localDataRoomHref } from './data-room.js';

test('data room publishes only legal and business documents', () => {
  assert.deepEqual(
    DATA_ROOM_FILES.map((file) => [file.folder, file.title]),
    [
      ['Legal', 'Certificate of incorporation'],
      ['Legal', 'B2G EIN'],
      ['Business and Market', 'B2G Pitch Deck'],
      ['Business and Market', 'B2G Business plan'],
      ['Business and Market', 'B2G Coin White Paper'],
    ],
  );

  const groups = groupDataRoomFiles(DATA_ROOM_FILES);
  assert.deepEqual(groups.map((group) => group.folder), ['Legal', 'Business and Market']);
  assert.equal(groups[0].files.length, 2);
  assert.equal(groups[1].files.length, 3);
  assert.match(localDataRoomHref(DATA_ROOM_FILES[0]), /^\/data-room\//);
});
