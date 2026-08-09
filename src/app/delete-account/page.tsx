import type { Metadata } from "next";
import DeleteAccountPage from "@/components/DeleteAccountPage";
import { SITE_URL } from "@/config";

const title = "Delete your account";
const description =
  "How to delete your Subsecute account and the personal data held with it — from inside the app, or by email if you no longer have the app installed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/delete-account" },
  // Google requires this page to be publicly reachable and crawlable without
  // installing the app, so index it explicitly.
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/delete-account`,
    siteName: "Subsecute",
    type: "website",
  },
};

export default function DeleteAccount() {
  return <DeleteAccountPage />;
}
