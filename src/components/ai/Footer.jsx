import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/landing/Logo";
import { useT } from "@/pages/ai/i18n/LanguageContext";

const FOOTER_LINKS = {
  Product: [
    { label: "AI Tender Specialist", href: "#pricing" },
    { label: "AI Head of Tenders", href: "#pricing" },
    { label: "AI Tender Department", href: "#pricing" },
    { label: "Integrations", href: "#integrations" },
  ],
  Solutions: [
    { label: "Security", href: "#security" },
    { label: "ROI Calculator", href: "#roi" },
    { label: "Deploy", href: "#deploy" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "Human specialists", to: "/" },
    { label: "Platform", to: "/platform" },
    { label: "Blog", to: "/blog" },
    { label: "Contact / Deploy", href: "#deploy" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/#contact" },
    { label: "Data room", to: "/data-room" },
  ],
};

function scrollToHash(hash) {
  const id = String(hash || "").replace(/^#/, "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Footer() {
  const t = useT();
  const f = t.footer;
  return (
    <footer className="bg-navy-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-1.5 mb-4" aria-label="B2G home">
              <div className="h-12 w-px bg-gradient-to-b from-cyan-light/70 to-electric/70" />
              <Logo className="h-14 w-auto" />
            </Link>
            <p className="mt-4 text-sm text-navy-200 font-heading tracking-tight">{f.tagline}</p>
            <p className="mt-2 text-xs text-navy-300">{f.fromTo}</p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-navy-200 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link to={item.to} className="text-sm text-navy-100 hover:text-cyan-light transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="text-sm text-navy-100 hover:text-cyan-light transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToHash(item.href);
                        }}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-200">© {new Date().getFullYear()} B2G Global Services Corp. {f.copyright}</p>
          <p className="text-xs text-navy-200 font-heading tracking-tight">{f.manage}</p>
        </div>
      </div>
    </footer>
  );
}
