import { ArrowUpRight } from "@phosphor-icons/react";

export function ExpenseControlsSummary() {
  return (
    <>
      <dl className="bc-expense-summary">
        <div>
          <dt>Funding and approvals</dt>
          <dd>
            Admins fund cards and approve cardholder requests.
          </dd>
        </div>
        <div>
          <dt>Stop and restart cards.</dt>
          <dd>
            Admins and cardholders can stop a card. Only an admin can restart an admin-stopped card.
          </dd>
        </div>
      </dl>
      <a className="bp-link" href="#expense-cards">
        See how team requests work <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </>
  );
}
