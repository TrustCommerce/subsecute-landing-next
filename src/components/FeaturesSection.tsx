"use client";

const LOGO_TOKEN = "pk_dorVGutZSi-4iMholcR1qA";

function logoUrl(domain: string) {
  return `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&size=64&format=png`;
}

import React, { useEffect, useState } from "react";

// --- Tunable constants ---
const HOLD_MS = 800; // how long each state holds
const TRANSITION_MS = 220; // how long the transition takes

// Vertical stack: queued below → main center → queued above (after serving)
// Cards move UP through the stack
const CARD_H = 48;
const GAP = 8;
const POSES = [
  { y: -(CARD_H + GAP), scale: 0.9, z: 5, opacity: 0 }, // above (exiting, faded out)
  { y: 0, scale: 1, z: 30, opacity: 1 }, // center (main, prominent)
  { y: CARD_H + GAP, scale: 0.94, z: 15, opacity: 0.5 }, // below (next up)
  { y: (CARD_H + GAP) * 2, scale: 0.88, z: 5, opacity: 0 }, // far below (queued, hidden)
] as const;

const SUBS = [
  {
    logo: logoUrl("figma.com"),
    name: "Figma",
    daysLeft: "5 days left",
    price: "$10",
    status: "Active" as const,
    statusBg: "bg-[rgba(88,220,0,0.2)]",
    statusColor: "text-[#49B500]",
    dotColor: "bg-[#58DC00]",
  },
  {
    logo: logoUrl("openai.com"),
    name: "Chat GPT Plus",
    daysLeft: "17 days left",
    price: "$10",
    status: "Active" as const,
    statusBg: "bg-[rgba(88,220,0,0.2)]",
    statusColor: "text-[#49B500]",
    dotColor: "bg-[#58DC00]",
  },
  {
    logo: logoUrl("netflix.com"),
    name: "Netflix",
    daysLeft: "17 days left",
    price: "$10",
    status: "Paused" as const,
    statusBg: "bg-[rgba(239,35,60,0.17)]",
    statusColor: "text-[#EF233C]",
    dotColor: "bg-[#EF233C]",
  },
  {
    logo: logoUrl("claude.ai"),
    name: "Claude Pro",
    daysLeft: "9 days left",
    price: "$20",
    status: "Active" as const,
    statusBg: "bg-[rgba(88,220,0,0.2)]",
    statusColor: "text-[#49B500]",
    dotColor: "bg-[#58DC00]",
  },
  {
    logo: logoUrl("dstv.com"),
    name: "DSTV Premium",
    daysLeft: "5 days left",
    price: "\u20A644,500",
    status: "Active" as const,
    statusBg: "bg-[rgba(88,220,0,0.2)]",
    statusColor: "text-[#49B500]",
    dotColor: "bg-[#58DC00]",
  },
  {
    logo: logoUrl("mtn.ng"),
    name: "MTN Data 10GB",
    daysLeft: "17 days left",
    price: "\u20A64,500",
    status: "Active" as const,
    statusBg: "bg-[rgba(88,220,0,0.2)]",
    statusColor: "text-[#49B500]",
    dotColor: "bg-[#58DC00]",
  },
  {
    logo: logoUrl("gotvafrica.com"),
    name: "GOtv Max",
    daysLeft: "17 days left",
    price: "\u20A64,850",
    status: "Paused" as const,
    statusBg: "bg-[rgba(239,35,60,0.17)]",
    statusColor: "text-[#EF233C]",
    dotColor: "bg-[#EF233C]",
  },
  {
    logo: logoUrl("ekedc.com"),
    name: "EKEDC Power",
    daysLeft: "9 days left",
    price: "\u20A620,000",
    status: "Active" as const,
    statusBg: "bg-[rgba(88,220,0,0.2)]",
    statusColor: "text-[#49B500]",
    dotColor: "bg-[#58DC00]",
  },
  {
    logo: logoUrl("twitch.tv"),
    name: "Twitch Turbo",
    daysLeft: "12 days left",
    price: "$11",
    status: "Active" as const,
    statusBg: "bg-[rgba(88,220,0,0.2)]",
    statusColor: "text-[#49B500]",
    dotColor: "bg-[#58DC00]",
  },
  {
    logo: logoUrl("kick.com"),
    name: "Kick",
    daysLeft: "8 days left",
    price: "$5",
    status: "Active" as const,
    statusBg: "bg-[rgba(88,220,0,0.2)]",
    statusColor: "text-[#49B500]",
    dotColor: "bg-[#58DC00]",
  },
] as const;

const NUM_SUBS = SUBS.length;

interface SubItem {
  logo: string;
  name: string;
  daysLeft: string;
  price: string;
  status: "Active" | "Paused";
  statusBg: string;
  statusColor: string;
  dotColor: string;
}

function SubCard({
  sub,
  pose,
}: {
  sub: SubItem;
  pose: (typeof POSES)[number];
}) {
  return (
    <div
      className="absolute inset-x-0 flex items-center justify-between rounded-xl border border-line bg-surface px-3 py-2"
      style={{
        top: "50%",
        transform: `translateY(calc(-50% + ${pose.y}px)) scale(${pose.scale})`,
        zIndex: pose.z,
        opacity: pose.opacity,
        transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${TRANSITION_MS}ms ease`,
      }}
    >
      <div className="flex items-center gap-2">
        <img
          src={sub.logo}
          alt={sub.name}
          className="h-8 w-8 shrink-0 rounded-md object-cover"
        />
        <div className="flex flex-col">
          <span className="font-dm-sans text-sm font-semibold text-[#232323]">
            {sub.name}
          </span>
          <span className="font-dm-sans text-[10px] text-[#6C757D]">
            {sub.daysLeft}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-dm-sans text-sm font-semibold text-[#232323]">
          {sub.price}
        </span>
        <div
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 ${sub.statusBg}`}
        >
          <div className={`h-1.5 w-1.5 rounded-full ${sub.dotColor}`} />
          <span
            className={`font-outfit text-[10px] tracking-wider ${sub.statusColor}`}
          >
            {sub.status}
          </span>
        </div>
      </div>
    </div>
  );
}

function SubscriptionListUI() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % NUM_SUBS);
    }, HOLD_MS + TRANSITION_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[180px] overflow-hidden rounded-xl border border-line bg-sunk p-3">
      {SUBS.map((sub, i) => {
        const offset = (i - step + NUM_SUBS) % NUM_SUBS;
        const poseIndex =
          offset === 0 ? 1 : offset === 1 ? 2 : offset === NUM_SUBS - 1 ? 0 : 3;
        return <SubCard key={sub.name} sub={sub} pose={POSES[poseIndex]} />;
      })}
    </div>
  );
}

const RINGS = [
  { stroke: "#5C83E5", length: 200, offset: 0, delay: 0 },
  { stroke: "#FF6F4F", length: 130, offset: -200, delay: 0.3 },
  { stroke: "#219653", length: 72, offset: -330, delay: 0.6 },
] as const;

const CIRCUMFERENCE = 402;

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return value;
}

function StatsUI() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const count = useCountUp(64, 1400, inView);

  return (
    <div
      ref={ref}
      className="flex items-center justify-center rounded-2xl border border-line bg-surface p-6"
    >
      <div className="relative h-[140px] w-[140px]">
        <svg viewBox="0 0 147 147" className="h-full w-full -rotate-90">
          {RINGS.map((ring) => (
            <circle
              key={ring.stroke}
              cx="73.5"
              cy="73.5"
              r="64"
              fill="none"
              stroke={ring.stroke}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${inView ? ring.length : 0} ${CIRCUMFERENCE}`}
              strokeDashoffset={ring.offset}
              style={{
                transition: `stroke-dasharray 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${ring.delay}s`,
              }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-dm-sans text-xl font-semibold text-[#232323]">
            ${count}/m
          </span>
          <span className="font-dm-sans text-[8px] font-medium text-[#979797]">
            3 Subscriptions
          </span>
        </div>
      </div>
    </div>
  );
}

function RemindersUI() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-col gap-2 rounded-xl border border-line bg-surface px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img
              src={logoUrl("netflix.com")}
              alt="Netflix"
              className="h-8 w-8 shrink-0 rounded-md object-cover"
            />
            <div className="flex flex-col">
              <span className="font-dm-sans text-sm font-semibold text-[#232323]">
                Netflix
              </span>
              <span className="font-dm-sans text-[10px] text-[#6C757D]">
                $18.00 Insufficient funds on sub
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-[rgba(233,109,31,0.1)] px-1.5 py-0.5">
            <div className="h-1.5 w-1.5 rounded-full bg-[#E96D1F]" />
            <span className="font-outfit text-[8px] tracking-wider text-[#E96D1F]">
              Due tomorrow
            </span>
          </div>
        </div>
        <div className="rounded-full bg-[#FEF6F2] px-3 py-2 text-center">
          <span className="font-dm-sans text-[10px] font-medium text-[#EF233C]">
            Sub auto-funds on renewal day
          </span>
        </div>
      </div>

      <div className="mx-auto -mt-1 flex w-[90%] items-center justify-between rounded-[11px] border border-line bg-surface px-3 py-2">
        <div className="flex items-center gap-2">
          <img
            src={logoUrl("spotify.com")}
            alt="Spotify"
            className="h-7 w-7 shrink-0 rounded-md object-cover"
          />
          <div className="flex flex-col">
            <span className="font-dm-sans text-xs font-semibold text-[#232323]">
              Spotify
            </span>
            <span className="font-dm-sans text-[9px] text-[#6C757D]">
              $18.00 Sufficient funds on sub.
            </span>
          </div>
        </div>
        <div className="rounded-full bg-[rgba(233,109,31,0.1)] px-1.5 py-0.5">
          <span className="font-outfit text-[7px] tracking-wider text-[#E96D1F]">
            in 4 days
          </span>
        </div>
      </div>
    </div>
  );
}

interface FeatureTagProps {
  number: string;
  tag: string;
  light?: boolean;
}

function FeatureTag({ number, tag, light }: FeatureTagProps) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`font-outfit text-[11px] uppercase tracking-[0.14em] ${
          light ? "text-[#F3F5F6]" : "text-ink-3"
        }`}
      >
        {number}
      </span>
      <div className="h-px w-7 bg-accent" />
      <span
        className={`font-outfit text-[11px] uppercase tracking-[0.14em] ${
          light ? "text-[#ADB5BD]" : "text-ink-3"
        }`}
      >
        {tag}
      </span>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="bg-paper py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-0">
        {/* Header */}
        <div className="mb-10 text-center lg:mb-14">
          <span className="font-outfit text-[11px] font-medium uppercase tracking-[0.18em] text-accent-ink">
            WHAT YOU GET
          </span>
          <h2
            id="features-heading"
            className="mx-auto mt-4 max-w-[20ch] font-neue-power text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl lg:text-[52px]"
          >
            Virtual USD cards auto prefunded and automatic bill pay, in one app.
          </h2>
        </div>

        {/* Top row — 3 cards */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Manage */}
          <article className="flex flex-col gap-6 overflow-hidden rounded-2xl border border-line bg-surface p-6 md:col-span-2 lg:col-span-1">
            <SubscriptionListUI />
            <div className="flex flex-col gap-4">
              <FeatureTag number="01" tag="MANAGE" />
              <div className="flex flex-col gap-1">
                <h3 className="font-outfit text-lg font-semibold leading-[1.25] tracking-tight text-ink lg:text-xl">
                  Every payment in one dashboard.
                </h3>
                <p className="font-outfit text-sm leading-[1.55] text-ink-2">
                  Netflix, Spotify, DSTV, airtime, power, see what&apos;s
                  active, what&apos;s due, and what you&apos;ve spent.
                </p>
              </div>
            </div>
          </article>

          {/* Card 2: Stats */}
          <article className="flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-line bg-accent-wash p-6">
            <StatsUI />
            <div className="flex flex-col gap-4">
              <FeatureTag number="02" tag="STATS" />
              <div className="flex flex-col gap-1">
                <h3 className="font-outfit text-lg font-semibold leading-[1.25] tracking-tight text-ink lg:text-xl">
                  Full visibility into what you spend
                </h3>
                <p className="font-outfit text-sm leading-[1.55] text-ink-2">
                  Per-sub breakdowns, trends, and history so nothing ever
                  catches you off guard.
                </p>
              </div>
            </div>
          </article>

          {/* Card 3: Reminders */}
          <article className="flex flex-col gap-6 overflow-hidden rounded-2xl border border-line bg-surface p-6">
            <RemindersUI />
            <div className="flex flex-col gap-4">
              <FeatureTag number="03" tag="REMINDERS" />
              <div className="flex flex-col gap-1">
                <h3 className="font-outfit text-lg font-semibold leading-[1.25] tracking-tight text-ink lg:text-xl">
                  Custom reminders.
                </h3>
                <p className="font-outfit text-sm leading-[1.55] text-ink-2">
                  Choose how far in advance you get notified; 1 day, 3 days, or
                  7. Per subscription.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
