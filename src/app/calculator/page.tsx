import type { Metadata } from "next";
import { Suspense } from "react";
import CalculatorPage from "@/components/CalculatorPage";
import { DEFAULT_SHARE_IMAGE, SITE_URL } from "@/config";
import { alternatesFor } from "@/lib/seo";
import { pageBreadcrumbSchema } from "@/lib/structured-data";

const title =
  "Naira Leak Calculator: How much are you spending on subscriptions?";
const description =
  "Find out how much Naira is leaking from your account on subscriptions and bills every year. Free calculator by Subsecute.";
const url = `${SITE_URL}/calculator`;

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("/calculator"),
  openGraph: {
    title,
    description,
    url,
    siteName: "Subsecute",
    type: "website",
    images: [{ url: DEFAULT_SHARE_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [DEFAULT_SHARE_IMAGE],
  },
};

export default function Calculator() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageBreadcrumbSchema("Subscription Calculator", "/calculator"),
          ),
        }}
      />
      <Suspense fallback={null}>
        <CalculatorPage />
      </Suspense>
    </>
  );
}
