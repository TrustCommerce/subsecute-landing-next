import { ArrowUpRight } from "@phosphor-icons/react";

export function ExpenseControlsSummary() {
  return (
    <>
      <dl className="bc-expense-summary">
        <div>
          <dt>Admins fund. Team members request.</dt>
          <dd>
            Choose how much to load, or approve a request from the cardholder.
          </dd>
        </div>
        <div>
          <dt>Freeze and unfreeze.</dt>
          <dd>
            Admins and cardholders can freeze a card.
          </dd>
        </div>
      </dl>
      <a className="bp-link" href="#expense-cards">
        See how team requests work <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </>
  );
}
