import type { Metadata } from "next";
import CalculatorPage from "@/components/CalculatorPage";

export const metadata: Metadata = {
  title: "How Much Do You Spend on Subscriptions? — Calculator",
  description:
    "Calculate your total subscription and bill spending in Nigeria. See your annual Naira total for Netflix, Spotify, DSTV, airtime, data, and power.",
  alternates: { canonical: "/calculator" },
};

export default function Calculator() {
  return <CalculatorPage />;
}
