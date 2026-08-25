import React from "react";
import { Radar, MapPin, Building2, Coins } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

const CAPS = [
  "Public procurement monitoring", "Commercial tender monitoring", "Procurement portal monitoring",
  "Keyword-based discovery", "Industry filtering", "Customer / contracting authority monitoring",
  "Geographic filtering", "Contract value filtering", "Product and service matching",
  "Recurring procurement detection", "Saved buyer monitoring", "Deadline monitoring",
  "Automatic removal of irrelevant opportunities",
];

const RULES = [
  { icon: Building2, q: "What do we sell?" },
  { icon: MapPin, q: "Where do we operate?" },
  { icon: Coins, q: "What contract sizes are relevant?" },
  { icon: Radar, q: "Which customers are strategically important?" },
  { icon: Coins, q: "What margin do we require?" },
  { icon: Radar, q: "What risks are unacceptable?" },
];

export default function OpportunityDiscovery() {
  return (
    <Section id="discovery">
      <SectionHeading eyebrow="OPPORTUNITY DISCOVERY" title={<>NEVER MISS A<br />RELEVANT OPPORTUNITY</>} subtitle="B2G continuously monitors connected tender and procurement sources and identifies opportunities matching the company's profile." />
      <div className="mt-12 grid lg:grid-cols-2 gap-10">
        <Reveal>
          <div className="rounded-2xl border border-navy-100 bg-navy-50/40 p-6">
            <h3 className="text-sm font-bold text-navy-900 mb-4">Continuous monitoring capabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CAPS.map((c) => (
                <div key={c} className="flex items-start gap-2 text-sm text-navy-700"><span className="text-electric mt-0.5">›</span>{c}</div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm h-full">
            <h3 className="text-sm font-bold text-navy-900 mb-2">Your company defines the rules</h3>
            <p className="text-sm text-muted-foreground mb-5">B2G converts these rules into a continuously operating opportunity pipeline.</p>
            <div className="space-y-2.5">
              {RULES.map((r) => (
                <div key={r.q} className="flex items-center gap-3 p-3 rounded-lg bg-navy-50/50">
                  <r.icon size={18} className="text-electric shrink-0" />
                  <span className="text-sm font-medium text-navy-900">{r.q}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}