export const APP_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Subsecute',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'iOS, Android',
  description:
    'Automate your subscriptions and bills in Nigeria. Virtual USD cards for Netflix, Spotify, ChatGPT. Auto-pay airtime, data, power, DSTV. Cancel anything in one tap.',
  url: 'https://subsecute.com',
  author: { '@type': 'Organization', name: 'Subsecute' },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder'
  },
  featureList: [
    'Dedicated virtual USD card per subscription',
    'Auto-funding from Naira wallet',
    'Recurring bill payments for airtime, data, power, and cable',
    'Subscription renewal reminders',
    'Spending analytics and tracking',
    'Family and team subscription plans',
    'Shareable funding links'
  ],
  screenshot: 'https://subsecute.com/images/landing/phone-screen.png',
  countriesSupported: 'NG'
}

export const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Subsecute',
  url: 'https://subsecute.com',
  logo: 'https://subsecute.com/images/landing/logo.png',
  description:
    'Automate your subscriptions and bills in Nigeria. Virtual USD cards for subscriptions. Auto-pay airtime, data, power, and cable.',
  foundingLocation: { '@type': 'Place', name: 'Nigeria' },
  areaServed: { '@type': 'Country', name: 'Nigeria' },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@subsecute.com',
    contactType: 'customer service'
  }
}

export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I pay for Netflix in Nigeria without my card being declined?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Subsecute creates a dedicated virtual USD card for your Netflix subscription, funded automatically from your Naira wallet. Unlike Nigerian bank cards that often get declined, Subsecute cards work reliably across 50+ subscription providers.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is Subsecute?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Subsecute is a recurring payment automation app built for Nigerians. It gives you a unique virtual USD card for each subscription (Netflix, Spotify, ChatGPT, Figma, etc.) and auto-pays your bills — airtime, data, power, and cable — all from one wallet.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I auto-pay my airtime, data, and DSTV through Subsecute?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Set up recurring payments for airtime, data bundles, power, and cable TV (DSTV, GOtv, Showmax). Pick the amount and schedule, and Subsecute handles it automatically every month.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can someone abroad manage bills for family in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Create a plan, add family members, and set up their airtime, data, and cable to renew automatically. You see every payment in your dashboard. No more sending money and hoping it gets used right."
      }
    },
    {
      '@type': 'Question',
      name: 'How is Subsecute different from Grey.co or Chipper Cash?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unlike general-purpose dollar cards, Subsecute is purpose-built for recurring payments. Each subscription gets its own dedicated card, auto-funded before renewal, with reminders and spend tracking. Plus, Subsecute also handles local bill payments — airtime, data, power, and cable — so everything recurring lives in one place.'
      }
    },
    {
      '@type': 'Question',
      name: 'What subscriptions and bills does Subsecute support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Subsecute works with 50+ providers including Netflix, Spotify, Apple Music, YouTube Premium, ChatGPT Plus, Figma, Canva, Adobe Creative Cloud, Amazon Prime, and more. For bills, you can automate airtime, data, power (prepaid and postpaid), and cable TV (DSTV, GOtv, Showmax).'
      }
    },
    {
      '@type': 'Question',
      name: 'How long does it take to set up Subsecute?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under 5 minutes. Download the app, sign up, fund your wallet, add your subscriptions and bills, and everything starts running on autopilot.'
      }
    },
    {
      '@type': 'Question',
      name: 'How does Subsecute convert Naira to USD for my subscriptions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When you fund your Subsecute wallet with Naira, the app handles the conversion at competitive rates. Each subscription gets its own USD virtual card that is automatically topped up before your renewal date.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is Subsecute safe and licensed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Subsecute operates in compliance with Nigerian financial regulations through partnerships with CBN-licensed entities. Your funds are held securely, and each virtual card is isolated per subscription so a compromise on one service cannot affect others.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I use Subsecute for family or team subscription plans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Subsecute lets you create plans where you invite family members or teammates. Each person picks their subscriptions, and all charges flow back to the plan owner.'
      }
    }
  ]
}
