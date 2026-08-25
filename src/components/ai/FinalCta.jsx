import React from "react";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "./Section";
import Reveal from "./Reveal";
import { useT } from "@/pages/ai/i18n/LanguageContext";

export default function FinalCta() {
  const t = useT();
  const f = t.finalCta;
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-electric/15 blur-[140px]" />
      <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
            {f.title1}<br />{f.title2}
          </h2>
          <p className="mt-6 text-lg text-navy-100 max-w-2xl mx-auto">
            {f.p}
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton to="#deploy" variant="primary" className="!px-8 !py-4 text-base">
              {f.cta1} <ArrowRight size={18} />
            </CTAButton>
          </div>
          <p className="mt-6 text-sm text-navy-200 font-heading tracking-tight">{f.subtext}</p>
        </Reveal>
      </div>
    </section>
  );
}