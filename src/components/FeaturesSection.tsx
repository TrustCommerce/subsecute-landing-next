'use client'

const LOGO_TOKEN = 'pk_dorVGutZSi-4iMholcR1qA'

function logoUrl(domain: string) {
  return `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&size=64&format=png`
}

import React, { useEffect, useState } from 'react'

// --- Tunable constants ---
const HOLD_MS = 800 // how long each state holds
const TRANSITION_MS = 220 // how long the transition takes

// Vertical stack: queued below → main center → queued above (after serving)
// Cards move UP through the stack
const CARD_H = 48
const GAP = 8
const POSES = [
  { y: -(CARD_H + GAP), scale: 0.9, z: 5, opacity: 0 }, // above (exiting, faded out)
  { y: 0, scale: 1, z: 30, opacity: 1 }, // center (main, prominent)
  { y: CARD_H + GAP, scale: 0.94, z: 15, opacity: 0.5 }, // below (next up)
  { y: (CARD_H + GAP) * 2, scale: 0.88, z: 5, opacity: 0 } // far below (queued, hidden)
] as const

const ORDERS = [
  [0, 1, 2, 3],
  [1, 2, 3, 0],
  [2, 3, 0, 1],
  [3, 0, 1, 2]
] as const

const SUBS = [
  {
    logo: logoUrl('figma.com'),
    name: 'Figma',
    daysLeft: '5 days left',
    price: '$10',
    status: 'Active' as const,
    statusBg: 'bg-[rgba(88,220,0,0.2)]',
    statusColor: 'text-[#49B500]',
    dotColor: 'bg-[#58DC00]'
  },
  {
    logo: logoUrl('openai.com'),
    name: 'Chat GPT Plus',
    daysLeft: '17 days left',
    price: '$10',
    status: 'Active' as const,
    statusBg: 'bg-[rgba(88,220,0,0.2)]',
    statusColor: 'text-[#49B500]',
    dotColor: 'bg-[#58DC00]'
  },
  {
    logo: logoUrl('netflix.com'),
    name: 'Netflix',
    daysLeft: '17 days left',
    price: '$10',
    status: 'Paused' as const,
    statusBg: 'bg-[rgba(239,35,60,0.17)]',
    statusColor: 'text-[#EF233C]',
    dotColor: 'bg-[#EF233C]'
  },
  {
    logo: logoUrl('claude.ai'),
    name: 'Claude Pro',
    daysLeft: '9 days left',
    price: '$20',
    status: 'Active' as const,
    statusBg: 'bg-[rgba(88,220,0,0.2)]',
    statusColor: 'text-[#49B500]',
    dotColor: 'bg-[#58DC00]'
  }
] as const

function SubCard({ sub, pose }: { sub: (typeof SUBS)[number]; pose: (typeof POSES)[number] }) {
  return (
    <div
      className="absolute inset-x-0 flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-[0px_2px_8px_rgba(0,0,0,0.1)]"
      style={{
        top: '50%',
        transform: `translateY(calc(-50% + ${pose.y}px)) scale(${pose.scale})`,
        zIndex: pose.z,
        opacity: pose.opacity,
        transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${TRANSITION_MS}ms ease`
      }}
    >
      <div className="flex items-center gap-2">
        <img src={sub.logo} alt={sub.name} className="h-8 w-8 shrink-0 rounded-md object-cover" />
        <div className="flex flex-col">
          <span className="font-dm-sans text-sm font-semibold text-[#232323]">{sub.name}</span>
          <span className="font-dm-sans text-[10px] text-[#6C757D]">{sub.daysLeft}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-dm-sans text-sm font-semibold text-[#232323]">{sub.price}</span>
        <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 ${sub.statusBg}`}>
          <div className={`h-1.5 w-1.5 rounded-full ${sub.dotColor}`} />
          <span className={`font-outfit text-[10px] tracking-wider ${sub.statusColor}`}>
            {sub.status}
          </span>
        </div>
      </div>
    </div>
  )
}

function SubscriptionListUI() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 4)
    }, HOLD_MS + TRANSITION_MS)
    return () => clearInterval(interval)
  }, [])

  const order = ORDERS[step]

  return (
    <div className="relative h-[180px] overflow-hidden rounded-xl border border-[#DEE2E6] bg-[#FFFEEC] p-3 shadow-[inset_0px_2px_10px_rgba(0,0,0,0.1)]">
      {SUBS.map((sub, i) => {
        const poseIndex = order.indexOf(i as 0 | 1 | 2 | 3)
        return <SubCard key={sub.name} sub={sub} pose={POSES[poseIndex]} />
      })}
    </div>
  )
}

const RINGS = [
  { stroke: '#5C83E5', length: 200, offset: 0, delay: 0 },
  { stroke: '#FF6F4F', length: 130, offset: -200, delay: 0.3 },
  { stroke: '#219653', length: 72, offset: -330, delay: 0.6 }
] as const

const CIRCUMFERENCE = 402

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.5 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return value
}

function StatsUI() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const count = useCountUp(64, 1400, inView)

  return (
    <div
      ref={ref}
      className="flex items-center justify-center rounded-3xl bg-white p-6 shadow-[0px_1px_6px_rgba(0,0,0,0.12)]"
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
                transition: `stroke-dasharray 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${ring.delay}s`
              }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-dm-sans text-xl font-semibold text-[#232323]">${count}/m</span>
          <span className="font-dm-sans text-[8px] font-medium text-[#979797]">
            3 Subscriptions
          </span>
        </div>
      </div>
    </div>
  )
}

function RemindersUI() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-col gap-2 rounded-xl bg-white px-3 py-2 shadow-[0px_8px_5px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img
              src={logoUrl('netflix.com')}
              alt="Netflix"
              className="h-8 w-8 shrink-0 rounded-md object-cover"
            />
            <div className="flex flex-col">
              <span className="font-dm-sans text-sm font-semibold text-[#232323]">Netflix</span>
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

      <div className="mx-auto -mt-1 flex w-[90%] items-center justify-between rounded-[11px] bg-white px-3 py-2 shadow-[0px_3px_5px_rgba(0,0,0,0.12)]">
        <div className="flex items-center gap-2">
          <img
            src={logoUrl('spotify.com')}
            alt="Spotify"
            className="h-7 w-7 shrink-0 rounded-md object-cover"
          />
          <div className="flex flex-col">
            <span className="font-dm-sans text-xs font-semibold text-[#232323]">Spotify</span>
            <span className="font-dm-sans text-[9px] text-[#6C757D]">
              $18.00 Sufficient funds on sub.
            </span>
          </div>
        </div>
        <div className="rounded-full bg-[rgba(233,109,31,0.1)] px-1.5 py-0.5">
          <span className="font-outfit text-[7px] tracking-wider text-[#E96D1F]">in 4 days</span>
        </div>
      </div>
    </div>
  )
}

const MEMBERS = [
  { name: 'Kola Adeyemi', initial: 'K', bg: 'bg-[#A63CD3]', activeBg: 'bg-[#A63CD3]/10' },
  { name: 'Chisom Eze', initial: 'C', bg: 'bg-[#E79438]', activeBg: 'bg-[#E79438]/10' },
  { name: 'Alex Morgan', initial: 'A', bg: 'bg-[#277E3E]', activeBg: 'bg-[#277E3E]/10' }
] as const

function PlansUI() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % MEMBERS.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col">
      {MEMBERS.map((member, i) => {
        const isActive = i === active
        return (
          <div
            key={member.name}
            className={`flex items-center justify-between border-b border-[#CED4DA] py-3 last:border-b-0 ${
              isActive ? 'rounded-lg bg-[#F8F9FA]' : ''
            }`}
            style={{
              transition: 'background-color 0.25s ease, transform 0.25s ease',
              transform: isActive ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${member.bg}`}
                style={{
                  transition: 'box-shadow 0.25s ease',
                  boxShadow: isActive
                    ? `0 0 0 3px ${member.bg === 'bg-[#A63CD3]' ? 'rgba(166,60,211,0.25)' : member.bg === 'bg-[#E79438]' ? 'rgba(231,148,56,0.25)' : 'rgba(39,126,62,0.25)'}`
                    : 'none'
                }}
              >
                <span className="font-dm-sans text-xs font-semibold text-white">
                  {member.initial}
                </span>
              </div>
              <span
                className="font-dm-sans text-xs font-medium"
                style={{
                  transition: 'color 0.25s ease',
                  color: isActive ? '#232323' : '#6C757D'
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
                  transition: 'background-color 0.25s ease',
                  backgroundColor: isActive ? '#E96D1F' : '#DEE2E6'
                }}
              >
                <div
                  className="h-4 w-4 rounded-full bg-white shadow-sm"
                  style={{
                    transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                    transform: isActive ? 'translateX(14px)' : 'translateX(0)'
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
                  transition: 'transform 0.25s ease, opacity 0.25s ease',
                  transform: isActive ? 'translateX(2px)' : 'translateX(0)',
                  opacity: isActive ? 1 : 0.4
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
        )
      })}
    </div>
  )
}

function FundingUI() {
  return (
    <div className="flex items-end gap-3">
      <div className="flex flex-1 flex-col gap-1 rounded-xl border border-[rgba(233,109,31,0.1)] bg-[#252525] px-3 py-2 shadow-[0px_2px_10px_rgba(155,155,155,0.08)]">
        <span className="font-outfit text-[10px] tracking-wider text-[#ADB5BD]">
          Your gift link:
        </span>
        <span className="font-outfit text-xs font-medium tracking-wide text-white">
          app.subsecute.com/gift/adaeze
        </span>
      </div>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(233,109,31,0.1)]">
        <img src="/images/landing/funding-icon.svg" alt="" aria-hidden="true" className="h-8 w-8" />
      </div>
    </div>
  )
}

interface FeatureTagProps {
  number: string
  tag: string
  light?: boolean
}

function FeatureTag({ number, tag, light }: FeatureTagProps) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`font-outfit text-xs tracking-wide ${
          light ? 'text-[#F3F5F6]' : 'text-[#6C757D]'
        }`}
      >
        {number}
      </span>
      <div className="h-[2px] w-7 bg-[#E96D1F]" />
      <span
        className={`font-outfit text-xs tracking-wide ${
          light ? 'text-[#ADB5BD]' : 'text-[#6C757D]'
        }`}
      >
        {tag}
      </span>
    </div>
  )
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="bg-[#FFFEEC] py-14 lg:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-0">
        {/* Header */}
        <div className="mb-10 text-center lg:mb-14">
          <span className="font-outfit text-sm font-medium tracking-wide text-[#E96D1F]">
            WHAT YOU GET
          </span>
          <h2
            id="features-heading"
            className="mx-auto mt-2 max-w-[641px] font-neue-power text-3xl font-bold leading-[1.2em] tracking-normal text-[#232323] sm:text-4xl lg:text-[48px]"
          >
            Virtual USD cards and automatic bill pay, in one app.
          </h2>
        </div>

        {/* Top row — 3 cards */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Manage */}
          <article className="flex flex-col gap-4 overflow-hidden rounded-3xl border border-[rgba(233,109,31,0.3)] bg-white p-5">
            <SubscriptionListUI />
            <div className="flex flex-col gap-4">
              <FeatureTag number="01" tag="MANAGE" />
              <div className="flex flex-col gap-1">
                <h3 className="font-outfit text-lg font-medium leading-[1.2em] tracking-wide text-black lg:text-xl">
                  Every payment in one dashboard.
                </h3>
                <p className="font-outfit text-sm leading-[1.3em] tracking-wide text-[#6C757D]">
                  Netflix, Spotify, DSTV, airtime, power — see what&apos;s active, what&apos;s due,
                  and what you&apos;ve spent.
                </p>
              </div>
            </div>
          </article>

          {/* Card 2: Stats */}
          <article className="flex flex-col justify-between gap-4 overflow-hidden rounded-3xl border border-[rgba(233,109,31,0.3)] bg-gradient-to-br from-[rgba(233,109,31,0.1)] to-transparent p-5">
            <StatsUI />
            <div className="flex flex-col gap-4">
              <FeatureTag number="02" tag="STATS" />
              <div className="flex flex-col gap-1">
                <h3 className="font-outfit text-lg font-medium leading-[1.2em] tracking-wide text-black lg:text-xl">
                  Full visibility into what you spend
                </h3>
                <p className="font-outfit text-sm leading-[1.3em] tracking-wide text-[#6C757D]">
                  Per-sub breakdowns, trends, and history so nothing ever catches you off guard.
                </p>
              </div>
            </div>
          </article>

          {/* Card 3: Reminders */}
          <article className="flex flex-col gap-4 overflow-hidden rounded-3xl border border-[rgba(233,109,31,0.3)] bg-white p-5 md:col-span-2 lg:col-span-1">
            <RemindersUI />
            <div className="flex flex-col gap-4">
              <FeatureTag number="03" tag="REMINDERS" />
              <div className="flex flex-col gap-1">
                <h3 className="font-outfit text-lg font-medium leading-[1.2em] tracking-wide text-black lg:text-xl">
                  Custom reminders.
                </h3>
                <p className="font-outfit text-sm leading-[1.3em] tracking-wide text-[#6C757D]">
                  Choose how far in advance you get notified; 1 day, 3 days, or 7. Per subscription.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Bottom row — 2 cards */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Card 4: Plans */}
          <article className="flex flex-col gap-4 overflow-hidden rounded-3xl border border-[rgba(233,109,31,0.3)] bg-white p-5 lg:flex-row lg:p-6">
            <div className="flex flex-1 flex-col justify-between gap-4">
              <div className="flex flex-col gap-4">
                <FeatureTag number="04" tag="PLANS" />
                <div className="flex flex-col gap-2">
                  <h3 className="font-outfit text-lg font-medium leading-[1.2em] tracking-wide text-black lg:text-xl">
                    Create a plan for your team, friends, or family
                  </h3>
                  <p className="font-outfit text-sm leading-[1.5em] tracking-wide text-[#6C757D]">
                    Build a subscription plan with one or more packages and invite members. Each
                    person picks what they want and activates it on their end. All charges come back
                    to you, and you stay in full control of who&apos;s in and what they access.
                  </p>
                </div>
              </div>
              <div className="self-start rounded-full bg-[rgba(233,109,31,0.15)] px-2.5 py-1">
                <span className="font-outfit text-xs tracking-wide text-[#E96D1F]">
                  All charges flow to the plan owner ✓
                </span>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center lg:justify-start">
              <PlansUI />
            </div>
          </article>

          {/* Card 5: Funding */}
          <article className="flex flex-col gap-10 overflow-hidden rounded-3xl border border-[rgba(233,109,31,0.3)] bg-[#202020] p-5 lg:gap-14 lg:p-6">
            <div className="flex flex-col gap-4">
              <FeatureTag number="05" tag="GIFTING" light />
              <h3 className="max-w-[324px] font-outfit text-xl font-semibold leading-[1.2em] tracking-wide text-[#F7F8F9] lg:text-2xl">
                Let anyone fund your subscriptions.
              </h3>
              <p className="font-outfit text-sm leading-[1.2em] tracking-wide text-[#ADB5BD]">
                Share a link. When someone pays, it tops up your wallet instantly. Perfect for
                family abroad helping with bills back home.
              </p>
            </div>
            <FundingUI />
          </article>
        </div>
      </div>
    </section>
  )
}
