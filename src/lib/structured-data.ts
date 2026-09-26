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
