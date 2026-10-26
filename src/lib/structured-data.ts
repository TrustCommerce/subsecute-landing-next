import { SITE_URL, APP_STORE_URL, PLAY_STORE_URL } from "@/config";
import { CONSUMER_FAQS } from "./consumer-faqs";

export const APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#app`,
  name: "Subsecute",
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS, Android",
  description:
    "Manage subscriptions and recurring bills in Nigeria with dedicated virtual dollar cards, renewal reminders, spending summaries, family plans and gift links.",
  url: SITE_URL,
  author: { "@id": `${SITE_URL}/#organization` },
  downloadUrl: [APP_STORE_URL, PLAY_STORE_URL],
  featureList: [
    "Virtual USD cards for international subscriptions",
    "Automatic card funding before renewal dates",
    "Recurring bill payments for airtime, data, power, and cable",
    "Subscription renewal reminders",
    "Spending analytics and tracking",
    "Family subscription plans",
    "Shareable funding links",
  ],
  screenshot: `${SITE_URL}/images/landing/phone-screen.png`,
  countriesSupported: "NG",
  // The price of the download, not of the service. Apple's lookup API reports
  // price 0.0 / "Free" in NGN for this listing. Google wants an offer before a
  // SoftwareApplication is eligible for an app rich result; it also wants a
  // rating, which has to wait until the listings have reviews worth showing.
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "NGN",
    availability: "https://schema.org/InStock",
  },
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Subsecute",
  url: SITE_URL,
  inLanguage: "en-NG",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function blogPostingSchema(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  image?: string;
}) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.date,
    // Recency is weighted heavily by answer engines, so an edited post has to
    // say so. Falls back to the publish date when it has never been touched.
    dateModified: post.updated || post.date,
    ...(post.image ? { image: [new URL(post.image, SITE_URL).href] } : {}),
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
  "@id": `${SITE_URL}/#organization`,
  name: "Subsecute",
  url: SITE_URL,
  logo: "https://res.cloudinary.com/dwambnh2n/image/upload/v1775598701/Subsecute_Icon_sastth.png",
  description:
    "Subscription management, virtual dollar cards and recurring bill payments for Nigerians, with spending summaries, family plans and gift links.",
  // "TrustCommerce" on its own collides with an unrelated United States payment
  // processor of the same name, so the legal name is only safe to publish next
  // to the registration that pins this company to Nigeria. The RC number is
  // already public in llms.txt, the footer and the account-deletion page, and
  // Apple's listing records the same seller name.
  legalName: "TrustCommerce Resources Ltd",
  identifier: {
    "@type": "PropertyValue",
    name: "RC number",
    value: "7131175",
  },
  // Country only. No street address is published anywhere, and inventing one
  // to fill the property would be worse than leaving it narrow.
  address: { "@type": "PostalAddress", addressCountry: "NG" },
  foundingLocation: { "@type": "Place", name: "Nigeria" },
  areaServed: { "@type": "Country", name: "Nigeria" },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@subsecute.com",
    contactType: "customer service",
  },
  // sameAs is how an engine confirms that the Subsecute on this domain, the
  // one on the App Store and the one posting on X are a single company rather
  // than three similarly named things. It is the cheapest entity signal
  // available and the one a new brand most needs.
  sameAs: [
    APP_STORE_URL,
    PLAY_STORE_URL,
    "https://x.com/subsecute_",
    "https://www.instagram.com/subsecute",
    "https://www.tiktok.com/@subsecute",
    "https://www.facebook.com/share/14dBDtDQg1h/",
  ],
};

/**
 * The card itself, as its own entity.
 *
 * `PaymentCard` is a schema.org subtype of FinancialProduct and Service, and
 * it is what someone is actually asking about when they type "virtual dollar
 * card Nigeria" into an answer engine. The SoftwareApplication node above
 * describes the app; this describes the thing the app issues. They are
 * different questions and deserve different nodes.
 */
export const CARD_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "PaymentCard",
  "@id": `${SITE_URL}/#card`,
  name: "Subsecute virtual dollar card",
  url: SITE_URL,
  provider: { "@id": `${SITE_URL}/#organization` },
  description:
    "A virtual dollar card issued per subscription, funded from naira a few days before the renewal date. Closing the subscription closes the card, so the merchant's next charge is declined.",
  category: "Virtual dollar card for subscriptions",
  areaServed: { "@type": "Country", name: "Nigeria" },
  currenciesAccepted: "NGN",
  audience: {
    "@type": "Audience",
    name: "Nigerians at home and abroad paying for international subscriptions",
  },
};

export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CONSUMER_FAQS.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

/**
 * HowTo markup for the step-by-step posts. This is the schema that lets an
 * answer engine lift the steps out as a structured answer rather than
 * paraphrasing the prose around them.
 */
export function howToSchema(post: {
  slug: string;
  howto: { name: string; steps: string[] };
  description: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: post.howto.name,
    description: post.description,
    ...(post.image ? { image: `${SITE_URL}${post.image}` } : {}),
    step: post.howto.steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: text.split(/[.:]/)[0].slice(0, 80),
      text,
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
  };
}

/**
 * Breadcrumbs for an article. Two jobs: the trail Google renders under a
 * result instead of a bare URL, and telling an engine that a post is part of
 * a blog on a site rather than a page floating on its own.
 */
export function breadcrumbSchema(post: { slug: string; title: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };
}

/**
 * Breadcrumbs for a standalone page. The article version above knows it sits
 * under /blog; these pages hang directly off the home page, so the trail is
 * two deep.
 */
export function pageBreadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${SITE_URL}${path}`,
      },
    ],
  };
}
