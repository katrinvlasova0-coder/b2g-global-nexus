import React from "react";
import { FileSignature, Flag } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

const MILESTONES = [
  { label: "Contract Award", done: true },
  { label: "Contract Signature", done: true },
  { label: "Performance Guarantee", done: true },
  { label: "Mobilization", done: true },
  { label: "Milestone 1", done: false, active: true },
  { label: "Milestone 2", done: false },
  { label: "Delivery", done: false },
  { label: "Acceptance", done: false },
  { label: "Final Documentation", done: false },
  { label: "Payment", done: false },
];

const CAPS = ["Contract draft analysis", "Comparison against original tender", "Identification of changed clauses", "Obligation extraction", "Deadline extraction", "Deliverable tracking", "Penalty identification", "Document & annex preparation", "Reporting requirements", "Closing-document monitoring"];

export default function ContractIntelligence() {
  return (
    <Section id="contract">
      <SectionHeading eyebrow="CONTRACT INTELLIGENCE" title="WINNING THE TENDER IS NOT THE END." subtitle="After award, B2G continues supporting the contract lifecycle." />
      <div className="mt-12 grid lg:grid-cols-[1.3fr_1fr] gap-8">
        <Reveal>
          <div className="rounded-2xl border border-navy-100 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-navy-100 bg-navy-50/50">
              <FileSignature size={16} className="text-electric" />
              <span className="text-sm font-semibold text-navy-900">Execution Timeline</span>
            </div>
            <div className="p-6 overflow-x-auto">
              <div className="flex items-center gap-0 min-w-max">
                {MILESTONES.map((m, i) => (
                  <React.Fragment key={m.label}>
                    <div className="flex flex-col items-center gap-2 w-28 shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${m.done ? "bg-emerald-500 text-white" : m.active ? "bg-electric text-white ring-4 ring-electric/20" : "bg-navy-100 text-navy-400"}`}>
                        {m.done ? "✓" : i + 1}
                      </div>
                      <span className={`text-[10px] text-center leading-tight ${m.active ? "text-electric font-semibold" : "text-muted-foreground"}`}>{m.label}</span>
                    </div>
                    {i < MILESTONES.length - 1 && <div className={`h-0.5 w-6 ${m.done ? "bg-emerald-500" : "bg-navy-100"}`} />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flag size={18} className="text-electric" />
              <span className="text-sm font-bold text-navy-900">Contract Lifecycle Capabilities</span>
            </div>
            <ul className="space-y-2 text-sm text-navy-700">
              {CAPS.map((c) => <li key={c} className="flex items-start gap-2"><span className="text-electric mt-0.5">›</span>{c}</li>)}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}