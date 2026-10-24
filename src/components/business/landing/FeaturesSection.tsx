import { Check } from "@phosphor-icons/react";
import s from "./FeaturesSection.module.css";

const features = [
  "Dedicated subscription cards",
  "WhatsApp reminders for admins and cardholders",
  "Expense cards with named owners",
  "Team requests and Admin approvals",
  "Scheduled subscription funding",
  "Funding history and recorded exchange rates",
];

export function FeaturesSection() {
  return (
    <section
      className={s.section}
      id="workspace-features"
      aria-labelledby="features-title"
    >
      <h2 id="features-title">In your business workspace.</h2>
      <ul className={s.list}>
        {features.map((feature) => (
          <li key={feature}>
            <Check size={19} weight="bold" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
