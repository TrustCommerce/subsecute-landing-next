import Link from "next/link";
import { ArrowUpRight, CreditCard } from "@phosphor-icons/react";
import { ToolLogo } from "../ui";
import { SignupEntry } from "./SignupEntry";
import { RenewalWarning } from "./RenewalWarning";
import styles from "./Opening.module.css";

function UnderlinedHeadline() {
  return (
    <span className="b-landing-headline-underline">
      subscriptions renew.
      <svg
        viewBox="0 0 400 24"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M 5 17 C 83 5 151 7 215 10 S 337 17 395 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function HeroSection({ onRequest }: { onRequest: () => void }) {
  return (
    <section className={styles.hero}>
      <div className={`b-landing-hero-copy ${styles.heroCopy}`}>
        <h1 className={styles.headline}>
          Know before your <br />
          <em>
            <UnderlinedHeadline />
          </em>
        </h1>
        <p className={styles.cardAddendum}>
          <Link href="#expense-cards">
            <CreditCard
              className={styles.cardAccent}
              size={36}
              weight="fill"
              aria-hidden="true"
            />
            <span>
              And <strong>corporate cards</strong> for team expenses.
            </span>
            <ArrowUpRight
              className={styles.addendumArrow}
              size={18}
              aria-hidden="true"
            />
          </Link>
        </p>
        <p className={styles.heroDescription}>
          Every admin and the cardholder get a WhatsApp reminder before the
          charge. Give each subscription its own virtual dollar card, with
          scheduled funding from your company&apos;s naira wallet.
        </p>
        <SignupEntry onRequest={onRequest} />
        <div className={styles.heroNote}>
          <span>₦0 monthly membership fee.</span>
          <Link href="#workspace-features">
            Explore the workspace <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <RenewalWarning />
    </section>
  );
}

export function SupportedTools() {
  return (
    <section
      className="b-landing-tools"
      aria-labelledby="tools-title"
    >
      <h2 id="tools-title">
        Virtual dollar cards for{" "}
        <br />
        <strong>the tools your company already pays for.</strong>
      </h2>
      <div>
        {["Figma", "Notion", "ChatGPT", "Framer", "Google Workspace"].map(
          (name) => (
            <span key={name}>
              <ToolLogo name={name} />
              <strong>
                {name === "ChatGPT" ? (
                  <Link href="https://www.subsecute.com/blog/how-to-pay-for-chatgpt-plus-in-nigeria">
                    {name}
                  </Link>
                ) : (
                  name
                )}
              </strong>
            </span>
          ),
        )}
      </div>
    </section>
  );
}
