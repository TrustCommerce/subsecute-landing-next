import type { Metadata } from "next";
import EarlyAccessPage from "@/components/EarlyAccessPage";
import { DEFAULT_SHARE_IMAGE, SITE_URL } from "@/config";

const title = "Get Early Access — Subsecute";
const description =
  "Be first in line for Subsecute, the recurring money app for Nigerians. One app that funds, tracks, and auto-pays every subscription and bill — Netflix, Spotify, ChatGPT, DSTV, airtime, data, and power.";
const url = `${SITE_URL}/early-access`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/early-access" },
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

export default function EarlyAccess() {
  return <EarlyAccessPage />;
}
