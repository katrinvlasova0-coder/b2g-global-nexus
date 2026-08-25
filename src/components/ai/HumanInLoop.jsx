import React from "react";
import { Bot, ClipboardCheck, Lightbulb, ShieldCheck } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

const MODES = [
  { icon: Bot, title: "AUTONOMOUS", text: "B2G automatically performs explicitly authorized low-risk tasks.", tone: "emerald" },
  { icon: ClipboardCheck, title: "APPROVAL REQUIRED", text: "B2G prepares the action and requests human approval before execution.", tone: "electric" },
  { icon: Lightbulb, title: "ADVISORY", text: "B2G analyzes information and provides recommendations only.", tone: "amber" },
];

const PERMS = ["Role", "Department", "Action", "Transaction value", "Tender value", "Risk level", "Country", "Customer", "Document type"];

const toneCls = { emerald: "border-emerald-400/30 bg-emerald-400/5 text-emerald-600", electric: "border-electric/30 bg-electric/5 text-electric", amber: "border-amber-400/30 bg-amber-400/5 text-amber-600" };

export default function HumanInLoop() {
  return (
    <Section id="control" dark className="bg-navy-900">
      <SectionHeading light eyebrow="HUMAN-IN-THE-LOOP CONTROL" title={<>AI DOES THE WORK.<br />YOU CONTROL THE DECISIONS.</>} subtitle="Three configurable operating modes let companies define exactly how much autonomy the AI employee has." />
      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {MODES.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.1}>
            <div className={`rounded-2xl border p-6 h-full ${toneCls[m.tone]}`}>
              <m.icon size={32} className="mb-4" />
              <h3 className="text-lg font-bold tracking-wide text-white">{m.title}</h3>
              <p className="mt-2 text-sm text-navy-100 leading-relaxed">{m.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.3}>
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-2 mb-4"><ShieldCheck size={18} className="text-cyan-light" /><span className="text-sm font-semibold text-white">Permissions configurable by</span></div>
          <div className="flex flex-wrap gap-2">
            {PERMS.map((p) => <span key={p} className="px-3 py-1.5 rounded-lg bg-white/10 text-xs text-navy-100">{p}</span>)}
          </div>
          <p className="mt-5 text-xs text-navy-200 leading-relaxed">Legally binding actions, contract execution, final submissions and financial commitments remain subject to applicable authorization requirements and company policies.</p>
        </div>
      </Reveal>
    </Section>
  );
}