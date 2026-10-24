import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
  BUSINESS_EDGE_HEADER,
  businessReleased,
  businessHost,
  businessIndexable,
  localBusinessPreview,
} from "@/lib/business-release.mjs";
import {
  BUSINESS_SCHEMAS,
  BUSINESS_URL,
} from "@/lib/business-structured-data";
import BusinessLanding from "@/components/business/BusinessLanding";

export const dynamic = "force-dynamic";

const DESCRIPTION =
  "WhatsApp renewal reminders for every admin and cardholder. Dedicated dollar subscription cards, funded from naira, plus expense cards and company records.";
const SHORT_DESCRIPTION =
  "WhatsApp renewal reminders and dollar subscription cards for Nigerian businesses.";

export const metadata: Metadata = {
  title: {
    absolute: "Subsecute Business | Subscription reminders and dollar cards",
  },
  description: DESCRIPTION,
  keywords:
    "company virtual dollar card Nigeria, business card for software subscriptions, pay for AWS from Nigeria, expense cards Nigeria, subscription management for Nigerian companies",
  metadataBase: new URL(BUSINESS_URL),
  alternates: { canonical: `${BUSINESS_URL}/` },
  // Indexing is a deliberate second switch on top of the release flag, so the
  // page can be live and shared for a while before crawlers are invited in.
  // See docs/business-landing-release.md.
  robots: businessIndexable(
    process.env.BUSINESS_LANDING_ENABLED,
    process.env.BUSINESS_SEARCH_INDEXING,
  )
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title: "Subsecute Business",
    description: SHORT_DESCRIPTION,
    url: `${BUSINESS_URL}/`,
    siteName: "Subsecute Business",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@subsecute_",
    title: "Subsecute Business",
    description: SHORT_DESCRIPTION,
  },
  other: {
    "geo.region": "NG",
    "geo.placename": "Nigeria",
  },
};

export default async function BusinessPage() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  // CloudFront serves business.subsecute.com from this site without the visitor's Host, and
  // marks those requests instead. The router already honours the mark; so must this page.
  const edgeMark = requestHeaders.get(BUSINESS_EDGE_HEADER);
  if (
    !businessReleased(process.env.BUSINESS_LANDING_ENABLED) ||
    !(businessHost(host, edgeMark) || localBusinessPreview(host, process.env.NODE_ENV))
  )
    notFound();
  return (
    <>
      {BUSINESS_SCHEMAS.map((schema) => (
        <script
          key={schema["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <BusinessLanding />
    </>
  );
}
