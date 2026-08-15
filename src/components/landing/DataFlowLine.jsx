import React from 'react';

export default function DataFlowLine() {
  return (
    <div
      className="hidden lg:block fixed left-0 top-0 bottom-0 w-px z-30 pointer-events-none"
      style={{ background: 'rgba(0, 102, 255, 0.12)' }}
      aria-hidden="true"
    >
      <div
        className="b2g-flow-line absolute left-0 top-0 w-px"
        style={{ height: '100%', background: 'linear-gradient(180deg, transparent, #00ff9d, transparent)' }}
      />
    </div>
  );
}