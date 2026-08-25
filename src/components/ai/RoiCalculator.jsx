import React, { useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { Section, SectionHeading, CTAButton } from "./Section";
import Reveal from "./Reveal";

function Field({ label, value, onChange, placeholder, prefix = "" }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{prefix}</span>}
        <input type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className={`w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-900 focus:border-electric focus:ring-2 focus:ring-electric/20 outline-none ${prefix ? "pl-7" : ""}`} />
      </div>
    </div>
  );
}

export default function RoiCalculator() {
  const [employees, setEmployees] = useState("3");
  const [cost, setCost] = useState("4500");
  const [reviewed, setReviewed] = useState("40");
  const [bids, setBids] = useState("6");
  const [value, setValue] = useState("500000");
  const [winRate, setWinRate] = useState("20");

  const num = (v) => parseFloat(v) || 0;
  const annualCost = num(employees) * num(cost) * 12;
  const costPerBid = num(bids) > 0 ? annualCost / (num(bids) * 12) : 0;
  const pipeline = num(reviewed) * num(value) * 12;

  return (
    <Section id="roi" dark className="bg-navy-900">
      <SectionHeading light eyebrow="ROI CALCULATOR" title={<>WHAT DOES YOUR CURRENT<br />TENDER PROCESS COST?</>} subtitle="Estimate your current tender department economics. Projections are estimates, not guaranteed outcomes." />
      <div className="mt-12 grid lg:grid-cols-2 gap-8">
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6 space-y-4">
            <Field label="Number of Tender Employees" value={employees} onChange={setEmployees} placeholder="3" />
            <Field label="Average Monthly Employee Cost" value={cost} onChange={setCost} prefix="€" placeholder="4500" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Tenders Reviewed / Month" value={reviewed} onChange={setReviewed} placeholder="40" />
              <Field label="Bids Submitted / Month" value={bids} onChange={setBids} placeholder="6" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Average Contract Value" value={value} onChange={setValue} prefix="€" placeholder="500000" />
              <Field label="Average Win Rate (%)" value={winRate} onChange={setWinRate} placeholder="20" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-cyan/30 bg-gradient-to-br from-electric/10 to-cyan/5 p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-5"><Calculator size={18} className="text-cyan-light" /><span className="text-sm font-semibold text-white">YOUR ESTIMATED ECONOMICS</span></div>
            <div className="space-y-4 flex-1">
              <Result label="Current Annual Tender Department Cost" value={`€${annualCost.toLocaleString("en-US")}`} />
              <Result label="Current Cost per Bid" value={`€${Math.round(costPerBid).toLocaleString("en-US")}`} />
              <Result label="Annual Pipeline Value" value={`€${pipeline.toLocaleString("en-US")}`} />
              <Result label="Estimated Annual Won Value" value={`€${Math.round(pipeline * (num(winRate) / 100)).toLocaleString("en-US")}`} highlight />
            </div>
            <CTAButton to="#deploy" variant="primary" className="mt-6 w-full"><TrendingUp size={16} /> CALCULATE YOUR B2G BUSINESS CASE</CTAButton>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.2}><p className="mt-6 text-center text-xs text-navy-300">B2G does not present hypothetical AI savings as guaranteed financial outcomes. All figures are estimates.</p></Reveal>
    </Section>
  );
}

function Result({ label, value, highlight }) {
  return (
    <div className={`flex items-center justify-between py-3 border-b border-white/10 ${highlight ? "border-0 bg-white/5 -mx-2 px-3 rounded-lg" : ""}`}>
      <span className="text-sm text-navy-100">{label}</span>
      <span className={`font-bold tabular-nums ${highlight ? "text-cyan-light text-lg" : "text-white"}`}>{value}</span>
    </div>
  );
}