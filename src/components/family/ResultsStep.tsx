"use client";

import { useState } from "react";
import Link from "next/link";
import { WAITLIST_API } from "@/config";
import {
  Avatar,
  ProgressBar,
  formatNaira,
  type FamilyMember,
  type MemberBillState,
} from "./shared";

export default function ResultsStep({
  members,
  billState,
  onBack,
  onRestart,
}: {
  members: FamilyMember[];
  billState: Record<string, MemberBillState>;
  onBack: () => void;
  onRestart: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const memberTotals = members
    .map((m, i) => {
      const state = billState[m.id] || { bills: {}, custom: [] };
      const billsTotal = Object.values(state.bills).reduce((a, b) => a + b, 0);
      const customTotal = state.custom.reduce((a, c) => a + c.amount, 0);
      const monthly = billsTotal + customTotal;
      return { member: m, index: i, monthly, bills: state };
    })
    .sort((a, b) => b.monthly - a.monthly);

  const totalMonthly = memberTotals.reduce((a, m) => a + m.monthly, 0);
  const totalAnnual = totalMonthly * 12;
  const peopleWithBills = memberTotals.filter((m) => m.monthly > 0).length;
  const peopleMissingBills = memberTotals.filter((m) => m.monthly === 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");

    const metadata = {
      source: "family",
      totalMonthly,
      totalAnnual,
      members: memberTotals.map((m) => ({
        relationship: m.member.relationship,
        monthly: m.monthly,
        bills: Object.keys(m.bills.bills),
        custom: m.bills.custom.map((c) => ({
          name: c.name,
          amount: c.amount,
        })),
      })),
    };

    try {
      const res = await fetch(WAITLIST_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, metadata }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await res.json().catch(() => null);
        setErrorMsg(data?.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg(
        "Unable to connect. Please check your internet and try again.",
      );
      setStatus("error");
    }
  };

  const shareText = `I spend ${formatNaira(totalAnnual)}/year on my family's bills back home 🇳🇬 Subsecute is going to automate all of it. https://www.subsecute.com/family`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

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
        <ProgressBar step={2} total={3} />

        <h2 className="mt-6 font-neue-power text-2xl font-bold text-[#232323] sm:text-3xl">
          Your Family Bill Summary
        </h2>

        <div className="mt-5 rounded-2xl border border-[#E96D1F]/20 bg-gradient-to-br from-[#E96D1F]/5 to-[#E96D1F]/10 p-5 text-center">
          <p className="font-outfit text-sm font-medium tracking-wide text-[#6C757D]">
            You spend
          </p>
          <p className="mt-1 font-neue-power text-4xl font-bold text-[#E96D1F] sm:text-5xl">
            {formatNaira(totalAnnual)}
            <span className="text-2xl sm:text-3xl">/year</span>
          </p>
          <p className="mt-1 font-outfit text-sm tracking-wide text-[#6C757D]">
            ({formatNaira(totalMonthly)}/month) supporting your family
          </p>
          {peopleMissingBills.length > 0 && peopleWithBills > 0 && (
            <p className="mt-3 font-outfit text-xs text-[#6C757D]">
              Bills added for {peopleWithBills} of {members.length}.{" "}
              <button
                onClick={onBack}
                className="font-medium text-[#E96D1F] underline-offset-2 hover:underline"
              >
                Add bills for{" "}
                {peopleMissingBills.map((p) => p.member.name).join(", ")}
              </button>
            </p>
          )}
        </div>

        <h3 className="mt-6 font-outfit text-sm font-semibold tracking-wide text-[#232323]">
          Breakdown by person
        </h3>
        <div className="mt-3 flex flex-col gap-3">
          {memberTotals.map(({ member, index, monthly, bills }) => {
            const empty = monthly === 0;
            return (
              <div
                key={member.id}
                className={`rounded-xl border bg-white p-4 transition-opacity ${
                  empty
                    ? "border-dashed border-[#E5E7EB] opacity-60"
                    : "border-[#E5E7EB]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar name={member.name} index={index} />
                  <div className="flex-1">
                    <p className="font-outfit text-sm font-medium text-[#232323]">
                      {member.name}
                    </p>
                  </div>
                  <div className="text-right">
                    {empty ? (
                      <button
                        onClick={onBack}
                        className="font-outfit text-xs font-medium text-[#E96D1F] underline-offset-2 hover:underline"
                      >
                        Add bills
                      </button>
                    ) : (
                      <p className="font-outfit text-sm font-semibold text-[#232323]">
                        {formatNaira(monthly)}/mo
                      </p>
                    )}
                  </div>
                </div>
                {(Object.keys(bills.bills).length > 0 ||
                  bills.custom.length > 0) && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {Object.entries(bills.bills).map(([label, amount]) => (
                      <span
                        key={label}
                        className="rounded-full bg-[#F3F4F6] px-2.5 py-1 font-outfit text-[11px] text-[#6C757D]"
                      >
                        {label} {formatNaira(amount)}
                      </span>
                    ))}
                    {bills.custom.map((c, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-[#F3F4F6] px-2.5 py-1 font-outfit text-[11px] text-[#6C757D]"
                      >
                        {c.name} {formatNaira(c.amount)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {totalMonthly > 0 && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <p className="font-outfit text-sm font-medium tracking-wide text-[#232323]">
              Share your number. Who else gets it?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#232323] px-5 py-2.5 font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X / Twitter
              </a>
            </div>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-5">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#58DC00]/20">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 10L9 14L15 6"
                    stroke="#58DC00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-outfit text-sm font-medium text-[#232323]">
                You&apos;re on the list. Subsecute will automate every bill you
                just listed.
              </p>
            </div>
          ) : (
            <>
              <p className="text-center font-outfit text-base font-semibold text-[#232323]">
                {totalMonthly > 0
                  ? `Stop sending money every month manually.`
                  : `Join the waitlist for early access.`}
              </p>
              <p className="mt-2 text-center font-outfit text-xs text-[#6C757D]">
                {totalMonthly > 0
                  ? `Subsecute auto-pays every bill you just listed, from your account, on autopilot.`
                  : `Subsecute automates recurring bill payments for your family in Nigeria.`}
              </p>
              <form
                onSubmit={handleSubmit}
                className="mt-4 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your email"
                  className={`h-11 w-full min-w-0 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-5 text-center font-outfit text-sm text-[#232323] placeholder-[#ADB5BD] outline-none transition-shadow focus:ring-2 focus:ring-[#E96D1F]/40 sm:flex-1 sm:text-left ${
                    status === "error" ? "ring-2 ring-red-500" : ""
                  }`}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-11 shrink-0 rounded-full bg-[#E96D1F] px-6 font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === "loading" ? "Joining..." : "Join waitlist"}
                </button>
              </form>
              {status === "error" && (
                <p className="mt-2 text-center font-outfit text-xs text-red-500">
                  {errorMsg}
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-8">
          <button
            onClick={onBack}
            className="flex h-12 flex-1 items-center justify-center rounded-full border border-[#E5E7EB] bg-white font-outfit text-sm font-medium tracking-wide text-[#232323] transition-colors hover:border-[#D1D5DB]"
          >
            Back
          </button>
          <button
            onClick={onRestart}
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#232323] font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
