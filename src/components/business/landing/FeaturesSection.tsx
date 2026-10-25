import { Check } from "@phosphor-icons/react";
import s from "./FeaturesSection.module.css";

const features = [
  {
    label: "Dedicated subscription cards",
    detail: "A separate virtual dollar card for each subscription, with a defined funding amount and schedule.",
  },
  {
    label: "WhatsApp renewal reminders",
    detail: "Notify company admins and the assigned cardholder before each renewal.",
  },
  {
    label: "Expense cards with assigned cardholders",
    detail: "Assign cards to team members and fund them for approved company purchases.",
  },
  {
    label: "Funding requests and admin approvals",
    detail: "Cardholders submit funding requests for admin approval before funds are released.",
  },
  {
    label: "Scheduled subscription funding",
    detail: "Fund subscription cards from your company’s naira wallet ahead of each renewal.",
  },
  {
    label: "Funding records and exchange rates",
    detail: "Review the naira cost and exchange rate recorded for each card funding transaction.",
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
            <div>
              <h3 className={s.featureTitle}>{feature.label}</h3>
              <p className={s.featureDetail}>{feature.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
