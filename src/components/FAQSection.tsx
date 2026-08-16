"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "What is Subsecute?",
    answer:
      "Subsecute is a recurring payment automation app built for Nigerians. It gives you a unique virtual USD card for each subscription (Netflix, Spotify, ChatGPT, Figma, etc.) and auto-pays your bills including airtime, data, power, and cable, all from one app.",
  },
  {
    question: "Can I auto-pay my airtime, data, and DSTV through Subsecute?",
    answer:
      "Yes. Set up recurring payments for airtime, data bundles, power, and cable TV (DSTV, GOtv). Pick the amount and schedule, and Subsecute handles it automatically every month.",
  },
  {
    question: "Can someone abroad manage bills for family in Nigeria?",
    answer:
      "Yes. Create a plan, add family members, and let them set up their airtime, data, and cable to renew automatically. You see every payment in your dashboard. No more sending money and hoping it gets used right.",
  },
  {
    question: "How does Subsecute convert Naira to USD for my subscriptions?",
    answer:
      "Before each renewal, Subsecute charges your saved card or direct debit in Naira and handles the conversion at competitive rates. That subscription's own USD virtual card is topped up ahead of the renewal date, so the money is there before the merchant asks for it.",
  },
  {
    question: "Is Subsecute safe and licensed?",
    answer:
      "Yes. Subsecute operates in compliance with Nigerian financial regulations through partnerships with CBN-licensed entities. Your funds are held securely, and each virtual card is isolated per subscription so a compromise on one service cannot affect others.",
  },
  {
    question: "How is Subsecute different from Grey.co or Chipper Cash?",
    answer:
      "Unlike general-purpose dollar cards, Subsecute is purpose-built for recurring payments. Each subscription gets its own dedicated card, auto-funded before renewal, with reminders and spend tracking. Plus, Subsecute also handles local bill payments — airtime, data, power, and cable — so everything recurring lives in one place.",
  },
  {
    question: "Can I use Subsecute for family or team subscription plans?",
    answer:
      "Yes. Subsecute lets you create plans where you invite family members or teammates. Each person picks their subscriptions, and all charges flow back to the plan owner.",
  },
  {
    question: "What subscriptions and bills does Subsecute support?",
    answer:
      "Subsecute works with 50+ providers including Netflix, Spotify, Apple Music, YouTube Premium, ChatGPT Plus, Figma, Canva, Adobe Creative Cloud, Amazon Prime, and more. For bills, you can automate airtime, data, power (prepaid and postpaid), and cable TV (DSTV, GOtv).",
  },
  {
    question: "How long does it take to set up Subsecute?",
    answer:
      "Under 5 minutes. Download the app, sign up, link your debit card, add your subscriptions and bills, and everything starts running on autopilot.",
  },
  {
    question: "How can I pay for my Claude subscription in Nigeria?",
    answer:
      "Subsecute creates a dedicated virtual USD card for your Claude subscription and funds it from your saved card or direct debit before each renewal. Add Claude as a subscription and it runs itself — no manual transfers, no charge landing on your naira card at the worst moment.",
  },
] as const;

function FAQItem({ faq }: { faq: (typeof FAQS)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="pr-4 font-outfit text-base font-medium text-ink sm:text-lg">
          {faq.question}
        </span>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1V13M1 7H13"
              stroke="#232323"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-all duration-200 ease-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 font-outfit text-sm leading-[1.65] text-ink-2 sm:text-base">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-paper py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[800px] px-4">
        {/* Header */}
        <div className="mb-10 text-center lg:mb-14">
          <span className="font-outfit text-[11px] font-medium uppercase tracking-[0.18em] text-accent-ink">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="mt-4 font-neue-power text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl lg:text-[52px]"
          >
            Questions about Subsecute
          </h2>
          <p className="mt-4 font-outfit text-sm text-ink-2 sm:text-base">
            Everything you need to know about Subsecute
          </p>
        </div>

        {/* FAQ items */}
        <div className="rounded-2xl border border-line bg-surface px-6">
          {FAQS.map((faq) => (
            <FAQItem key={faq.question} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
