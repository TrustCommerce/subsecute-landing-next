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
import { BUSINESS_SCHEMAS, BUSINESS_URL } from "@/lib/business-structured-data";
import BusinessLanding from "@/components/business/BusinessLanding";

export const dynamic = "force-dynamic";

const DESCRIPTION =
  "Dollar and naira cards for every company subscription, with scheduled funding for fixed bills and threshold top-ups for usage bills from your company naira wallet.";
const SHORT_DESCRIPTION =
  "Dollar and naira subscription cards, scheduled funding and usage threshold top-ups from your company naira wallet.";

export const metadata: Metadata = {
  title: {
    absolute: "Every company subscription on its own card.",
  },
  description: DESCRIPTION,
  icons: {
    icon: {
      url: "/business-assets/logo.svg?v=orange",
      type: "image/svg+xml",
      sizes: "any",
    },
    shortcut: "/business-assets/logo.svg?v=orange",
  },
  keywords:
    "company virtual dollar card Nigeria, business card for software subscriptions, pay for AWS from Nigeria, expense cards Nigeria, subscription management for Nigerian companies",
  metadataBase: new URL(BUSINESS_URL),
  alternates: { canonical: `${BUSINESS_URL}/` },
  // The release flag also makes the public landing discoverable.
  robots: businessIndexable(process.env.BUSINESS_LANDING_ENABLED)
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title: "Every company subscription on its own card.",
    description: SHORT_DESCRIPTION,
    url: `${BUSINESS_URL}/`,
    siteName: "Subsecute Business",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@subsecute_",
    title: "Every company subscription on its own card.",
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
    !(
      businessHost(host, edgeMark) ||
      localBusinessPreview(host, process.env.NODE_ENV)
    )
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
