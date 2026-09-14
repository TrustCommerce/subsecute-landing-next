/**
 * The single source of the FAQ.
 *
 * The visible accordion and the schema.org FAQPage block both read from here.
 * They used to keep separate copies and three of ten answers had already
 * drifted apart, which makes the structured data describe text that is not on
 * the page. Google treats that as a violation and can drop the rich result.
 */
export const FAQS = [
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
      "Unlike general-purpose dollar cards, Subsecute is purpose-built for recurring payments. Each subscription gets its own dedicated card, auto-funded before renewal, with reminders and spend tracking. Subsecute also handles local bill payments, including airtime, data, power and cable, so everything recurring lives in one place.",
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
      "Subsecute creates a dedicated virtual USD card for your Claude subscription and funds it from your saved card or direct debit before each renewal. Add Claude as a subscription and it runs itself. No manual transfers, and no charge landing on your naira card at the worst moment.",
  },
] as const;
