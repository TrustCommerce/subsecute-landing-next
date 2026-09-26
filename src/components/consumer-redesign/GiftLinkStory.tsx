import Image from "next/image";
import {
  ArrowUpRight,
  Gift,
  Heart,
  LinkSimple,
} from "@phosphor-icons/react/dist/ssr";
import originalGift from "../../../public/images/consumer-redesign/gift-link-original.webp";
import s from "./ProductStories.module.css";
import frame from "./GiftLinkFrame.module.css";

export default function GiftLinkStory() {
  return (
    <section
      id="gift-links"
      aria-labelledby="gift-story-title"
      className={s.giftSection}
    >
      <div className={s.giftLayout}>
        <div className={s.giftCopy}>
          <p className={s.eyebrow}>A LINK. A LITTLE LOVE.</p>
          <h2 id="gift-story-title">
            “I’ve got this one.”
            <br />
            <em>Now there’s a link for that.</em>
          </h2>
          <p className={s.intro}>
            Give your people a way to show up for you. Share your gift link.
            They choose what to cover, and for how long.
          </p>
          <ol className={s.giftSteps}>
            <li>
              <span>01</span>Share your unique gift link.
            </li>
            <li>
              <span>02</span>They choose which bills and how many months.
            </li>
            <li>
              <span>03</span>They pay securely in one checkout.
            </li>
            <li>
              <span>04</span>Bills get paid. Cards get funded.
            </li>
          </ol>
          <a href="#download" className={s.giftCta}>
            Get your own gift link <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <figure className={frame.figure}>
          <div className={frame.backdrop} aria-hidden="true" />
          <div className={frame.decorations} aria-hidden="true">
            <span className={frame.envelope}>
              <span className={frame.note}>
                <Heart size={18} weight="fill" />
              </span>
              <span className={frame.envelopeFold} />
            </span>
            <span className={frame.giftTag}>
              <Gift size={25} weight="light" />
            </span>
            <span className={frame.sparkle}>✦</span>
            <span className={frame.smallSparkle}>✧</span>
          </div>
          <div className={frame.link}>
            <LinkSimple size={16} aria-hidden="true" />
            <span>
              gift.subsecute.com/<b>amara</b>
            </span>
          </div>
          <div className={frame.screen}>
            <Image
              src={originalGift}
              alt="Subsecute gift-link display for Amara: pick items, choose months and pay once, with Claude and MTN airtime funding options."
              sizes="(max-width: 760px) 85vw, 380px"
            />
          </div>
          <span className={frame.seal} aria-hidden="true">
            <Heart size={24} weight="fill" />
          </span>
          <figcaption>
            A little help, straight to the things they need.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
