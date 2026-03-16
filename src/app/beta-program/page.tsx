import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BetaHero from "./components/BetaHero";
import BetaBenefits from "./components/BetaBenefits";
import BetaHowToJoin from "./components/BetaHowToJoin";
import BetaTestimonials from "./components/BetaTestimonials";
import BetaCTA from "./components/BetaCTA";

export default function BetaProgramPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main>
        <BetaHero />
        <BetaBenefits />
        <BetaHowToJoin />
        <BetaTestimonials />
        <BetaCTA />
      </main>
      <Footer />
    </div>
  );
}