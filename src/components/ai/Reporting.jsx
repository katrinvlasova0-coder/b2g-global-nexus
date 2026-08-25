import React, { useState, useEffect, useRef } from "react";
import { BarChart3, Filter } from "lucide-react";
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

const KPIS = [
  { label: "Opportunities Found", value: 1240 },
  { label: "Qualified Opportunities", value: 312 },
  { label: "Bids Submitted", value: 64 },
  { label: "Contracts Won", value: 21 },
  { label: "Win Rate", value: 33, suffix: "%" },
  { label: "Pipeline Value", value: 48, prefix: "€", suffix: "M" },
];

const FILTERS = ["Period", "Country", "Business Unit", "Tender Manager", "Industry", "Customer", "Status"];

export default function Reporting() {
  return (
    <Section id="reporting" dark className="bg-navy-900">
      <SectionHeading light eyebrow="MANAGEMENT REPORTING" title={<>SEE YOUR ENTIRE TENDER BUSINESS<br />IN ONE SCREEN</>} />
      <Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-2 justify-center">
          <span className="text-xs text-navy-200 mr-1 flex items-center gap-1"><Filter size={12} /> Filters:</span>
          {FILTERS.map((f) => (
            <span key={f} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-navy-100">{f}</span>
          ))}
        </div>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        {KPIS.map((k, i) => <KpiCard key={k.label} {...k} i={i} />)}
      </div>
      <Reveal delay={0.2}>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6">
            <div className="flex items-center gap-2 mb-4"><BarChart3 size={16} className="text-cyan-light" /><span className="text-sm font-semibold text-white">Top Buyers</span></div>
            {[["Regional Development Agency", 8], ["National Infrastructure Co.", 5], ["Municipal Utilities", 4], ["Health Procurement Board", 3]].map(([b, n]) => (
              <div key={b} className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-navy-100">{b}</span><span className="text-cyan-light font-semibold tabular-nums">{n}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6">
            <div className="text-sm font-semibold text-white mb-4">Loss Reasons</div>
            {[["Price above benchmark", 42], ["Missing certification", 23], ["Insufficient experience", 19], ["Timeline risk", 16]].map(([r, n]) => (
              <div key={r} className="py-2">
                <div className="flex justify-between text-xs mb-1"><span className="text-navy-100">{r}</span><span className="text-navy-200">{n}%</span></div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-gradient-to-r from-rose-500 to-amber-500" style={{ width: `${n}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function KpiCard({ label, value, prefix = "", suffix = "", i }) {
  const [val, ref] = useCountUp(value, 1200 + i * 150);
  return (
    <div ref={ref} className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="text-3xl font-bold font-heading text-white tabular-nums">{prefix}{val}{suffix}</div>
      <div className="text-xs text-navy-100 mt-1">{label}</div>
    </div>
  );
}