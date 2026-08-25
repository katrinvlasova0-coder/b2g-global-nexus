import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserCog, Cpu, ShieldCheck, Play, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";
import { useT } from "@/pages/ai/i18n/LanguageContext";

const ICONS = [UserCog, Cpu, ShieldCheck, Play];

export default function NotAChatbot() {
  const t = useT();
  const n = t.notAChatbot;
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % n.steps.length), 3000);
    return () => clearInterval(timer);
  }, [n.steps.length]);

  return (
    <Section dark id="not-chatbot" className="bg-navy-900">
      <SectionHeading light eyebrow={n.eyebrow} title={<>{n.title1}<br />{n.title2}</>} />
      <Reveal>
        <p className="text-center mt-6 max-w-2xl mx-auto text-navy-100 leading-relaxed">
          {n.introPre} <span className="text-white font-semibold">{n.introBold}</span>
        </p>
      </Reveal>

      <div className="mt-14 grid lg:grid-cols-4 gap-4 relative">
        {n.steps.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={s.title} delay={i * 0.1}>
              <button onClick={() => setActive(i)} className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${active === i ? "border-cyan bg-white/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
                <Icon className={`mb-4 ${active === i ? "text-cyan-light" : "text-navy-200"}`} size={28} />
                <div className="text-sm font-bold tracking-wide text-white mb-2">{s.title}</div>
                <p className="text-xs text-navy-100 leading-relaxed">{s.text}</p>
              </button>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2 text-navy-200">
            {n.steps.map((_, i) => (
              <React.Fragment key={i}>
                <div className={`w-2 h-2 rounded-full transition-all ${active === i ? "bg-cyan-light scale-150" : "bg-white/20"}`} />
                {i < n.steps.length - 1 && <ArrowRight size={14} className="text-white/20" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}