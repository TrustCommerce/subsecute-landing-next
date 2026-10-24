import Image from "next/image";
import Link from "next/link";
import { businessPath } from "../pricing";
import { ArrowRight, ArrowUpRight, CreditCard } from "@phosphor-icons/react";
import { PrimaryLink } from "../ui";
import { SignupEntry } from "./SignupEntry";
import styles from "./StoryBand.module.css";

export function EditorialSection() {
  return (
    <section className={styles.story} aria-labelledby="business-pain-title">
      <div className={styles.photo}>
        <Image
          src="/business-assets/lagos-team-ninthgrid-pexels.jpg"
          width={1400}
          height={933}
          sizes="100vw"
          loading="lazy"
          alt="Two professionals collaborating on a laptop in Lagos, Nigeria"
        />
      </div>
      <div className={styles.copy}>
        <h2 id="business-pain-title">
          Stop sharing one card <br />
          across the company.
        </h2>
        <p>
          When every tool uses the same card, a renewal or team purchase can
          depend on one person being available.
        </p>
        <p>
          Issue a separate card for each subscription. Let your team request
          cards and funds, with Admin approval before company money is used.
        </p>
        <Link href="#business-cards">
          Choose the right card <ArrowUpRight size={20} />
        </Link>
      </div>
    </section>
  );
}

export function WorkspaceSection() {
  return (
    <section className="b-landing-workspace" id="workspace-preview">
      <div>
        <h2>
          Manage company cards
          <br />
          and team requests.
        </h2>
        <p>
          See upcoming renewals, check card balances and review requests from
          your team. Open payment records when you need the costs behind a
          charge.
        </p>
        <PrimaryLink href="#how-it-works">See how funding works</PrimaryLink>
        <small>Example company account.</small>
      </div>
      <div className="b-landing-workspace-art">
        <div className="b-landing-workspace-mini-nav">
          <span>Forma Studio · Example account</span>
          <span>
            Overview <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="b-landing-workspace-greeting">
          <span>THURSDAY, 17 SEPTEMBER</span>
          <h3>Good morning, Ada.</h3>
          <p>Here’s what needs your attention.</p>
        </div>
        <Link
          className="b-landing-workspace-alert"
          href={businessPath("/dashboard/subscriptions/openai")}
        >
          <span className="b-landing-alert-symbol">!</span>
          <div>
            <strong>ChatGPT funding failed</strong>
            <span>Funding failed · renewal tomorrow</span>
          </div>
          <ArrowRight size={20} />
        </Link>
        <div className="b-landing-workspace-split">
          <Link href={businessPath("/dashboard/requests")}>
            <span>Awaiting your review</span>
            <strong>02</strong>
            <small>
              Card requests <ArrowUpRight size={14} />
            </small>
          </Link>
          <Link href={businessPath("/dashboard/cards")}>
            <span>Expense cards</span>
            <CreditCard size={38} weight="light" />
            <small>
              View card balances <ArrowUpRight size={14} />
            </small>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FinalCallToAction({ onRequest }: { onRequest: () => void }) {
  return (
    <section
      className="b-landing-final-cta"
      id="release-status"
      aria-labelledby="business-start-title"
    >
      <h2 id="business-start-title">
        Bring your company’s subscriptions to Subsecute.
      </h2>
      <p className="b-landing-final-description">
        Request access to Subsecute Business. Once your business is verified,
        fund your wallet and set up your subscription cards.
      </p>
      <SignupEntry onRequest={onRequest} />
    </section>
  );
}
