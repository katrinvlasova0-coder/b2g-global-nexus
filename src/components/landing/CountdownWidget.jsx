import React from 'react';
import { motion } from 'framer-motion';
import { pad } from '@/lib/useCountdown';

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export default function CountdownWidget({ time }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="inline-flex items-stretch gap-2 sm:gap-3 p-3 sm:p-4 border border-b2g-copper/25"
      style={{ borderRadius: '2px', backgroundColor: 'rgba(5, 5, 48, 0.6)', backdropFilter: 'blur(12px)' }}
    >
      {UNITS.map((unit, i) => (
        <React.Fragment key={unit.key}>
          <div className="flex flex-col items-center justify-center min-w-[68px] sm:min-w-[88px] px-3 py-3 sm:px-5 sm:py-4">
            <span
              className="b2g-h b2g-grad-text leading-none tabular-nums"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
            >
              {pad(time[unit.key])}
            </span>
            <span className="b2g-label mt-2 sm:mt-3" style={{ fontSize: '0.6rem' }}>
              {unit.label}
            </span>
          </div>
          {i < UNITS.length - 1 && (
            <span className="self-center b2g-copper/40 text-2xl sm:text-3xl font-light select-none">:</span>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
}