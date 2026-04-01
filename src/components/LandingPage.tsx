"use client";

import { IS_WAITLIST } from "../config";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import DownloadSection from "./DownloadSection";
import SocialProofSection from "./SocialProofSection";
import FAQSection from "./FAQSection";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <main className="font-neue-power">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DownloadSection />
      {IS_WAITLIST ? <FAQSection /> : <SocialProofSection />}
      <Footer />
    </main>
  );
}
