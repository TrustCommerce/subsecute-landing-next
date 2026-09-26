import type { Metadata } from "next";
import LandingPage from "@/components/consumer-redesign/LandingPage";
import { SITE_URL } from "@/config";
import {
  APP_SCHEMA,
  ORG_SCHEMA,
  FAQ_SCHEMA,
  WEBSITE_SCHEMA,
} from "@/lib/structured-data";

const title = "The Recurring Money App for Nigerians | Subsecute";
const description =
  "Manage subscriptions and recurring bills in Nigeria with Subsecute. Get virtual dollar cards, track spending and share gift links. Available on iOS and Android.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Subsecute",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/social/home",
        width: 1200,
        height: 630,
        alt: "Subsecute. The recurring money app for Nigerians.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/social/home"],
  },
};

export default function Home() {
  return (
    <>
      {[WEBSITE_SCHEMA, APP_SCHEMA, ORG_SCHEMA, FAQ_SCHEMA].map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <LandingPage />
    </>
  );
}
