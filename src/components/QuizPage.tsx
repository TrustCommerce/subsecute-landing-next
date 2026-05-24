"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

function FlowLoader() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-[#E96D1F]/30 border-t-[#E96D1F]"
        aria-label="Loading"
      />
    </div>
  );
}

const QuizFlow = dynamic(() => import("./quiz/QuizFlow"), {
  ssr: false,
  loading: FlowLoader,
});

export default function QuizPage() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Prefetch the heavy flow chunk while user reads the landing copy
    import("./quiz/QuizFlow");
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FFFEEC] font-neue-power">
      <nav className="flex items-center justify-between px-4 pt-5 lg:px-[100px]">
        <Link href="/">
          <img
            src="/images/landing/logo.png"
            alt="Subsecute"
            className="h-7 lg:h-8"
          />
        </Link>
      </nav>

      {!started ? (
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center text-center">
            <img
              src="/images/landing/logo.png"
              alt="Subsecute"
              className="mb-8 h-10 lg:h-12"
            />
            <h1 className="mb-4 font-neue-power text-4xl font-bold tracking-tight text-[#232323] sm:text-5xl">
              What&apos;s your subscription score?
            </h1>
            <p className="mb-10 max-w-md font-outfit text-base text-[#6C757D] sm:text-lg">
              7 questions. 60 seconds. Are you in control, or in chaos?
            </p>
            <button
              onClick={() => setStarted(true)}
              className="h-14 rounded-full bg-[#E96D1F] px-10 font-outfit text-base font-medium tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Start Quiz
            </button>
          </div>
        </div>
      ) : (
        <QuizFlow />
      )}
    </div>
  );
}
