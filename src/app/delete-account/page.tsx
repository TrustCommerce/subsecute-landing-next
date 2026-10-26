import type { Metadata } from "next";
import DeleteAccountPage from "@/components/DeleteAccountPage";
import { SITE_URL } from "@/config";
import { alternatesFor } from "@/lib/seo";
import { pageBreadcrumbSchema } from "@/lib/structured-data";

const title = "Delete your account or data";
const description =
  "How to delete your Subsecute account, or remove individual pieces of your data without closing it, either from inside the app or by email if you no longer have the app installed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("/delete-account"),
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageBreadcrumbSchema("Delete Account", "/delete-account"),
          ),
        }}
      />
      <DeleteAccountPage />
    </>
  );
}
