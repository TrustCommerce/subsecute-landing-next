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
      { threshold: 0.3 },
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

// Each stat counts up from its target, unless `display` overrides with a word.
const ANIMATED_STATS = [
  {
    target: 5,
    format: (v: number) => `${v} min`,
    label: "To set up your first payment",
    delay: 0,
  },
  {
    target: 50,
    format: (v: number) => `${v}+`,
    label: "Providers supported",
    delay: 150,
  },
  {
    target: 1,
    format: (v: number) => `${v} tap`,
    label: "To cancel anything",
    delay: 300,
  },
  {
    target: 0,
    display: "Anyone",
    format: () => "Anyone",
    label: "You can pay for, not just yourself",
    delay: 450,
  },
] as const;

function AnimatedStat({
  stat,
  active,
}: {
  stat: (typeof ANIMATED_STATS)[number];
  active: boolean;
}) {
  const counted = useCountUp(stat.target, 1200, active, stat.delay);
  const display = "display" in stat ? stat.display : stat.format(counted);

  return (
    <div className="flex flex-col gap-1">
      <span className="font-neue-power text-2xl font-bold leading-none tracking-tight text-[#E96D1F] sm:text-[28px]">
        {display}
      </span>
      <span className="font-outfit text-xs leading-[1.4em] tracking-wide text-[#868E96]">
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
      "Airtime, data, power, cable. Set it once, it renews every month.",
  },
  {
    icon: "/images/landing/about-icon-3.svg",
    title: "Auto-funded before renewal",
    description:
      "Your wallet funds each card before the charge hits. No failed payments.",
  },
] as const;

export default function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-[#141414] py-20 lg:py-28"
    >
      {/* Ambient orange glow for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-[520px] w-[520px] rounded-full bg-[#E96D1F] opacity-[0.13]"
        style={{ filter: "blur(130px)" }}
      />

      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-14 px-4 lg:flex-row lg:items-center lg:gap-16 lg:px-6">
        {/* Left column — message + stats */}
        <div className="flex flex-col gap-8 lg:max-w-[580px] lg:flex-1">
          <div className="flex flex-col gap-5">
            <span className="font-outfit text-sm font-medium leading-none tracking-[0.08em] text-[#E96D1F]">
              WHAT IS SUBSECUTE?
            </span>
            <h2
              id="about-heading"
              className="font-neue-power text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[44px]"
            >
              One card per subscription. One app for every bill in Nigeria.{" "}
              <span className="text-[#E96D1F]">One dashboard for all of it.</span>
            </h2>
            <p className="font-outfit text-lg italic leading-[1.5em] tracking-wide text-white/70 sm:text-xl">
              The best subscription is one you never think about.
            </p>
            <p className="max-w-[520px] font-outfit text-sm leading-[1.7em] tracking-wide text-[#ADB5BD] sm:text-base">
              Everything recurring, in one place. See what&apos;s due, get
              reminded before it charges, and know exactly where your money goes
              each month. Fund Mum&apos;s power, gift a friend some Netflix, or
              cancel anything in one tap.
            </p>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 rounded-xl border border-[rgba(233,109,31,0.12)] bg-[#1C1C1C] p-3 transition-colors hover:border-[rgba(233,109,31,0.3)]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(233,109,31,0.1)]">
                  <img
                    src={feature.icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-7 w-7"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-outfit text-sm font-medium leading-[1.4em] tracking-wide text-white sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="font-outfit text-xs leading-[1.45em] tracking-wide text-[#6C757D] sm:text-[13px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[#2A2A2A] pt-8 sm:grid-cols-4"
          >
            {ANIMATED_STATS.map((stat) => (
              <AnimatedStat key={stat.label} stat={stat} active={statsInView} />
            ))}
          </div>

          {/* Testimonial — live mode only */}
          {!IS_WAITLIST && (
            <div className="flex flex-col gap-3 rounded-2xl bg-[#1C1C1C] p-5">
              <blockquote className="font-outfit text-sm leading-[1.6em] tracking-wide text-white/90">
                &ldquo;I haven&apos;t thought about my subscriptions since I
                switched to Subsecute. It just works, every single month.&rdquo;
              </blockquote>
              <div className="flex items-center gap-2">
                <img
                  src="/images/landing/testimonial-avatar.png"
                  alt=""
                  loading="lazy"
                  className="h-6 w-6 rounded-full object-cover"
                />
                <cite className="font-outfit text-xs not-italic leading-none tracking-wide text-[#6C757D]">
                  Adaeze K.
                </cite>
              </div>
            </div>
          )}
        </div>

        {/* Right column — product shot (Expenses view) */}
        <div className="relative flex justify-center lg:flex-1">
          {/* Glow behind the device */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E96D1F] opacity-20"
            style={{ filter: "blur(90px)" }}
          />
          <div className="relative w-full max-w-[300px] sm:max-w-[320px]">
            <div className="relative rounded-[2.5rem] bg-[#0F0F0F] p-2.5 shadow-[0_32px_70px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
              <img
                src="/images/landing/about-product.png?v=2"
                alt="Subsecute Expenses screen showing a yearly spend of ₦115,239 across 38 items, broken down by app and category"
                loading="lazy"
                className="w-full rounded-[2rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
