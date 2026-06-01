"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Avatar,
  ProgressBar,
  RELATIONSHIPS,
  type FamilyMember,
  type MemberBillState,
  type Relationship,
} from "./family/shared";

function StepLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFFEEC]">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-[#E96D1F]/30 border-t-[#E96D1F]"
        aria-label="Loading"
      />
    </div>
  );
}

const SelectBillsStep = dynamic(() => import("./family/SelectBillsStep"), {
  ssr: false,
  loading: StepLoader,
});
const ResultsStep = dynamic(() => import("./family/ResultsStep"), {
  ssr: false,
  loading: StepLoader,
});

/* ------------------------------------------------------------------ */
/*  Landing Screen                                                     */
/* ------------------------------------------------------------------ */

function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFFEEC] px-4">
      <div
        className="pointer-events-none fixed bottom-0 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#E96D1F] opacity-20"
        style={{ filter: "blur(60px)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <Link href="/" aria-label="Subsecute home">
          <img
            src="/images/landing/logo.svg"
            alt="Subsecute logo"
            className="mb-8 h-8 w-auto"
          />
        </Link>

        <h1 className="max-w-[600px] font-neue-power text-3xl font-bold leading-tight tracking-normal text-[#232323] sm:text-4xl md:text-5xl">
          How much does supporting your family{" "}
          <span className="text-[#E96D1F]">cost you?</span>
        </h1>

        <p className="mt-4 max-w-[460px] font-outfit text-sm leading-relaxed tracking-wide text-[#6C757D] sm:text-base">
          See the real cost of every bill you pay for family back home.
        </p>

        <button
          onClick={onStart}
          className="mt-8 flex h-12 items-center justify-center rounded-full bg-[#232323] px-10 font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90 sm:h-[52px] sm:px-12 sm:text-base"
        >
          Start
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 1: Add Family Members                                         */
/* ------------------------------------------------------------------ */

function AddMembersStep({
  members,
  setMembers,
  onNext,
  onBack,
}: {
  members: FamilyMember[];
  setMembers: (m: FamilyMember[]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const addMember = (rel: Relationship) => {
    const existing = members.filter(
      (m) => m.name === rel || m.name.startsWith(rel + " "),
    ).length;
    const finalName = existing === 0 ? rel : `${rel} ${existing + 1}`;
    setMembers([
      ...members,
      { id: crypto.randomUUID(), name: finalName, relationship: rel },
    ]);
  };

  const removeMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFEEC]">
      <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col px-4 pb-8 pt-6">
        <Link href="/" aria-label="Subsecute home" className="mb-6 self-start">
          <img
            src="/images/landing/logo.svg"
            alt="Subsecute logo"
            className="h-7 w-auto"
          />
        </Link>
        <ProgressBar step={0} total={3} />

        <h2 className="mt-6 font-neue-power text-2xl font-bold text-[#232323] sm:text-3xl">
          Who do you support?
        </h2>
        <p className="mt-1 font-outfit text-sm text-[#6C757D]">
          Tap a relationship to add them.
        </p>

        {members.length > 0 && (
          <div className="mt-5 flex flex-col gap-2">
            {members.map((m, i) => (
              <div
                key={m.id}
                className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3"
              >
                <Avatar name={m.name} index={i} />
                <div className="flex-1">
                  <p className="font-outfit text-sm font-medium text-[#232323]">
                    {m.name}
                  </p>
                </div>
                <button
                  onClick={() => removeMember(m.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[#ADB5BD] transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label={`Remove ${m.name}`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 3L11 11M11 3L3 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 rounded-xl border border-dashed border-[#D1D5DB] bg-white/60 p-4">
          <div className="flex flex-wrap gap-2">
            {RELATIONSHIPS.map((r) => (
              <button
                key={r}
                onClick={() => addMember(r)}
                className="rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1.5 font-outfit text-xs font-medium tracking-wide text-[#232323] transition-colors hover:border-[#E96D1F] hover:text-[#E96D1F]"
              >
                + {r}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center gap-3 pt-8">
          <button
            onClick={onBack}
            className="flex h-12 flex-1 items-center justify-center rounded-full border border-[#E5E7EB] bg-white font-outfit text-sm font-medium tracking-wide text-[#232323] transition-colors hover:border-[#D1D5DB]"
          >
            Back
          </button>
          <button
            onClick={onNext}
            disabled={members.length === 0}
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#E96D1F] font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

type Step = "landing" | "members" | "bills" | "results";

export default function FamilyPage() {
  const [step, setStep] = useState<Step>("landing");
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [billState, setBillState] = useState<Record<string, MemberBillState>>(
    {},
  );

  const restart = () => {
    setStep("landing");
    setMembers([]);
    setBillState({});
  };

  return (
    <main className="font-neue-power">
      {step === "landing" && (
        <LandingScreen onStart={() => setStep("members")} />
      )}
      {step === "members" && (
        <AddMembersStep
          members={members}
          setMembers={setMembers}
          onNext={() => setStep("bills")}
          onBack={() => setStep("landing")}
        />
      )}
      {step === "bills" && (
        <SelectBillsStep
          members={members}
          billState={billState}
          setBillState={setBillState}
          onNext={() => setStep("results")}
          onBack={() => setStep("members")}
        />
      )}
      {step === "results" && (
        <ResultsStep
          members={members}
          billState={billState}
          onBack={() => setStep("bills")}
          onRestart={restart}
        />
      )}
    </main>
  );
}
