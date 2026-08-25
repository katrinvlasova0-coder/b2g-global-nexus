import React, { useState, useEffect, useRef } from "react";
import { Search, Users, FileCheck, Mail, ListChecks } from "lucide-react";
import { Section, SectionHeading, CTAButton } from "./Section";
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
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return [val, ref];
}

const STATS = [
  { label: "Identified", value: 38, icon: Search },
  { label: "Qualified", value: 14, icon: Users },
  { label: "RFQs Prepared", value: 10, icon: FileCheck },
  { label: "Responses", value: 7, icon: Mail },
  { label: "Shortlisted", value: 3, icon: ListChecks },
];

const CAPS = ["Supplier discovery", "Subcontractor discovery", "Vendor research", "Contact discovery", "RFQ preparation", "Quote collection", "Price comparison", "Delivery-term comparison", "Payment-term comparison", "Supplier shortlisting", "Risk comparison"];

export default function Sourcing() {
  return (
    <Section id="sourcing">
      <SectionHeading eyebrow="SUPPLIER & SUBCONTRACTOR SOURCING" title={<>NEED CAPABILITY YOU DON'T HAVE?<br />B2G FINDS IT.</>} subtitle="Based on tender requirements, B2G identifies products, services or capabilities that must be sourced externally." />
      <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="rounded-2xl border border-navy-100 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-navy-100 bg-navy-900 text-white flex items-center gap-2">
              <Search size={16} className="text-cyan-light" />
              <span className="text-sm font-semibold tracking-wide">SUBCONTRACTOR SEARCH</span>
            </div>
            <div className="grid grid-cols-1 divide-y divide-navy-50">
              {STATS.map((s) => <StatRow key={s.label} {...s} />)}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-navy-700">
            {CAPS.map((c) => <li key={c} className="flex items-start gap-2"><span className="text-electric mt-0.5">›</span>{c}</li>)}
          </ul>
          <CTAButton to="#deploy" variant="primary" className="mt-6">HIRE YOUR AI EMPLOYEE</CTAButton>
        </Reveal>
      </div>
    </Section>
  );
}

function StatRow({ label, value, icon: Icon }) {
  const [val, ref] = useCountUp(value);
  return (
    <div ref={ref} className="flex items-center justify-between px-5 py-4">
      <span className="flex items-center gap-2.5 text-sm text-muted-foreground"><Icon size={16} className="text-electric" /> {label}</span>
      <span className="text-2xl font-bold font-heading text-navy-900 tabular-nums">{val}</span>
    </div>
  );
}