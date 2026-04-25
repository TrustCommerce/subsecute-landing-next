"use client";

import React from "react";

const LOGO_TOKEN = "pk_dorVGutZSi-4iMholcR1qA";

export default function GiftingSection() {
  return (
    <section
      id="gifting"
      aria-labelledby="gifting-heading"
      className="bg-[#FFF8F0] py-20 lg:py-24"
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
      `}</style>

      <div className="mx-auto max-w-[1240px] px-4 lg:px-0">
        <div className="flex flex-col items-center gap-12 lg:flex-row-reverse lg:gap-16">
          {/* ── Right Column: Text ── */}
          <div className="flex w-full flex-col gap-6 lg:w-[55%]">
            <span className="font-outfit text-sm font-medium tracking-wide text-[#E96D1F]">
              GIFTING
            </span>

            <h2
              id="gifting-heading"
              className="font-neue-power text-3xl font-bold leading-[1.2em] tracking-normal text-[#232323] lg:text-[48px]"
            >
              Let anyone fund your bills.
            </h2>

            <p className="font-outfit text-sm leading-[1.6em] tracking-wide text-[#6C757D] sm:text-base">
              Share your gift link with family, friends, or anyone. They pick
              which bills to help with, choose how many months, and pay
              securely. The money goes straight to your Subsecute wallet — no
              bank transfers, no WhatsApp coordination.
            </p>

            {/* Gift link bar */}
            <div className="flex items-center gap-3">
              <div className="flex flex-1 flex-col gap-1 rounded-xl border border-[#DEE2E6] bg-white px-4 py-3">
                <span className="font-outfit text-[10px] tracking-wider text-[#ADB5BD]">
                  Your gift link:
                </span>
                <span className="font-outfit text-sm font-medium tracking-wide text-[#232323]">
                  app.subsecute.com/gift/leslie
                </span>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E96D1F] shadow-[0px_2px_8px_rgba(233,109,31,0.3)]">
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
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(233,109,31,0.15)] font-outfit text-xs font-semibold text-[#E96D1F]">
                    {i + 1}
                  </span>
                  <span className="font-outfit text-sm text-[#495057]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Left Column: Gift Card Mockup ── */}
          <div className="flex w-full justify-center lg:w-[45%]">
            <div
              className="w-full max-w-[350px] rounded-3xl bg-white p-6 shadow-[0px_8px_32px_rgba(0,0,0,0.08)]"
              style={{ animation: "float 3.5s ease-in-out infinite" }}
            >
              {/* Avatar — DiceBear */}
              <div className="mb-4 flex justify-center">
                <div className="relative h-16 w-16">
                  <img
                    src="https://api.dicebear.com/9.x/adventurer/svg?seed=Leslie&backgroundColor=b6e3f4"
                    alt="Leslie's avatar"
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
                  @leslie&apos;s
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
                <div className="flex items-center gap-3 rounded-2xl bg-[#F8F9FA] p-4 shadow-[0px_1px_4px_rgba(0,0,0,0.04)]">
                  <img
                    src={`https://img.logo.dev/claude.ai?token=${LOGO_TOKEN}&size=64&format=png`}
                    alt="Claude"
                    className="h-10 w-10 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-outfit text-sm font-semibold text-[#232323]">
                      Leslie&apos;s Claude s...
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
                <div className="flex items-center gap-3 rounded-2xl bg-[#F8F9FA] p-4 shadow-[0px_1px_4px_rgba(0,0,0,0.04)]">
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
