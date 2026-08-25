import React from "react";
import { Section, SectionHeading, CTAButton } from "./Section";
import Reveal from "./Reveal";
import { useT } from "@/pages/ai/i18n/LanguageContext";

export default function Solutions() {
  const t = useT();
  const s = t.solutions;
  return (
    <Section id="solutions" dark className="bg-graphite">
      <SectionHeading light eyebrow={s.eyebrow} title={<>{s.title1}<br />{s.title2}</>} subtitle={s.subtitle} />
      <Reveal>
        <div className="mt-10 flex flex-wrap gap-2.5 justify-center">
          {s.roles.map((r) => (
            <span key={r} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-navy-100">{r}</span>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-10 text-center">
          <CTAButton to="#deploy" variant="primary" className="!px-8 !py-3.5">{s.cta}</CTAButton>
        </div>
      </Reveal>
    </Section>
  );
}