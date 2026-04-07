export const APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Subsecute",
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS, Android",
  description:
    "Automate your bills in Nigeria. Auto-pay airtime, data, DSTV, GOtv, and electricity \u2014 set it once, forget it. Cancel anything in one tap.",
  url: "https://subsecute.com",
  author: { "@type": "Organization", name: "Subsecute" },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
  },
  featureList: [
    "Scheduled bill payments for airtime, data, power, and cable",
    "Automatic wallet debit before each bill",
    "Recurring bill payments for airtime, data, power, and cable",
    "Subscription renewal reminders",
    "Spending analytics and tracking",
    "Family and team subscription plans",
    "Shareable funding links",
  ],
  screenshot: "https://subsecute.com/images/landing/phone-screen.png",
  countriesSupported: "NG",
};

export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Subsecute",
  url: "https://subsecute.com",
  logo: "https://res.cloudinary.com/dwambnh2n/image/upload/v1775598701/Subsecute_Icon_sastth.png",
  description:
    "Automate your bills in Nigeria. Auto-pay airtime, data, DSTV, GOtv, and electricity.",
  foundingLocation: { "@type": "Place", name: "Nigeria" },
  areaServed: { "@type": "Country", name: "Nigeria" },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@subsecute.com",
    contactType: "customer service",
  },
};

export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Subsecute?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Subsecute is a recurring payment automation app built for Nigerians. It auto-pays your airtime, data, DSTV, GOtv, electricity, and other recurring bills \u2014 all from one wallet. Set it once, it runs every month.",
      },
    },
    {
      "@type": "Question",
      name: "Can I auto-pay my airtime, data, and DSTV through Subsecute?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Set up recurring payments for airtime, data bundles, power, and cable TV (DSTV, GOtv, Showmax). Pick the amount and schedule, and Subsecute handles it automatically every month.",
      },
    },
    {
      "@type": "Question",
      name: "How does Subsecute work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Add your payment method and the bills you want to automate, set your schedule, and we handle the rest. You get reminders before each charge and can pause or cancel anytime.",
      },
    },
    {
      "@type": "Question",
      name: "Can someone abroad manage bills for family in Nigeria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Create a plan, add family members, and set up their airtime, data, and cable to renew automatically. You see every payment in your dashboard. Currently, wallets can be funded via Naira cards and bank transfers. Support for international card funding is coming soon, so for now, users abroad can fund their wallets manually.",
      },
    },
    {
      "@type": "Question",
      name: "What bills does Subsecute support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Subsecute supports airtime top-up, data bundles, power/electricity (EKEDC and other discos), and cable TV (DSTV, GOtv, Showmax). We also plan to add support for international subscriptions like Netflix and Spotify with dedicated virtual USD cards in the future.",
      },
    },
    {
      "@type": "Question",
      name: "How is Subsecute different from auto-debit on my bank app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bank auto-debits are scattered across different apps and hard to track. Subsecute puts every recurring bill in one dashboard with reminders, spending history, and family plans. One place, full control.",
      },
    },
    {
      "@type": "Question",
      name: "Is Subsecute safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Subsecute operates in compliance with Nigerian financial regulations through partnerships with CBN-licensed entities. Your funds are held securely and every payment is logged in your dashboard.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to set up Subsecute?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Under 5 minutes. Download the app, sign up, fund your wallet, add your bills, and everything runs on autopilot.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Subsecute for family or team plans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Create a plan, invite family members, and set up their airtime, data, and cable to renew automatically. All charges flow to the plan owner.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if my wallet balance is too low?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Subsecute will notify you before each payment. If your balance is insufficient, the payment is paused \u2014 not skipped. Top up your wallet and it resumes automatically.",
      },
    },
  ],
};
