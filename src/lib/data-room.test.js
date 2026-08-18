import test from 'node:test';
import assert from 'node:assert/strict';
import { DATA_ROOM_FILES, groupDataRoomFiles, localDataRoomHref } from './data-room.js';

test('data room files are grouped and downloadable from the site', () => {
  assert.ok(DATA_ROOM_FILES.length >= 8);
  const groups = groupDataRoomFiles(DATA_ROOM_FILES);
  assert.ok(groups.some((g) => g.folder === 'Legal'));
  assert.ok(groups.every((g) => g.files.every((f) => f.file && f.title)));
  const pitch = DATA_ROOM_FILES.find((f) => /pitch/i.test(f.title));
  assert.ok(pitch);
  assert.match(localDataRoomHref(pitch), /^\/data-room\//);
});
