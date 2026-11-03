import { useProductTour } from "./useProductTour";
import { ExpenseControlsSummary } from "./ExpenseControlsSummary";
import { Pause, Play, Plus, XCircle } from "@phosphor-icons/react";
import { ToolLogo } from "../ui";
import { CardControlPreview } from "./CardControlPreview";
import "./ProductProof.css";
import "./CompositionSections.css";

const controls = [
  {
    label: "Pause",
    icon: Pause,
    heading: "Pause scheduled funding.",
    body: "Pausing stops scheduled funding and new card purchases. You can resume later.",
    limit:
      "The monthly card fee continues while paused.",
  },
  {
    label: "Resume",
    icon: Play,
    heading: "Resume a paused subscription.",
    body: "Resuming does not fund the card. Add money before use.",
    limit:
      "Closed cards and cards under review cannot be restarted.",
  },
  {
    label: "Cancel",
    icon: XCircle,
    heading: "Permanently close the card.",
    body: "Cancellation stops scheduled funding and permanently closes the card.",
    limit:
      "Cancel separately with the provider to end the service. Refunds remain subject to closure fees and minimum transfer amounts.",
  },
  {
    label: "Add money",
    icon: Plus,
    heading: "Add funds to the card.",
    body: "Fund the subscription card from your company wallet. Review the naira total before confirming.",
    limit:
      "Resume paused subscriptions before funding. The merchant charges the card separately.",
  },
];

export function ControlsSection() {
  const tour = useProductTour(controls.length, 6500);
  const selected = tour.selected;
  const control = controls[selected];
  return (
    <section
      className="bc-controls"
      id="card-controls"
      aria-labelledby="controls-title"
    >
      <div className="bc-controls-intro">
        <h2 id="controls-title">Pause, resume or cancel a company subscription.</h2>
        <p>
          Manage each subscription from its details page.
        </p>
      </div>
      <div className="bp-control-preview" {...tour.regionProps}>
        <div className="bc-control-toolbar">
          <div className="bp-control-heading">
            <ToolLogo name="Figma" large />
            <div>
              <strong>Figma</strong>
              <small>Subscription controls · Admin</small>
            </div>
          </div>
          <div
            className="bc-demo-actions"
            role="group"
            aria-label="Subscription controls"
          >
            {controls.map(({ label, icon: Icon }, index) => (
              <button
                type="button"
                key={label}
                id={`controls-action-${index}`}
                aria-pressed={selected === index}
                aria-controls="controls-panel"
                onClick={() => tour.select(index)}
              >
                <Icon size={17} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="bc-control-details">
          <div
            className="bp-control-explanation bt-swap"
            key={`${selected}-${tour.revision}`}
            data-replay={tour.revision}
            id="controls-panel"
            role="region"
            aria-labelledby={`controls-action-${selected}`}
            tabIndex={0}
          >
            <CardControlPreview action={control.label} />
            <h3>{control.heading}</h3>
            <p>{control.body}</p>
            <small>{control.limit}</small>
          </div>
          <aside
            className="bp-expense-controls"
            aria-labelledby="expense-controls-title"
          >
            <h3 id="expense-controls-title">For expense cards</h3>
            <ExpenseControlsSummary />
          </aside>
        </div>
      </div>
    </section>
  );
}
