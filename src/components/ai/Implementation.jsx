import React from "react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

const STEPS = [
  { n: "01", title: "UNDERSTAND", sub: "We learn your business.", text: "Products, services, markets, customers, tender strategy and operating model." },
  { n: "02", title: "CONFIGURE", sub: "We define your AI employee.", text: "Role, responsibilities, KPIs, permissions and approval rules." },
  { n: "03", title: "CONNECT", sub: "We connect your corporate knowledge.", text: "Documents, tender sources, CRM, ERP and approved systems." },
  { n: "04", title: "ADAPT", sub: "B2G learns your tender processes.", text: "Policies, templates, previous projects, pricing models and decision rules." },
  { n: "05", title: "DEPLOY", sub: "Your AI employee starts working.", text: "Initially under enhanced human supervision." },
  { n: "06", title: "SCALE", sub: "From one specialist to a department.", text: "Grow from a single AI specialist to an AI Tender Department." },
];

export default function Implementation() {
  return (
    <Section id="implementation" dark className="bg-navy-900">
      <SectionHeading light eyebrow="IMPLEMENTATION PROCESS" title="A PREMIUM IMPLEMENTATION JOURNEY" subtitle="A structured six-stage deployment that takes your company from discovery to a fully scaled AI tender department." />
      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 h-full overflow-hidden">
              <div className="absolute -top-4 -right-2 text-7xl font-bold font-heading text-white/5">{s.n}</div>
              <div className="relative">
                <div className="text-xs font-bold tracking-[0.2em] text-cyan-light">{s.title}</div>
                <div className="text-lg font-bold text-white mt-1">{s.sub}</div>
                <p className="mt-3 text-sm text-navy-100 leading-relaxed">{s.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}