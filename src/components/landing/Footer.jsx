import React from 'react';
import Logo from '@/components/landing/Logo';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.whoWeSeek, href: '#who-we-seek' },
    { label: t.nav.expertise, href: '#expertise' },
    { label: t.nav.capabilities, href: '#capabilities' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const connectLinks = [
    { label: t.footer.requestConsultation, href: '#contact' },
    { label: t.footer.becomePartner, href: '#contact' },
    { label: t.footer.careerOpportunities, href: '#contact' },
  ];

  return (
    <footer className="relative py-16 border-t border-b2g-copper/10" style={{ backgroundColor: '#00001a' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center mb-6">
              <span className="w-px h-20 lg:h-24 bg-b2g-copper mr-px shrink-0" />
              <Logo className="h-20 lg:h-24" />
            </div>
            <p className="text-sm text-b2g-slate leading-relaxed max-w-sm">
              {t.footer.brandText}
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="b2g-label mb-4">{t.footer.navigate}</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-b2g-slate hover:text-b2g-copper transition-colors b2g-link-underline b2g-focus-ring">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="b2g-label mb-4">{t.footer.connect}</p>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-b2g-slate hover:text-b2g-copper transition-colors b2g-link-underline b2g-focus-ring">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-b2g-copper/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-b2g-slate/60">
            © {new Date().getFullYear()} B2G Global Services Corp. {t.footer.copyright}
          </p>
          <p className="text-xs b2g-label">{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}