export const APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Subsecute",
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS, Android",
  description:
    "Automate your subscriptions and bills in Nigeria. Virtual USD cards for Netflix, Spotify, ChatGPT. Auto-pay airtime, data, power, DSTV. Cancel anything in one tap.",
  url: "https://subsecute.com",
  author: { "@type": "Organization", name: "Subsecute" },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
  },
  featureList: [
    "Virtual USD cards for international subscriptions",
    "Automatic card funding before renewal dates",
    "Recurring bill payments for airtime, data, power, and cable",
    "Subscription renewal reminders",
    "Spending analytics and tracking",
    "Family and team subscription plans",
    "Shareable funding links",
  ],
  screenshot: "https://subsecute.com/images/landing/phone-screen.png",
  countriesSupported: "NG",
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Subsecute",
  url: "https://subsecute.com",
  publisher: { "@type": "Organization", name: "Subsecute" },
};

export function blogPostingSchema(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
}) {
  const url = `https://subsecute.com/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.date,
    dateModified: post.date,
    ...(post.image
      ? { image: [`https://subsecute.com${post.image}`] }
      : {}),
    author: { "@type": "Organization", name: post.author || "Subsecute" },
    publisher: {
      "@type": "Organization",
      name: "Subsecute",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/dwambnh2n/image/upload/v1775598701/Subsecute_Icon_sastth.png",
      },
    },
  };
}

export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Subsecute",
  url: "https://subsecute.com",
  logo: "https://res.cloudinary.com/dwambnh2n/image/upload/v1775598701/Subsecute_Icon_sastth.png",
  description:
    "Automate your subscriptions and bills in Nigeria. Virtual USD cards for Netflix, Spotify, ChatGPT. Auto-pay airtime, data, power, DSTV.",
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
        text: "Subsecute is a recurring payment automation app built for Nigerians. It gives you a unique virtual USD card for each subscription (Netflix, Spotify, ChatGPT, Figma, etc.) and auto-pays your bills including airtime, data, power, and cable, all from one wallet.",
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
      name: "Can someone abroad manage bills for family in Nigeria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Create a plan, add family members, and set up their airtime, data, and cable to renew automatically. You see every payment in your dashboard. No more sending money and hoping it gets used right.",
      },
    },
    {
      "@type": "Question",
      name: "How does Subsecute convert Naira to USD for my subscriptions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you fund your Subsecute wallet with Naira, the app handles the conversion at competitive rates. Each subscription gets its own USD virtual card that is automatically topped up before your renewal date.",
      },
    },
    {
      "@type": "Question",
      name: "Is Subsecute safe and licensed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Subsecute operates in compliance with Nigerian financial regulations through partnerships with CBN-licensed entities. Your funds are held securely, and each virtual card is isolated per subscription so a compromise on one service cannot affect others.",
      },
    },
    {
      "@type": "Question",
      name: "How is Subsecute different from Grey.co or Chipper Cash?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unlike general-purpose dollar cards, Subsecute is purpose-built for recurring payments. Each subscription gets its own dedicated card, auto-funded before renewal, with reminders and spend tracking. Plus, Subsecute also handles local bill payments — airtime, data, power, and cable — so everything recurring lives in one place.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Subsecute for family or team subscription plans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Subsecute lets you create plans where you invite family members or teammates. Each person picks their subscriptions, and all charges flow back to the plan owner.",
      },
    },
    {
      "@type": "Question",
      name: "What subscriptions and bills does Subsecute support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Subsecute works with 50+ providers including Netflix, Spotify, Apple Music, YouTube Premium, ChatGPT Plus, Figma, Canva, Adobe Creative Cloud, Amazon Prime, and more. For bills, you can automate airtime, data, power (prepaid and postpaid), and cable TV (DSTV, GOtv, Showmax).",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to set up Subsecute?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Under 5 minutes. Download the app, sign up, link your debit card, add your subscriptions and bills, and everything starts running on autopilot.",
      },
    },
    {
      "@type": "Question",
      name: "How can I pay for my Claude subscription in Nigeria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Subsecute creates a dedicated virtual USD card for your Claude subscription, funded automatically from your Naira wallet. Add Claude as a subscription, and the card auto-funds before each renewal — no declined payments, no manual top-ups.",
      },
    },
  ],
};
