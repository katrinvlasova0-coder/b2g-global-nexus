import React from 'react';

export default function BlogHeroBand({ kicker, title }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(118deg, #00001a 0%, #001a66 42%, #0047ff 72%, #00c97a 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.28) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 b2g-h text-[22vw] leading-none text-white/[0.07] select-none"
        aria-hidden
      >
        B2G
      </div>
      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 py-14 lg:py-20">
        {kicker ? <p className="b2g-label text-b2g-cyan mb-3">{kicker}</p> : null}
        {title ? (
          <h1 className="b2g-h text-b2g-white text-4xl lg:text-6xl leading-[1.05] max-w-3xl">{title}</h1>
        ) : null}
      </div>
    </div>
  );
}
