"use client";

import Link from "next/link";
import { LAUNCH_DATE, LOGO_DEV_TOKEN, WAITLIST_COUNT } from "../config";
import CountdownTimer from "./CountdownTimer";
import WaitlistForm from "./WaitlistForm";

// Services people already recognize — message-match for the IG promise and a
// trust signal that this auto-pays the things they actually pay for.
const SUPPORTED = [
  { domain: "netflix.com", label: "Netflix" },
  { domain: "spotify.com", label: "Spotify" },
  { domain: "openai.com", label: "ChatGPT" },
  { domain: "claude.ai", label: "Claude" },
  { domain: "dstv.com", label: "DSTV" },
  { domain: "mtn.ng", label: "MTN" },
  { domain: "airtel.com", label: "Airtel" },
  { domain: "ekedc.com", label: "Power" },
  { domain: "youtube.com", label: "YouTube" },
  { domain: "kick.com", label: "Kick" },
  { domain: "twitch.tv", label: "Twitch" },
] as const;

function logo(domain: string) {
  return `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&size=48&format=png`;
}

// Each block fades up in sequence so the page feels alive on load without
// pulling in an animation library.
function rise(delayMs: number): React.CSSProperties {
  return {
    animation: `fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms both`,
  };
}

export default function EarlyAccessPage() {
  const hasCount = WAITLIST_COUNT > 0;

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#FFFEEC] font-neue-power">
      {/* Aurora — the hero's orange glow, now slowly breathing */}
      <div
        className="aurora pointer-events-none absolute bottom-[-120px] left-1/2 h-[420px] w-[720px] rounded-full bg-[#E96D1F]"
        style={{ filter: "blur(90px)" }}
        aria-hidden="true"
      />
      <div
        className="aurora pointer-events-none absolute left-1/2 top-[-160px] h-[360px] w-[560px] rounded-full bg-[#FFC93C]"
        style={{ filter: "blur(110px)", animationDelay: "-7s" }}
        aria-hidden="true"
      />

      {/* Logo only — no nav links, so the form is the single path forward */}
      <header className="relative z-10 flex justify-center px-4 pt-6 sm:pt-8">
        <Link href="/" aria-label="Subsecute home">
          <img
            src="/images/landing/logo.svg"
            alt="Subsecute"
            className="h-7 w-auto sm:h-8"
          />
        </Link>
      </header>

      {/* Hero — the whole page is the form experience */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:py-14">
        {/* Announcement pill */}
        <div
          className="mb-6 flex items-center gap-2 rounded-full border border-[#DEE2E6] bg-white/60 px-3 py-1.5 backdrop-blur-md"
          style={rise(0)}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#58DC00] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#58DC00]" />
          </span>
          <span className="font-outfit text-xs tracking-wide text-[#6C757D] sm:text-sm">
            Launching soon — early access is open
          </span>
        </div>

        {/* Headline with the signature underline */}
        <h1
          className="max-w-[760px] font-neue-power text-4xl font-bold leading-[1.12] tracking-normal text-[#232323] sm:text-5xl lg:text-[64px]"
          style={rise(80)}
        >
          Get early access to the app that finds what you&apos;re{" "}
          <span className="relative inline-block text-[#E96D1F]">
            overpaying
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
          </span>{" "}
          for.
        </h1>

        {/* Subheadline — condensed value prop, message-matched to the ad */}
        <p
          className="mt-5 max-w-[520px] font-outfit text-sm leading-[1.6em] tracking-wide text-[#6C757D] sm:text-base lg:text-lg"
          style={rise(160)}
        >
          One app that tracks every subscription and bill you have — then funds
          and pays them automatically. Be first in line when we open the doors.
        </p>

        {/* The single action — kept high so the field is above the fold on
            mobile, where most of the IG traffic lands */}
        <div className="mt-8 flex w-full justify-center" style={rise(240)}>
          <WaitlistForm variant="light" cta="Get Early Access" />
        </div>

        {/* Countdown — sits right under the form, reinforcing the urgency to act */}
        <div className="mt-8" style={rise(300)}>
          <CountdownTimer targetDate={LAUNCH_DATE} label="Launching in" />
        </div>

        {/* Why act before the timer runs out */}
        <p
          className="mt-3 max-w-[440px] font-outfit text-xs leading-relaxed tracking-wide text-[#6C757D]"
          style={rise(340)}
        >
          Join before launch to{" "}
          <span className="font-medium text-[#232323]">skip the line</span> and
          lock in founding-member perks.
        </p>

        {/* Social proof — real count when set, honest reassurance otherwise */}
        <div
          className="mt-5 flex items-center gap-2.5"
          style={rise(380)}
          aria-live="polite"
        >
          <div className="flex items-center -space-x-2">
            <img
              src="/images/landing/provider-1.png"
              alt=""
              className="h-6 w-6 rounded-full object-cover ring-2 ring-[#FFFEEC]"
            />
            <img
              src="/images/landing/provider-2.png"
              alt=""
              className="h-6 w-6 rounded-full object-cover ring-2 ring-[#FFFEEC]"
            />
            <img
              src="/images/landing/provider-3.png"
              alt=""
              className="h-6 w-6 rounded-full object-cover ring-2 ring-[#FFFEEC]"
            />
          </div>
          <span className="font-outfit text-xs tracking-wide text-[#6C757D] sm:text-sm">
            {hasCount
              ? `${WAITLIST_COUNT.toLocaleString()}+ Nigerians already on the list`
              : "No spam — just one email the moment we launch"}
          </span>
        </div>

        {/* Supported services — an infinite marquee that reinforces the promise */}
        <div
          className="mt-12 flex w-full flex-col items-center gap-4"
          style={rise(440)}
        >
          <span className="font-outfit text-[11px] uppercase tracking-[0.18em] text-[#ADB5BD]">
            Works with everything you already pay for
          </span>
          <div
            className="w-full max-w-[640px] overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <div className="marquee-track flex gap-2.5">
              {/* Two copies so the -50% scroll loops with no visible seam */}
              {[...SUPPORTED, ...SUPPORTED].map((service, i) => (
                <div
                  key={`${service.domain}-${i}`}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-[#EDE8D0] bg-white/70 px-3 py-1.5"
                  aria-hidden={i >= SUPPORTED.length}
                >
                  <img
                    src={logo(service.domain)}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="h-4 w-4 rounded object-contain"
                  />
                  <span className="whitespace-nowrap font-outfit text-xs font-medium text-[#6C757D]">
                    {service.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Minimal footer — trust links only, nothing that leaks the click */}
      <footer className="relative z-10 flex items-center justify-center gap-4 px-4 pb-6 pt-2">
        <a
          href="/privacy-policy.html"
          target="_blank"
          rel="noopener noreferrer"
          className="font-outfit text-xs tracking-wide text-[#ADB5BD] transition-colors hover:text-[#232323]"
        >
          Privacy
        </a>
        <span className="text-[#DEE2E6]" aria-hidden="true">
          ·
        </span>
        <a
          href="/terms-of-service.html"
          target="_blank"
          rel="noopener noreferrer"
          className="font-outfit text-xs tracking-wide text-[#ADB5BD] transition-colors hover:text-[#232323]"
        >
          Terms
        </a>
        <span className="text-[#DEE2E6]" aria-hidden="true">
          ·
        </span>
        <span className="font-outfit text-xs tracking-wide text-[#ADB5BD]">
          © {new Date().getFullYear()} Subsecute
        </span>
      </footer>
    </main>
  );
}
