import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, FileText, Landmark, HardHat, Users, GraduationCap, Sparkles } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import CountdownWidget from '@/components/landing/CountdownWidget';
import BenefitCard from '@/components/landing/BenefitCard';
import { useCountdown } from '@/lib/useCountdown';
import { useLanguage } from '@/lib/LanguageContext';

const BENEFIT_ICONS = [Search, FileText, Landmark, HardHat, Users, GraduationCap];

export default function Platform() {
  const countdown = useCountdown();
  const { t } = useLanguage();
  const p = t.platform;
  const benefits = p.benefits.map((text, i) => ({ icon: BENEFIT_ICONS[i], text }));

  return (
    <div className="b2g-page min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Hero / countdown */}
        <section className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#00001a' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0, 102, 255, 0.18), transparent 55%)' }} />
          <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-b2g-cyan/30 mb-10"
              style={{ borderRadius: '2px', backgroundColor: 'rgba(0, 255, 157, 0.05)' }}
            >
              <span className="w-2 h-2 rounded-full bg-b2g-cyan animate-pulse" />
              <span className="b2g-label" style={{ color: '#00ff9d' }}>{p.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="b2g-h text-b2g-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.08] max-w-4xl mx-auto"
            >
              {p.headingPrefix}{' '}
              <span className="b2g-grad-text">{countdown.days} {countdown.days === 1 ? p.daySingular : p.dayPlural}</span>{' '}
              {p.headingSuffix}
            </motion.h1>

            <div className="mt-10 flex justify-center">
              <CountdownWidget time={countdown} />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 text-lg lg:text-xl text-b2g-slate max-w-2xl mx-auto leading-relaxed"
            >
              {p.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Benefits cards */}
        <section className="relative py-16 lg:py-24 b2g-surface" style={{ backgroundColor: '#050530' }}>
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {benefits.map((b, i) => (
                <BenefitCard key={i} index={i} icon={b.icon} text={b.text} />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-14 b2g-h text-2xl lg:text-3xl text-center b2g-grad-text"
            >
              {p.closingText}
            </motion.p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#050530' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 100%, rgba(0, 255, 157, 0.10), transparent 55%)' }} />
          <div className="relative max-w-[900px] mx-auto px-6 lg:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles size={28} className="b2g-cyan mx-auto mb-6" />
              <h2 className="b2g-h text-b2g-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-8">
                {p.ctaHeading}
              </h2>
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-2 b2g-copper-bg b2g-glow px-8 py-4 text-sm font-semibold tracking-wide b2g-focus-ring transition-transform hover:scale-[1.02] active:scale-95"
                style={{ borderRadius: '2px', minHeight: '44px' }}
              >
                {t.nav.requestConsultation}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/"
                className="block mt-6 text-sm text-b2g-slate hover:text-b2g-copper transition-colors b2g-link-underline b2g-focus-ring inline-block"
              >
                {p.backHome}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}