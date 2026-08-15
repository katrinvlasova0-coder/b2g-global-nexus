import React from 'react';
import Navbar from '@/components/landing/Navbar';
import DataFlowLine from '@/components/landing/DataFlowLine';
import Hero from '@/components/landing/Hero';
import RecruitmentMatrix from '@/components/landing/RecruitmentMatrix';
import WinTenders from '@/components/landing/WinTenders';
import CapabilityCenter from '@/components/landing/CapabilityCenter';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function Landing() {
  return (
    <div className="b2g-page">
      <DataFlowLine />
      <Navbar />
      <main>
        <Hero />
        <RecruitmentMatrix />
        <WinTenders />
        <CapabilityCenter />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}