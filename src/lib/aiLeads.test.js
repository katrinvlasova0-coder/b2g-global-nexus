import test from 'node:test';
import assert from 'node:assert/strict';
import { buildAiDeployLeadPayload } from './aiLeads.js';

test('buildAiDeployLeadPayload maps deployment fields into sheet contract', () => {
  const payload = buildAiDeployLeadPayload(
    {
      company: 'Acme GmbH',
      contact_person: 'Ada Lovelace',
      email: 'ada@acme.test',
      phone: '+49 123',
      country: 'Germany',
      industry: 'Construction',
      tender_volume: '12',
      team_size: '4',
      preferred_solution: 'AI Tender Specialist',
      additional_requirements: 'Need EU portals',
      consent: 'yes',
    },
    {
      language: 'en',
      page: 'https://b2g.org/ai/',
      device: 'desktop',
      utmSource: 'meta',
      utmMedium: 'cpc',
      utmCampaign: 'ai',
      utmTerm: '',
      utmContent: '',
    },
  );

  assert.equal(payload.name, 'Ada Lovelace');
  assert.equal(payload.email, 'ada@acme.test');
  assert.equal(payload.country, 'Germany');
  assert.equal(payload.role, 'AI Tender Specialist');
  assert.equal(payload.source, 'ai-landing');
  assert.equal(payload.form, 'ai-deploy');
  assert.equal(payload.consentsAccepted, 'yes');
  assert.equal(payload.utmSource, 'meta');
  assert.match(payload.message, /Company: Acme GmbH/);
  assert.match(payload.message, /Solution: AI Tender Specialist/);
  assert.match(payload.message, /Need EU portals/);
});
