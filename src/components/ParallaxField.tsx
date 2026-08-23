"use client";

import React, { useEffect, useRef } from "react";

/**
 * Pattern planes that shift by different amounts as the pointer crosses the
 * section, so the field reads as depth rather than a flat print.
 *
 * The handler is rAF-throttled and writes straight to a CSS custom property,
 * so it never touches React state and never re-renders anything. It only arms
 * on a fine pointer (no phantom motion on touch) and not at all under
 * `prefers-reduced-motion`.
 *
 * Two variants, each saying something about the product:
 *   recur  - the quiet many, and every fourth mark coming round again
 *   ledger - graph paper, because a month of dated obligations is the app
 */
/**
 * Which layers each language is built from, near plane last. The far plane
 * barely moves and the near plane travels the full distance; that gap is
 * what the eye reads as depth.
 */
const PLANES: Record<string, readonly (readonly [string, string])[]> = {
  recur: [
    ["plane-far", "recur-dots"],
    ["plane-mid", "recur-mid"],
    ["plane-near", "recur-rings"],
  ],
  ledger: [
    ["plane-far", "ledger-fine"],
    ["plane-near", "ledger-mid"],
  ],
  pixels: [
    ["plane-far", "pixel-far"],
    ["plane-near", "pixel-near"],
  ],
  doodles: [
    ["plane-far", "doodle-far"],
    ["plane-near", "doodle-near"],
  ],
  route: [
    ["plane-far", "route-far"],
    ["plane-near", "route-near"],
  ],
};

export default function ParallaxField({
  variant = "recur",
  /** Peak travel in px for the nearest plane. */
  depth = 96,
  interactive = true,
}: {
  variant?: "recur" | "ledger" | "pixels" | "doodles" | "route";
  depth?: number;
  /**
   * Set false for a still pattern. The planes still render, they just do
   * not track the pointer, so the texture is there without the motion.
   */
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section || typeof matchMedia !== "function") return;
    if (!matchMedia("(pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = section.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--px", `${(-x * depth).toFixed(1)}px`);
        el.style.setProperty("--py", `${(-y * depth * 0.6).toFixed(1)}px`);
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--px", "0px");
      el.style.setProperty("--py", "0px");
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [depth, interactive]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="parallax-field pointer-events-none absolute -inset-x-52 -inset-y-40"
    >
      {PLANES[variant].map(([depth, pattern]) => (
        <div key={pattern} className={`${depth} ${pattern} absolute inset-0`} />
      ))}
    </div>
  );
}
