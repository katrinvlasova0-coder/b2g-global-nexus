import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useLanguage } from '@/lib/LanguageContext';

const HERO_IMG = 'https://media.base44.com/images/public/6a75e02537c947dc2e12eea1/4ba7359c6_generated_ae1eac8b.png';

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#00001a' }}>
      {/* Background image */}
      <motion.div style={{ y: yImg, opacity }} className="absolute inset-0 z-0">
        <Image
          src={HERO_IMG}
          alt="Modern glass skyscraper reflecting a golden sunrise in a global financial capital"
          className="w-full h-full object-cover"
          fittingType="fill"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,26,0.55) 0%, rgba(0,0,26,0.7) 50%, #00001a 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,26,0.85) 0%, transparent 60%)' }} />
      </motion.div>

      {/* Ambient brand glow */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 85% 8%, rgba(0, 102, 255, 0.20), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 0%, rgba(0, 255, 157, 0.12), transparent 50%)' }} />

      {/* Macro background text */}
      <motion.div style={{ y: yText }} className="absolute top-[12%] right-[-4%] z-0 hidden md:block">
        <div className="b2g-macro-text">B2G GLOBAL</div>
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-10 pt-24 pb-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="b2g-label">{t.hero.label}</span>
          </motion.div>

          <h1 className="b2g-h text-b2g-white overflow-hidden">
            <motion.span
              initial={{ x: '-110%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="block text-4xl sm:text-5xl lg:text-7xl xl:text-8xl leading-[0.95]"
            >
              {t.hero.title1}
            </motion.span>
            <motion.span
              initial={{ x: '110%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="block text-4xl sm:text-5xl lg:text-7xl xl:text-8xl leading-[0.95] b2g-grad-text"
            >
              {t.hero.title2}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-base sm:text-lg lg:text-xl text-b2g-slate max-w-xl leading-relaxed"
          >
            {t.hero.paragraph}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="b2g-copper-bg b2g-glow px-7 py-4 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 b2g-focus-ring transition-transform hover:scale-[1.02] active:scale-95"
              style={{ borderRadius: '2px', minHeight: '44px' }}
            >
              {t.hero.ctaPrimary}
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#who-we-seek"
              className="px-7 py-4 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 border border-b2g-white/20 text-b2g-white hover:border-b2g-copper/50 hover:text-b2g-copper transition-colors b2g-focus-ring"
              style={{ borderRadius: '2px', minHeight: '44px' }}
            >
              {t.hero.ctaSecondary}
            </a>
            <a
              href="https://media.base44.com/files/public/6a75e02537c947dc2e12eea1/d3bb68961_B2GPitchdeckEnd.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 border border-b2g-cyan/40 text-b2g-cyan hover:border-b2g-cyan hover:bg-b2g-cyan/10 transition-colors b2g-focus-ring"
              style={{ borderRadius: '2px', minHeight: '44px' }}
            >
              B2G Pitch Deck
              <ArrowUpRight size={18} />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="b2g-label text-[0.6rem]">{t.hero.scroll}</span>
        <div className="w-px h-12 bg-gradient-to-b from-b2g-copper to-transparent" />
      </motion.div>
    </section>
  );
}