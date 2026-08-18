import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import LeadForm from '@/components/landing/LeadForm';

export default function FinalCTA() {
  const { t } = useLanguage();

  const meta = [
    { label: t.contact.meta.headquarters, value: t.contact.meta.headquartersValue },
    { label: t.contact.meta.market, value: t.contact.meta.marketValue },
    { label: t.contact.meta.status, value: t.contact.meta.statusValue },
  ];

  return (
    <section id="contact" className="relative py-16 lg:py-36 overflow-hidden" style={{ backgroundColor: '#00001a' }}>
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

          <div className="lg:col-span-6 lg:col-start-7">
            <LeadForm source="website-contact" form="contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
