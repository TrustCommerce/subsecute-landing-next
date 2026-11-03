import {
  ArrowRight,
  Buildings,
  CheckCircle,
  CreditCard,
  Wallet,
} from "@phosphor-icons/react";
import { ToolLogo } from "../ui";

export function SetupArtwork({ active }: { active: number }) {
  return (
    <div className="bp-setup">
      {active === 0 && (
        <>
          <Buildings className="bp-setup-icon" size={32} weight="duotone" />
          <h3>Your business account</h3>
          <p>Forma Studio</p>
          <dl className="bp-facts">
            <div>
              <dt>Company details</dt>
              <dd>
                <CheckCircle size={16} /> Submitted
              </dd>
            </div>
            <div>
              <dt>Director identity</dt>
              <dd>
                <CheckCircle size={16} /> Submitted
              </dd>
            </div>
            <div>
              <dt>Business verification</dt>
              <dd className="bp-pending">In review</dd>
            </div>
          </dl>
          <div className="bp-setup-note">
            Complete verification to issue cards.
          </div>
        </>
      )}
      {active === 1 && (
        <>
          <Wallet className="bp-setup-icon" size={32} weight="duotone" />
          <h3>Company wallet</h3>
          <p>Available balance</p>
          <strong className="bp-wallet-amount">₦250,000</strong>
          <div className="bp-money-route">
            <span>Naira wallet</span>
            <ArrowRight size={20} />
            <span>Dollar card</span>
          </div>
          <div className="bp-setup-note">
            Keep sufficient funds for upcoming subscription renewals.
          </div>
        </>
      )}
      {active === 2 && (
        <>
          <CreditCard className="bp-setup-icon" size={32} weight="duotone" />
          <h3>Choose a card type</h3>
          <div className="bp-card-choice">
            <ToolLogo name="Figma" />
            <div>
              <strong>Figma</strong>
              <span>Subscription · scheduled funding</span>
            </div>
          </div>
          <div className="bp-card-choice">
            <span className="bp-avatar">AO</span>
            <div>
              <strong>Ada’s business purchases</strong>
              <span>Expense card · Admin-funded</span>
            </div>
          </div>
          <div className="bp-setup-note">
            View activity for each card separately.
          </div>
        </>
      )}
      {active === 3 && (
        <>
          <ToolLogo name="Figma" large />
          <h3>Add your card at checkout</h3>
          <p>At your software provider</p>
          <div className="bp-checkout">
            <span>Payment method</span>
            <strong>Company card · •••• 4412</strong>
            <span className="bp-status">
              <CheckCircle size={16} /> Funded
            </span>
          </div>
          <div className="bp-setup-note">
            Add this card to the provider’s billing settings.
          </div>
        </>
      )}
    </div>
  );
}
