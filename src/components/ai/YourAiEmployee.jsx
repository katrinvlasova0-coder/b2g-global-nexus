import React from "react";
import { Database, Building2 } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

const SOURCES = [
  "Company profile", "Products & services", "Geographic coverage", "Certifications", "Licenses",
  "Previous contracts", "Previous tenders", "Pricing models", "Cost models", "Commercial proposals",
  "Standard contracts", "Corporate policies", "Risk policies", "Margin requirements",
  "Supplier databases", "Subcontractor databases", "Internal procedures", "Past win/loss data",
];

export default function YourAiEmployee() {
  return (
    <Section id="your-rules">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute inset-0 bg-grid opacity-50 rounded-2xl" />
            <div className="relative rounded-2xl border border-navy-100 bg-white shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-navy-900 text-white"><Building2 size={22} /></div>
                <div>
                  <div className="font-bold text-navy-900">Your Company</div>
                  <div className="text-xs text-muted-foreground">Private knowledge environment</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SOURCES.slice(0, 8).map((s) => (
                  <div key={s} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-navy-50 text-xs text-navy-700">
                    <Database size={12} className="text-electric shrink-0" /> {s}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-xs text-muted-foreground">+ 10 more authorized knowledge sources</div>
            </div>
          </div>
        </Reveal>
        <div>
          <SectionHeading center={false} eyebrow="YOUR COMPANY'S AI EMPLOYEE" title={<>YOUR COMPANY.<br />YOUR RULES.<br />YOUR AI EMPLOYEE.</>} subtitle="B2G builds a company-specific knowledge environment using authorized corporate information — so it understands how your company approaches tenders." />
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-2">
              {SOURCES.map((s) => <span key={s} className="px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-xs text-navy-700">{s}</span>)}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}