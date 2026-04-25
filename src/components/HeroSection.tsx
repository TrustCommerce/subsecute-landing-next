"use client";

import { useState, useEffect } from "react";
import { IS_WAITLIST } from "../config";
import Navbar from "./Navbar";
import WaitlistForm from "./WaitlistForm";

const LOGO_TOKEN = "pk_dorVGutZSi-4iMholcR1qA";

const BADGES = [
  {
    icon: `https://img.logo.dev/netflix.com?token=${LOGO_TOKEN}&size=64&format=png`,
    label: "Netflix",
    text: "Renewal due in 3 days",
    amount: "$15.49",
    side: "left" as const,
    top: "12%",
  },
  {
    icon: `https://img.logo.dev/spotify.com?token=${LOGO_TOKEN}&size=64&format=png`,
    label: "Spotify",
    text: "Successfully renewed",
    amount: "$10.99",
    side: "left" as const,
    top: "38%",
  },
  {
    icon: `https://img.logo.dev/dstv.com?token=${LOGO_TOKEN}&size=64&format=png`,
    label: "DSTV Compact",
    text: "Auto-paid",
    amount: "₦19,000",
    side: "right" as const,
    top: "15%",
  },
  {
    icon: `https://img.logo.dev/mtn.ng?token=${LOGO_TOKEN}&size=64&format=png`,
    label: "MTN Airtime",
    text: "Top-up sent",
    amount: "₦5,000",
    side: "right" as const,
    top: "42%",
  },
  {
    icon: `https://img.logo.dev/claude.ai?token=${LOGO_TOKEN}&size=64&format=png`,
    label: "Claude Pro",
    text: "Card funded",
    amount: "$20.00",
    side: "left" as const,
    top: "52%",
  },
  {
    icon: `https://img.logo.dev/ekedc.com?token=${LOGO_TOKEN}&size=64&format=png`,
    label: "EKEDC Power",
    text: "Token purchased",
    amount: "₦20,000",
    side: "right" as const,
    top: "68%",
  },
] as const;

function FloatingBadges() {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([0, 2]);

  useEffect(() => {
    let step = 0;
    const patterns = [
      [0, 2],
      [1, 3],
      [0, 4],
      [2, 5],
      [1, 4],
      [3, 5],
    ];

    const interval = setInterval(() => {
      step = (step + 1) % patterns.length;
      setVisibleIndices(patterns[step]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {BADGES.map((badge, i) => {
        const isVisible = visibleIndices.includes(i);
        const isLeft = badge.side === "left";

        return (
          <div
            key={i}
            className={`absolute z-0 flex items-center gap-1.5 rounded-xl bg-white px-2 py-1.5 shadow-[0px_4px_20px_rgba(0,0,0,0.06)] sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-2.5 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
            style={{
              top: badge.top,
              ...(isLeft
                ? {
                    left: 0,
                    transform: `translateX(-70%) rotate(4deg) scale(${isVisible ? 1 : 0.85})`,
                  }
                : {
                    right: 0,
                    transform: `translateX(70%) rotate(-4deg) scale(${isVisible ? 1 : 0.85})`,
                  }),
              opacity: isVisible ? 1 : 0,
              transition:
                "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          >
            <img
              src={badge.icon}
              alt=""
              className="h-5 w-5 shrink-0 rounded object-cover sm:h-8 sm:w-8 sm:rounded-lg"
            />
            <div className={`flex flex-col ${isLeft ? "" : "items-end"}`}>
              <span className="font-outfit text-[7px] font-semibold text-[#232323] sm:text-xs">
                {badge.label}
              </span>
              <span className="font-outfit text-[6px] text-[#6C757D] sm:text-[10px]">
                {badge.text}
              </span>
            </div>
            <span
              className={`whitespace-nowrap font-dm-sans text-[7px] font-semibold text-[#E96D1F] sm:text-xs ${isLeft ? "ml-auto" : "mr-auto"}`}
            >
              {badge.amount}
            </span>
          </div>
        );
      })}
    </>
  );
}

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative h-[780px] overflow-hidden bg-[#FFFEEC] sm:h-[854px] md:h-[898px] lg:h-[1021px]"
    >
      {/* Orange blur */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#E96D1F] opacity-30 lg:h-[516px] lg:w-[825px]"
        style={{ filter: "blur(252px)" }}
        aria-hidden="true"
      />

      {/* Navbar */}
      <div className="px-4 pt-5 lg:px-[100px]">
        <Navbar />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex flex-col items-center px-4 pt-8 lg:pt-16">
        {/* Provider pill */}
        <div className="mb-5 flex items-center gap-2 rounded-full border border-[#DEE2E6] bg-white/50 px-3 py-1.5 backdrop-blur-[124px] lg:mb-6">
          <div className="flex items-center -space-x-1.5">
            <img
              src="/images/landing/provider-1.png"
              alt=""
              className="h-5 w-5 rounded-full object-cover ring-2 ring-white"
            />
            <img
              src="/images/landing/provider-2.png"
              alt=""
              className="h-5 w-5 rounded-full object-cover ring-2 ring-white"
            />
            <img
              src="/images/landing/provider-3.png"
              alt=""
              className="h-5 w-5 rounded-full object-cover ring-2 ring-white"
            />
          </div>
          <span className="font-outfit text-xs tracking-wide text-[#6C757D] sm:text-sm">
            50+ Subscription and bill providers
          </span>
        </div>

        {/* Hidden SEO H1 — keyword-rich for crawlers */}
        <h1 className="sr-only">
          Subsecute — The Recurring Money App for Nigerians
        </h1>
        <p className="sr-only">
          Subsecute is a recurring payment automation app for Nigerians. Pay for
          Netflix, Spotify, ChatGPT, and 50+ international subscriptions with
          dedicated virtual USD cards funded from your Naira wallet. Auto-pay
          your airtime, data bundles, DSTV, GOtv, and power bills every month.
          Cancel any subscription in one tap. Share plans with family and
          friends. The easiest way to manage recurring payments in Nigeria.
        </p>

        {/* Visible creative heading */}
        <div
          aria-hidden="true"
          id="hero-heading"
          className="max-w-[822px] text-center font-neue-power leading-[1.15] tracking-normal text-[#232323]"
        >
          <span className="text-4xl font-bold sm:text-[40px] md:text-[49px] lg:text-[71px]">
            The recurring money app for{" "}
          </span>
          <span className="relative inline-block text-4xl font-bold text-[#E96D1F] sm:text-[40px] md:text-[49px] lg:text-[71px]">
            Nigerians.
            <svg
              className="absolute -bottom-1 left-0 w-full sm:-bottom-2"
              viewBox="0 0 400 16"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 10C20 5,40 14,60 9C80 4,100 14,120 9C140 4,160 14,180 9C200 4,220 14,240 9C260 4,280 14,300 9C320 4,340 14,360 9C380 4,395 10,398 9"
                stroke="#E96D1F"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </div>

        {/* Subtitle — value prop flows into loss aversion as one thought */}
        <p className="mt-4 max-w-[540px] text-center font-outfit text-sm leading-[1.6em] tracking-wide text-[#6C757D] sm:text-base lg:mt-5 lg:text-lg">
          Every bill on autopilot — yours, theirs, everyone&apos;s.
        </p>

        {/* CTA — switches based on launch mode */}
        <div className="mt-6">
          {IS_WAITLIST ? (
            <WaitlistForm variant="light" />
          ) : (
            <a
              href="#download"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#232323] px-7 font-outfit text-base font-medium tracking-wide text-white transition-opacity hover:opacity-90 lg:h-[52px] lg:px-8"
            >
              Get Started
            </a>
          )}
        </div>

        {/* Phone mockup with floating notification badges behind */}
        <div className="relative mx-auto mt-6 w-full max-w-[220px] sm:mt-[98px] sm:max-w-[311px] md:max-w-[354px] lg:mt-[151px] lg:max-w-[398px]">
          <FloatingBadges />
          <div className="relative z-10 rounded-[2.5rem] bg-[#1a1a1a] p-2.5 shadow-[0_32px_68px_rgba(17,17,15,0.22)]">
            <img
              src="/images/landing/phone-screen.png"
              alt="Subsecute app showing wallet balance of ₦150,187.87, active subscriptions, and monthly spend"
              className="w-full rounded-[2rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
