import React from "react";
import { Link } from "react-router-dom";

export function SectionHeading({ eyebrow, title, subtitle, light = false, center = true }) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-4 ${light ? "text-cyan-light" : "text-electric"}`}>
          <span className="h-px w-8 bg-current opacity-50" />
          {eyebrow}
        </div>
      )}
      <h2 className={`text-3xl md:text-5xl font-bold tracking-tight text-balance ${light ? "text-white" : "text-navy-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-lg leading-relaxed ${light ? "text-navy-100" : "text-muted-foreground"} ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Section({ id, children, className = "", dark = false }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${dark ? "bg-navy-900 text-white" : "bg-white"} ${className}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">{children}</div>
    </section>
  );
}

function scrollToHash(hash) {
  const id = String(hash || "").replace(/^#/, "");
  if (!id) return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CTAButton({ to, children, variant = "primary", className = "", onClick }) {
  const base = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200";
  const variants = {
    primary: "bg-electric text-white hover:bg-electric-dark shadow-lg shadow-electric/20 hover:shadow-electric/40 hover:-translate-y-0.5",
    secondary: "bg-white text-navy-900 border border-navy-200 hover:border-electric hover:text-electric",
    secondaryDark: "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm",
    outline: "border border-navy-200 text-navy-900 hover:border-electric hover:text-electric",
    outlineDark: "border border-white/25 text-white hover:bg-white/10",
  };
  const cls = `${base} ${variants[variant] || variants.primary} ${className}`;

  // Hash targets stay on /ai (zip used "/#deploy" which would jump to homepage)
  const raw = String(to || "");
  const hash = raw.startsWith("/#") ? raw.slice(1) : raw.startsWith("#") ? raw : null;

  if (hash) {
    return (
      <a
        href={hash}
        className={cls}
        onClick={(e) => {
          e.preventDefault();
          scrollToHash(hash);
          onClick?.(e);
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}
