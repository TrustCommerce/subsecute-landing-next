"use client";

import React, { useEffect, useState, useRef } from "react";
import { IS_WAITLIST } from "../config";
import ExpensesPhone from "./about/ExpensesPhone";
import ParallaxField from "./ParallaxField";

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
      <span className="font-neue-power text-2xl font-bold leading-none tracking-tight text-accent sm:text-[28px]">
        {display}
      </span>
      <span className="font-outfit text-xs leading-[1.4em] tracking-wide text-on-carbon-3">
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
      "We charge your saved card or direct debit ahead of the date, so the money is on the card before the merchant asks.",
  },
] as const;

export default function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-carbon py-20 lg:py-28"
    >
      {/* The recurrence pattern: quiet marks, and every fourth one comes
          round again in accent. Two planes that shift by different amounts
          under the pointer, so the field has depth. */}
      <ParallaxField variant="recur" />

      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-14 px-4 lg:flex-row lg:items-center lg:gap-16 lg:px-6">
        {/* Left column — message + stats */}
        <div className="flex flex-col gap-8 lg:max-w-[580px] lg:flex-1">
          <div className="flex flex-col gap-5">
            <span className="font-outfit text-sm font-medium leading-none tracking-[0.18em] uppercase text-accent-on-carbon">
              WHAT IS SUBSECUTE?
            </span>
            <h2
              id="about-heading"
              className="font-neue-power text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-on-carbon sm:text-4xl lg:text-[48px]"
            >
              One card per subscription. One app for every bill in Nigeria.{" "}
              <span className="text-accent">One dashboard for all of it.</span>
            </h2>
            <p className="border-l-2 border-accent pl-4 font-outfit text-lg leading-[1.5em] text-on-carbon/75 sm:text-xl">
              The best subscription is one you never think about.
            </p>
            <p className="max-w-[520px] font-outfit text-sm leading-[1.7em] text-on-carbon-2 sm:text-base">
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
                className="flex items-center gap-3 rounded-xl border border-carbon-line bg-carbon-2 p-3 transition-colors hover:border-accent-on-carbon"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-carbon-line bg-carbon">
                  <img
                    src={feature.icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-7 w-7"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-outfit text-sm font-medium leading-[1.4em] tracking-wide text-on-carbon sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="font-outfit text-xs leading-[1.45em] tracking-wide text-on-carbon-3 sm:text-[13px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-carbon-line pt-8 sm:grid-cols-4"
          >
            {ANIMATED_STATS.map((stat) => (
              <AnimatedStat key={stat.label} stat={stat} active={statsInView} />
            ))}
          </div>

          {/* Testimonial — live mode only */}
          {!IS_WAITLIST && (
            <div className="flex flex-col gap-3 rounded-2xl border border-carbon-line bg-carbon-2 p-5">
              <blockquote className="font-outfit text-sm leading-[1.6em] tracking-wide text-on-carbon/90">
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
                <cite className="font-outfit text-xs not-italic leading-none tracking-wide text-on-carbon-3">
                  Adaeze K.
                </cite>
              </div>
            </div>
          )}
        </div>

        {/* Right column — the Expenses screen, live rather than a PNG so
            the ring draws and the rows land. */}
        <div className="relative flex justify-center lg:flex-1">
          <ExpensesPhone />
        </div>
      </div>
    </section>
  );
}
