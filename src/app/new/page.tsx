import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPage from "@/components/consumer-redesign/LandingPage";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Your month. Already handled. | Subsecute",
  robots: { index: false, follow: false },
};

export default function Page() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <LandingPage />;
}
