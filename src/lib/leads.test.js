import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLeadPayload, detectDevice } from './leads.js';

test('buildLeadPayload maps form fields for the sheet', () => {
  const payload = buildLeadPayload(
    {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      country: 'USA',
      role: 'Partner',
      message: 'Hello',
    },
    {
      language: 'ru',
      page: 'https://b2g.org/#contact',
      source: 'website-contact',
      site: 'b2g.org',
      device: 'mobile',
      form: 'contact',
    },
  );

  assert.equal(payload.name, 'Ada Lovelace');
  assert.equal(payload.email, 'ada@example.com');
  assert.equal(payload.country, 'USA');
  assert.equal(payload.role, 'Partner');
  assert.equal(payload.message, 'Hello');
  assert.equal(payload.language, 'ru');
  assert.equal(payload.languageName, 'Русский');
  assert.equal(payload.page, 'https://b2g.org/#contact');
  assert.equal(payload.source, 'website-contact');
  assert.equal(payload.site, 'b2g.org');
  assert.equal(payload.device, 'mobile');
  assert.equal(payload.form, 'contact');
  assert.match(payload.submittedAt, /^\d{4}-\d{2}-\d{2}T/);
});

test('detectDevice tags phones vs desktops', () => {
  assert.equal(detectDevice('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 390), 'mobile');
  assert.equal(detectDevice('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 1440), 'desktop');
});
