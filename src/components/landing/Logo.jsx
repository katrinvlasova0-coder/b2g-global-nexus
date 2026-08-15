import React from 'react';

const LOGO_URL = 'https://media.base44.com/images/public/6a75e02537c947dc2e12eea1/461a1604c_2-6.png';

export default function Logo({ className = '' }) {
  return (
    <img
      src={LOGO_URL}
      alt="B2G Global Services Corp"
      className={`block w-auto max-w-full ${className}`}
    />
  );
}