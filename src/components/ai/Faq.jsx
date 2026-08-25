import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeading, CTAButton } from "./Section";
import Reveal from "./Reveal";

const FAQS = [
  { q: "What is a B2G AI Employee?", a: "A B2G AI Employee is a digital worker integrated into your organization with a defined role, responsibilities, permissions and KPIs — capable of performing and coordinating the complete tender lifecycle, not just answering questions." },
  { q: "How is B2G different from ChatGPT?", a: "ChatGPT waits for someone to ask a question. A B2G AI Employee receives a role and works continuously — monitoring sources, analyzing documents, preparing recommendations and performing authorized operational tasks, while humans retain control of critical decisions." },
  { q: "Is B2G a tender search engine?", a: "No. Opportunity discovery is one capability. B2G covers the entire lifecycle from discovery and document analysis to cost estimation, bid preparation, supplier sourcing, contract intelligence and management reporting." },
  { q: "Can B2G replace a Tender Specialist?", a: "B2G can perform a significant portion of a tender specialist's work. It can operate as additional capacity for an existing team or as the foundation of a new tender department, with humans retaining control of strategic, financial and legally binding decisions." },
  { q: "Can B2G work alongside our existing tender team?", a: "Yes. B2G can act as an AI layer coordinating an existing human tender team, taking on repetitive analytical and operational work so your team focuses on decisions and relationships." },
  { q: "Where does B2G find tender opportunities?", a: "B2G continuously monitors connected public procurement, commercial tender and procurement portal sources, filtered to your company's profile — products, geography, contract sizes, strategic customers and margin requirements." },
  { q: "Can B2G analyze complex tender documents?", a: "Yes. B2G analyzes large tender packages and converts them into structured intelligence — requirements, risks, deadlines, obligations and critical terms — with source references back to the relevant document sections wherever possible." },
  { q: "Can B2G prepare cost estimates?", a: "Yes. B2G breaks down scope, identifies materials and labor, includes subcontractor quotations, calculates financing and risk reserves, and structures a target bid price with expected margin." },
  { q: "How does Bid / No-Bid analysis work?", a: "B2G analyzes expected revenue, direct and indirect costs, working capital, guarantees, risks and margin against your company thresholds, then produces an executive recommendation — PROCEED or NO-BID — with supporting reasons." },
  { q: "Can B2G source subcontractors and suppliers?", a: "Yes. Based on tender requirements, B2G identifies capabilities that must be sourced externally, prepares RFQs, collects quotes and compares commercial terms to produce a shortlist." },
  { q: "Can B2G communicate with suppliers?", a: "Where approved integrations and communication channels exist, B2G can handle initial outreach, RFQs and quote collection. Critical commercial commitments and legally binding actions remain subject to your approval rules." },
  { q: "Can B2G prepare tender documentation?", a: "Yes. B2G generates a document checklist checked against your knowledge base, with statuses (ready, missing, expired, requires signature, human approval required) and can assist in preparing application forms, proposals, compliance matrices and supporting documents." },
  { q: "Can B2G submit tenders automatically?", a: "Final submissions remain subject to your company-defined authorization requirements. B2G assembles and checks bid packages; submission is governed by your approval workflows." },
  { q: "Can B2G integrate with our CRM or ERP?", a: "B2G is designed to connect to CRM, ERP, document management and communication systems. Specific integrations are configured during implementation based on your stack." },
  { q: "How is corporate information protected?", a: "B2G uses role-based access control, multi-factor authentication, encryption in transit and at rest, audit logs and configurable approval workflows. Your data is treated as business-critical." },
  { q: "How long does implementation take?", a: "Implementation follows a structured six-stage process — understand, configure, connect, adapt, deploy and scale. Timelines depend on your systems, data and scope and are defined during scoping." },
  { q: "Can we deploy an AI Head of Tenders?", a: "Yes. The AI Head of Tenders operates at management level — managing the pipeline, prioritizing opportunities, tracking KPIs and coordinating workflows while human managers retain final authority." },
  { q: "Can B2G support multiple countries?", a: "Yes. B2G supports geographic filtering and multi-country monitoring. Country-specific sources and rules are configured during implementation." },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq">
      <SectionHeading eyebrow="FAQ" title="QUESTIONS, ANSWERED" subtitle="Everything decision-makers need to know about deploying an AI tender employee." />
      <Reveal>
        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="rounded-xl border border-navy-100 bg-white overflow-hidden">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="text-sm font-semibold text-navy-900">{f.q}</span>
                <ChevronDown size={18} className={`text-electric shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</div>}
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-10 text-center"><CTAButton to="#deploy" variant="primary">HIRE AN AI TENDER SPECIALIST</CTAButton></div>
      </Reveal>
    </Section>
  );
}