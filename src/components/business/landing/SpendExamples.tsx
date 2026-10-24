import { Check, CreditCard } from "@phosphor-icons/react";
import { useProductTour } from "./useProductTour";
import { ToolLogo } from "../ui";

const tools = [
  { name: "ChatGPT", amount: "$20 / month" },
  { name: "Notion", amount: "$24 / month" },
  { name: "Figma", amount: "$60 / month" },
];
const funding = [
  {
    label: "Request",
    status: "US$60 requested",
    detail: "Design assets for the launch",
  },
  {
    label: "Approve",
    status: "Admin approved",
    detail: "Funding request approved",
  },
  {
    label: "Fund",
    status: "US$60 added",
    detail: "Funds available on the card",
  },
];

export function SubscriptionExample() {
  const tour = useProductTour(tools.length, 4000);
  return (
    <div className="bl-subscription-example" {...tour.regionProps}>
      <ul
        className="bl-subscription-ledger"
        aria-label="Example subscription cards"
      >
        {tools.map((tool, index) => (
          <li key={tool.name} data-active={tour.selected === index}>
            <ToolLogo name={tool.name} />
            <div>
              <strong>{tool.name}</strong>
              <span>Dedicated subscription card</span>
            </div>
            <strong>{tool.amount}</strong>
          </li>
        ))}
      </ul>
      <div className="bl-example-caption">
        Example subscription · separate card and funding schedule
      </div>
    </div>
  );
}

export function ExpenseFundingExample() {
  const tour = useProductTour(funding.length, 4000);
  return (
    <div className="bl-expense-example" {...tour.regionProps}>
      <div className="b-spending-card" aria-label="Business expense card">
        <div>
          <strong>subsecute</strong>
          <CreditCard size={26} aria-hidden="true" />
        </div>
        <span>BUSINESS EXPENSES</span>
        <strong>•••• &nbsp; •••• &nbsp; •••• &nbsp; 2048</strong>
        <div>
          <span>ADA OKAFOR</span>
          <span>Expense card</span>
        </div>
      </div>
      <ol className="bl-funding-timeline" aria-label="Example funding sequence">
        {funding.map((event, index) => (
          <li
            key={event.label}
            data-active={tour.selected === index}
            data-complete={index < tour.selected}
          >
            <span className="bl-event-node" aria-hidden="true">
              {index < tour.selected ? <Check size={14} /> : index + 1}
            </span>
            <div>
              <strong>{event.status}</strong>
              <span>{event.detail}</span>
            </div>
          </li>
        ))}
      </ol>
      <small className="bl-example-caption">Example funding sequence</small>
    </div>
  );
}
