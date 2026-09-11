import React from "react";
import { APP_STORE_URL, PLAY_STORE_URL } from "../config";

/* ───────────────────────────────────────────────────────────────────
   The two store badges, the only call to action on the site now that
   the waitlist is gone.

   Both links are deliberately country-neutral. Apple's /app/id… form
   301s each visitor into their own storefront and Play routes by
   account region, which matters because half this audience is paying
   Nigerian bills from outside Nigeria. Naming a country in the URL
   would push everybody else to a store they cannot buy from.
   ─────────────────────────────────────────────────────────────────── */

/** Both marks use currentColor, so each follows its badge's text colour. */
function AppleMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className="h-7 w-7 shrink-0 transition-transform duration-200 group-hover:scale-105"
    >
      <path d="M22.7333 27.04C21.4267 28.3067 20 28.1067 18.6267 27.5067C17.1733 26.8933 15.84 26.8667 14.3067 27.5067C12.3867 28.3333 11.3733 28.0933 10.2267 27.04C3.72 20.3333 4.68 10.12 12.0667 9.74667C13.8667 9.84 15.12 10.7333 16.1733 10.8133C17.7467 10.4933 19.2533 9.57333 20.9333 9.69333C22.9467 9.85333 24.4667 10.6533 25.4667 12.0933C21.3067 14.5867 22.2933 20.0667 26.1067 21.6C25.3467 23.6 24.36 25.5867 22.72 27.0533L22.7333 27.04ZM16.04 9.66667C15.84 6.69333 18.2533 4.24 21.0267 4C21.4133 7.44 17.9067 10 16.04 9.66667Z" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className="h-7 w-7 shrink-0 transition-transform duration-200 group-hover:scale-105"
    >
      <path d="M3 3.71807V28.2806C3.00016 28.3339 3.01606 28.3859 3.04569 28.4302C3.07532 28.4745 3.11737 28.5091 3.16656 28.5296C3.21575 28.55 3.2699 28.5556 3.32222 28.5454C3.37453 28.5352 3.42268 28.5099 3.46062 28.4724L16.25 15.9999L3.46062 3.52619C3.42268 3.48878 3.37453 3.4634 3.32222 3.45324C3.2699 3.44308 3.21575 3.44859 3.16656 3.46909C3.11737 3.48958 3.07532 3.52414 3.04569 3.56843C3.01606 3.61272 3.00016 3.66478 3 3.71807ZM21.6125 10.8749L5.57625 2.03994L5.56625 2.03432C5.29 1.88432 5.0275 2.25807 5.25375 2.47557L17.8244 14.4956L21.6125 10.8749ZM5.255 29.5243C5.0275 29.7418 5.29 30.1156 5.5675 29.9656L5.5775 29.9599L21.6125 21.1249L17.8244 17.5031L5.255 29.5243ZM28.0863 14.4374L23.6081 11.9712L19.3975 15.9999L23.6081 20.0268L28.0863 17.5624C29.3044 16.8893 29.3044 15.1106 28.0863 14.4374Z" />
    </svg>
  );
}

type Tone = "ink" | "paper";

const TONES: Record<Tone, string> = {
  // Near-black badge. Reads on the warm paper and on the orange band.
  ink: "bg-[#141414] text-white ring-1 ring-inset ring-white/10 hover:bg-[#232323]",
  // Inverted, for night surfaces.
  paper:
    "bg-white text-[#141414] ring-1 ring-inset ring-black/5 hover:bg-[#f5f3ef]",
};

const SUBTLE: Record<Tone, string> = {
  ink: "text-white/65",
  paper: "text-[#141414]/60",
};

function Badge({
  href,
  mark,
  lead,
  name,
  tone,
  label,
}: {
  href: string;
  mark: React.ReactNode;
  lead: string;
  name: string;
  tone: Tone;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group flex h-[58px] min-w-[196px] items-center gap-3 rounded-2xl px-5 shadow-[0_10px_28px_-12px_rgba(0,0,0,0.5)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-14px_rgba(0,0,0,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0 ${TONES[tone]}`}
    >
      {mark}
      <span className="flex flex-col justify-center text-left">
        <span
          className={`font-outfit text-[11px] leading-none tracking-wide ${SUBTLE[tone]}`}
        >
          {lead}
        </span>
        <span className="mt-1 font-outfit text-[17px] font-semibold leading-none tracking-tight">
          {name}
        </span>
      </span>
    </a>
  );
}

export default function StoreBadges({
  tone = "ink",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-stretch gap-3 sm:flex-row sm:items-center ${className}`}
    >
      <Badge
        href={APP_STORE_URL}
        mark={<AppleMark />}
        lead="Download on the"
        name="App Store"
        tone={tone}
        label="Download Subsecute on the App Store"
      />
      <Badge
        href={PLAY_STORE_URL}
        mark={<PlayMark />}
        lead="Get it on"
        name="Google Play"
        tone={tone}
        label="Get Subsecute on Google Play"
      />
    </div>
  );
}
