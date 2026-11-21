import { useState } from "react";
import { AccessRequestDialog } from "./AccessRequestDialog";
import { LandingNavigation, LandingFooter } from "./Navigation";
import { HeroSection, SupportedTools } from "./HeroSection";
import { WorkspaceShowcase } from "./WorkspaceShowcase";
import { WorkflowSection } from "./WorkflowSection";
import { FinalCallToAction } from "./StorySections";
import { FaqSection } from "./FaqSection";
import { ControlsSection } from "./ControlsSection";
import { FinanceSection } from "./FinanceSection";
import "../landing.css";
import "./LiveExamples.css";
import "./SectionPatterns.css";
import "./LandingRefresh.css";

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
        <section
          className="bl-workspace bl-container"
          aria-labelledby="workspace-title"
        >
          <div className="bl-section-heading">
            <h2 id="workspace-title">Every card, in one workspace.</h2>
            <p>
              Track scheduled renewals, usage-based funding and team expenses
              together.
            </p>
          </div>
          <WorkspaceShowcase />
        </section>
        <WorkflowSection />
        <ControlsSection />
        <FinanceSection />
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
