import React from "react";
import { Check, Star } from "lucide-react";
import { Section, SectionHeading, CTAButton } from "./Section";
import Reveal from "./Reveal";

const TIERS = [
  {
    name: "AI TENDER SPECIALIST",
    desc: "For companies that want to automate day-to-day tender operations.",
    features: ["Opportunity Discovery", "Tender Analysis", "Document Preparation", "Deadline Monitoring", "Supplier Research", "Reporting"],
    cta: "HIRE AI SPECIALIST", to: "#deploy", featured: false,
  },
  {
    name: "AI HEAD OF TENDERS",
    desc: "For companies with existing tender teams.",
    features: ["Everything in AI Tender Specialist", "Team Coordination", "Tender Prioritization", "KPI Monitoring", "Pipeline Management", "Management Reporting", "Win/Loss Analysis"],
    cta: "DEPLOY AI HEAD OF TENDERS", to: "#deploy", featured: true,
  },
  {
    name: "AI TENDER DEPARTMENT",
    desc: "For companies that want an end-to-end AI-enabled tender operation.",
    features: ["Custom workflows", "Multiple AI roles", "Enterprise integrations", "Custom approval hierarchy", "Advanced reporting", "Dedicated implementation"],
    cta: "DEPLOY AI DEPARTMENT", to: "#deploy", featured: false,
  },
];

export default function PricingTiers() {
  return (
    <Section id="pricing">
      <SectionHeading eyebrow="PRODUCT TIERS" title="CHOOSE YOUR AI WORKFORCE" subtitle="From a single AI specialist to a complete AI tender department." />
      <div className="mt-12 grid lg:grid-cols-3 gap-6 items-stretch">
        {TIERS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <div className={`relative rounded-2xl p-7 h-full flex flex-col ${t.featured ? "bg-navy-900 text-white border-2 border-cyan shadow-2xl lg:-mt-4 lg:mb-4" : "bg-white border border-navy-100 shadow-sm"}`}>
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan text-navy-900 text-[10px] font-bold tracking-wide">
                  <Star size={11} /> MOST ADVANCED
                </div>
              )}
              <h3 className={`text-sm font-bold tracking-[0.1em] ${t.featured ? "text-cyan-light" : "text-electric"}`}>{t.name}</h3>
              <p className={`mt-2 text-sm ${t.featured ? "text-navy-100" : "text-muted-foreground"} leading-relaxed`}>{t.desc}</p>
              <ul className="mt-6 space-y-2.5 flex-1">
                {t.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${t.featured ? "text-navy-100" : "text-navy-700"}`}>
                    <Check size={16} className={`shrink-0 mt-0.5 ${t.featured ? "text-cyan-light" : "text-emerald-500"}`} /> {f}
                  </li>
                ))}
              </ul>
              <CTAButton to={t.to} variant={t.featured ? "primary" : "outline"} className="mt-7 w-full">{t.cta}</CTAButton>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.3}><p className="mt-6 text-center text-xs text-muted-foreground">Pricing is defined per implementation. Contact B2G for a tailored proposal.</p></Reveal>
    </Section>
  );
}