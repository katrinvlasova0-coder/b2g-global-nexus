import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import { CTAButton } from "./Section";
import { useT } from "@/pages/ai/i18n/LanguageContext";

function useCountUp(target, duration = 1400) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return [val, ref];
}

const TIMES = ["08:42", "08:47", "08:53", "09:02", "09:11"];

function StatCard({ label, value, i }) {
  const [val, ref] = useCountUp(value, 1200 + i * 200);
  return (
    <div ref={ref} className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-2xl font-bold font-heading text-white tabular-nums">{val}</div>
      <div className="text-[11px] text-navy-100 mt-1 leading-tight">{label}</div>
    </div>
  );
}

export default function Hero() {
  const t = useT();
  const h = t.hero;
  const STATS = [
    { label: h.stats.disc, value: 248 },
    { label: h.stats.matched, value: 37 },
    { label: h.stats.recommended, value: 12 },
    { label: h.stats.bids, value: 8 },
    { label: h.stats.deadlines, value: 3 },
  ];
  const FEED = h.feed.map((text, i) => ({ time: TIMES[i], text }));

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-electric/20 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan/10 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-light animate-pulse-soft" />
              {h.badge}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance">
              {h.h1a}
              <span className="block text-gradient-blue mt-2">{h.h1b}</span>
            </h1>
            <p className="mt-6 text-lg text-navy-100 leading-relaxed max-w-xl">
              {h.p}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <CTAButton to="#deploy" variant="primary" className="!px-7 !py-3.5">
                {h.cta1} <ArrowRight size={16} />
              </CTAButton>
              <CTAButton to="#lifecycle" variant="secondaryDark" className="!px-7 !py-3.5">
                {h.cta2}
              </CTAButton>
            </div>
            <p className="mt-5 text-sm text-navy-200 font-heading tracking-tight">{h.subtext}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="rounded-2xl border border-white/10 bg-navy-800/80 backdrop-blur-xl shadow-2xl glow-blue overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <div className="text-xs font-semibold tracking-[0.2em] text-navy-100">{h.today}</div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3">
                  {STATS.map((s, i) => <StatCard key={s.label} {...s} i={i} />)}
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-navy-900/60 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity size={14} className="text-cyan-light" />
                    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-navy-100">{h.feedTitle}</span>
                  </div>
                  <div className="space-y-2.5">
                    {FEED.map((f, i) => (
                      <motion.div key={f.time} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.15 }} className="flex items-start gap-3 text-xs">
                        <span className="text-cyan-light font-mono tabular-nums shrink-0">{f.time}</span>
                        <span className="text-navy-100">{f.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-cyan text-navy-900 text-[10px] font-bold tracking-wide shadow-lg">
              {h.activeBadge}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}