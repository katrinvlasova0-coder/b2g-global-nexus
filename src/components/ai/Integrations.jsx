import React from "react";
import { Plug, CheckCircle2, Wrench, Clock } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

const INTEGRATIONS = [
  { name: "CRM", status: "AVAILABLE" }, { name: "ERP", status: "AVAILABLE" },
  { name: "Microsoft 365", status: "AVAILABLE" }, { name: "Google Workspace", status: "AVAILABLE" },
  { name: "Corporate Email", status: "AVAILABLE" }, { name: "Google Drive", status: "AVAILABLE" },
  { name: "SharePoint", status: "AVAILABLE" }, { name: "Microsoft Teams", status: "AVAILABLE" },
  { name: "Slack", status: "AVAILABLE" }, { name: "Document Management", status: "CUSTOM INTEGRATION" },
  { name: "Procurement Platforms", status: "CUSTOM INTEGRATION" }, { name: "Tender Databases", status: "AVAILABLE" },
  { name: "Internal Databases", status: "CUSTOM INTEGRATION" }, { name: "Business Intelligence", status: "CUSTOM INTEGRATION" },
  { name: "API", status: "AVAILABLE" }, { name: "Workflow Automation", status: "COMING SOON" },
];

const STATUS_CFG = {
  "AVAILABLE": { icon: CheckCircle2, cls: "text-emerald-600 bg-emerald-50" },
  "CUSTOM INTEGRATION": { icon: Wrench, cls: "text-electric bg-electric/10" },
  "COMING SOON": { icon: Clock, cls: "text-amber-600 bg-amber-50" },
};

export default function Integrations() {
  return (
    <Section id="integrations">
      <SectionHeading eyebrow="INTEGRATIONS" title="B2G WORKS INSIDE YOUR BUSINESS" subtitle="B2G connects to the systems your team already uses. Specific integrations are configured during implementation." />
      <Reveal>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {INTEGRATIONS.map((it, i) => {
            const s = STATUS_CFG[it.status];
            return (
              <Reveal key={it.name} delay={(i % 4) * 0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-5 hover:border-electric hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-700"><Plug size={18} /></div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold tracking-wide ${s.cls}`}><s.icon size={10} /> {it.status}</span>
                  </div>
                  <div className="text-sm font-semibold text-navy-900">{it.name}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-8 text-center text-xs text-muted-foreground max-w-2xl mx-auto">B2G does not claim that a specific integration already exists unless configured by the administrator during implementation.</p>
      </Reveal>
    </Section>
  );
}