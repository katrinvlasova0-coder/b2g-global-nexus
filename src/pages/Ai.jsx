import React from "react";
import "@/pages/ai/ai.css";
import SeoHead from "@/components/blog/SeoHead";
import { LanguageProvider } from "@/pages/ai/i18n/LanguageContext";
import Header from "@/components/ai/Header";
import Footer from "@/components/ai/Footer";
import Hero from "@/components/ai/Hero";
import Solutions from "@/components/ai/Solutions";
import NotAChatbot from "@/components/ai/NotAChatbot";
import Lifecycle from "@/components/ai/Lifecycle";
import OpportunityDiscovery from "@/components/ai/OpportunityDiscovery";
import Scoring from "@/components/ai/Scoring";
import DocumentIntelligence from "@/components/ai/DocumentIntelligence";
import BidNoBid from "@/components/ai/BidNoBid";
import CostEstimation from "@/components/ai/CostEstimation";
import BidPreparation from "@/components/ai/BidPreparation";
import Sourcing from "@/components/ai/Sourcing";
import Negotiations from "@/components/ai/Negotiations";
import ContractIntelligence from "@/components/ai/ContractIntelligence";
import Reporting from "@/components/ai/Reporting";
import AiHeadOfTenders from "@/components/ai/AiHeadOfTenders";
import YourAiEmployee from "@/components/ai/YourAiEmployee";
import HumanInLoop from "@/components/ai/HumanInLoop";
import Integrations from "@/components/ai/Integrations";
import Security from "@/components/ai/Security";
import Comparison from "@/components/ai/Comparison";
import Implementation from "@/components/ai/Implementation";
import PricingTiers from "@/components/ai/PricingTiers";
import RoiCalculator from "@/components/ai/RoiCalculator";
import DeploymentForm from "@/components/ai/DeploymentForm";
import Faq from "@/components/ai/Faq";
import FinalCta from "@/components/ai/FinalCta";

const CANONICAL = "https://b2g.org/ai/";
const TITLE = "B2G — AI Tender Specialist | AI Workforce for Public Procurement";
const DESCRIPTION =
  "Hire an AI Tender Specialist from B2G — AI employees for the full tender lifecycle: opportunity discovery, document analysis, bid preparation, sourcing, contracts and reporting.";
const IMAGE = "https://b2g.org/og-image.jpg";

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": "https://b2g.org/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://b2g.org/#organization",
      name: "B2G Global Services Corp",
      url: "https://b2g.org/",
      description: "AI Workforce for Tender Management — deploy AI employees across the tender lifecycle.",
    },
  ],
};

function AiLanding() {
  return (
    <div className="b2g-ai min-h-screen bg-white">
      <SeoHead
        title={TITLE}
        description={DESCRIPTION}
        canonical={CANONICAL}
        image={IMAGE}
        type="website"
        jsonLd={JSON_LD}
      />
      <Header />
      <main>
        <Hero />
        <Solutions />
        <NotAChatbot />
        <Lifecycle />
        <OpportunityDiscovery />
        <Scoring />
        <DocumentIntelligence />
        <BidNoBid />
        <CostEstimation />
        <BidPreparation />
        <Sourcing />
        <Negotiations />
        <ContractIntelligence />
        <Reporting />
        <AiHeadOfTenders />
        <YourAiEmployee />
        <HumanInLoop />
        <Integrations />
        <Security />
        <Comparison />
        <Implementation />
        <PricingTiers />
        <RoiCalculator />
        <DeploymentForm />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

export default function Ai() {
  return (
    <LanguageProvider>
      <AiLanding />
    </LanguageProvider>
  );
}
