import type { Metadata } from "next";
import QuizPage from "@/components/QuizPage";

export const metadata: Metadata = {
  title: "What's Your Subscription Score?",
  description:
    "7 questions. 60 seconds. Find out if your subscriptions and bills are under control — or in chaos.",
  alternates: { canonical: "/quiz" },
};

export default function Quiz() {
  return <QuizPage />;
}
