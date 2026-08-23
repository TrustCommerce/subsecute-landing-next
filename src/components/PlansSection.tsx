"use client";

import { useState, useEffect } from "react";

const MEMBERS = [
  {
    name: "Chinazor Otu",
    initial: "C",
    bg: "bg-[#A63CD3]",
    activeBg: "bg-[#A63CD3]/10",
  },
  {
    name: "Chisom Eze",
    initial: "C",
    bg: "bg-[#E79438]",
    activeBg: "bg-[#E79438]/10",
  },
  {
    name: "Kenechukwu Varis",
    initial: "K",
    bg: "bg-[#277E3E]",
    activeBg: "bg-[#277E3E]/10",
  },
] as const;

function PlansUI() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % MEMBERS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full flex-col">
      {MEMBERS.map((member, i) => {
        const isActive = i === active;
        return (
          <div
            key={member.name}
            className={`flex w-full items-center justify-between border-b border-[#CED4DA] px-2 py-3 last:border-b-0 ${
              isActive ? "rounded-lg bg-[#F8F9FA]" : ""
            }`}
            style={{
              transition: "background-color 0.25s ease, transform 0.25s ease",
              transform: isActive ? "scale(1.02)" : "scale(1)",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${member.bg}`}
                style={{
                  transition: "box-shadow 0.25s ease",
                  boxShadow: isActive
                    ? `0 0 0 3px ${member.bg === "bg-[#A63CD3]" ? "rgba(166,60,211,0.25)" : member.bg === "bg-[#E79438]" ? "rgba(231,148,56,0.25)" : "rgba(39,126,62,0.25)"}`
                    : "none",
                }}
              >
                <span className="font-dm-sans text-xs font-semibold text-white">
                  {member.initial}
                </span>
              </div>
              <span
                className="font-dm-sans text-xs font-medium"
                style={{
                  transition: "color 0.25s ease",
                  color: isActive ? "#232323" : "#6C757D",
                }}
              >
                {member.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Toggle switch */}
              <div
                className="flex h-5 w-9 items-center rounded-full px-0.5"
                style={{
                  transition: "background-color 0.25s ease",
                  backgroundColor: isActive ? "#E96D1F" : "#DEE2E6",
                }}
              >
                <div
                  className="h-4 w-4 rounded-full bg-white shadow-sm"
                  style={{
                    transition:
                      "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                    transform: isActive ? "translateX(14px)" : "translateX(0)",
                  }}
                />
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{
                  transition: "transform 0.25s ease, opacity 0.25s ease",
                  transform: isActive ? "translateX(2px)" : "translateX(0)",
                  opacity: isActive ? 1 : 0.4,
                }}
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="#6C757D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const BENEFITS = [
  "Add anyone including family, friends, or your team",
  "Set their bills and schedules from your account",
  "Track every bill spend across members",
];

function CheckIcon() {
  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(233,109,31,0.1)]">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 6L5 8.5L9.5 4"
          stroke="#E96D1F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function PlansSection() {
  return (
    <section
      id="plans"
      aria-labelledby="plans-heading"
      className="border-y border-line bg-surface py-20 lg:py-28"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-4 lg:flex-row lg:items-center lg:gap-12 lg:px-0">
        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          <span className="font-outfit text-[11px] font-medium uppercase tracking-[0.18em] text-accent-ink">
            FOR FAMILY &amp; TEAMS
          </span>

          <h2
            id="plans-heading"
            className="font-neue-power text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink lg:text-[52px]"
          >
            Pay bills for the people you care about.
          </h2>

          <p className="font-outfit text-sm leading-[1.65] text-ink-2 sm:text-base">
            Add family members or teammates to a plan. Set up their airtime,
            data, DSTV, and power. Everything renews automatically. You see
            every payment, they just enjoy the service.
          </p>

          <ul className="flex flex-col gap-4">
            {BENEFITS.map((text) => (
              <li key={text} className="flex flex-row items-center gap-3">
                <CheckIcon />
                <span className="font-outfit text-sm text-ink-2">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2">
          <div className="rounded-2xl border border-line bg-sunk p-6">
            <PlansUI />

            <div
              className="mt-4 self-start rounded-full border border-line bg-accent-wash px-3 py-1.5"
              style={{ width: "fit-content" }}
            >
              <span className="font-outfit text-xs text-accent-ink">
                All charges flow to the plan owner ✓
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
