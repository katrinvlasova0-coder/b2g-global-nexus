export const META_PIXEL_ID = '1080708457716813';

function fbqSafe(...args) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args);
  }
}

export function trackPageView() {
  fbqSafe('track', 'PageView');
}

export function trackLead(meta = {}) {
  const data = {
    content_name: meta.form || 'contact',
    content_category: meta.source || 'website',
  };

  if (meta.utmSource) data.utm_source = meta.utmSource;
  if (meta.utmMedium) data.utm_medium = meta.utmMedium;
  if (meta.utmCampaign) data.utm_campaign = meta.utmCampaign;
  if (meta.utmTerm) data.utm_term = meta.utmTerm;
  if (meta.utmContent) data.utm_content = meta.utmContent;

  fbqSafe('track', 'Lead', data);
}
