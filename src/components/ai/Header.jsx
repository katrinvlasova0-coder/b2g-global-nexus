import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import Logo from "@/components/landing/Logo";
import { CTAButton } from "./Section";
import { useT, useLanguage, LANGUAGES } from "@/pages/ai/i18n/LanguageContext";

export default function Header() {
  const t = useT();
  const { lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: t.header.solutions, id: "solutions" },
    { label: t.header.howItWorks, id: "lifecycle" },
    { label: t.header.integrations, id: "integrations" },
    { label: t.header.security, id: "security" },
    { label: t.header.forEnterprise, id: "pricing" },
    { label: t.header.faq, id: "faq" },
    { label: "Deploy", id: "deploy" },
  ];

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const linkTone = scrolled ? "text-navy-700 hover:text-electric" : "text-white hover:text-cyan-light";

  return (
    <header className={`fixed top-3 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-navy-100 shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="h-10 md:h-12 w-px bg-gradient-to-b from-cyan-light/70 to-electric/70" />
            <Link to="/" className="shrink-0" aria-label="B2G home">
              <Logo className="h-9 sm:h-12 md:h-14 w-auto max-w-[42vw] object-contain object-left" />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className={`text-sm font-medium transition-colors ${linkTone}`}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/" className={`text-sm font-medium transition-colors px-2 ${linkTone}`}>
              Human specialists
            </Link>
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className={`flex items-center gap-1.5 text-sm font-medium transition-colors px-2 ${linkTone}`}>
                <Globe size={16} /> {currentLang.label}
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 mt-2 w-44 rounded-lg border border-navy-100 bg-white shadow-lg z-20 py-1">
                    {LANGUAGES.map((l) => (
                      <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }} className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-navy-50 ${l.code === lang ? "text-electric font-semibold" : "text-navy-700"}`}>
                        <span className="text-xs font-mono w-6">{l.label}</span> {l.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <CTAButton to="#deploy" className="!py-2.5">Hire AI Specialist</CTAButton>
          </div>

          <div className="flex lg:hidden items-center gap-1">
            <button onClick={() => setLangOpen(!langOpen)} className={`p-2 ${scrolled ? "text-navy-900" : "text-white"}`} aria-label="Language"><Globe size={20} /></button>
            <button className={`p-2 ${scrolled ? "text-navy-900" : "text-white"}`} onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass border-b border-navy-100">
          <div className="px-5 py-4 space-y-1">
            {nav.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="block w-full text-left py-2.5 text-sm font-medium text-navy-700">
                {item.label}
              </button>
            ))}
            {langOpen && (
              <div className="flex flex-wrap gap-1.5 py-2 border-t border-navy-100 mt-2">
                {LANGUAGES.map((l) => (
                  <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }} className={`px-2.5 py-1 rounded text-xs font-medium ${l.code === lang ? "bg-electric text-white" : "bg-navy-50 text-navy-700"}`}>{l.label}</button>
                ))}
              </div>
            )}
            <div className="pt-3 flex flex-col gap-2 border-t border-navy-100 mt-2">
              <Link to="/" onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-navy-700">Human specialists</Link>
              <CTAButton to="#deploy" onClick={() => setOpen(false)}>Hire AI Specialist</CTAButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
