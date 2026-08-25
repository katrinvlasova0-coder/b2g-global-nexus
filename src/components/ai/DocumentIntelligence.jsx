import React from "react";
import { FileText, AlertTriangle, BookOpen } from "lucide-react";
import { Section, SectionHeading, CTAButton } from "./Section";
import Reveal from "./Reveal";

const FIELDS = [
  { label: "Tender Name", value: "Infrastructure Upgrade — Phase III" },
  { label: "Contracting Authority", value: "Regional Development Agency" },
  { label: "Estimated Contract Value", value: "€2.4M" },
  { label: "Submission Deadline", value: "2026-09-18" },
  { label: "Execution Period", value: "18 months" },
  { label: "Eligibility Requirements", value: "ISO 9001, 5+ years experience" },
  { label: "Bid Security", value: "2% of contract value" },
  { label: "Performance Security", value: "10% of contract value" },
  { label: "Technical Requirements", value: "Extracted from §4.2–§4.9" },
  { label: "Financial Requirements", value: "Min turnover €5M / 3 yrs" },
  { label: "Mandatory Documents", value: "14 documents identified" },
  { label: "Critical Contract Terms", value: "Penalty cap at 10%" },
  { label: "Disqualification Risks", value: "3 conditions flagged" },
  { label: "Key Deadlines", value: "4 milestones tracked" },
];

export default function DocumentIntelligence() {
  return (
    <Section id="documents">
      <SectionHeading eyebrow="TENDER DOCUMENT INTELLIGENCE" title={<>300 PAGES IN.<br />A DECISION OUT.</>} subtitle="B2G analyzes complex tender documentation and converts it into structured business intelligence — with source references back to the relevant sections." />
      <div className="mt-12 grid lg:grid-cols-2 gap-6">
        <Reveal>
          <div className="rounded-2xl border border-navy-100 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-navy-100 bg-navy-50/50">
              <FileText size={16} className="text-electric" />
              <span className="text-sm font-semibold text-navy-900">Tender Document Intelligence</span>
            </div>
            <div className="divide-y divide-navy-50">
              {FIELDS.map((f) => (
                <div key={f.label} className="flex items-start justify-between gap-4 px-5 py-2.5 text-sm">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className="text-navy-900 font-medium text-right">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-4 h-full flex flex-col justify-center">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={20} className="text-amber-600" />
                <span className="text-sm font-bold text-amber-900">AI detected 7 potential risks</span>
              </div>
              <p className="text-sm text-amber-800 leading-relaxed">Each risk is linked to the source section in the tender document for immediate review by your team.</p>
              <CTAButton to="#deploy" variant="outline" className="!mt-4 !py-2.5 !border-amber-300 !text-amber-700 hover:!border-amber-500">REVIEW RISKS</CTAButton>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-6">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={20} className="text-electric" />
                <span className="text-sm font-bold text-navy-900">Source references</span>
              </div>
              <p className="text-sm text-navy-700 leading-relaxed">The AI provides source references back to the relevant tender-document sections wherever technically possible — so every insight is traceable.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}