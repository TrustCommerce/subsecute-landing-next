import { Check } from "@phosphor-icons/react";
import s from "./FeaturesSection.module.css";

const features = [
  {
    label: "Dedicated subscription cards",
    detail: "One card per recurring tool, with its own funding amount and schedule.",
  },
  {
    label: "WhatsApp reminders for admins and cardholders",
    detail: "Sent before the charge, to every admin and the cardholder, once each.",
  },
  {
    label: "Expense cards with named owners",
    detail: "Issued to a team member with the amount they need loaded onto it.",
  },
  {
    label: "Team requests and Admin approvals",
    detail: "A cardholder asks for funds; an admin approves before company money moves.",
  },
  {
    label: "Scheduled subscription funding",
    detail: "Dollars reach the card ahead of the renewal date, drawn from your naira wallet.",
  },
  {
    label: "Funding history and recorded exchange rates",
    detail: "Every funding run keeps the naira cost and the rate it converted at.",
  },
];

export function FeaturesSection() {
  return (
    <section
      className={s.section}
      id="workspace-features"
      aria-labelledby="features-title"
    >
      <h2 id="features-title">Everything in your Subsecute Business workspace.</h2>
      <ul className={s.list}>
        {features.map((feature) => (
          <li key={feature.label}>
            <Check size={19} weight="bold" aria-hidden="true" />
            <span>
              {feature.label}
              <br />
              {feature.detail}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
