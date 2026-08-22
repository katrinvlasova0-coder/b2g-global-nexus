import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { buildLeadPayload, captureAttribution, detectDevice, submitLead } from '@/lib/leads';
import { trackLead } from '@/lib/metaPixel';

export default function LeadForm({
  source = 'website-contact',
  form = 'contact',
  page,
  className = '',
  messagePlaceholder,
  tone = 'dark',
}) {
  const { t, lang } = useLanguage();
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fields = Object.fromEntries(new FormData(formEl).entries());
    const attribution = captureAttribution(window.location.search, window.sessionStorage);
    const payload = buildLeadPayload(fields, {
      language: lang,
      page: page || window.location.href,
      source,
      site: window.location.hostname,
      device: detectDevice(navigator.userAgent, window.innerWidth),
      form,
      ...attribution,
    });

    setStatus('sending');
    try {
      await submitLead(payload);
      trackLead({ source, form, ...attribution });
      setStatus('submitted');
      formEl.reset();
    } catch (err) {
      console.error('Lead submit failed:', err);
      setStatus('error');
    }
  };

  const fields = [
    { id: 'name', label: t.contact.fields.name, type: 'text', placeholder: t.contact.fields.namePlaceholder },
    { id: 'email', label: t.contact.fields.email, type: 'email', placeholder: t.contact.fields.emailPlaceholder },
    { id: 'country', label: t.contact.fields.country, type: 'text', placeholder: t.contact.fields.countryPlaceholder },
    { id: 'role', label: t.contact.fields.role, type: 'text', placeholder: t.contact.fields.rolePlaceholder },
  ];

  const light = tone === 'light';
  const idleBorder = light ? 'rgba(11, 18, 42, 0.18)' : 'rgba(0, 102, 255, 0.2)';
  const inputClass = light
    ? 'text-b2g-obsidian placeholder:text-neutral-400'
    : 'text-b2g-white placeholder:text-b2g-slate/40';

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`p-6 sm:p-8 lg:p-10 border ${light ? 'border-black/10' : 'border-b2g-copper/15'} ${className}`}
      style={{ borderRadius: '2px', backgroundColor: light ? '#f4f6fb' : '#050530' }}
    >
      <p className="b2g-label mb-8">{t.contact.gateway}</p>

      <div className="space-y-8">
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={`lead-${form}-${field.id}`} className="b2g-label block mb-3">
              {field.label}
            </label>
            <div className="relative">
              <input
                id={`lead-${form}-${field.id}`}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                onFocus={() => setFocusedField(field.id)}
                onBlur={() => setFocusedField(null)}
                className={`w-full bg-transparent border-0 border-b py-3 text-base b2g-focus-ring transition-colors ${inputClass}`}
                style={{
                  borderBottomColor: focusedField === field.id ? '#00ff9d' : idleBorder,
                }}
                required
              />
            </div>
          </div>
        ))}

        <div>
          <label htmlFor={`lead-${form}-message`} className="b2g-label block mb-3">
            {t.contact.message}
          </label>
          <textarea
            id={`lead-${form}-message`}
            name="message"
            rows={3}
            placeholder={messagePlaceholder || t.contact.messagePlaceholder}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            className={`w-full bg-transparent border-0 border-b py-3 text-base b2g-focus-ring transition-colors resize-none ${inputClass}`}
            style={{
              borderBottomColor: focusedField === 'message' ? '#00ff9d' : idleBorder,
            }}
          />
        </div>
      </div>

      <label className={`mt-8 flex items-start gap-3 text-xs leading-relaxed cursor-pointer ${light ? 'text-neutral-600' : 'text-b2g-slate/80'}`}>
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#00ff9d]"
        />
        <span>{t.contact.consent}</span>
      </label>

      <button
        type="submit"
        disabled={status === 'sending' || status === 'submitted'}
        className="mt-6 w-full b2g-copper-bg px-8 py-4 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 b2g-focus-ring transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60"
        style={{ borderRadius: '2px', minHeight: '44px' }}
      >
        {status === 'submitted' ? t.contact.submitted : status === 'sending' ? t.contact.sending : t.contact.submit}
        {status === 'idle' && <ArrowRight size={16} />}
      </button>

      {status === 'error' && (
        <p className="mt-3 text-xs text-red-400 text-center">{t.contact.error}</p>
      )}
    </motion.form>
  );
}
