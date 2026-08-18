import React from 'react';
import Logo from '@/components/landing/Logo';
import { useLanguage } from '@/lib/LanguageContext';

const PHOTO =
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&h=900&q=80&auto=format&fit=crop';

export default function ArticleConsultBanner() {
  const { t } = useLanguage();
  const copy = t.blog;

  return (
    <aside className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 my-16">
      <div className="grid lg:grid-cols-2 min-h-[320px] border-y border-b2g-copper/40">
        <div className="relative min-h-[240px] lg:min-h-[360px]">
          <img src={PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-b2g-obsidian/55 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-b2g-obsidian/35" />
        </div>
        <div
          className="relative flex flex-col justify-center px-6 py-12 lg:px-14"
          style={{ backgroundColor: '#00001a' }}
        >
          <Logo className="h-11 lg:h-14 mb-8 object-contain object-left" />
          <p className="b2g-label text-b2g-cyan mb-4">{copy.consultKicker}</p>
          <p className="b2g-h text-b2g-white text-4xl lg:text-5xl leading-[1.05] mb-6 max-w-lg">
            {copy.consultTitle}
          </p>
          <p className="text-b2g-slate text-lg leading-relaxed mb-8 max-w-md">{copy.ctaBody}</p>
          <a
            href="#blog-lead-form"
            className="b2g-copper-bg inline-flex w-fit px-7 py-3.5 text-sm font-semibold tracking-wide b2g-focus-ring hover:scale-[1.02] active:scale-95 transition-transform"
            style={{ borderRadius: '2px' }}
          >
            {copy.consultButton}
          </a>
        </div>
      </div>
    </aside>
  );
}
