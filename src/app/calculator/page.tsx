import type { Metadata } from "next";
import CalculatorPage from "@/components/CalculatorPage";

export const metadata: Metadata = {
  title: "Naira Leak Calculator — How much are you spending on subscriptions?",
  description:
    "Find out how much Naira is leaking from your account on subscriptions and bills every year. Free calculator by Subsecute.",
  alternates: { canonical: "/calculator" },
};

export default function Calculator() {
  return <CalculatorPage />;
}
