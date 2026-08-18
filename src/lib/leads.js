export function buildLeadPayload(fields, meta = {}) {
  return {
    name: String(fields.name || '').trim(),
    email: String(fields.email || '').trim(),
    country: String(fields.country || '').trim(),
    role: String(fields.role || '').trim(),
    message: String(fields.message || '').trim(),
    language: meta.language || 'en',
    page: meta.page || '',
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
