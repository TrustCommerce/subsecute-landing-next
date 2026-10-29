import { useState } from "react";
import { AccessRequestDialog } from "./AccessRequestDialog";
import { LandingNavigation, LandingFooter } from "./Navigation";
import { HeroSection, SupportedTools } from "./HeroSection";
import { FundingFlow } from "./FundingFlow";
import { WorkflowSection } from "./WorkflowSection";
import { EditorialSection, FinalCallToAction } from "./StorySections";
import { FeaturesSection } from "./FeaturesSection";
import { FaqSection } from "./FaqSection";
import { SpendingSection, ExpenseSection } from "./SpendingSection";
import { ControlsSection } from "./ControlsSection";
import { FinanceSection } from "./FinanceSection";
import "../landing.css";
import "./LiveExamples.css";
import "./SectionPatterns.css";

export default function LandingPage() {
  const [requestOpen, setRequestOpen] = useState(false);
  const requestAccess = () => setRequestOpen(true);
  return (
    <div className="b-landing">
      <a className="b-landing-skip" href="#business-main">
        Skip to content
      </a>
      <LandingNavigation onRequest={requestAccess} />
      <main id="business-main">
        <HeroSection onRequest={requestAccess} />
        <SupportedTools />
        <FundingFlow />
        <SpendingSection />
        <WorkflowSection />
        <ControlsSection />
        <ExpenseSection />
        <EditorialSection />
        <FinanceSection />
        <FeaturesSection />
        <FaqSection />
        <FinalCallToAction onRequest={requestAccess} />
      </main>
      <LandingFooter />
      <AccessRequestDialog
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
      />
    </div>
  );
}
