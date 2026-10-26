import { BUSINESS_FAQS } from "./business-faqs";
import { steps } from "@/components/business/landing/content";
import { ORG_SCHEMA } from "./structured-data";

export const BUSINESS_URL = "https://business.subsecute.com";

/**
 * Structured data for the Business property.
 *
 * Two rules shape this file:
 *
 * 1. The Organization node is imported, not redeclared. Both properties emit
 *    the same `@id`, so an engine building an entity graph merges them into
 *    one company rather than treating business.subsecute.com as a stranger
 *    that happens to share a name. A separate subdomain already starts with
 *    no inherited authority; it should at least not start as a separate firm.
 *
 * 2. Nothing here is a claim the page does not already make. The fees come
 *    from the backend card config, the reminder recipients from the
 *    integration test that asserts them, and the absence of accounting
 *    integrations is stated rather than quietly omitted.
 */
export const BUSINESS_WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BUSINESS_URL}/#website`,
  name: "Subsecute Business",
  url: `${BUSINESS_URL}/`,
  inLanguage: "en-NG",
  publisher: { "@id": ORG_SCHEMA["@id"] },
};

/**
 * `PaymentCard` is a schema.org subtype of both FinancialProduct and Service.
 * It is the most specific type available for what this page sells, which
 * matters more for entity matching than a generic Product would.
 */
export const BUSINESS_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "PaymentCard",
  "@id": `${BUSINESS_URL}/#service`,
  name: "Subsecute Business subscription and expense cards",
  url: `${BUSINESS_URL}/`,
  provider: { "@id": ORG_SCHEMA["@id"] },
  description:
    "Dedicated dollar cards for each company software subscription, funded from a naira wallet before the renewal date, with WhatsApp reminders to every admin and the cardholder. Expense cards cover approved team purchases.",
  category: "Virtual dollar card for business subscriptions",
  areaServed: { "@type": "Country", name: "Nigeria" },
  currenciesAccepted: "NGN",
  feesAndCommissionsSpecification: `${BUSINESS_URL}/#questions`,
  audience: {
    "@type": "BusinessAudience",
    name: "Nigerian companies paying for software subscriptions in dollars",
  },
  // An engine answering "what does Subsecute Business actually give you" can
  // read the product line off this rather than inferring it from prose.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Subsecute Business cards",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Subscription card",
          description:
            "One dollar card per recurring tool, with its own funding amount and schedule. Funded from the company naira wallet before the renewal date.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Expense card",
          description:
            "A card for approved team purchases, issued to a named holder with the amount they need loaded onto it. The funded balance is not a recurring monthly spending limit.",
        },
      },
    ],
  },
  offers: [
    {
      "@type": "Offer",
      name: "Monthly membership",
      price: 0,
      priceCurrency: "NGN",
      description: "No monthly membership fee.",
    },
    {
      "@type": "Offer",
      name: "Card creation",
      price: 1,
      priceCurrency: "USD",
      description: "Charged once when a card is opened.",
    },
    {
      "@type": "Offer",
      name: "Card maintenance",
      price: 1,
      priceCurrency: "USD",
      description: "Charged each month while the card stays open.",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: 1,
        priceCurrency: "USD",
        billingDuration: 1,
        billingIncrement: 1,
        unitCode: "MON",
      },
    },
  ],
};

export const BUSINESS_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${BUSINESS_URL}/#faq`,
  mainEntity: BUSINESS_FAQS.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

/**
 * The setup flow, generated from the same `steps` array the page renders. A
 * HowTo is what lets an answer engine hand back the actual procedure instead
 * of paraphrasing the section around it, and generating it from the rendered
 * source means the two cannot disagree.
 */
export const BUSINESS_HOWTO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${BUSINESS_URL}/#setup`,
  name: "Set up a Subsecute Business account and issue your first card",
  description:
    "Verify the company, fund the naira wallet, create a subscription or expense card, then add it at the merchant.",
  step: steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.description,
    url: `${BUSINESS_URL}/#how-it-works`,
  })),
};

/**
 * The page as a thing in its own right. `about` and `mentions` are the
 * disambiguation hooks: they say this page is about that card product, in
 * that country, rather than leaving an engine to guess which of the many
 * companies called something similar this is.
 */
export const BUSINESS_WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BUSINESS_URL}/#webpage`,
  url: `${BUSINESS_URL}/`,
  name: "Subsecute Business",
  description:
    "WhatsApp renewal reminders for every admin and cardholder, dedicated dollar subscription cards funded from naira, and expense cards for approved team purchases.",
  inLanguage: "en-NG",
  isPartOf: { "@id": `${BUSINESS_URL}/#website` },
  about: { "@id": `${BUSINESS_URL}/#service` },
  primaryImageOfPage: `${BUSINESS_URL}/business/opengraph-image`,
  mentions: [
    {
      "@type": "Country",
      name: "Nigeria",
      sameAs: "https://www.wikidata.org/wiki/Q1033",
    },
    { "@id": `${BUSINESS_URL}/#setup` },
  ],
};

export const BUSINESS_SCHEMAS = [
  BUSINESS_WEBSITE_SCHEMA,
  BUSINESS_WEBPAGE_SCHEMA,
  ORG_SCHEMA,
  BUSINESS_SERVICE_SCHEMA,
  BUSINESS_HOWTO_SCHEMA,
  BUSINESS_FAQ_SCHEMA,
];
