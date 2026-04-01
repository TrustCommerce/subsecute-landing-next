"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Relationship = "Mum" | "Dad" | "Brother" | "Sister" | "Partner" | "Other";

interface FamilyMember {
  id: string;
  name: string;
  relationship: Relationship;
}

interface BillOption {
  label: string;
  tiers: { name: string; amount: number }[];
}

interface CustomBill {
  name: string;
  amount: number;
}

interface MemberBills {
  [billLabel: string]: number; // selected tier amount (0 = not selected)
}

interface MemberBillState {
  bills: MemberBills;
  custom: CustomBill[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const AVATAR_COLORS = [
  "#E96D1F",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
];

const RELATIONSHIPS: Relationship[] = [
  "Mum",
  "Dad",
  "Brother",
  "Sister",
  "Partner",
  "Other",
];

const BILL_OPTIONS: BillOption[] = [
  {
    label: "DSTV",
    tiers: [
      { name: "Premium", amount: 44500 },
      { name: "Compact Plus", amount: 30000 },
      { name: "Compact", amount: 19000 },
      { name: "Yanga", amount: 6000 },
    ],
  },
  {
    label: "GOtv",
    tiers: [
      { name: "Max", amount: 4850 },
      { name: "Smallie", amount: 1575 },
    ],
  },
  {
    label: "Airtime",
    tiers: [
      { name: "₦3,000/mo", amount: 3000 },
      { name: "₦5,000/mo", amount: 5000 },
      { name: "₦10,000/mo", amount: 10000 },
    ],
  },
  {
    label: "Data",
    tiers: [
      { name: "₦4,500/mo", amount: 4500 },
      { name: "₦7,500/mo", amount: 7500 },
      { name: "₦10,000/mo", amount: 10000 },
    ],
  },
  {
    label: "Electricity",
    tiers: [
      { name: "₦10,000/mo", amount: 10000 },
      { name: "₦15,000/mo", amount: 15000 },
      { name: "₦20,000/mo", amount: 20000 },
      { name: "₦25,000/mo", amount: 25000 },
    ],
  },
  {
    label: "Netflix",
    tiers: [
      { name: "Standard", amount: 6500 },
      { name: "Premium", amount: 8500 },
    ],
  },
];

const EXCHANGE_RATE = 1550;
const WAITLIST_API = "https://api.subsecute.com/subsecute-api/v1/waitlist";

function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

function formatUSD(naira: number): string {
  return "$" + Math.round(naira / EXCHANGE_RATE).toLocaleString("en-US");
}

function nairaToUSD(naira: number): number {
  return Math.round(naira / EXCHANGE_RATE);
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function Avatar({
  name,
  index,
  size = "md",
}: {
  name: string;
  index: number;
  size?: "sm" | "md" | "lg";
}) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };
  return (
    <div
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full font-outfit font-semibold text-white`}
      style={{ backgroundColor: color }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
            i <= step ? "bg-[#E96D1F]" : "bg-[#E5E7EB]"
          }`}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Landing Screen                                                     */
/* ------------------------------------------------------------------ */

function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFFEEC] px-4">
      {/* Orange blur */}
      <div
        className="pointer-events-none fixed bottom-0 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#E96D1F] opacity-20"
        style={{ filter: "blur(200px)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <Link href="/" aria-label="Subsecute home">
          <img
            src="/images/landing/logo.png"
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
  const [name, setName] = useState("");
  const [rel, setRel] = useState<Relationship>("Mum");

  const addMember = () => {
    if (!name.trim() || members.length >= 6) return;
    setMembers([
      ...members,
      { id: crypto.randomUUID(), name: name.trim(), relationship: rel },
    ]);
    setName("");
    setRel("Mum");
  };

  const removeMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFEEC]">
      <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col px-4 pb-8 pt-6">
        {/* Header */}
        <Link href="/" aria-label="Subsecute home" className="mb-6 self-start">
          <img
            src="/images/landing/logo.png"
            alt="Subsecute logo"
            className="h-7 w-auto"
          />
        </Link>
        <ProgressBar step={0} total={3} />

        <h2 className="mt-6 font-neue-power text-2xl font-bold text-[#232323] sm:text-3xl">
          Who do you support?
        </h2>
        <p className="mt-1 font-outfit text-sm text-[#6C757D]">
          Add the family members whose bills you pay. Up to 6 people.
        </p>

        {/* Current members */}
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
                  <p className="font-outfit text-xs text-[#6C757D]">
                    {m.relationship}
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

        {/* Add form */}
        {members.length < 6 && (
          <div className="mt-5 flex flex-col gap-3 rounded-xl border border-dashed border-[#D1D5DB] bg-white/60 p-4">
            <input
              type="text"
              placeholder="Name (e.g. Mum)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addMember();
              }}
              maxLength={30}
              className="h-11 rounded-lg border border-[#E5E7EB] bg-white px-4 font-outfit text-sm text-[#232323] placeholder-[#ADB5BD] outline-none transition-shadow focus:ring-2 focus:ring-[#E96D1F]/40"
            />
            <div className="flex flex-wrap gap-2">
              {RELATIONSHIPS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRel(r)}
                  className={`rounded-full border px-3.5 py-1.5 font-outfit text-xs font-medium tracking-wide transition-colors ${
                    rel === r
                      ? "border-[#E96D1F] bg-[#E96D1F]/10 text-[#E96D1F]"
                      : "border-[#E5E7EB] bg-white text-[#6C757D] hover:border-[#D1D5DB]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button
              onClick={addMember}
              disabled={!name.trim()}
              className="mt-1 flex h-10 items-center justify-center rounded-lg bg-[#232323] font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              + Add Person
            </button>
          </div>
        )}

        {/* Navigation */}
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
/*  Step 2: Select Bills per Member                                    */
/* ------------------------------------------------------------------ */

function SelectBillsStep({
  members,
  billState,
  setBillState,
  onNext,
  onBack,
}: {
  members: FamilyMember[];
  billState: Record<string, MemberBillState>;
  setBillState: (s: Record<string, MemberBillState>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [activeMemberIdx, setActiveMemberIdx] = useState(0);
  const member = members[activeMemberIdx];
  const state = billState[member.id] || { bills: {}, custom: [] };

  const [customName, setCustomName] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const updateState = (next: MemberBillState) => {
    setBillState({ ...billState, [member.id]: next });
  };

  const toggleBill = (label: string, amount: number) => {
    const current = state.bills[label];
    const next = { ...state.bills };
    if (current === amount) {
      delete next[label];
    } else {
      next[label] = amount;
    }
    updateState({ ...state, bills: next });
  };

  const addCustom = () => {
    const amt = parseInt(customAmount);
    if (!customName.trim() || isNaN(amt) || amt <= 0) return;
    updateState({
      ...state,
      custom: [...state.custom, { name: customName.trim(), amount: amt }],
    });
    setCustomName("");
    setCustomAmount("");
  };

  const removeCustom = (idx: number) => {
    updateState({ ...state, custom: state.custom.filter((_, i) => i !== idx) });
  };

  const goToMember = (idx: number) => {
    setActiveMemberIdx(idx);
    setCustomName("");
    setCustomAmount("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFEEC]">
      <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col px-4 pb-8 pt-6">
        {/* Header */}
        <Link href="/" aria-label="Subsecute home" className="mb-6 self-start">
          <img
            src="/images/landing/logo.png"
            alt="Subsecute logo"
            className="h-7 w-auto"
          />
        </Link>
        <ProgressBar step={1} total={3} />

        {/* Member tabs */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {members.map((m, i) => (
            <button
              key={m.id}
              onClick={() => goToMember(i)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 font-outfit text-xs font-medium tracking-wide transition-colors ${
                i === activeMemberIdx
                  ? "border-[#E96D1F] bg-[#E96D1F]/10 text-[#E96D1F]"
                  : "border-[#E5E7EB] bg-white text-[#6C757D] hover:border-[#D1D5DB]"
              }`}
            >
              <Avatar name={m.name} index={i} size="sm" />
              {m.name}
            </button>
          ))}
        </div>

        <h2 className="mt-5 font-neue-power text-xl font-bold text-[#232323] sm:text-2xl">
          What do you pay for {member.name}?
        </h2>
        <p className="mt-1 font-outfit text-sm text-[#6C757D]">
          Select the bills and tiers you cover for {member.name} (
          {member.relationship}).
        </p>

        {/* Bill grid */}
        <div className="mt-5 flex flex-col gap-4">
          {BILL_OPTIONS.map((bill) => (
            <div
              key={bill.label}
              className="rounded-xl border border-[#E5E7EB] bg-white p-4"
            >
              <p className="mb-2.5 font-outfit text-sm font-semibold text-[#232323]">
                {bill.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {bill.tiers.map((tier) => {
                  const selected = state.bills[bill.label] === tier.amount;
                  return (
                    <button
                      key={tier.name}
                      onClick={() => toggleBill(bill.label, tier.amount)}
                      className={`rounded-lg border px-3 py-2 text-left font-outfit transition-colors ${
                        selected
                          ? "border-[#E96D1F] bg-[#E96D1F]/10 text-[#E96D1F]"
                          : "border-[#E5E7EB] text-[#6C757D] hover:border-[#D1D5DB]"
                      }`}
                    >
                      <span className="block text-xs font-medium">
                        {tier.name}
                      </span>
                      <span className="block text-[11px]">
                        {formatNaira(tier.amount)}/mo
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Custom bills */}
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
            <p className="mb-2.5 font-outfit text-sm font-semibold text-[#232323]">
              Custom
            </p>
            {state.custom.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {state.custom.map((c, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 rounded-full border border-[#E96D1F]/30 bg-[#E96D1F]/5 px-3 py-1 font-outfit text-xs text-[#E96D1F]"
                  >
                    {c.name}: {formatNaira(c.amount)}
                    <button
                      onClick={() => removeCustom(i)}
                      className="ml-0.5 text-[#E96D1F]/60 hover:text-[#E96D1F]"
                      aria-label={`Remove ${c.name}`}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Bill name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                maxLength={30}
                className="h-9 min-w-0 flex-1 rounded-lg border border-[#E5E7EB] px-3 font-outfit text-xs text-[#232323] placeholder-[#ADB5BD] outline-none focus:ring-2 focus:ring-[#E96D1F]/40"
              />
              <input
                type="number"
                placeholder="₦ Amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="h-9 w-24 rounded-lg border border-[#E5E7EB] px-3 font-outfit text-xs text-[#232323] placeholder-[#ADB5BD] outline-none focus:ring-2 focus:ring-[#E96D1F]/40"
              />
              <button
                onClick={addCustom}
                disabled={!customName.trim() || !customAmount}
                className="h-9 rounded-lg bg-[#232323] px-3 font-outfit text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-auto flex items-center gap-3 pt-8">
          <button
            onClick={onBack}
            className="flex h-12 flex-1 items-center justify-center rounded-full border border-[#E5E7EB] bg-white font-outfit text-sm font-medium tracking-wide text-[#232323] transition-colors hover:border-[#D1D5DB]"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#E96D1F] font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
          >
            See Results
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 3: Results Dashboard                                          */
/* ------------------------------------------------------------------ */

function ResultsStep({
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

  // Calculate totals
  const memberTotals = members.map((m, i) => {
    const state = billState[m.id] || { bills: {}, custom: [] };
    const billsTotal = Object.values(state.bills).reduce((a, b) => a + b, 0);
    const customTotal = state.custom.reduce((a, c) => a + c.amount, 0);
    const monthly = billsTotal + customTotal;
    return { member: m, index: i, monthly, bills: state };
  });

  const totalMonthly = memberTotals.reduce((a, m) => a + m.monthly, 0);
  const totalAnnual = totalMonthly * 12;
  const annualUSD = nairaToUSD(totalAnnual);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(WAITLIST_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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

  const shareText = `I spend $${annualUSD.toLocaleString("en-US")}/year on my family's bills back home. Subsecute is going to automate all of it. https://subsecute.com/family`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFEEC]">
      <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col px-4 pb-8 pt-6">
        {/* Header */}
        <Link href="/" aria-label="Subsecute home" className="mb-6 self-start">
          <img
            src="/images/landing/logo.png"
            alt="Subsecute logo"
            className="h-7 w-auto"
          />
        </Link>
        <ProgressBar step={2} total={3} />

        <h2 className="mt-6 font-neue-power text-2xl font-bold text-[#232323] sm:text-3xl">
          Your Family Bill Summary
        </h2>

        {/* Hero stat */}
        <div className="mt-5 rounded-2xl border border-[#E96D1F]/20 bg-gradient-to-br from-[#E96D1F]/5 to-[#E96D1F]/10 p-5 text-center">
          <p className="font-outfit text-sm font-medium tracking-wide text-[#6C757D]">
            You spend
          </p>
          <p className="mt-1 font-neue-power text-4xl font-bold text-[#E96D1F] sm:text-5xl">
            {formatUSD(totalAnnual)}
            <span className="text-2xl sm:text-3xl">/year</span>
          </p>
          <p className="mt-1 font-outfit text-sm tracking-wide text-[#6C757D]">
            supporting your family&apos;s recurring bills
          </p>
        </div>

        {/* Summary cards */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
            <p className="font-outfit text-[11px] font-medium uppercase tracking-wider text-[#ADB5BD]">
              Monthly
            </p>
            <p className="mt-1 font-neue-power text-lg font-bold text-[#232323]">
              {formatNaira(totalMonthly)}
            </p>
            <p className="font-outfit text-xs text-[#6C757D]">
              {formatUSD(totalMonthly)}
            </p>
          </div>
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
            <p className="font-outfit text-[11px] font-medium uppercase tracking-wider text-[#ADB5BD]">
              Annual
            </p>
            <p className="mt-1 font-neue-power text-lg font-bold text-[#232323]">
              {formatNaira(totalAnnual)}
            </p>
            <p className="font-outfit text-xs text-[#6C757D]">
              {formatUSD(totalAnnual)}
            </p>
          </div>
        </div>

        {/* Per-member breakdown */}
        <h3 className="mt-6 font-outfit text-sm font-semibold tracking-wide text-[#232323]">
          Breakdown by person
        </h3>
        <div className="mt-3 flex flex-col gap-3">
          {memberTotals.map(({ member, index, monthly, bills }) => (
            <div
              key={member.id}
              className="rounded-xl border border-[#E5E7EB] bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <Avatar name={member.name} index={index} />
                <div className="flex-1">
                  <p className="font-outfit text-sm font-medium text-[#232323]">
                    {member.name}
                  </p>
                  <p className="font-outfit text-xs text-[#6C757D]">
                    {member.relationship}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-outfit text-sm font-semibold text-[#232323]">
                    {formatNaira(monthly)}/mo
                  </p>
                  <p className="font-outfit text-[11px] text-[#6C757D]">
                    {formatUSD(monthly)}/mo
                  </p>
                </div>
              </div>
              {/* Bill tags */}
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
          ))}
        </div>

        {/* Email gate */}
        <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-5">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 text-center">
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
                You&apos;re on the list! We&apos;ll notify you when Subsecute
                can automate all of this.
              </p>

              {/* Share */}
              <p className="font-outfit text-xs text-[#6C757D]">
                Share how much you spend with friends who get it.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 font-outfit text-xs font-medium tracking-wide text-white transition-opacity hover:opacity-90"
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
                  className="flex items-center gap-2 rounded-full bg-[#232323] px-4 py-2 font-outfit text-xs font-medium tracking-wide text-white transition-opacity hover:opacity-90"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter
                </a>
              </div>
            </div>
          ) : (
            <>
              <p className="text-center font-outfit text-sm font-medium text-[#232323]">
                Save this family payment plan and get notified when Subsecute
                can automate all of it.
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
                  {status === "loading" ? "Saving..." : "Save My Plan"}
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

        {/* Navigation */}
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
