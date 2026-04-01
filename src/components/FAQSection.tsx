'use client'

import { useState } from 'react'

const FAQS = [
  {
    question: 'How do I pay for Netflix in Nigeria without my card being declined?',
    answer:
      'Subsecute creates a dedicated virtual USD card for your Netflix subscription, funded automatically from your Naira wallet. Unlike Nigerian bank cards that often get declined, Subsecute cards work reliably across 50+ subscription providers.'
  },
  {
    question: 'What is Subsecute?',
    answer:
      'Subsecute is a recurring payment automation app built for Nigerians. It gives you a unique virtual USD card for each subscription (Netflix, Spotify, ChatGPT, Figma, etc.) and auto-pays your bills — airtime, data, power, and cable — all from one wallet.'
  },
  {
    question: 'Can I auto-pay my airtime, data, and DSTV through Subsecute?',
    answer:
      'Yes. Set up recurring payments for airtime, data bundles, power, and cable TV (DSTV, GOtv, Showmax). Pick the amount and schedule, and Subsecute handles it automatically every month.'
  },
  {
    question: 'Can someone abroad manage bills for family in Nigeria?',
    answer:
      'Yes. Create a plan, add family members, and set up their airtime, data, and cable to renew automatically. You see every payment in your dashboard. No more sending money and hoping it gets used right.'
  },
  {
    question: 'How does Subsecute convert Naira to USD for my subscriptions?',
    answer:
      'When you fund your Subsecute wallet with Naira, the app handles the conversion at competitive rates. Each subscription gets its own USD virtual card that is automatically topped up before your renewal date.'
  },
  {
    question: 'Is Subsecute safe and licensed?',
    answer:
      'Yes. Subsecute operates in compliance with Nigerian financial regulations through partnerships with CBN-licensed entities. Your funds are held securely, and each virtual card is isolated per subscription so a compromise on one service cannot affect others.'
  },
  {
    question: 'How is Subsecute different from Grey.co or Chipper Cash?',
    answer:
      'Unlike general-purpose dollar cards, Subsecute is purpose-built for recurring payments. Each subscription gets its own dedicated card, auto-funded before renewal, with reminders and spend tracking. Plus, Subsecute also handles local bill payments — airtime, data, power, and cable — so everything recurring lives in one place.'
  },
  {
    question: 'Can I use Subsecute for family or team subscription plans?',
    answer:
      'Yes. Subsecute lets you create plans where you invite family members or teammates. Each person picks their subscriptions, and all charges flow back to the plan owner.'
  },
  {
    question: 'What subscriptions and bills does Subsecute support?',
    answer:
      'Subsecute works with 50+ providers including Netflix, Spotify, Apple Music, YouTube Premium, ChatGPT Plus, Figma, Canva, Adobe Creative Cloud, Amazon Prime, and more. For bills, you can automate airtime, data, power (prepaid and postpaid), and cable TV (DSTV, GOtv, Showmax).'
  },
  {
    question: 'How long does it take to set up Subsecute?',
    answer:
      'Under 5 minutes. Download the app, sign up, link your debit card, add your subscriptions and bills, and everything starts running on autopilot.'
  }
] as const

function FAQItem({ faq }: { faq: (typeof FAQS)[number] }) {
  const [open, setOpen] = useState(false)

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
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V13M1 7H13" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-all duration-200 ease-out"
        style={{
          gridTemplateRows: open ? '1fr' : '0fr',
          opacity: open ? 1 : 0
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 font-outfit text-sm leading-[1.6em] tracking-wide text-[#6C757D] sm:text-base">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-[#FFFEEC] py-16 lg:py-20">
      <div className="mx-auto max-w-[800px] px-4">
        {/* Header */}
        <div className="mb-10 text-center lg:mb-14">
          <span className="font-outfit text-sm font-medium tracking-wide text-[#E96D1F]">FAQ</span>
          <h2
            id="faq-heading"
            className="mt-2 font-neue-power text-3xl font-bold leading-[1.2em] tracking-normal text-[#232323] sm:text-4xl lg:text-[48px]"
          >
            Questions about paying for subscriptions in Nigeria
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
  )
}
