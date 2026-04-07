import type { Metadata } from "next";
import CalculatorPage from "@/components/CalculatorPage";

export const metadata: Metadata = {
  title: "How Much Do You Spend on Bills? — Calculator",
  description:
    "Calculate your total bill spending in Nigeria. See your annual Naira total for DSTV, GOtv, airtime, data, and electricity.",
  alternates: { canonical: "/calculator" },
};

export default function Calculator() {
  return <CalculatorPage />;
}
