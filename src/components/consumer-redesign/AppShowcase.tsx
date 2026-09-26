import Image from "next/image";
import screen from "../../../public/images/landing/phone-screen.png";
import s from "./AppShowcase.module.css";
import DirectionalArrow from "./DirectionalArrow";

const highlights = [
  {
    title: "See the bigger picture.",
    text: "Your active subscriptions and monthly spending, together on your home screen.",
  },
  {
    title: "Know what needs you.",
    text: "Upcoming renewals have their own place. Find what needs attention without digging.",
  },
  {
    title: "Make it a shared thing.",
    text: "Create a plan or share your gift link, right from home.",
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
          <p className={s.eyebrow}>MEET YOUR NEW HOME SCREEN</p>
          <h2 id="app-showcase-title" className={s.title}>
            A place for it all.
            <br />
            <em>Right in your pocket.</em>
          </h2>
          <p className={s.intro}>
            Here’s what a little less life admin looks like in Subsecute.
          </p>
          <ol className={s.highlights}>
            {highlights.map(({ title, text }, index) => (
              <li key={title}>
                <span className={s.number}>0{index + 1}</span>
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
