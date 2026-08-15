import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BenefitCard({ index, icon: Icon, text }) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="relative p-7 lg:p-8 min-h-[260px] flex flex-col justify-between overflow-hidden transition-all duration-500 cursor-default group"
      style={{
        borderRadius: '2px',
        backgroundColor: hovered ? '#00001a' : '#050530',
        border: `1px solid ${hovered ? 'rgba(0, 255, 157, 0.35)' : 'rgba(0, 102, 255, 0.18)'}`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 18px 48px -16px rgba(0, 102, 255, 0.45)' : '0 0 0 rgba(0,0,0,0)',
      }}
    >
      {/* Animated gradient glow on hover */}
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 157, 0.18), transparent 65%)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Big ghost number */}
      <span
        className="absolute -bottom-6 right-3 b2g-h leading-none select-none pointer-events-none transition-all duration-500"
        style={{
          fontSize: 'clamp(5rem, 14vw, 7rem)',
          color: hovered ? 'rgba(0, 255, 157, 0.10)' : 'rgba(0, 102, 255, 0.07)',
          transform: hovered ? 'translateX(-4px)' : 'translateX(0)',
        }}
      >
        {num}
      </span>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div
            className="w-12 h-12 flex items-center justify-center transition-all duration-500"
            style={{
              borderRadius: '2px',
              border: `1px solid ${hovered ? '#00ff9d' : 'rgba(0, 102, 255, 0.30)'}`,
              backgroundColor: hovered ? 'rgba(0, 255, 157, 0.06)' : 'transparent',
            }}
          >
            <Icon
              size={20}
              className="transition-colors duration-500"
              style={{ color: hovered ? '#00ff9d' : '#0066ff' }}
            />
          </div>
          <span
            className="b2g-label transition-colors duration-500"
            style={{ color: hovered ? '#00ff9d' : 'rgba(156, 163, 196, 0.7)', fontSize: '0.65rem' }}
          >
            {num}
          </span>
        </div>
      </div>

      <p
        className="relative z-10 text-sm lg:text-base leading-relaxed transition-colors duration-500"
        style={{ color: hovered ? '#F0F4FF' : 'rgba(240, 244, 255, 0.82)' }}
      >
        {text}
      </p>

      {/* Bottom progress bar */}
      <div className="relative z-10 mt-6 h-px w-full overflow-hidden" style={{ backgroundColor: 'rgba(0, 102, 255, 0.12)' }}>
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, #0047ff, #00ff9d)' }}
          initial={{ width: '0%' }}
          animate={{ width: hovered ? '100%' : '0%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </motion.article>
  );
}