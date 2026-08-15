import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Handshake, Briefcase, Building2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const ICONS = {
  contractors: Building2,
  partners: Handshake,
  consultants: Briefcase,
  employees: Users,
};

export default function RecruitmentMatrix() {
  const { t } = useLanguage();
  const [active, setActive] = useState(null);

  const order = ['contractors', 'partners', 'consultants', 'employees'];
  const CATEGORIES = order.map((key) => ({
    id: key,
    icon: ICONS[key],
    title: t.whoWeSeek.categories[key].title,
    description: t.whoWeSeek.categories[key].description,
  }));

  return (
    <section id="who-we-seek" className="relative py-16 lg:py-36 b2g-surface" style={{ backgroundColor: '#050530' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10 lg:mb-24 max-w-3xl">
          <span className="b2g-label block mb-6">{t.whoWeSeek.label}</span>
          <h2 className="b2g-h text-b2g-white text-4xl lg:text-5xl xl:text-6xl leading-[1.05]">
            {t.whoWeSeek.headingPrefix}
            <span className="b2g-copper">{t.whoWeSeek.highlight}</span>
            {t.whoWeSeek.headingSuffix}
          </h2>
          <p className="mt-6 text-lg text-b2g-slate leading-relaxed">
            {t.whoWeSeek.subtitle}
          </p>
        </div>

        {/* Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-b2g-copper/10">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = active === cat.id;
            return (
              <motion.article
                key={cat.id}
                onMouseEnter={() => setActive(cat.id)}
                onMouseLeave={() => setActive(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative b2g-surface p-8 lg:p-10 min-h-[320px] flex flex-col justify-between transition-all duration-500 cursor-default group"
                style={{ backgroundColor: isActive ? '#00001a' : '#050530' }}
              >
                <div>
                  <div
                    className={`w-12 h-12 flex items-center justify-center mb-8 transition-colors duration-500 border ${
                      isActive ? 'border-b2g-cyan' : 'border-b2g-copper/30'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <Icon size={20} className={isActive ? 'b2g-cyan' : 'b2g-copper'} />
                  </div>
                  <span className="text-[0.65rem] b2g-muted tracking-widest mb-3 block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="b2g-h text-b2g-white text-2xl lg:text-3xl mb-4">{cat.title}</h3>
                  <p className="text-sm text-b2g-slate leading-relaxed">{cat.description}</p>
                </div>

                <div
                  className={`mt-8 flex items-center gap-2 text-sm font-medium transition-all duration-500 ${
                    isActive ? 'text-b2g-cyan' : 'text-b2g-copper opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <span>{t.whoWeSeek.requestCall}</span>
                  <ArrowRight size={16} className={isActive ? 'translate-x-1' : ''} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}