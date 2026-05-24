"use client";

import dynamic from "next/dynamic";
import { IS_WAITLIST } from "../config";
import HeroSection from "./HeroSection";

// Below-fold sections code-split into their own chunks. Default ssr: true
// preserves HTML in the initial response for SEO, while deferring the
// hydration JS so the hero paints/becomes interactive faster on mobile.
const AboutSection = dynamic(() => import("./AboutSection"));
const FeaturesSection = dynamic(() => import("./FeaturesSection"));
const PlansSection = dynamic(() => import("./PlansSection"));
const GiftingSection = dynamic(() => import("./GiftingSection"));
const HowItWorksSection = dynamic(() => import("./HowItWorksSection"));
const DownloadSection = dynamic(() => import("./DownloadSection"));
const SocialProofSection = dynamic(() => import("./SocialProofSection"));
const FAQSection = dynamic(() => import("./FAQSection"));
const Footer = dynamic(() => import("./Footer"));

export default function LandingPage() {
  return (
    <main className="font-neue-power">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PlansSection />
      <GiftingSection />
      <HowItWorksSection />
      <DownloadSection />
      {IS_WAITLIST ? <FAQSection /> : <SocialProofSection />}
      <Footer />
    </main>
  );
}
