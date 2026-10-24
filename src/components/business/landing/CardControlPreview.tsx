import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  Pause,
  Plus,
  XCircle,
} from "@phosphor-icons/react";

const states: Record<
  string,
  { before: string; after: string; detail: string; icon: typeof Pause }
> = {
  Pause: {
    before: "Active",
    after: "Paused",
    detail: "Scheduled funding stopped",
    icon: Pause,
  },
  Resume: {
    before: "Paused",
    after: "Active",
    detail: "Scheduled funding resumed",
    icon: CheckCircle,
  },
  Cancel: {
    before: "Active",
    after: "Closure requested",
    detail: "Future funding stopped",
    icon: XCircle,
  },
  "Add money": {
    before: "Active card",
    after: "US$20.00 top-up",
    detail: "Review the funding cost before confirming",
    icon: Plus,
  },
};

export function CardControlPreview({ action }: { action: string }) {
  const state = states[action];
  const Icon = state.icon;
  return (
    <div className="bl-control-result">
      <div className="bl-control-card">
        <CreditCard size={24} aria-hidden="true" />
        <span>•••• 4412</span>
      </div>
      <div className="bl-control-change">
        <span>{state.before}</span>
        <ArrowRight size={18} aria-hidden="true" />
        <strong key={action}>
          <Icon size={17} aria-hidden="true" />
          {state.after}
        </strong>
      </div>
      <small>{state.detail}</small>
    </div>
  );
}
