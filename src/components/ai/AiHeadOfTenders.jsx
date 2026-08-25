import React from "react";
import { Network } from "lucide-react";
import { Section, SectionHeading, CTAButton } from "./Section";
import Reveal from "./Reveal";

const TEAM = ["Tender Managers", "Legal", "Finance", "Estimators", "Procurement", "Business Development"];

const CAPS = ["Tender pipeline management", "Opportunity prioritization", "Task allocation", "Deadline management", "Bid-readiness control", "Document-completeness monitoring", "Department KPI tracking", "Team workload analysis", "Pipeline forecasting", "Win/loss analysis", "Management reporting", "Bottleneck identification", "Strategic recommendations"];

export default function AiHeadOfTenders() {
  return (
    <Section id="head-of-tenders" dark className="bg-graphite">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeading light center={false} eyebrow="AI HEAD OF TENDERS" title={<>DON'T JUST HIRE AN AI SPECIALIST.<br />HIRE AN AI HEAD OF TENDERS.</>} subtitle="The AI Head of Tenders operates at management level — coordinating information and workflows while human managers retain final authority." />
          <Reveal delay={0.1}>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-navy-100">
              {CAPS.map((c) => <li key={c} className="flex items-start gap-2"><span className="text-cyan-light mt-0.5">›</span>{c}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={0.2}><CTAButton to="#pricing" variant="primary" className="mt-6">DEPLOY AI HEAD OF TENDERS</CTAButton></Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-white/10 bg-navy-800/80 p-8">
            <div className="text-center">
              <div className="inline-block px-4 py-2 rounded-lg border border-white/15 text-xs font-bold tracking-wide text-navy-100">CEO / COMMERCIAL DIRECTOR</div>
              <div className="mx-auto my-4 w-px h-8 bg-white/15" />
              <div className="inline-block">
                <div className="text-3xl font-bold font-heading text-gradient-blue">B2G</div>
                <div className="text-xs font-semibold tracking-[0.15em] uppercase text-cyan-light mt-1">AI Head of Tenders</div>
              </div>
              <div className="mx-auto my-4 w-px h-8 bg-white/15" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {TEAM.map((t) => (
                <div key={t} className="text-center px-2 py-3 rounded-lg bg-white/5 border border-white/10">
                  <Network size={16} className="mx-auto text-navy-200 mb-1.5" />
                  <span className="text-[11px] text-navy-100">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}