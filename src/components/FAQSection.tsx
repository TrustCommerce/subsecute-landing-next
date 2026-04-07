"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "What is Subsecute?",
    answer:
      "Subsecute is a recurring payment automation app built for Nigerians. It auto-pays your airtime, data, DSTV, GOtv, electricity, and other recurring bills \u2014 all from one wallet. Set it once, it runs every month.",
  },
  {
    question: "Can I auto-pay my airtime, data, and DSTV through Subsecute?",
    answer:
      "Yes. Set up recurring payments for airtime, data bundles, power, and cable TV (DSTV, GOtv, Showmax). Pick the amount and schedule, and Subsecute handles it automatically every month.",
  },
  {
    question: "How does Subsecute work?",
    answer:
      "Add your payment method and the bills you want to automate, set your schedule, and we handle the rest. You get reminders before each charge and can pause or cancel anytime.",
  },
  {
    question: "Can someone abroad manage bills for family in Nigeria?",
    answer:
      "Yes. Create a plan, add family members, and set up their airtime, data, and cable to renew automatically. You see every payment in your dashboard. Currently, wallets can be funded via Naira cards and bank transfers. Support for international card funding is coming soon, so for now, users abroad can fund their wallets manually.",
  },
  {
    question: "What bills does Subsecute support?",
    answer:
      "Subsecute supports airtime top-up, data bundles, power/electricity (EKEDC and other discos), and cable TV (DSTV, GOtv, Showmax). We also plan to add support for international subscriptions like Netflix and Spotify with dedicated virtual USD cards in the future.",
  },
  {
    question: "How is Subsecute different from auto-debit on my bank app?",
    answer:
      "Bank auto-debits are scattered across different apps and hard to track. Subsecute puts every recurring bill in one dashboard with reminders, spending history, and family plans. One place, full control.",
  },
  {
    question: "Is Subsecute safe?",
    answer:
      "Yes. Subsecute operates in compliance with Nigerian financial regulations through partnerships with CBN-licensed entities. Your funds are held securely and every payment is logged in your dashboard.",
  },
  {
    question: "How long does it take to set up Subsecute?",
    answer:
      "Under 5 minutes. Download the app, sign up, fund your wallet, add your bills, and everything runs on autopilot.",
  },
  {
    question: "Can I use Subsecute for family or team plans?",
    answer:
      "Yes. Create a plan, invite family members, and set up their airtime, data, and cable to renew automatically. All charges flow to the plan owner.",
  },
  {
    question: "What happens if my wallet balance is too low?",
    answer:
      "Subsecute will notify you before each payment. If your balance is insufficient, the payment is paused \u2014 not skipped. Top up your wallet and it resumes automatically.",
  },
] as const;

function FAQItem({ faq }: { faq: (typeof FAQS)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#DEE2E6] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="pr-4 font-outfit text-base font-medium tracking-wide text-[#232323] sm:text-lg">
          {faq.question}
        </span>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DEE2E6] transition-transform duration-200"
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
          <p className="pb-5 font-outfit text-sm leading-[1.6em] tracking-wide text-[#6C757D] sm:text-base">
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
      className="bg-[#FFFEEC] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[800px] px-4">
        {/* Header */}
        <div className="mb-10 text-center lg:mb-14">
          <span className="font-outfit text-sm font-medium tracking-wide text-[#E96D1F]">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="mt-2 font-neue-power text-3xl font-bold leading-[1.2em] tracking-normal text-[#232323] sm:text-4xl lg:text-[48px]"
          >
            Questions about automating your bills in Nigeria
          </h2>
          <p className="mt-4 font-outfit text-sm tracking-wide text-[#6C757D] sm:text-base">
            Everything you need to know about Subsecute
          </p>
        </div>

        {/* FAQ items */}
        <div className="rounded-2xl border border-[#DEE2E6] bg-white px-6">
          {FAQS.map((faq) => (
            <FAQItem key={faq.question} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
