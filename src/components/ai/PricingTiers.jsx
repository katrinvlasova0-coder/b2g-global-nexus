import React from "react";
import { Check, Star } from "lucide-react";
import { Section, SectionHeading, CTAButton } from "./Section";
import Reveal from "./Reveal";

const TIERS = [
  {
    name: "AI TENDER SPECIALIST",
    product: "AI Tender Specialist",
    desc: "Automate day-to-day tender ops — discovery, analysis, docs, deadlines.",
    features: ["Opportunity Discovery", "Tender Analysis", "Document Preparation", "Deadline Monitoring", "Supplier Research", "Reporting"],
    cta: "HIRE AI SPECIALIST", to: "#deploy", featured: false,
  },
  {
    name: "AI HEAD OF TENDERS",
    product: "AI Head of Tenders",
    desc: "Coordinate the tender team: priorities, KPIs, pipeline, win/loss.",
    features: ["Everything in AI Tender Specialist", "Team Coordination", "Tender Prioritization", "KPI Monitoring", "Pipeline Management", "Management Reporting", "Win/Loss Analysis"],
    cta: "DEPLOY AI HEAD OF TENDERS", to: "#deploy", featured: true,
  },
  {
    name: "AI TENDER DEPARTMENT",
    product: "AI Tender Department",
    desc: "Full AI-enabled tender operation with custom workflows and roles.",
    features: ["Custom workflows", "Multiple AI roles", "Enterprise integrations", "Custom approval hierarchy", "Advanced reporting", "Dedicated implementation"],
    cta: "DEPLOY AI DEPARTMENT", to: "#deploy", featured: false,
  },
];

function selectProduct(product) {
  try {
    sessionStorage.setItem("b2g_ai_product", product);
  } catch {
    /* ignore */
  }
}

export default function PricingTiers() {
  return (
    <Section id="pricing">
      <SectionHeading eyebrow="PRODUCT TIERS" title="CHOOSE YOUR AI WORKFORCE" subtitle="Pick a level — then apply for deployment. Pricing is scoped per implementation." />
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {TIERS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1} className="h-full">
            <div className={`relative rounded-2xl p-6 sm:p-7 h-full flex flex-col ${t.featured ? "bg-navy-900 text-white border-2 border-cyan shadow-2xl lg:-mt-2" : "bg-white border border-navy-100 shadow-sm"}`}>
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
              <CTAButton
                to={t.to}
                variant={t.featured ? "primary" : "outline"}
                className="mt-7 w-full"
                onClick={() => selectProduct(t.product)}
              >
                {t.cta}
              </CTAButton>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.3}><p className="mt-6 text-center text-xs text-muted-foreground">No payment on this page. Apply below — we reply with next steps.</p></Reveal>
    </Section>
  );
}