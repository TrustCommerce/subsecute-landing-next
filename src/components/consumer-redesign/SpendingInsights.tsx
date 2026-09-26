import Image from "next/image";
import expenses from "../../../public/images/landing/about-product.png";
import s from "./SpendingInsights.module.css";
import DirectionalArrow from "./DirectionalArrow";

export default function SpendingInsights() {
  return (
    <section
      id="spending-insights"
      aria-labelledby="spending-title"
      className={s.section}
    >
      <div className={s.layout}>
        <div className={s.copy}>
          <p className={s.eyebrow}>THE BIGGER PICTURE. THE LITTLE DETAILS.</p>
          <h2 id="spending-title">
            Know where
            <br />
            <em>your month goes.</em>
          </h2>
          <p className={s.intro}>
            Your subscriptions and bills add up. See the total, then see exactly
            what makes it up. All in one place.
          </p>
          <div className={s.details}>
            <div>
              <span>01 / THE TOTAL</span>
              <h3>Less mental maths.</h3>
              <p>A clear view of your spending for the period you choose.</p>
            </div>
            <div>
              <span>02 / THE BREAKDOWN</span>
              <h3>Every bill has its place.</h3>
              <p>See each subscription’s amount and share of your spending.</p>
            </div>
          </div>
          <a href="#download" className={s.link}>
            Get the full picture{" "}
            <span aria-hidden="true">
              <DirectionalArrow />
            </span>
          </a>
        </div>
        <figure className={s.figure}>
          <div className={s.frame}>
            <div className={s.label}>
              <span aria-hidden="true">
                <DirectionalArrow direction="turn-right" />
              </span>{" "}
              IT ALL ADDS UP. NOW YOU CAN SEE HOW.
            </div>
            <div className={s.screen}>
              <Image
                src={expenses}
                alt="Subsecute Expenses screen: this year’s total of ₦115,239 across 38 items, with a spending chart and individual subscription amounts."
                sizes="(max-width: 380px) 230px, 280px"
              />
            </div>
          </div>
          <figcaption>A closer look at Expenses in the app.</figcaption>
        </figure>
      </div>
    </section>
  );
}
