import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import SocialProofSection from "./components/SocialProofSection";
import FeaturesPreviewSection from "./components/FeaturesPreviewSection";
import HowItWorksSection from "./components/HowItWorksSection";
import FinalCTASection from "./components/FinalCTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main>
        <HeroSection />
        <SocialProofSection />
        <FeaturesPreviewSection />
        <HowItWorksSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}