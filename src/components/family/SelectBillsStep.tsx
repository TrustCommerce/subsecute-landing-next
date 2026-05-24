"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  ProgressBar,
  formatNaira,
  type BillOption,
  type FamilyMember,
  type MemberBillState,
} from "./shared";

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
      { name: "Light", amount: 3000 },
      { name: "Standard", amount: 5000 },
      { name: "Heavy", amount: 10000 },
    ],
  },
  {
    label: "Data",
    tiers: [
      { name: "~₦5,000", amount: 5000 },
      { name: "~₦10,000", amount: 10000 },
      { name: ">₦15,000", amount: 15000 },
    ],
  },
  {
    label: "Electricity",
    tiers: [
      { name: "~₦10,000", amount: 10000 },
      { name: "~₦15,000", amount: 15000 },
      { name: "~₦20,000", amount: 20000 },
      { name: ">₦25,000", amount: 25000 },
    ],
  },
  {
    label: "Netflix",
    tiers: [
      { name: "Standard", amount: 6500 },
      { name: "Premium", amount: 8500 },
    ],
  },
  {
    label: "Internet",
    tiers: [
      { name: "Spectranet", amount: 25000 },
      { name: "Starlink", amount: 57000 },
    ],
  },
];

export default function SelectBillsStep({
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
        <Link href="/" aria-label="Subsecute home" className="mb-6 self-start">
          <img
            src="/images/landing/logo.png"
            alt="Subsecute logo"
            className="h-7 w-auto"
          />
        </Link>
        <ProgressBar step={1} total={3} />

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
          Select the bills and tiers you cover for {member.name}.
        </p>

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
