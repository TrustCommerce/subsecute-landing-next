import Image from "next/image";
import expenses from "../../../public/images/landing/about-product.png";
import s from "./SpendingInsights.module.css";
import DirectionalArrow from "./DirectionalArrow";
import Scene from "./Scene";

const entries = [
  ["OpenAI", "₦27,221"],
  ["Electricity", "₦20,000"],
  ["Esele’s Twitch", "₦13,520"],
] as const;

export default function SpendingInsights() {
  return (
    <section
      id="spending-insights"
      aria-labelledby="spending-title"
      className={s.section}
    >
      <div className={s.layout}>
        <div className={s.copy}>
          <h2 id="spending-title">
            See what the small payments <em>add up to.</em>
          </h2>
          <p className={s.intro}>
            The streaming, the software, the electricity. See your spending
            together, then look at what went where.
          </p>
        </div>
        <Scene className={s.stage}>
          <div className={s.summary}>
            <span className={s.period}>An example year in Expenses</span>
            <strong className={s.total}>₦115,239</strong>
            <span className={s.itemCount}>Across 38 items</span>
            <p>A clearer view of the things you keep paying for.</p>
            <a href="#download" className={s.link}>
              Get the full picture
              <span aria-hidden="true">
                <DirectionalArrow />
              </span>
            </a>
          </div>
          <div className={s.ledger}>
            <p className={s.ledgerLabel}>A few entries from that year</p>
            <dl>
              {entries.map(([name, amount]) => (
                <div className={s.row} key={name}>
                  <dt>{name}</dt>
                  <dd>{amount}</dd>
                </div>
              ))}
            </dl>
            <p className={s.exampleNote}>
              Example spending from the screen shown. These are annual entries,
              not current subscription prices.
            </p>
          </div>
          <figure className={s.figure}>
            <div className={s.screen}>
              <Image
                src={expenses}
                alt="Subsecute Expenses screen: this year’s total of ₦115,239 across 38 items, with a spending chart and individual subscription amounts."
                sizes="(max-width: 380px) 250px, 280px"
              />
            </div>
            <figcaption>Expenses, inside Subsecute.</figcaption>
          </figure>
        </Scene>
      </div>
    </section>
  );
}
