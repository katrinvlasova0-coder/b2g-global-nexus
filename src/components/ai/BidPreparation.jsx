import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2, XCircle, Clock, FileSignature, AlertCircle } from "lucide-react";
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

const DOCS = [
  { name: "Application Form", status: "ready" },
  { name: "Company Questionnaire", status: "ready" },
  { name: "Commercial Proposal", status: "ready" },
  { name: "Technical Proposal", status: "ready" },
  { name: "Compliance Matrix", status: "ready" },
  { name: "Guarantee Letter — Bid Bond", status: "signature" },
  { name: "Experience Statements", status: "ready" },
  { name: "ISO 9001 Certificate", status: "ready" },
  { name: "Method Statement", status: "missing" },
  { name: "Financial Statements 2024", status: "ready" },
  { name: "Tax Clearance Certificate", status: "expired" },
  { name: "Health & Safety Policy", status: "approval" },
];

const STATUS = {
  ready: { icon: CheckCircle2, label: "READY", cls: "text-emerald-600 bg-emerald-50" },
  missing: { icon: XCircle, label: "MISSING", cls: "text-rose-600 bg-rose-50" },
  expired: { icon: AlertCircle, label: "EXPIRED", cls: "text-amber-600 bg-amber-50" },
  signature: { icon: FileSignature, label: "REQUIRES SIGNATURE", cls: "text-electric bg-electric/10" },
  approval: { icon: Clock, label: "HUMAN APPROVAL REQUIRED", cls: "text-navy-700 bg-navy-100" },
};

export default function BidPreparation() {
  const [pct, ref] = useCountUp(87);
  return (
    <Section id="preparation" dark className="bg-graphite">
      <SectionHeading light eyebrow="BID PREPARATION" title={<>FROM "WE SHOULD BID"<br />TO "READY FOR SUBMISSION"</>} subtitle="Once participation is approved, B2G creates a complete bid preparation workflow with a document checklist checked against your company's knowledge base." />
      <div className="mt-12 grid lg:grid-cols-[1fr_1.4fr] gap-6">
        <Reveal>
          <div ref={ref} className="rounded-2xl border border-white/10 bg-navy-800/80 p-8 text-center h-full flex flex-col justify-center">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-navy-200 mb-4">BID READINESS</div>
            <div className="text-6xl font-bold font-heading text-gradient-blue tabular-nums">{Math.round(pct)}%</div>
            <div className="mt-3 text-sm text-navy-100">43 / 49 required items ready</div>
            <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-electric to-cyan rounded-full" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-navy-800/80 overflow-hidden">
            <div className="px-5 py-3 border-b border-white/10 text-xs font-semibold tracking-[0.15em] uppercase text-navy-200">Document Checklist</div>
            <div className="divide-y divide-white/5 max-h-[420px] overflow-auto">
              {DOCS.map((d) => {
                const s = STATUS[d.status];
                return (
                  <div key={d.name} className="flex items-center justify-between gap-3 px-5 py-3">
                    <span className="text-sm text-navy-100">{d.name}</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide ${s.cls}`}>
                      <s.icon size={12} /> {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}