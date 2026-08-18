import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import SectionLink from '@/components/landing/SectionLink';

export default function WinTenders() {
  const { t } = useLanguage();
  const QUESTIONS = t.expertise.questions;

  return (
    <section id="expertise" className="relative py-16 lg:py-36 overflow-hidden" style={{ backgroundColor: '#00001a' }}>
      {/* Grid overlay */}
      <div className="absolute inset-0 b2g-grid-overlay opacity-60 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left column — header */}
          <div className="lg:col-span-5 lg:col-start-1">
            <span className="b2g-label block mb-6">{t.expertise.label}</span>
            <h2 className="b2g-h text-b2g-white text-4xl lg:text-5xl xl:text-6xl leading-[1.05]">
              {t.expertise.headingPrefix}<span className="b2g-copper">{t.expertise.highlight}</span>{t.expertise.headingSuffix}
            </h2>
            <p className="mt-6 text-lg text-b2g-slate leading-relaxed">
              {t.expertise.paragraph}
            </p>

            <div className="mt-10 p-8 border border-b2g-copper/20" style={{ borderRadius: '2px', backgroundColor: '#050530' }}>
              <p className="b2g-h b2g-copper text-lg mb-2">{t.expertise.platformName}</p>
              <p className="text-b2g-white text-2xl lg:text-3xl b2g-h leading-tight">
                {t.expertise.platformValue}
              </p>
              <p className="mt-2 text-sm text-b2g-slate">{t.expertise.platformSub}</p>
            </div>
          </div>

          {/* Right column — checklist */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-px">
              {QUESTIONS.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group flex items-start gap-5 py-6 border-t border-b2g-copper/10 hover:border-b2g-copper/30 transition-colors"
                >
                  <div className="flex items-center gap-3 shrink-0 pt-1">
                    <span className="text-xs b2g-muted font-mono tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-8 h-8 flex items-center justify-center border border-b2g-copper/30 group-hover:border-b2g-cyan group-hover:bg-b2g-cyan/5 transition-all duration-300" style={{ borderRadius: '2px' }}>
                      <Check size={14} className="b2g-copper group-hover:b2g-cyan transition-colors" />
                    </div>
                  </div>
                  <p className="text-base lg:text-lg text-b2g-white/90 leading-relaxed group-hover:text-b2g-white transition-colors">
                    {q}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10"
            >
              <SectionLink
                hash="#contact"
                className="inline-flex items-center justify-center b2g-copper-bg px-8 py-4 text-sm font-semibold tracking-wide b2g-focus-ring transition-transform hover:scale-[1.02] active:scale-95"
                style={{ borderRadius: '2px', minHeight: '44px' }}
              >
                {t.expertise.cta}
              </SectionLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}