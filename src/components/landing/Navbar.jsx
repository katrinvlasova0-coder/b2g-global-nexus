import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/landing/Logo';
import LanguageSwitcher from '@/components/landing/LanguageSwitcher';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { label: t.nav.whoWeSeek, href: '#who-we-seek' },
    { label: t.nav.expertise, href: '#expertise' },
    { label: t.nav.capabilities, href: '#capabilities' },
  ];

  const DATA_ROOM_URL = 'https://drive.google.com/drive/folders/1KHXnATYtmULoxkyvdUQJxKf4u4M3sDkz';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'b2g-glass' : 'bg-transparent'}`}>
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center group" aria-label="B2G Global Services Corp — home">
          <span className="w-px h-6 lg:h-9 bg-b2g-copper mr-px shrink-0" />
          <Logo className="h-9 lg:h-14" />
        </a>

        <div className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="b2g-link-underline text-sm font-medium text-b2g-white/80 hover:text-b2g-white transition-colors b2g-focus-ring"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/platform"
            className="b2g-link-underline text-sm font-medium text-b2g-cyan hover:text-b2g-cyan/80 transition-colors b2g-focus-ring"
          >
            Platform
          </Link>
          <a
            href={DATA_ROOM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="b2g-link-underline text-sm font-medium text-b2g-cyan hover:text-b2g-cyan/80 transition-colors b2g-focus-ring"
          >
            Data room
          </a>
          <a
            href="#contact"
            className="b2g-link-underline text-sm font-medium text-b2g-white/80 hover:text-b2g-white transition-colors b2g-focus-ring"
          >
            {t.nav.contact}
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="b2g-copper-bg px-5 py-2.5 text-sm font-semibold tracking-wide b2g-focus-ring transition-transform hover:scale-[1.03] active:scale-95"
            style={{ borderRadius: '2px' }}
          >
            {t.nav.requestConsultation}
          </a>
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
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-b2g-white/80 hover:text-b2g-copper transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/platform"
              onClick={() => setOpen(false)}
              className="text-base font-medium text-b2g-cyan hover:text-b2g-cyan/80 transition-colors"
            >
              Platform
            </Link>
            <a
              href={DATA_ROOM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="text-base font-medium text-b2g-cyan hover:text-b2g-cyan/80 transition-colors"
            >
              Data room
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="text-base font-medium text-b2g-white/80 hover:text-b2g-copper transition-colors"
            >
              {t.nav.contact}
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="b2g-copper-bg px-5 py-3 text-sm font-semibold text-center mt-2"
              style={{ borderRadius: '2px' }}
            >
              {t.nav.requestConsultation}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}