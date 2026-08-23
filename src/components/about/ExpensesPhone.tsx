"use client";

import React, { useEffect, useRef, useState } from "react";

/* ───────────────────────────────────────────────────────────────────
   The Expenses screen, rebuilt as live markup instead of a flat PNG so
   the ring can draw itself, the total can count, and the rows can land
   in order. Same numbers as the screenshot it replaces: NGN 115,239
   across 38 items in a year.
   ─────────────────────────────────────────────────────────────────── */

type Slice = { label: string; amount: number; color: string };

const TOTAL = 115239;
const ITEMS = 38;

const SLICES: readonly Slice[] = [
  { label: "OpenAI", amount: 27221, color: "#E96D1F" },
  { label: "Leslie Power Monthly", amount: 20000, color: "#2E9E4F" },
  { label: "Esele's Twitch", amount: 13520, color: "#6C63FF" },
  { label: "Twitch", amount: 9715, color: "#4A7DFF" },
  { label: "Leslie's Netflix", amount: 9143, color: "#E5484D" },
  { label: "Anthropic", amount: 9000, color: "#D4A27F" },
  { label: "Kene's Claude", amount: 6997, color: "#F5B833" },
  { label: "Leslie's Claude sub", amount: 5715, color: "#17A2B8" },
  { label: "Everything else", amount: 13928, color: "#98A2AD" },
] as const;

const R = 52;
const CIRC = 2 * Math.PI * R;
const naira = (n: number) => "₦" + n.toLocaleString("en-NG");

/** Cumulative start offset for each arc, so they sit end to end. */
const OFFSETS = SLICES.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + SLICES[i - 1].amount / TOTAL);
  return acc;
}, []);

/**
 * Arms the reveal on the client and reports when it fires.
 *
 * The server renders no `data-drawn` attribute at all, so the screen is
 * complete for anyone without JavaScript. Only the client sets
 * `data-drawn="false"`, which is what hides the arcs and rows, and then
 * flips it to "true" when the phone scrolls into view.
 */
function useDrawOnView(ref: React.RefObject<HTMLElement | null>) {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    el.dataset.drawn = "false";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.drawn = "true";
        setDrawn(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return drawn;
}

/** Counts to the total once the ring starts drawing. */
function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    // Reduced motion jumps straight to the total, on the next tick rather
    // than synchronously in this effect.
    if (
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const jump = setTimeout(() => setValue(target), 0);
      return () => clearTimeout(jump);
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);
  return value;
}

export default function ExpensesPhone() {
  const ref = useRef<HTMLDivElement>(null);
  const drawn = useDrawOnView(ref);
  // Starts at the total so server HTML shows the real figure, then counts
  // from zero once the reveal actually fires.
  const counted = useCountUp(TOTAL, drawn);
  const total = drawn ? counted : TOTAL;

  return (
    <div ref={ref} className="relative w-full max-w-[340px]">
      <div
        className="relative rounded-[52px] p-[11px] shadow-[0_50px_100px_-35px_rgba(0,0,0,0.7)]"
        style={{
          background:
            "linear-gradient(155deg, #4a4a50 0%, #1b1b1f 40%, #131316 66%, #3a3a41 100%)",
        }}
      >
        <div className="relative flex h-[700px] flex-col overflow-hidden rounded-[42px] bg-[#F7F7F8]">
          {/* Status bar */}
          <div className="relative flex h-[46px] shrink-0 items-center justify-between px-7 pt-2">
            <span className="font-outfit text-[14px] font-semibold text-[#232323]">
              11:05
            </span>
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-2 h-[28px] w-[95px] -translate-x-1/2 rounded-full bg-black"
            />
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="#232323">
                <rect x="0" y="8" width="3" height="4" rx="1" />
                <rect x="4.5" y="6" width="3" height="6" rx="1" />
                <rect x="9" y="3" width="3" height="9" rx="1" />
                <rect x="13.5" y="0" width="3" height="12" rx="1" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="#232323">
                <path d="M8 11.2 5.6 8.6a3.4 3.4 0 0 1 4.8 0L8 11.2Zm-4.2-4.5-1.5-1.6a8.4 8.4 0 0 1 11.4 0l-1.5 1.6a6.2 6.2 0 0 0-8.4 0ZM.6 3.4-.9 1.8a11.6 11.6 0 0 1 17.8 0l-1.5 1.6a9.4 9.4 0 0 0-14.8 0Z" />
              </svg>
              <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
                <rect
                  x="0.5"
                  y="0.5"
                  width="22"
                  height="12"
                  rx="3.5"
                  stroke="#232323"
                  strokeOpacity="0.4"
                />
                <rect x="2" y="2" width="17" height="9" rx="2" fill="#232323" />
                <path
                  d="M24 4.5v4a2.2 2.2 0 0 0 0-4Z"
                  fill="#232323"
                  fillOpacity="0.4"
                />
              </svg>
            </span>
          </div>

          {/* Screen header */}
          <div className="flex shrink-0 items-center gap-3 px-4 pb-3 pt-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M15 5L8 12L15 19"
                stroke="#232323"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-outfit text-[15px] font-semibold text-[#232323]">
              Expenses
            </span>
            <span className="ml-auto flex items-center gap-1 rounded-full bg-[#ECECEE] px-2.5 py-1">
              <span className="font-outfit text-[11px] text-[#565660]">
                This year
              </span>
              <svg
                width="9"
                height="9"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="#565660"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {/* The ring */}
          <div className="relative flex shrink-0 items-center justify-center pb-2 pt-4">
            <svg
              width="182"
              height="182"
              viewBox="0 0 130 130"
              role="img"
              aria-label={`Yearly spend of ${naira(TOTAL)} across ${ITEMS} items. Largest is OpenAI at ${naira(27221)}.`}
            >
              <g transform="rotate(-90 65 65)">
                {SLICES.map((slice, i) => {
                  const len = (slice.amount / TOTAL) * CIRC;
                  return (
                    <circle
                      key={slice.label}
                      className="ring-arc"
                      cx="65"
                      cy="65"
                      r={R}
                      fill="none"
                      stroke={slice.color}
                      strokeWidth="11"
                      strokeLinecap="butt"
                      strokeDashoffset={-OFFSETS[i] * CIRC}
                      style={
                        {
                          "--i": i,
                          "--dash": `${len} ${CIRC - len}`,
                        } as React.CSSProperties
                      }
                    />
                  );
                })}
              </g>
            </svg>

            <span className="pointer-events-none absolute flex flex-col items-center">
              <span className="font-neue-power text-[26px] font-bold leading-none tracking-tight text-[#232323] [font-variant-numeric:tabular-nums]">
                {naira(total)}
              </span>
              <span className="mt-1 font-outfit text-[11px] text-[#6B6B76]">
                {ITEMS} items
              </span>
            </span>
          </div>

          {/* Rows */}
          <ul role="list" className="flex-1 overflow-hidden px-4 pb-4 pt-3">
            {SLICES.slice(0, 8).map((slice, i) => (
              <li
                key={slice.label}
                className="row-in flex items-center gap-2.5 border-b border-[#ECECEE] py-2.5 last:border-0"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: slice.color }}
                />
                <span className="min-w-0 flex-1 truncate font-outfit text-[12.5px] text-[#232323]">
                  {slice.label}
                </span>
                <span className="shrink-0 font-outfit text-[11px] text-[#6B6B76]">
                  {Math.round((slice.amount / TOTAL) * 100)}%
                </span>
                <span className="shrink-0 font-outfit text-[12.5px] font-medium text-[#232323] [font-variant-numeric:tabular-nums]">
                  {naira(slice.amount)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex h-[20px] shrink-0 items-center justify-center">
            <span
              aria-hidden="true"
              className="h-[4px] w-[125px] rounded-full bg-[#232323]/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
