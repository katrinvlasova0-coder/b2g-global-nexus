import React, { useState } from "react";
import { Calculator } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

const ROWS = [
  { label: "Revenue", value: 2400000, tone: "total" },
  { label: "Materials", value: -820000 },
  { label: "Labor", value: -430000 },
  { label: "Subcontractors", value: -310000 },
  { label: "Logistics", value: -95000 },
  { label: "Financing", value: -68000 },
  { label: "Guarantees", value: -48000 },
  { label: "Risk Reserve", value: -75000 },
  { label: "Total Cost", value: -1846000, tone: "subtotal" },
  { label: "Gross Profit", value: 554000, tone: "good" },
  { label: "Expected Margin", value: "18.4%", tone: "good" },
  { label: "Target Bid Price", value: 2400000, tone: "total" },
];

const fmt = (v) => (typeof v === "number" ? `€${Math.abs(v).toLocaleString("en-US")}` : v);

export default function CostEstimation() {
  const [showModel, setShowModel] = useState(false);
  return (
    <Section id="estimation">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeading center={false} eyebrow="AI COST ESTIMATION" title={<>FROM TECHNICAL SPECIFICATION<br />TO PROJECT ECONOMICS</>} />
          <Reveal delay={0.1}>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-navy-700">
              {["Break down the scope of work", "Identify materials & labor", "Calculate required resources", "Estimate quantities", "Structure direct costs", "Estimate logistics", "Include subcontractor quotations", "Calculate financing costs", "Apply risk reserves", "Calculate target margin", "Estimate minimum viable bid price"].map((c) => (
                <li key={c} className="flex items-start gap-2"><span className="text-electric mt-1">›</span>{c}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <button onClick={() => setShowModel(!showModel)} className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-electric text-white text-sm font-semibold hover:bg-electric-dark transition-colors">
              <Calculator size={16} /> {showModel ? "HIDE FINANCIAL MODEL" : "VIEW FINANCIAL MODEL"}
            </button>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className={`rounded-2xl border border-navy-100 bg-white shadow-sm overflow-hidden transition-all ${showModel ? "opacity-100" : "opacity-60"}`}>
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-navy-100 bg-navy-900 text-white">
              <Calculator size={16} className="text-cyan-light" />
              <span className="text-sm font-semibold tracking-wide">TENDER ECONOMICS</span>
            </div>
            <div className="divide-y divide-navy-50">
              {ROWS.map((r) => {
                const isNeg = typeof r.value === "number" && r.value < 0;
                return (
                  <div key={r.label} className={`flex items-center justify-between px-5 py-3 text-sm ${r.tone === "total" || r.tone === "subtotal" ? "bg-navy-50/70 font-semibold" : ""}`}>
                    <span className={r.tone === "subtotal" ? "font-semibold text-navy-900" : "text-muted-foreground"}>{r.label}</span>
                    <span className={`tabular-nums ${r.tone === "good" ? "text-emerald-600 font-semibold" : r.tone === "total" ? "text-navy-900 font-bold" : isNeg ? "text-rose-600" : "text-navy-900 font-medium"}`}>
                      {isNeg ? "−" : ""}{fmt(r.value)}
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