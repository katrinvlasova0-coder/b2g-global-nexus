import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLeadPayload } from './leads.js';

test('buildLeadPayload maps form fields for the sheet', () => {
  const payload = buildLeadPayload(
    {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      country: 'USA',
      role: 'Partner',
      message: 'Hello',
    },
    { language: 'en', page: 'https://example.com/#contact' },
  );

  assert.equal(payload.name, 'Ada Lovelace');
  assert.equal(payload.email, 'ada@example.com');
  assert.equal(payload.country, 'USA');
  assert.equal(payload.role, 'Partner');
  assert.equal(payload.message, 'Hello');
  assert.equal(payload.language, 'en');
  assert.equal(payload.page, 'https://example.com/#contact');
  assert.match(payload.submittedAt, /^\d{4}-\d{2}-\d{2}T/);
});
