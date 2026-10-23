"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Checks,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import s from "./ProductStories.module.css";

const conversations = [
  {
    question: "What am I subscribed to?",
    answer:
      "Netflix, ChatGPT, Claude, and Esele’s Twitch. Two renew this week.",
    detail: "Your subscriptions, together in one conversation.",
  },
  {
    question: "What’s coming up next?",
    answer: "Netflix and Mum’s electricity bill are coming up this week.",
    detail: "A quick look at the bills on your schedule.",
  },
  {
    question: "Can someone help with my bills?",
    answer:
      "Share your gift link. Your people can choose what they’d like to cover.",
    detail: "A little help, straight to the things you need.",
  },
];

export default function WhatsAppWalkthrough() {
  const [active, setActive] = useState(0);
  const [playback, setPlayback] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);
  const conversation = conversations[active];

  useEffect(() => {
    const node = root.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (!interacted.current) setPlayback((value) => value + 1);
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function chooseQuestion(index: number) {
    interacted.current = true;
    setActive(index);
    setPlayback((value) => value + 1);
  }

  return (
    <div ref={root} className={s.chatExperience}>
      <div className={s.chatWindow}>
        <div className={s.chatHeader}>
          <span className={s.avatar}>
            <Image
              src="/images/landing/logo.svg"
              alt=""
              width={26}
              height={26}
            />
          </span>
          <div>
            <strong>Subsecute</strong>
            <small>Your everyday, connected</small>
          </div>
          <WhatsappLogo size={28} aria-hidden="true" />
        </div>
        <div className={s.chatContent}>
          <p className={s.hello}>Hi Sandra. What would you like to know?</p>
          <div
            id="whatsapp-conversation"
            aria-live="polite"
            aria-atomic="true"
            className={s.exchange}
          >
            <div key={playback} className={s.messages} data-play={playback > 0}>
              <p className={s.sent}>
                {conversation.question}
                <Checks size={16} aria-hidden="true" />
              </p>
              <div className={s.reply}>
                <p>{conversation.answer}</p>
                <span className={s.chatDetail}>{conversation.detail}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={s.chatComposer}>
          <span>Try a question below</span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </div>
      </div>
      <div
        className={s.promptChoices}
        role="group"
        aria-label="Try a WhatsApp question"
      >
        {conversations.map((item, index) => (
          <button
            key={item.question}
            type="button"
            aria-pressed={active === index}
            aria-controls="whatsapp-conversation"
            onClick={() => chooseQuestion(index)}
          >
            {item.question}
            <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        ))}
      </div>
      <p className={s.note}>Interactive example. No messages are sent.</p>
    </div>
  );
}
