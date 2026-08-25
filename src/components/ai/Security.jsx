import React from "react";
import { ShieldCheck, Lock, KeyRound, FileLock2, ScrollText, UserCheck } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

const PILLARS = [
  { icon: UserCheck, title: "Role-Based Access Control", text: "Granular permissions by role, department and action." },
  { icon: KeyRound, title: "Multi-Factor Authentication", text: "Enforced MFA across all administrative access." },
  { icon: Lock, title: "Encryption in Transit", text: "TLS 1.2+ for all data in motion." },
  { icon: FileLock2, title: "Encryption at Rest", text: "AES-256 encryption for stored data." },
  { icon: ScrollText, title: "Audit Logs", text: "Comprehensive, tamper-evident activity records." },
  { icon: ShieldCheck, title: "Approval Workflows", text: "Configurable authorization for sensitive actions." },
];

const EXTRAS = ["Permission management", "Document access controls", "Data retention policies", "Administrative controls", "AI activity logs"];

export default function Security() {
  return (
    <Section id="security" dark className="bg-navy-900">
      <SectionHeading light eyebrow="SECURITY" title={<>YOUR DATA IS BUSINESS-CRITICAL.<br />TREAT IT THAT WAY.</>} subtitle="Enterprise-grade security architecture designed for procurement and tender operations." />
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.07}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 h-full">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-electric/15 text-cyan-light mb-4"><p.icon size={20} /></div>
              <h3 className="text-sm font-bold text-white mb-1.5">{p.title}</h3>
              <p className="text-xs text-navy-100 leading-relaxed">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center">
          <p className="text-xs text-navy-200">Additional controls: {EXTRAS.join(" · ")}</p>
          <p className="mt-3 text-xs text-navy-300">Certifications (ISO, SOC) are displayed here once verified and added by the administrator.</p>
        </div>
      </Reveal>
    </Section>
  );
}