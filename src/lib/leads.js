import { LANGUAGES } from './translations.js';

const LANGUAGE_NAMES = Object.fromEntries(LANGUAGES.map((item) => [item.code, item.label]));

export function detectDevice(userAgent = '', width = 0) {
  const ua = String(userAgent).toLowerCase();
  if (/ipad|tablet/.test(ua)) return 'tablet';
  if (/mobi|iphone|android/.test(ua) || (Number(width) > 0 && Number(width) < 768)) return 'mobile';
  return 'desktop';
}

export function buildLeadPayload(fields, meta = {}) {
  const language = String(meta.language || 'en').trim() || 'en';

  return {
    name: String(fields.name || '').trim(),
    email: String(fields.email || '').trim(),
    country: String(fields.country || '').trim(),
    role: String(fields.role || '').trim(),
    message: String(fields.message || '').trim(),
    language,
    languageName: LANGUAGE_NAMES[language] || language,
    page: meta.page || '',
    source: meta.source || 'website',
    site: meta.site || 'b2g.org',
    device: meta.device || 'unknown',
    form: meta.form || 'contact',
    submittedAt: new Date().toISOString(),
  };
}

export async function submitLead(payload) {
  const url = import.meta.env.VITE_LEADS_WEBHOOK_URL;
  if (!url) {
    throw new Error('missing_webhook');
  }

  const body = new URLSearchParams(payload);
  await fetch(url, {
    method: 'POST',
    body,
    mode: 'no-cors',
  });
}
