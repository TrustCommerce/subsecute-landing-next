import type { Metadata } from "next";
import SupportPage from "@/components/SupportPage";
import { SITE_URL } from "@/config";

const title = "Support";
const description =
  "Need a hand with Subsecute? Contact our support team at support@subsecute.com for help with billing, subscriptions, and your account. Subsecute is a product of TrustCommerce Resources Ltd.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/support" },
  // Explicitly indexable — this page must stay publicly reachable and crawlable.
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/support`,
    siteName: "Subsecute",
    type: "website",
  },
};

export default function Support() {
  return <SupportPage />;
}
