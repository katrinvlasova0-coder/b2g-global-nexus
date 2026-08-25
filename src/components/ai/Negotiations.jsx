import React from "react";
import { MessageSquare, Send, ShieldCheck } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

const MSGS = [
  { from: "ai", text: "Good morning. We are preparing a quote for the infrastructure upgrade. Could you confirm availability and indicative pricing for steel reinforcement bars per the attached specification?" },
  { from: "supplier", text: "Confirmed available. Indicative pricing €620/ton, delivery within 4 weeks, payment net 30." },
  { from: "ai", text: "Noted. Could you offer improved payment terms (net 45) for an order above 80 tons? We can also share a 12-month forecast." },
  { from: "supplier", text: "For 80+ tons we can offer net 45 and a 3% volume discount. Formal quote to follow." },
];

export default function Negotiations() {
  return (
    <Section id="negotiations" dark className="bg-navy-900">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeading light center={false} eyebrow="AI-ASSISTED NEGOTIATIONS" title="LET AI HANDLE THE FIRST ROUND" subtitle="Where approved integrations and communication channels are available, B2G can support initial supplier and subcontractor communication." />
          <Reveal delay={0.1}>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-navy-100">
              {["Prepare outreach", "Prepare RFQs", "Send approved requests via corporate channels", "Request pricing", "Clarify delivery schedules", "Ask about payment terms", "Collect responses", "Structure quotations", "Compare commercial terms", "Prepare negotiation summaries"].map((c) => (
                <li key={c} className="flex items-start gap-2"><span className="text-cyan-light mt-0.5">›</span>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-white/10 bg-navy-800/80 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
              <MessageSquare size={16} className="text-cyan-light" />
              <span className="text-sm font-semibold text-white">Conversation Intelligence</span>
              <span className="ml-auto text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">APPROVED CHANNEL</span>
            </div>
            <div className="p-5 space-y-3">
              {MSGS.map((m, i) => (
                <div key={i} className={`flex ${m.from === "ai" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "ai" ? "bg-white/10 text-navy-100 rounded-tl-sm" : "bg-electric text-white rounded-tr-sm"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 mt-2 px-4 py-2.5 rounded-xl bg-white/5 text-navy-200 text-sm">
                <Send size={14} /> Awaiting human approval to send counter-offer...
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-navy-200 leading-relaxed flex items-start gap-2">
            <ShieldCheck size={14} className="text-cyan-light shrink-0 mt-0.5" />
            Critical commercial commitments, final pricing agreements and legally binding actions remain subject to company-defined approval rules.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}