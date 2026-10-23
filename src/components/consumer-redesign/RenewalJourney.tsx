import {
  Bell,
  Check,
  CreditCard,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import Scene from "./Scene";
import s from "./RenewalJourney.module.css";

export default function RenewalJourney() {
  return (
    <Scene className={s.journey}>
      <ol className={s.steps}>
        <li>
          <Scene className={s.visual}>
            <div className={s.miniCard}>
              <span>
                subsecute <CreditCard size={19} aria-hidden="true" />
              </span>
              <strong>Netflix</strong>
              <span>
                •••• 4412 <small>USD</small>
              </span>
            </div>
          </Scene>
          <div className={s.copy}>
            <span>01</span>
            <h3>Give it a card.</h3>
            <p>
              Add a subscription and use its dedicated dollar card at the
              merchant. Its funding and history stay together.
            </p>
          </div>
        </li>
        <li>
          <Scene className={`${s.visual} ${s.funding}`}>
            <div className={s.fundingNode}>
              <Wallet size={26} aria-hidden="true" />
              <span>Naira</span>
            </div>
            <div className={s.connector} aria-hidden="true">
              <i />
            </div>
            <div className={s.fundingNode}>
              <CreditCard size={26} aria-hidden="true" />
              <span>Dollar card</span>
            </div>
            <span className={s.fundingCaption}>Scheduled for renewal</span>
          </Scene>
          <div className={s.copy}>
            <span>02</span>
            <h3>Set up its funding.</h3>
            <p>
              Choose your funding method. Subsecute converts naira and loads
              that subscription’s card on its schedule.
            </p>
          </div>
        </li>
        <li>
          <Scene className={s.visual}>
            <div className={s.notification}>
              <Bell size={20} weight="fill" aria-hidden="true" />
              <div>
                <strong>Your renewal is coming up</strong>
                <p>Netflix · Review before it renews</p>
                <span>
                  <Check size={13} aria-hidden="true" /> A reminder before the
                  charge
                </span>
              </div>
            </div>
          </Scene>
          <div className={s.copy}>
            <span>03</span>
            <h3>Know what’s next.</h3>
            <p>
              Get a reminder before renewal. Check the amount, keep the
              subscription, or decide you’re done with it.
            </p>
          </div>
        </li>
      </ol>
      <p className={s.note}>
        Funding needs sufficient funds. Closing a card does not cancel your
        agreement with the merchant.
      </p>
    </Scene>
  );
}
