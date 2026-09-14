import { SITE_URL } from "@/config";
import { FAQS } from "./faqs";

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
  updated?: string;
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
    // Recency is weighted heavily by answer engines, so an edited post has to
    // say so. Falls back to the publish date when it has never been touched.
    dateModified: post.updated || post.date,
    ...(post.image ? { image: [`https://subsecute.com${post.image}`] } : {}),
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
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
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
