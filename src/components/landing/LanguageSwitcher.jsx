import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageSwitcher() {
  const { lang, setLang, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onClick);
    return () => document.removeEventListener('pointerdown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-b2g-white/80 hover:text-b2g-white border border-b2g-copper/20 hover:border-b2g-copper/50 transition-colors b2g-focus-ring"
        style={{ borderRadius: '2px' }}
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe size={16} className="b2g-copper" />
        <span>{current.short}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-44 b2g-glass border border-b2g-copper/20 py-1 z-50"
          style={{ borderRadius: '2px' }}
        >
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
                l.code === lang ? 'text-b2g-cyan' : 'text-b2g-white/80 hover:text-b2g-white hover:bg-b2g-copper/10'
              }`}
            >
              <span>{l.label}</span>
              <span className="text-[0.65rem] b2g-muted font-mono">{l.short}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}