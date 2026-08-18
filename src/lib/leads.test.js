import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLeadPayload, captureAttribution, detectDevice, parseUtmParams, submitLead } from './leads.js';

test('buildLeadPayload maps form fields for the sheet', () => {
  const payload = buildLeadPayload(
    {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      country: 'USA',
      role: 'Partner',
      message: 'Hello',
      consent: 'yes',
    },
    {
      language: 'ru',
      page: 'https://b2g.org/?utm_source=meta&utm_medium=cpc&utm_campaign=partners#contact',
      source: 'website-contact',
      site: 'b2g.org',
      device: 'mobile',
      form: 'contact',
      utmSource: 'meta',
      utmMedium: 'cpc',
      utmCampaign: 'partners',
      utmTerm: 'public procurement',
      utmContent: 'lead-form',
    },
  );

  assert.equal(payload.name, 'Ada Lovelace');
  assert.equal(payload.email, 'ada@example.com');
  assert.equal(payload.country, 'USA');
  assert.equal(payload.role, 'Partner');
  assert.equal(payload.message, 'Hello');
  assert.equal(payload.language, 'ru');
  assert.equal(payload.languageName, 'Русский');
  assert.equal(payload.page, 'https://b2g.org/?utm_source=meta&utm_medium=cpc&utm_campaign=partners#contact');
  assert.equal(payload.source, 'website-contact');
  assert.equal(payload.site, 'b2g.org');
  assert.equal(payload.device, 'mobile');
  assert.equal(payload.form, 'contact');
  assert.equal(payload.consentsAccepted, 'yes');
  assert.equal(payload.utmSource, 'meta');
  assert.equal(payload.utmMedium, 'cpc');
  assert.equal(payload.utmCampaign, 'partners');
  assert.equal(payload.utmTerm, 'public procurement');
  assert.equal(payload.utmContent, 'lead-form');
  assert.match(payload.submittedAt, /^\d{4}-\d{2}-\d{2}T/);
});

test('parseUtmParams reads campaign tags from a landing URL', () => {
  assert.deepEqual(
    parseUtmParams('?utm_source=meta&utm_medium=cpc&utm_campaign=eu-partners&utm_term=tenders&utm_content=hero'),
    {
      utmSource: 'meta',
      utmMedium: 'cpc',
      utmCampaign: 'eu-partners',
      utmTerm: 'tenders',
      utmContent: 'hero',
    },
  );
});

test('captureAttribution keeps first-touch UTMs in session storage', () => {
  const storage = new Map();
  const api = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  };

  const first = captureAttribution('?utm_source=meta&utm_medium=cpc&utm_campaign=launch', api);
  assert.equal(first.utmSource, 'meta');
  assert.equal(first.utmCampaign, 'launch');

  const later = captureAttribution('', api);
  assert.equal(later.utmSource, 'meta');
  assert.equal(later.utmMedium, 'cpc');
  assert.equal(later.utmCampaign, 'launch');
});

test('detectDevice tags phones vs desktops', () => {
  assert.equal(detectDevice('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 390), 'mobile');
  assert.equal(detectDevice('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 1440), 'desktop');
});

test('submitLead throws when the Google Sheet webhook is missing', async () => {
  await assert.rejects(() => submitLead({ name: 'Test' }, ''), { message: 'missing_webhook' });
  await assert.rejects(() => submitLead({ name: 'Test' }, undefined), { message: 'missing_webhook' });
});

test('submitLead posts tagged lead fields to the webhook', async () => {
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return { type: 'opaque' };
  };

  try {
    const payload = buildLeadPayload(
      {
        name: 'Test Lead',
        email: 'test-lead@b2g.org',
        country: 'UAE',
        role: 'Partner',
        message: 'Form send test',
        consent: 'yes',
      },
      {
        language: 'en',
        page: 'https://b2g.org/?utm_source=meta#contact',
        source: 'website-contact',
        site: 'b2g.org',
        device: 'desktop',
        form: 'contact',
        utmSource: 'meta',
      },
    );

    const result = await submitLead(payload, 'https://script.google.com/macros/s/test-webhook/exec');
    assert.equal(result.ok, true);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, 'https://script.google.com/macros/s/test-webhook/exec');
    assert.equal(calls[0].options.method, 'POST');
    assert.equal(calls[0].options.mode, 'no-cors');

    const body = String(calls[0].options.body);
    assert.match(body, /name=Test\+Lead/);
    assert.match(body, /email=test-lead%40b2g.org/);
    assert.match(body, /language=en/);
    assert.match(body, /languageName=English/);
    assert.match(body, /source=website-contact/);
    assert.match(body, /form=contact/);
    assert.match(body, /device=desktop/);
    assert.match(body, /site=b2g.org/);
    assert.match(body, /consentsAccepted=yes/);
    assert.match(body, /utmSource=meta/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
