import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { buildLeadPayload, submitLead } from '@/lib/leads';

export default function FinalCTA() {
  const { t, lang } = useLanguage();
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());
    const payload = buildLeadPayload(fields, {
      language: lang,
      page: window.location.href,
    });

    setStatus('sending');
    try {
      await submitLead(payload);
      setStatus('submitted');
      form.reset();
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

  const meta = [
    { label: t.contact.meta.headquarters, value: t.contact.meta.headquartersValue },
    { label: t.contact.meta.market, value: t.contact.meta.marketValue },
    { label: t.contact.meta.status, value: t.contact.meta.statusValue },
  ];

  return (
    <section id="contact" className="relative py-16 lg:py-36 overflow-hidden" style={{ backgroundColor: '#00001a' }}>
      {/* Macro background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span
          className="b2g-h leading-none text-center"
          style={{ fontSize: 'clamp(3rem, 10vw, 11rem)', color: 'rgba(0, 102, 255, 0.035)', letterSpacing: '-0.04em' }}
        >
          {t.contact.macroText.split(' ').slice(0, 2).join(' ')}<br/>{t.contact.macroText.split(' ').slice(2).join(' ')}
        </span>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — statement */}
          <div className="lg:col-span-5">
            <span className="b2g-label block mb-6">{t.contact.label}</span>
            <h2 className="b2g-h text-b2g-white text-4xl lg:text-5xl xl:text-6xl leading-[1.05]">
              {t.contact.headingPrefix}<span className="b2g-copper">{t.contact.highlight}</span>{t.contact.headingSuffix}
            </h2>
            <p className="mt-6 text-lg text-b2g-slate leading-relaxed max-w-md">
              {t.contact.paragraph}
            </p>

            <div className="mt-10 space-y-4">
              {meta.map((item) => (
                <div key={item.label} className="flex items-start gap-4 py-3 border-t border-b2g-copper/10">
                  <span className="b2g-label w-24 sm:w-28 shrink-0 pt-0.5">{item.label}</span>
                  <span className="text-b2g-white text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Contact details */}
            <div className="mt-10 pt-8 border-t border-b2g-copper/15">
              <p className="b2g-label mb-6">{t.contact.gatewayDetails}</p>
              <ul className="space-y-5">
                {Object.values(t.contact.details).map((item) => (
                  <li key={item.label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                    <span className="b2g-label w-24 sm:w-28 shrink-0 pt-0.5 text-[0.65rem]">{item.label}</span>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-b2g-white text-sm font-medium b2g-link-underline hover:text-b2g-cyan transition-colors break-all"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 lg:p-10 border border-b2g-copper/15"
              style={{ borderRadius: '2px', backgroundColor: '#050530' }}
            >
              <p className="b2g-label mb-8">{t.contact.gateway}</p>

              <div className="space-y-8">
                {fields.map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="b2g-label block mb-3">
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        onFocus={() => setFocusedField(field.id)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent border-0 border-b text-b2g-white placeholder:text-b2g-slate/40 py-3 text-base b2g-focus-ring transition-colors"
                        style={{
                          borderBottomColor: focusedField === field.id ? '#00ff9d' : 'rgba(0, 102, 255, 0.2)',
                        }}
                        required
                      />
                      {focusedField === field.id && (
                        <motion.div
                          layoutId="field-underline"
                          className="absolute bottom-0 left-0 right-0 h-px"
                          style={{ backgroundColor: '#00ff9d' }}
                        />
                      )}
                    </div>
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="b2g-label block mb-3">
                    {t.contact.message}
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder={t.contact.messagePlaceholder}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-0 border-b text-b2g-white placeholder:text-b2g-slate/40 py-3 text-base b2g-focus-ring transition-colors resize-none"
                      style={{
                        borderBottomColor: focusedField === 'message' ? '#00ff9d' : 'rgba(0, 102, 255, 0.2)',
                      }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'submitted'}
                className="mt-10 w-full b2g-copper-bg px-8 py-4 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 b2g-focus-ring transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60"
                style={{ borderRadius: '2px', minHeight: '44px' }}
              >
                {status === 'submitted' ? t.contact.submitted : status === 'sending' ? t.contact.sending : t.contact.submit}
                {status === 'idle' && <ArrowRight size={16} />}
              </button>

              {status === 'error' && (
                <p className="mt-3 text-xs text-red-400 text-center">{t.contact.error}</p>
              )}

              <p className="mt-4 text-xs text-b2g-slate/60 text-center">
                {t.contact.consent}
              </p>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}