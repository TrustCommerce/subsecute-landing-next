"use client";

import React, { useEffect, useState, useRef } from "react";
import { IS_WAITLIST } from "../config";

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function useCountUp(
  target: number,
  duration: number,
  active: boolean,
  delay: number,
) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const timeout = setTimeout(() => {
      const start = performance.now();
      function tick(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [active, target, duration, delay]);
  return value;
}

// Each stat has its own animation config
const ANIMATED_STATS = [
  {
    targets: [5],
    format: (vals: number[]) => `${vals[0]} min`,
    label: "From download to your first automated payment",
    delay: 0,
  },
  {
    targets: [15, 30],
    format: (vals: number[]) => `$${vals[0]}-${vals[1]}`,
    label: "Average monthly subscription spend per Nigerian user",
    delay: 200,
  },
  {
    targets: [50],
    format: (vals: number[]) => `${vals[0]}+`,
    label: "Supported subscription and bill providers",
    delay: 400,
  },
  {
    targets: [1],
    format: (vals: number[]) => `${vals[0]} tap`,
    label: "To cancel any subscription or bill",
    delay: 600,
  },
] as const;

function AnimatedStat({
  stat,
  active,
}: {
  stat: (typeof ANIMATED_STATS)[number];
  active: boolean;
}) {
  const val0 = useCountUp(stat.targets[0] ?? 0, 1200, active, stat.delay);
  const val1 = useCountUp(stat.targets[1] ?? 0, 1200, active, stat.delay + 100);
  const values = stat.targets.length >= 2 ? [val0, val1] : [val0];

  return (
    <div className="flex flex-col">
      <span className="font-neue-power text-3xl font-bold leading-[1.2em] tracking-tight text-[#E96D1F] sm:text-4xl lg:text-[48px]">
        {stat.format(values)}
      </span>
      <span className="font-outfit text-xs leading-[1.5em] tracking-wide text-[#6C757D]">
        {stat.label}
      </span>
    </div>
  );
}

const FEATURES = [
  {
    icon: "/images/landing/about-icon-1.svg",
    title: "One card per subscription",
    description:
      "Each subscription gets its own virtual USD card. Cancel one without touching the rest.",
  },
  {
    icon: "/images/landing/about-icon-2.svg",
    title: "Auto-pay your bills",
    description:
      "Airtime, data, power, cable — set it once, it renews every month.",
  },
  {
    icon: "/images/landing/about-icon-3.svg",
    title: "Auto-funded before renewal",
    description:
      "Your wallet funds each card automatically before the charge hits. No failed payments.",
  },
] as const;

export default function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[#141414] py-20 lg:py-24"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-14 px-4 lg:flex-row lg:gap-12 lg:px-0">
        {/* Left column */}
        <div className="flex flex-col gap-10 lg:max-w-[612px] lg:gap-12">
          {/* Text */}
          <div className="flex flex-col gap-4">
            <span className="font-outfit text-sm font-medium leading-[1.2em] tracking-wide text-[#E96D1F]">
              WHAT IS SUBSECUTE?
            </span>
            <h2
              id="about-heading"
              className="font-outfit text-3xl leading-[1.2em] text-white sm:text-4xl lg:text-[48px]"
            >
              One virtual card per subscription. One app for every bill in
              Nigeria.
            </h2>
            <p className="font-outfit text-lg italic leading-[1.5em] tracking-wide text-white/80 sm:text-xl">
              The best subscription is one you never think about.
            </p>
            <p className="font-outfit text-sm leading-[1.5em] tracking-wide text-[#CED4DA] sm:text-base">
              Your bank card gets declined on Netflix. Your DSTV expires because
              you forgot to renew. Your data runs out at midnight. Subsecute
              fixes all of it — a dedicated USD card for each subscription that
              auto-funds before renewal, and scheduled payments for airtime,
              data, power, and cable that just run. Living abroad? Manage your
              family&apos;s bills from anywhere.
            </p>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 rounded-xl border border-[rgba(233,109,31,0.1)] bg-[#202020] p-3"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(233,109,31,0.1)]">
                  <img
                    src={feature.icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-8 w-8"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-outfit text-sm font-medium leading-[1.5em] tracking-wide text-white sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="font-outfit text-xs leading-[1.5em] tracking-wide text-[#6C757D] sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — Stats + Testimonial */}
        <div
          ref={statsRef}
          className="flex flex-1 flex-col gap-6 rounded-3xl bg-[#1D1D1D] p-6 sm:p-8 lg:gap-8 lg:p-10"
        >
          {/* Stats grid */}
          <div className="border-b border-[#2F2F2F] pb-8">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
              {ANIMATED_STATS.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  stat={stat}
                  active={statsInView}
                />
              ))}
            </div>
          </div>

          {/* Testimonial — only in live mode */}
          {!IS_WAITLIST && (
            <div className="flex flex-col gap-3">
              <blockquote className="font-outfit text-sm leading-[1.5em] tracking-wide text-white">
                &ldquo;I haven&apos;t thought about my subscriptions since I
                switched to Subsecute. It just works, every single month.&rdquo;
              </blockquote>
              <div className="flex items-center gap-2 py-1">
                <img
                  src="/images/landing/testimonial-avatar.png"
                  alt=""
                  loading="lazy"
                  className="h-6 w-6 rounded-full object-cover"
                />
                <cite className="font-outfit text-xs not-italic leading-[1.5em] tracking-wide text-[#6C757D]">
                  Adaeze K.
                </cite>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
