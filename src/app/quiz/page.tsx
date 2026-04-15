import type { Metadata } from "next";
import QuizPage from "@/components/QuizPage";

export const metadata: Metadata = {
  title: "What's Your Subscription Score?",
  description:
    "Take the Subsecute Subscription Score quiz. 7 questions, 60 seconds. Find out if you're in control of your subscriptions — or in chaos.",
  alternates: { canonical: "/quiz" },
};

export default function Quiz() {
  return <QuizPage />;
}
