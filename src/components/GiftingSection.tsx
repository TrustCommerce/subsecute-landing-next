"use client";

import React from "react";

const LOGO_TOKEN = "pk_dorVGutZSi-4iMholcR1qA";

export default function GiftingSection() {
  return (
    <section
      id="gifting"
      aria-labelledby="gifting-heading"
      className="bg-paper py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-0">
        <div className="flex flex-col items-center gap-12 lg:flex-row-reverse lg:gap-16">
          {/* ── Right Column: Text ── */}
          <div className="flex w-full flex-col gap-6 lg:w-[55%]">
            <span className="font-outfit text-[11px] font-medium uppercase tracking-[0.18em] text-accent-ink">
              GIFTING
            </span>

            <h2
              id="gifting-heading"
              className="font-neue-power text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink lg:text-[52px]"
            >
              Let anyone fund your bills.
            </h2>

            <p className="font-outfit text-sm leading-[1.65] text-ink-2 sm:text-base">
              Share your gift link with family, friends, or anyone. They pick
              which bills to help with, choose how many months, and pay
              securely. The bills are auto paid and cards prefunded.
            </p>

            {/* Gift link bar */}
            <div className="flex items-center gap-3">
              <div className="flex flex-1 flex-col gap-1 rounded-xl border border-line bg-surface px-4 py-3">
                <span className="font-outfit text-[10px] uppercase tracking-[0.14em] text-ink-3">
                  Your gift link:
                </span>
                <span className="font-outfit text-sm font-medium text-ink">
                  gift.subsecute.com/amara
                </span>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 16L16 4M16 4H6M16 4V14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* How it works */}
            <div className="mt-2 flex flex-col gap-4">
              {[
                "Share your unique gift link",
                "They choose which bills to fund",
                "They pay securely in one checkout",
                "Bills get paid, cards get funded",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-accent-wash font-outfit text-xs font-semibold text-accent-ink">
                    {i + 1}
                  </span>
                  <span className="font-outfit text-sm text-ink-2">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Left Column: Gift Card Mockup ── */}
          <div className="flex w-full justify-center lg:w-[45%]">
            <div
              className="w-full max-w-[350px] rounded-2xl border border-line bg-surface p-6"
            >
              {/* Avatar — DiceBear */}
              <div className="mb-4 flex justify-center">
                <div className="relative h-16 w-16">
                  <img
                    src="https://api.dicebear.com/9.x/adventurer/svg?seed=Amara&backgroundColor=b6e3f4"
                    alt="Amara's avatar"
                    className="h-16 w-16 rounded-full bg-[#E8F4FE]"
                  />
                  <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#E96D1F]">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5.5L4 7.5L8 3"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Heading */}
              <div className="mb-2 text-center">
                <span className="font-neue-power text-xl font-bold text-[#232323]">
                  Fund{" "}
                </span>
                <span className="font-neue-power text-xl font-bold text-[#E96D1F]">
                  @amara&apos;s
                </span>
                <br />
                <span className="font-neue-power text-xl font-bold text-[#232323]">
                  subscriptions
                </span>
              </div>

              {/* Subtitle */}
              <p className="mb-5 text-center font-outfit text-xs text-[#6C757D]">
                Choose what you&apos;d like to help with, pick how many months,
                and checkout securely.
              </p>

              {/* Step indicators */}
              <div className="mb-5 flex items-center justify-center gap-0">
                {[
                  { num: "1", label: "Pick items" },
                  { num: "2", label: "Choose months" },
                  { num: "3", label: "Pay once" },
                ].map((step, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <div className="mx-2 w-6 border-t border-dashed border-[#DEE2E6]" />
                    )}
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E96D1F] font-outfit text-xs font-semibold text-white">
                        {step.num}
                      </span>
                      <span className="whitespace-nowrap font-outfit text-xs text-[#232323]">
                        {step.label}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Fundable items */}
              <div className="mb-4 flex flex-col gap-3">
                {/* Card 1: Claude */}
                <div className="flex items-center gap-3 rounded-2xl border border-line bg-sunk p-4">
                  <img
                    src={`https://img.logo.dev/claude.ai?token=${LOGO_TOKEN}&size=64&format=png`}
                    alt="Claude"
                    className="h-10 w-10 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-outfit text-sm font-semibold text-[#232323]">
                      Amara&apos;s Claude s...
                    </p>
                    <span className="inline-block rounded-full bg-[rgba(233,109,31,0.1)] px-2 py-0.5 font-outfit text-[10px] text-[#E96D1F]">
                      Subscription
                    </span>
                    <p className="mt-0.5 font-outfit text-sm text-[#6C757D]">
                      ₦5,772.55 / month
                    </p>
                  </div>
                  <button className="shrink-0 rounded-lg bg-[#E96D1F] px-4 py-2 font-outfit text-sm font-medium text-white">
                    Fund
                  </button>
                </div>

                {/* Card 2: MTN */}
                <div className="flex items-center gap-3 rounded-2xl border border-line bg-sunk p-4">
                  <img
                    src={`https://img.logo.dev/mtn.ng?token=${LOGO_TOKEN}&size=64&format=png`}
                    alt="MTN"
                    className="h-10 w-10 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-outfit text-sm font-semibold text-[#232323]">
                      Mtn - AIRTIME
                    </p>
                    <span className="inline-block rounded-full bg-[rgba(16,185,129,0.1)] px-2 py-0.5 font-outfit text-[10px] text-[#10B981]">
                      Bill Payment
                    </span>
                    <p className="mt-0.5 font-outfit text-sm text-[#6C757D]">
                      ₦300 / month
                    </p>
                  </div>
                  <button className="shrink-0 rounded-lg bg-[#E96D1F] px-4 py-2 font-outfit text-sm font-medium text-white">
                    Fund
                  </button>
                </div>
              </div>

              {/* Footer */}
              <p className="text-center font-outfit text-xs text-[#ADB5BD]">
                Powered by{" "}
                <span className="font-semibold text-[#232323]">Subsecute</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
