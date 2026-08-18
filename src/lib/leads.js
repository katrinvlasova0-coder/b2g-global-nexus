import { LANGUAGES } from './translations.js';

const LANGUAGE_NAMES = Object.fromEntries(LANGUAGES.map((item) => [item.code, item.label]));
const UTM_STORAGE_KEY = 'b2g_utm';

const EMPTY_UTM = {
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmTerm: '',
  utmContent: '',
};

export function detectDevice(userAgent = '', width = 0) {
  const ua = String(userAgent).toLowerCase();
  if (/ipad|tablet/.test(ua)) return 'tablet';
  if (/mobi|iphone|android/.test(ua) || (Number(width) > 0 && Number(width) < 768)) return 'mobile';
  return 'desktop';
}

export function parseUtmParams(search = '') {
  const params = new URLSearchParams(String(search).replace(/^[?#]/, ''));
  return {
    utmSource: String(params.get('utm_source') || '').trim(),
    utmMedium: String(params.get('utm_medium') || '').trim(),
    utmCampaign: String(params.get('utm_campaign') || '').trim(),
    utmTerm: String(params.get('utm_term') || '').trim(),
    utmContent: String(params.get('utm_content') || '').trim(),
  };
}

export function captureAttribution(search = '', storage) {
  const fromUrl = parseUtmParams(search);
  if (Object.values(fromUrl).some(Boolean)) {
    storage?.setItem?.(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
    return fromUrl;
  }

  try {
    const stored = JSON.parse(storage?.getItem?.(UTM_STORAGE_KEY) || '{}');
    return {
      utmSource: String(stored.utmSource || '').trim(),
      utmMedium: String(stored.utmMedium || '').trim(),
      utmCampaign: String(stored.utmCampaign || '').trim(),
      utmTerm: String(stored.utmTerm || '').trim(),
      utmContent: String(stored.utmContent || '').trim(),
    };
  } catch {
    return { ...EMPTY_UTM };
  }
}

function consentValue(value) {
  if (value === true || value === 'yes' || value === 'on' || value === 'true') return 'yes';
  return 'no';
}

export function buildLeadPayload(fields, meta = {}) {
  const language = String(meta.language || 'en').trim() || 'en';
  const attribution = {
    utmSource: meta.utmSource || '',
    utmMedium: meta.utmMedium || '',
    utmCampaign: meta.utmCampaign || '',
    utmTerm: meta.utmTerm || '',
    utmContent: meta.utmContent || '',
  };

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
    consentsAccepted: meta.consentsAccepted || consentValue(fields.consent),
    ...attribution,
    submittedAt: new Date().toISOString(),
  };
}

export async function submitLead(payload, url = import.meta.env?.VITE_LEADS_WEBHOOK_URL) {
  if (!url) {
    throw new Error('missing_webhook');
  }

  const body = new URLSearchParams(payload);
  const response = await fetch(url, {
    method: 'POST',
    body,
    mode: 'no-cors',
  });

  return { ok: true, type: response?.type || 'opaque' };
}
