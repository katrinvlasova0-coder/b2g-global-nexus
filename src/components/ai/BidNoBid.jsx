import React from "react";
import { ThumbsUp, ThumbsDown, TrendingUp, ShieldAlert } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

const POSITIVE = [
  "Strong technical capability match with previous project portfolio.",
  "Expected margin of 18.4% exceeds the company threshold of 15%.",
  "Buyer has a history of timely payments and repeat procurement.",
  "Required certifications already held by the company.",
];

const METRICS = [
  { label: "Tender Fit", value: "94%", tone: "good" },
  { label: "Expected Margin", value: "18.4%", tone: "good" },
  { label: "Risk", value: "MEDIUM", tone: "warn" },
  { label: "Estimated Contract Value", value: "€2.4M" },
  { label: "Working Capital Requirement", value: "€410K" },
];

export default function BidNoBid() {
  return (
    <Section dark className="bg-navy-900">
      <SectionHeading light eyebrow="BID / NO-BID INTELLIGENCE" title={<>WINNING THE WRONG CONTRACT<br />CAN BE WORSE THAN LOSING IT.</>} subtitle="B2G doesn't simply identify opportunities. It helps management determine whether the opportunity is economically worth pursuing." />
      <div className="mt-12 grid lg:grid-cols-2 gap-6">
        {/* PROCEED */}
        <Reveal>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-6 h-full">
            <div className="flex items-center gap-2 mb-1">
              <ThumbsUp size={18} className="text-emerald-400" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-emerald-400">AI Bid Recommendation</span>
            </div>
            <h3 className="text-2xl font-bold text-white">PROCEED</h3>
            <div className="mt-5 space-y-2">
              {METRICS.map((m) => (
                <div key={m.label} className="flex items-center justify-between py-2 border-b border-white/10 text-sm">
                  <span className="text-navy-100">{m.label}</span>
                  <span className={`font-semibold ${m.tone === "good" ? "text-emerald-400" : m.tone === "warn" ? "text-amber-400" : "text-white"}`}>{m.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <div className="text-xs font-semibold tracking-[0.15em] uppercase text-navy-200 mb-3">WHY B2G RECOMMENDS PARTICIPATION</div>
              <ul className="space-y-2">
                {POSITIVE.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-navy-100">
                    <TrendingUp size={15} className="text-emerald-400 shrink-0 mt-0.5" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        {/* NO-BID */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-rose-400/30 bg-rose-400/5 p-6 h-full">
            <div className="flex items-center gap-2 mb-1">
              <ThumbsDown size={18} className="text-rose-400" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-rose-400">Alternative Outcome</span>
            </div>
            <h3 className="text-2xl font-bold text-white">NO-BID RECOMMENDED</h3>
            <div className="mt-6 space-y-3">
              {["Expected margin below company threshold", "Excessive performance guarantee requirement", "Execution timeline presents elevated risk"].map((r) => (
                <div key={r} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 text-sm text-navy-100">
                  <ShieldAlert size={16} className="text-rose-400 shrink-0 mt-0.5" /> {r}
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-navy-200 leading-relaxed">Final participation decisions remain with authorized company personnel.</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}