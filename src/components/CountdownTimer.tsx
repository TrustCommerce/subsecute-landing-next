"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string; // ISO 8601
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function getTimeLeft(target: number, now: number): TimeLeft {
  const diff = target - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    done: false,
  };
}

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Mins" },
  { key: "seconds", label: "Secs" },
] as const;

export default function CountdownTimer({
  targetDate,
  label = "Launching in",
}: CountdownTimerProps) {
  const target = new Date(targetDate).getTime();
  // `now` stays null until the client ticks it, so the server / first paint
  // renders a stable placeholder and there's no hydration mismatch on the
  // static page. The first update lands on the next animation frame.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    const raf = requestAnimationFrame(update);
    const id = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  const timeLeft = now === null ? null : getTimeLeft(target, now);

  if (timeLeft?.done) {
    return (
      <p className="font-outfit text-sm font-medium tracking-wide text-[#E96D1F]">
        We&apos;re launching — get in now.
      </p>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, "0");
  const values = timeLeft as unknown as Record<string, number> | null;

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-outfit text-[11px] uppercase tracking-[0.18em] text-[#ADB5BD]">
        {label}
      </span>
      <div
        className="flex items-start gap-2 sm:gap-3"
        role="timer"
        aria-label={
          timeLeft
            ? `${label} ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes`
            : label
        }
      >
        {UNITS.map((unit) => (
          <div
            key={unit.key}
            className="flex min-w-[58px] flex-col items-center rounded-2xl border border-white/70 bg-white/55 px-2.5 py-2.5 shadow-[0_6px_24px_rgba(233,109,31,0.08)] backdrop-blur-md sm:min-w-[72px] sm:px-4 sm:py-3"
          >
            <span className="font-neue-power text-2xl font-bold tabular-nums text-[#232323] sm:text-[34px]">
              {values ? pad(values[unit.key]) : "--"}
            </span>
            <span className="mt-0.5 font-outfit text-[9px] uppercase tracking-[0.12em] text-[#6C757D] sm:text-[11px]">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
