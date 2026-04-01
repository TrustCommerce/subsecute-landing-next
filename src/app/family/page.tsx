import type { Metadata } from "next";
import FamilyPage from "@/components/FamilyPage";

export const metadata: Metadata = {
  title: "How Much Does Supporting Your Family Cost?",
  description:
    "Calculate the real cost of every bill you pay for family back home in Nigeria — DSTV, airtime, data, power, Netflix. See your annual total.",
  alternates: { canonical: "/family" },
};

export default function Family() {
  return <FamilyPage />;
}
