import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/landing/Logo';
import LanguageSwitcher from '@/components/landing/LanguageSwitcher';
import SectionLink from '@/components/landing/SectionLink';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { label: t.nav.whoWeSeek, hash: '#who-we-seek' },
    { label: t.nav.expertise, hash: '#expertise' },
    { label: t.nav.capabilities, hash: '#capabilities' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'b2g-glass' : 'bg-transparent'}`}>
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <SectionLink hash="#top" className="flex items-center group" aria-label="B2G Global Services Corp — home">
          <span className="w-px h-6 lg:h-9 bg-b2g-copper mr-px shrink-0" />
          <Logo className="h-9 lg:h-14 max-w-[46vw] object-contain object-left" />
        </SectionLink>

        <div className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <SectionLink
              key={link.hash}
              hash={link.hash}
              className="b2g-link-underline text-sm font-medium text-b2g-white/80 hover:text-b2g-white transition-colors b2g-focus-ring"
            >
              {link.label}
            </SectionLink>
          ))}
          <Link
            to="/blog"
            className="b2g-link-underline text-sm font-medium text-b2g-cyan hover:text-b2g-cyan/80 transition-colors b2g-focus-ring"
          >
            {t.nav.blog}
          </Link>
          <Link
            to="/platform"
            className="b2g-link-underline text-sm font-medium text-b2g-cyan hover:text-b2g-cyan/80 transition-colors b2g-focus-ring"
          >
            {t.nav.platform}
          </Link>
          <Link
            to="/data-room"
            className="b2g-link-underline text-sm font-medium text-b2g-cyan hover:text-b2g-cyan/80 transition-colors b2g-focus-ring"
          >
            {t.nav.dataRoom}
          </Link>
          <SectionLink
            hash="#contact"
            className="b2g-link-underline text-sm font-medium text-b2g-white/80 hover:text-b2g-white transition-colors b2g-focus-ring"
          >
            {t.nav.contact}
          </SectionLink>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <SectionLink
            hash="#contact"
            className="b2g-copper-bg px-5 py-2.5 text-sm font-semibold tracking-wide b2g-focus-ring transition-transform hover:scale-[1.03] active:scale-95"
            style={{ borderRadius: '2px' }}
          >
            {t.nav.requestConsultation}
          </SectionLink>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            className="text-b2g-white p-2 b2g-focus-ring"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden b2g-glass border-t border-b2g-copper/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <SectionLink
                key={link.hash}
                hash={link.hash}
                onClick={close}
                className="text-base font-medium text-b2g-white/80 hover:text-b2g-copper transition-colors"
              >
                {link.label}
              </SectionLink>
            ))}
            <Link to="/blog" onClick={close} className="text-base font-medium text-b2g-cyan hover:text-b2g-cyan/80 transition-colors">
              {t.nav.blog}
            </Link>
            <Link to="/platform" onClick={close} className="text-base font-medium text-b2g-cyan hover:text-b2g-cyan/80 transition-colors">
              {t.nav.platform}
            </Link>
            <Link to="/data-room" onClick={close} className="text-base font-medium text-b2g-cyan hover:text-b2g-cyan/80 transition-colors">
              {t.nav.dataRoom}
            </Link>
            <SectionLink hash="#contact" onClick={close} className="text-base font-medium text-b2g-white/80 hover:text-b2g-copper transition-colors">
              {t.nav.contact}
            </SectionLink>
            <SectionLink
              hash="#contact"
              onClick={close}
              className="b2g-copper-bg px-5 py-3 text-sm font-semibold text-center mt-2"
              style={{ borderRadius: '2px' }}
            >
              {t.nav.requestConsultation}
            </SectionLink>
          </div>
        </div>
      )}
    </header>
  );
}
