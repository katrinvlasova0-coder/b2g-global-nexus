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

const CAPS = [
  "Contract draft analysis",
  "Comparison against original tender",
  "Identification of changed clauses",
  "Obligation extraction",
  "Deadline extraction",
  "Deliverable tracking",
  "Penalty identification",
  "Document & annex preparation",
  "Reporting requirements",
  "Closing-document monitoring",
];

export default function ContractIntelligence() {
  return (
    <Section id="contract" className="!py-10 md:!py-14 lg:!py-16">
      <SectionHeading
        eyebrow="CONTRACT INTELLIGENCE"
        title="WINNING THE TENDER IS NOT THE END."
        subtitle="After award, B2G keeps supporting the contract — obligations, deadlines, and closing docs."
      />
      <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-5 md:gap-6 lg:gap-8 items-stretch">
        <Reveal className="h-full">
          <div className="h-full rounded-2xl border border-navy-100 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-navy-100 bg-navy-50/50">
              <FileSignature size={16} className="text-electric" />
              <span className="text-sm font-semibold text-navy-900">Execution Timeline</span>
            </div>
            <div className="p-5 md:p-6 flex-1">
              {/* Two-row compact timeline: avoids long horizontal scroll + empty white space */}
              <ol className="grid grid-cols-2 sm:grid-cols-5 gap-3 md:gap-3.5">
                {MILESTONES.map((m, i) => (
                  <li key={m.label} className="relative flex flex-col items-center text-center gap-2 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        m.done
                          ? "bg-emerald-500 text-white"
                          : m.active
                            ? "bg-electric text-white ring-4 ring-electric/20"
                            : "bg-navy-100 text-navy-400"
                      }`}
                    >
                      {m.done ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-[10px] sm:text-[11px] leading-tight ${
                        m.active ? "text-electric font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      {m.label}
                    </span>
                    {/* connector within each row on sm+ */}
                    {i % 5 !== 4 && i < MILESTONES.length - 1 && (
                      <span
                        aria-hidden
                        className={`hidden sm:block absolute top-4 left-[calc(50%+1rem)] w-[calc(100%-1rem)] h-0.5 ${
                          m.done ? "bg-emerald-400" : "bg-navy-100"
                        }`}
                      />
                    )}
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-xs text-muted-foreground text-center sm:text-left">
                Active stage: <span className="text-electric font-semibold">Milestone 1</span> — AI tracks obligations through payment.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <div className="h-full rounded-2xl border border-navy-100 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-navy-100 bg-navy-50/50">
              <Flag size={16} className="text-electric" />
              <span className="text-sm font-semibold text-navy-900">Contract Lifecycle Capabilities</span>
            </div>
            <ul className="p-5 md:p-6 grid sm:grid-cols-1 gap-2.5 text-sm text-navy-700 flex-1 content-start">
              {CAPS.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="text-electric mt-0.5 shrink-0">›</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
