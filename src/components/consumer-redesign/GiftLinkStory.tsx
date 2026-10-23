"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Gift,
  Heart,
  LinkSimple,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import originalGift from "../../../public/images/consumer-redesign/gift-link-original.webp";
import s from "./ProductStories.module.css";
import frame from "./GiftLinkFrame.module.css";

export default function GiftLinkStory() {
  const section = useRef<HTMLElement>(null);
  const figure = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = section.current;
    const artwork = figure.current;
    if (!node || !artwork || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.25) return;
        node.dataset.arrived = "true";
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(artwork);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={section}
      id="gift-links"
      aria-labelledby="gift-story-title"
      className={s.giftSection}
    >
      <div className={s.giftLayout}>
        <div className={s.giftCopy}>
          <h2 id="gift-story-title">
            “Make I run am for you.”
            <br />
            <em>Send them a link.</em>
          </h2>
          <p className={s.intro}>
            When someone asks what you need, send your gift link. They can cover
            a subscription, a bill or a few months of either.
          </p>
        </div>
        <figure ref={figure} className={frame.figure}>
          <div className={frame.backdrop} aria-hidden="true" />
          <div className={frame.decorations} aria-hidden="true">
            <span className={frame.envelope}>
              <span className={frame.note}>
                <Heart size={26} weight="fill" />
              </span>
              <span className={frame.envelopeFold} />
            </span>
            <span className={frame.giftTag}>
              <Gift size={30} weight="light" />
            </span>
            <span className={frame.sparkle}>
              <Sparkle size={24} weight="fill" />
            </span>
            <span className={frame.smallSparkle}>
              <Sparkle size={16} />
            </span>
          </div>
          <div className={frame.link}>
            <LinkSimple size={18} aria-hidden="true" />
            <span>
              gift.subsecute.com/<b>amara</b>
            </span>
          </div>
          <div className={frame.screen}>
            <Image
              src={originalGift}
              alt="Example Subsecute gift link for Amara, showing subscriptions, airtime and the option to choose how many months to cover."
              sizes="(max-width: 420px) 85vw, 380px"
            />
          </div>
          <figcaption>
            A little help, straight to the things they need.
          </figcaption>
        </figure>
        <ol className={s.giftSteps}>
          <li>
            <span>01</span>
            <div>
              <strong>Share your link.</strong>
              <p>Send it to someone who’s asking what you need.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>They choose what to cover.</strong>
              <p>A subscription, a bill, or a few months of either.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Something off your list.</strong>
              <p>Their contribution goes towards what they picked.</p>
            </div>
          </li>
        </ol>
        <a href="#download" className={s.giftCta}>
          Get your own gift link <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
