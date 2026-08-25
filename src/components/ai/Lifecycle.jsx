import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

const STAGES = [
  { name: "DISCOVER", text: "Continuous monitoring of public procurement, commercial tenders and procurement portals. Automatic removal of irrelevant opportunities." },
  { name: "QUALIFY", text: "Industry filtering, geographic fit, contract value, customer matching and capability alignment." },
  { name: "ANALYZE", text: "300-page tender packages converted into structured intelligence — requirements, risks, deadlines and obligations." },
  { name: "BID / NO-BID", text: "Expected revenue, costs, margins, working capital and risk-adjusted return analyzed for an executive recommendation." },
  { name: "ESTIMATE", text: "Scope breakdown, materials, labor, subcontractors, logistics, financing and risk reserves into a target bid price." },
  { name: "PREPARE", text: "Document checklist generated against the company knowledge base. Compliance matrices and bid readiness tracked." },
  { name: "SOURCE", text: "Supplier and subcontractor discovery, RFQ preparation, quote collection and commercial-term comparison." },
  { name: "SUBMIT", text: "Final bid packages assembled, checked for completeness and submitted through authorized channels." },
  { name: "CONTRACT", text: "Contract draft analysis, obligation and deadline extraction, milestone and deliverable tracking." },
  { name: "REPORT", text: "Real-time executive dashboard — pipeline, win rate, workload, buyers and loss reasons in one screen." },
];

export default function Lifecycle() {
  const [active, setActive] = useState(0);
  return (
    <Section id="lifecycle">
      <SectionHeading eyebrow="COMPLETE TENDER LIFECYCLE" title="FROM OPPORTUNITY TO CONTRACT" subtitle="An interactive workflow covering every stage of tender management — orchestrated by your AI employee." />
      <Reveal>
        <div className="mt-12 overflow-x-auto pb-2">
          <div className="flex items-center gap-1 min-w-max">
            {STAGES.map((s, i) => (
              <React.Fragment key={s.name}>
                <button onClick={() => setActive(i)} className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all whitespace-nowrap ${active === i ? "bg-electric text-white shadow-lg shadow-electric/30" : "bg-navy-50 text-navy-700 hover:bg-navy-100"}`}>
                  {s.name}
                </button>
                {i < STAGES.length - 1 && <span className="text-navy-200">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
            className="mt-6 grid md:grid-cols-[auto_1fr] gap-6 p-6 md:p-8 rounded-2xl border border-navy-100 bg-navy-50/50">
            <div className="flex md:flex-col items-center md:items-start gap-3">
              <div className="text-5xl font-bold font-heading text-navy-200 tabular-nums">{String(active + 1).padStart(2, "0")}</div>
              <div className="text-lg font-bold tracking-wide text-navy-900">{STAGES[active].name}</div>
            </div>
            <p className="text-navy-700 leading-relaxed text-lg self-center">{STAGES[active].text}</p>
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </Section>
  );
}