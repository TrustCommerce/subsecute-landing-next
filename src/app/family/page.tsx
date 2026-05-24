import type { Metadata } from "next";
import FamilyPage from "@/components/FamilyPage";
import { DEFAULT_SHARE_IMAGE, SITE_URL } from "@/config";

const title = "How Much Does Supporting Your Family Cost?";
const description =
  "Calculate the real cost of every subscription and bill you pay for family back home in Nigeria — Netflix, DSTV, GOtv, airtime, data, power. See your annual total.";
const url = `${SITE_URL}/family`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/family" },
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
  return <FamilyPage />;
}
