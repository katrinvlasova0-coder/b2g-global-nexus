import test from 'node:test';
import assert from 'node:assert/strict';
import { sectionTo, isSectionHash } from './nav.js';

test('sectionTo points hash links at the landing page', () => {
  assert.deepEqual(sectionTo('#who-we-seek'), { pathname: '/', hash: '#who-we-seek' });
  assert.deepEqual(sectionTo('contact'), { pathname: '/', hash: '#contact' });
});

test('isSectionHash recognizes landing section ids', () => {
  assert.equal(isSectionHash('#expertise'), true);
  assert.equal(isSectionHash('#platform'), false);
});
