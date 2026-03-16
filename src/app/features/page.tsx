import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturesHero from "./components/FeaturesHero";
import FeaturesList from "./components/FeaturesList";
import FeaturesCTA from "./components/FeaturesCTA";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main>
        <FeaturesHero />
        <FeaturesList />
        <FeaturesCTA />
      </main>
      <Footer />
    </div>
  );
}