import React from "react";
import { Check, X } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

const ROWS = [
  { cap: "Opportunity monitoring", trad: "Manual / periodic", b2g: "Continuous" },
  { cap: "Document analysis", trad: "Manual", b2g: "AI-assisted" },
  { cap: "Opportunity scoring", trad: "Subjective", b2g: "Structured analysis" },
  { cap: "Bid/no-bid analysis", trad: "Fragmented", b2g: "Centralized" },
  { cap: "Cost estimation", trad: "Multiple workflows", b2g: "Integrated" },
  { cap: "Document preparation", trad: "Manual", b2g: "AI-assisted" },
  { cap: "Supplier sourcing", trad: "Manual research", b2g: "Automated assistance" },
  { cap: "Deadline monitoring", trad: "Human-dependent", b2g: "Continuous" },
  { cap: "Corporate knowledge", trad: "Distributed", b2g: "Centralized" },
  { cap: "Reporting", trad: "Periodic", b2g: "Real-time" },
  { cap: "Scaling", trad: "Hiring-dependent", b2g: "AI-enabled" },
];

export default function Comparison() {
  return (
    <Section id="comparison">
      <SectionHeading eyebrow="TRADITIONAL DEPARTMENT VS B2G" title={<>A NEW OPERATING MODEL<br />FOR TENDER MANAGEMENT</>} />
      <Reveal>
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-navy-700">Capability</th>
                <th className="p-4 text-sm font-semibold text-muted-foreground bg-navy-50/50 rounded-t-xl">
                  <span className="flex items-center gap-2 justify-center"><X size={16} className="text-rose-500" /> Traditional Workflow</span>
                </th>
                <th className="p-4 text-sm font-bold text-white bg-navy-900 rounded-t-xl">
                  <span className="flex items-center gap-2 justify-center"><Check size={16} className="text-cyan-light" /> B2G AI Tender Department</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.cap} className={i % 2 ? "bg-navy-50/30" : ""}>
                  <td className="p-4 text-sm font-medium text-navy-900">{r.cap}</td>
                  <td className="p-4 text-sm text-muted-foreground text-center">{r.trad}</td>
                  <td className="p-4 text-sm font-semibold text-navy-900 text-center bg-navy-900/[0.03]">{r.b2g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-6 text-center text-xs text-muted-foreground">B2G does not publish unverified efficiency claims such as "90% cheaper" or "10x faster" without actual customer data.</p>
      </Reveal>
    </Section>
  );
}