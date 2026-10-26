import type { Metadata } from "next";
import FamilyPage from "@/components/FamilyPage";
import { DEFAULT_SHARE_IMAGE, SITE_URL } from "@/config";
import { alternatesFor } from "@/lib/seo";
import { pageBreadcrumbSchema } from "@/lib/structured-data";

const title = "How Much Does Supporting Your Family Cost?";
const description =
  "Calculate the real cost of every subscription and bill you pay for family back home in Nigeria, from Netflix and DSTV to GOtv, airtime, data and power. See your annual total.";
const url = `${SITE_URL}/family`;

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("/family"),
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

export default function Family() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageBreadcrumbSchema("Family Cost Calculator", "/family"),
          ),
        }}
      />
      <FamilyPage />
    </>
  );
}
