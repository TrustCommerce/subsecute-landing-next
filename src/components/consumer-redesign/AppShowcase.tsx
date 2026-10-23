import Image from "next/image";
import screen from "../../../public/images/landing/phone-screen.png";
import s from "./AppShowcase.module.css";
import DirectionalArrow from "./DirectionalArrow";

const highlights = [
  {
    title: "Everything you pay for, listed.",
    text: "Every active subscription and what they come to this month, on the first screen you open.",
  },
  {
    title: "Renewals that need a decision.",
    text: "Anything charging soon sits in its own place, so you are not digging for it.",
  },
  {
    title: "Bills someone else can cover.",
    text: "Start a plan for your people, or share a gift link so somebody can pay one of yours.",
  },
];

export default function AppShowcase() {
  return (
    <section
      id="inside-the-app"
      className={s.section}
      aria-labelledby="app-showcase-title"
    >
      <div className={s.layout}>
        <div className={s.copy}>
          <h2 id="app-showcase-title" className={s.title}>
            Everything you pay for,
            <br />
            <em>on one screen.</em>
          </h2>
          <p className={s.intro}>
            No hunting through five apps and a bank statement to find out what you owe.
          </p>
          <ol className={s.highlights}>
            {highlights.map(({ title, text }, index) => (
              <li key={title}>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <a className={s.link} href="#download">
            Make yourself at home{" "}
            <span aria-hidden="true">
              <DirectionalArrow />
            </span>
          </a>
        </div>
        <figure className={s.product}>
          <div className={s.backdrop} aria-hidden="true" />
          <div className={s.phone}>
            <Image
              src={screen}
              alt="Subsecute home screen showing active subscriptions, monthly spending, gift-link sharing and renewals needing attention"
              sizes="(max-width: 380px) 244px, (max-width: 760px) 280px, 304px"
              className={s.screen}
            />
          </div>
          <figcaption className={s.caption}>
            <span aria-hidden="true">
              <DirectionalArrow direction="turn-right" />
            </span>{" "}
            Your everyday, in one place.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
