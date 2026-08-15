import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import {
  Search,
  FileText,
  Landmark,
  HardHat,
  Network,
  GraduationCap,
  TrendingUp,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const ICONS = [Search, FileText, Landmark, HardHat, Network, GraduationCap];
const IMAGES = [
  'https://media.base44.com/images/public/6a75e02537c947dc2e12eea1/0558f49c2_generated_e943b576.png',
  'https://media.base44.com/images/public/6a75e02537c947dc2e12eea1/7b3d8146c_generated_e4916f4d.png',
  'https://media.base44.com/images/public/6a75e02537c947dc2e12eea1/0558f49c2_generated_e943b576.png',
  'https://media.base44.com/images/public/6a75e02537c947dc2e12eea1/596d163cb_generated_871d621e.png',
  'https://media.base44.com/images/public/6a75e02537c947dc2e12eea1/596d163cb_generated_871d621e.png',
  'https://media.base44.com/images/public/6a75e02537c947dc2e12eea1/0558f49c2_generated_e943b576.png',
];

export default function CapabilityCenter() {
  const { t } = useLanguage();
  const CAPABILITIES = t.capabilities.items.map((cap, i) => ({
    icon: ICONS[i],
    title: cap.title,
    description: cap.description,
    image: IMAGES[i],
  }));

  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scrollByCards = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const step = card ? card.offsetWidth + 1 : 420;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
  };

  const onPointerMove = (e) => {
    const el = scrollerRef.current;
    if (!el || !dragState.current.active) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) {
      dragState.current.moved = true;
      el.classList.add('cursor-grabbing');
      el.scrollLeft = dragState.current.startScroll - dx;
    }
  };

  const endDrag = () => {
    const el = scrollerRef.current;
    if (el) el.classList.remove('cursor-grabbing');
    dragState.current.active = false;
  };

  const onCardClick = (e) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  };

  return (
    <section id="capabilities" className="relative py-16 lg:py-36 overflow-hidden" style={{ backgroundColor: '#050530' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-16 lg:mb-24">
        <span className="b2g-label block mb-6">{t.capabilities.label}</span>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="b2g-h text-b2g-white text-4xl lg:text-5xl xl:text-6xl leading-[1.05]">
              {t.capabilities.headingPrefix}<span className="b2g-copper">{t.capabilities.highlight}</span>{t.capabilities.headingSuffix}
            </h2>
          </div>
          <div className="lg:col-span-4 flex items-center lg:justify-end gap-4">
            <div className="flex items-center gap-3 text-b2g-slate">
              <TrendingUp size={20} className="b2g-copper shrink-0" />
              <p className="text-sm leading-relaxed">
                {t.capabilities.subtitle}
              </p>
            </div>
            {/* Arrow controls */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <button
                onClick={() => scrollByCards(-1)}
                disabled={!canLeft}
                aria-label={t.capabilities.prev}
                className="w-11 h-11 flex items-center justify-center border border-b2g-copper/30 text-b2g-white transition-all hover:border-b2g-copper hover:text-b2g-copper disabled:opacity-30 disabled:cursor-not-allowed b2g-focus-ring"
                style={{ borderRadius: '2px' }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollByCards(1)}
                disabled={!canRight}
                aria-label={t.capabilities.next}
                className="w-11 h-11 flex items-center justify-center border border-b2g-copper/30 text-b2g-white transition-all hover:border-b2g-copper hover:text-b2g-copper disabled:opacity-30 disabled:cursor-not-allowed b2g-focus-ring"
                style={{ borderRadius: '2px' }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal scroll on desktop, vertical stack on mobile */}
      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="b2g-hscroll lg:overflow-x-auto overflow-visible lg:cursor-grab select-none"
      >
        <div className="flex flex-col lg:flex-row gap-px lg:pl-6 lg:pl-10 lg:pr-10">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.article
                key={i}
                data-card
                onClick={onCardClick}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="b2g-hscroll-item shrink-0 w-full lg:w-[420px] b2g-surface border-t lg:border-t-0 lg:border-l border-b2g-copper/10 group hover:border-b2g-copper/30 transition-colors pointer-events-auto"
                style={{ backgroundColor: '#00001a' }}
              >
                <div className="relative h-48 lg:h-56 overflow-hidden">
                  <Image
                    src={cap.image}
                    alt={cap.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fittingType="fill"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,26,0.2) 0%, rgba(0,0,26,0.9) 100%)' }} />
                  <div className="absolute top-5 left-5 w-11 h-11 flex items-center justify-center b2g-copper-bg" style={{ borderRadius: '2px' }}>
                    <Icon size={18} className="text-b2g-obsidian" />
                  </div>
                  <span className="absolute top-5 right-5 text-[0.65rem] b2g-muted font-mono tracking-widest">
                    {String(i + 1).padStart(2, '0')} / {String(CAPABILITIES.length).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="b2g-h text-b2g-white text-xl lg:text-2xl mb-3 leading-tight">{cap.title}</h3>
                  <p className="text-sm text-b2g-slate leading-relaxed">{cap.description}</p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium b2g-copper b2g-link-underline b2g-focus-ring"
                  >
                    {t.capabilities.learnMore} <ArrowUpRight size={14} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Scroll hint for desktop */}
      <div className="hidden lg:flex max-w-[1400px] mx-auto px-10 mt-8 items-center gap-3">
        <div className="flex-1 h-px bg-b2g-copper/15" />
        <span className="b2g-label text-[0.6rem]">{t.capabilities.scrollHint}</span>
      </div>
    </section>
  );
}