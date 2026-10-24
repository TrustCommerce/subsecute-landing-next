import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
  businessReleased,
  businessHost,
  localBusinessPreview,
} from "@/lib/business-release.mjs";
import BusinessLanding from "@/components/business/BusinessLanding";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: {
    absolute: "Subsecute Business | Subscription reminders and dollar cards",
  },
  description:
    "WhatsApp renewal reminders for every admin and cardholder. Dedicated dollar subscription cards, funded from naira, plus expense cards and company records.",
  metadataBase: new URL("https://business.subsecute.com"),
  alternates: { canonical: "https://business.subsecute.com/" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Subsecute Business",
    description:
      "WhatsApp renewal reminders and dollar subscription cards for Nigerian businesses.",
    url: "https://business.subsecute.com/",
    siteName: "Subsecute Business",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Subsecute Business",
    description:
      "WhatsApp renewal reminders and dollar subscription cards for Nigerian businesses.",
    images: [],
  },
};
export default async function BusinessPage() {
  const host = (await headers()).get("host");
  if (
    !businessReleased(process.env.BUSINESS_LANDING_ENABLED) ||
    !(businessHost(host) || localBusinessPreview(host, process.env.NODE_ENV))
  )
    notFound();
  return <BusinessLanding />;
}
