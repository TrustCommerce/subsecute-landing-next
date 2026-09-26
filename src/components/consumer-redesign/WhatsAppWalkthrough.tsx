"use client";

import { useState } from "react";
import {
  WhatsappLogo,
  ArrowUpRight,
  CheckCircle,
  ArrowLeft,
} from "@phosphor-icons/react";
import s from "./ProductStories.module.css";
import DirectionalArrow from "./DirectionalArrow";

const conversations = [
  {
    label: "Subscriptions",
    question: "What am I subscribed to?",
    answer: "Netflix, OpenAI, Claude, and Esele’s Twitch. Two renew this week.",
    detail: "Your subscriptions, without searching five different apps.",
    mark: "↻",
  },
  {
    label: "Upcoming bills",
    question: "What’s coming up next?",
    answer:
      "Your Netflix subscription and Mum’s electricity bill are coming up this week.",
    detail: "A useful heads-up for the little things that keep life going.",
    mark: "ϟ",
  },
  {
    label: "Gift links",
    question: "Can someone help with my bills?",
    answer:
      "Yes. Share your gift link so your people can choose which subscriptions or bills to fund.",
    detail: "A little help, sent straight to the things you need.",
    mark: "♡",
  },
];

export default function WhatsAppWalkthrough() {
  const [active, setActive] = useState(0);
  const conversation = conversations[active];
  return (
    <div className={s.chatExperience}>
      <div className={s.chatWindow}>
        <div className={s.chatHeader}>
          <ArrowLeft size={18} aria-hidden="true" />
          <span className={s.avatar}>s.</span>
          <div>
            <strong>Subsecute</strong>
            <small>Your everyday, connected</small>
          </div>
          <WhatsappLogo size={25} aria-hidden="true" />
        </div>
        <div className={s.chatContent}>
          <p className={s.chapter}>A LITTLE LESS TO KEEP IN YOUR HEAD</p>
          <p className={s.hello}>
            Hi Sandra. Let’s get your everyday sorted. What would you like to
            know?
          </p>
          <div
            id="whatsapp-conversation"
            aria-live="polite"
            aria-atomic="true"
            className={s.exchange}
          >
            <div key={active} className={s.messages}>
              <p className={s.sent}>
                {conversation.question}
                <span aria-hidden="true">✓✓</span>
              </p>
              <div className={s.reply}>
                <p>{conversation.answer}</p>
                <div className={s.chatDetail}>
                  <span aria-hidden="true">{conversation.mark}</span>
                  <span>{conversation.detail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.chatComposer}>
          <span>Choose a conversation below</span>
          <span className={s.sendIcon} aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
      <div
        className={s.promptChoices}
        role="group"
        aria-label="Explore WhatsApp conversations"
      >
        {conversations.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={active === index}
            aria-controls="whatsapp-conversation"
            onClick={() => setActive(index)}
          >
            {item.label}
            <span aria-hidden="true">
              <DirectionalArrow />
            </span>
          </button>
        ))}
      </div>
      <p className={s.note}>
        <CheckCircle size={14} aria-hidden="true" /> Conversation walkthrough.
        No messages are sent.
      </p>
    </div>
  );
}
