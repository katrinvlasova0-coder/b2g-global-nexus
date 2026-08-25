import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Target, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

function useCountUp(target, duration = 1500) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setVal(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return [val, ref];
}

const FACTORS = [
  "Company capability match", "Contract value", "Geographic fit", "Buyer requirements",
  "Technical requirements", "Qualification requirements", "Required certifications",
  "Financial requirements", "Execution timeline", "Estimated profitability",
  "Working capital requirements", "Competitive environment", "Contract risks", "Historical buyer behavior",
];

export default function Scoring() {
  const [score, ref] = useCountUp(94);
  return (
    <Section id="scoring" dark className="bg-graphite">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <SectionHeading light center={false} eyebrow="AI OPPORTUNITY SCORING" title={<>DON'T FIND MORE TENDERS.<br />FIND THE RIGHT ONES.</>} />
          <Reveal delay={0.1}>
            <p className="mt-5 text-navy-100 leading-relaxed">Each opportunity receives a dynamic AI score based on structured evaluation factors — not gut feeling.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 grid grid-cols-2 gap-2.5">
              {FACTORS.map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-navy-100">
                  <CheckCircle2 size={14} className="text-cyan shrink-0" /> {f}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative rounded-2xl border border-white/10 bg-navy-800/80 p-8 text-center">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-navy-200">TENDER MATCH</div>
            <div ref={ref} className="my-6 relative inline-block">
              <svg width="220" height="220" viewBox="0 0 220 220">
                <circle cx="110" cy="110" r="95" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
                <motion.circle cx="110" cy="110" r="95" fill="none" stroke="url(#g)" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 95} initial={{ strokeDashoffset: 2 * Math.PI * 95 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 95 * (1 - 0.94) }} transition={{ duration: 1.5, ease: "easeOut" }}
                  transform="rotate(-90 110 110)" />
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold font-heading text-white tabular-nums">{Math.round(score)}</span>
                <span className="text-sm text-navy-200">/ 100</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/20 text-cyan-light text-xs font-bold tracking-wide">
              <Target size={14} /> HIGH PRIORITY
            </div>
            <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3">
              <AlertTriangle size={20} className="text-cyan-light shrink-0" />
              <p className="text-left text-sm text-navy-100">AI RECOMMENDATION: <span className="text-white font-semibold">ANALYZE FOR PARTICIPATION</span></p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}