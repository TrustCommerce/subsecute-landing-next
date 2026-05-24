import type { Metadata } from "next";
import QuizPage from "@/components/QuizPage";
import { DEFAULT_SHARE_IMAGE, SITE_URL } from "@/config";

const title = "What's Your Subscription Score?";
const description =
  "Take the Subsecute Subscription Score quiz. 7 questions, 60 seconds. Find out if you're in control of your subscriptions — or in chaos.";
const url = `${SITE_URL}/quiz`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/quiz" },
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

export default function Quiz() {
  return <QuizPage />;
}
