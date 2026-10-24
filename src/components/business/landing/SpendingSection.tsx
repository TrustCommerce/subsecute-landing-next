import {
  ArrowUpRight,
  Cloud,
  ShoppingBag,
  SquaresFour,
} from "@phosphor-icons/react";
import Link from "next/link";
import { ProductReveal } from "./ProductReveal";
import { ExpenseFundingExample, SubscriptionExample } from "./SpendExamples";
import { WorkspaceShowcase } from "./WorkspaceShowcase";
import "./UseCases.css";

const spendingExamples = [
  {
    title: "Software & AI",
    description: "Design seats, productivity apps and AI subscriptions.",
    examples: "Figma · Notion · ChatGPT",
    Icon: SquaresFour,
  },
  {
    title: "Cloud & developer tools",
    description: "Hosting, domains and the tools behind your product.",
    examples: "Infrastructure · Hosting · Domains",
    Icon: Cloud,
  },
  {
    title: "Team purchases",
    description: "A course, design assets or a one-off purchase for work.",
    examples: "Learning · Resources · Project costs",
    Icon: ShoppingBag,
  },
];

export function SpendingSection() {
  return (
    <section
      className="b-spending"
      id="business-cards"
      aria-labelledby="spending-title"
    >
      <div className="b-landing-section-intro">
        <h2 id="spending-title">A separate card for each subscription.</h2>
        <p>
          Set the amount and renewal date for each tool. Subsecute loads its
          dollar card from your naira wallet on schedule.
        </p>
      </div>
      <ProductReveal
        className="bs-subscription-story"
        revealTarget=".bl-subscription-ledger"
      >
        <SubscriptionExample />
        <div>
          <h3>Manage renewals in one place.</h3>
          <p>
            Check renewal dates and funding history in one place. Pause the
            subscriptions you’re not using, without stopping the others.
          </p>
          <Link href="#card-controls">
            See subscription controls{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </ProductReveal>
      <WorkspaceShowcase />
      <p className="b-use-cases-note">
        Keep enough naira in your wallet for scheduled funding. The merchant
        charges the card separately.
      </p>
    </section>
  );
}

export function ExpenseSection() {
  return (
    <section
      className="b-spending"
      id="expense-cards"
      aria-labelledby="expenses-title"
    >
      <div className="b-landing-section-intro">
        <h2 id="expenses-title">Company cards for the rest of the work.</h2>
        <p>
          Buying design assets, a course or something for a project? Give a team
          member an expense card instead of sharing yours.
        </p>
      </div>
      <ProductReveal
        className="bs-expense-story"
        revealTarget=".b-spending-card"
      >
        <div>
          <h3>You approve the funding.</h3>
          <p>
            Team members request a card or more money. An admin reviews the
            request before company funds are used.
          </p>
          <dl className="bs-expense-details">
            <div>
              <dt>Assign a cardholder</dt>
              <dd>Give each card to the person making the purchase.</dd>
            </div>
            <div>
              <dt>Choose how much to load</dt>
              <dd>Check balances and transactions from the card’s page.</dd>
            </div>
            <div>
              <dt>Hand over the card</dt>
              <dd>
                Change its holder when someone takes over the work. The printed
                name stays the same; stop or close the card if the previous
                holder must not spend.
              </dd>
            </div>
          </dl>
          <Link href="#card-controls">
            See card controls <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <ExpenseFundingExample />
      </ProductReveal>
      <div className="b-use-cases">
        <div className="b-use-cases-list">
          {spendingExamples.map(({ title, description, examples, Icon }) => (
            <article className="b-use-case" key={title}>
              <Icon size={24} weight="regular" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="b-use-case-examples">{examples}</span>
            </article>
          ))}
        </div>
        <p className="b-use-cases-note">
          Merchant and card-provider restrictions apply to these examples.
        </p>
      </div>
    </section>
  );
}
