import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function BackToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-[60] b2g-copper-bg p-3 b2g-focus-ring shadow-lg hover:scale-[1.04] active:scale-95 transition-all ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ borderRadius: '2px', minWidth: 44, minHeight: 44 }}
      aria-label={t.blog.backToTop}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={18} />
    </button>
  );
}
