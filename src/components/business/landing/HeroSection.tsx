import { BUSINESS_PRICING } from "@/lib/business-pricing";
import { ToolLogo } from "../ui";
import { SignupEntry } from "./SignupEntry";
import { FundingFlow } from "./FundingFlow";
import { SubscriptionExample } from "./SpendExamples";
import styles from "./Opening.module.css";

export function HeroSection({ onRequest }: { onRequest: () => void }) {
  return (
    <section
      className={`${styles.hero} bl-container`}
      aria-labelledby="hero-title"
    >
      <div className={`b-landing-hero-copy ${styles.heroCopy}`}>
        <h1 id="hero-title" className={styles.headline}>
          Every company subscription on its own card.
        </h1>
        <p className={styles.heroDescription}>
          Scheduled funding for fixed subscriptions. Threshold funding for
          usage-based tools like Meta Ads and AWS. Dollar and naira cards from
          one company wallet.
        </p>
        <SignupEntry onRequest={onRequest} />
        <p className={styles.heroNote}>
          ₦{BUSINESS_PRICING.membershipNgn} monthly membership fee.
        </p>
      </div>
      <FundingFlow />
      <div className="bl-card-examples" aria-labelledby="card-examples-title">
        <h2 id="card-examples-title">
          Fixed bills. Variable spend. Your own card.
        </h2>
        <SubscriptionExample />
      </div>
    </section>
  );
}

export function SupportedTools() {
  return (
    <section
      className="b-landing-tools bl-container"
      aria-label="Business tools"
    >
      <div>
        {[
          "Figma",
          "Notion",
          "ChatGPT",
          "Google Workspace",
          "Meta Ads",
          "Google Ads",
          "AWS",
        ].map((name) => (
          <span key={name}>
            <ToolLogo name={name} />
            <strong>{name}</strong>
          </span>
        ))}
      </div>
    </section>
  );
}
