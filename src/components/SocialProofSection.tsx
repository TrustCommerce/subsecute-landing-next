"use client";

import { useRef, useEffect, useCallback } from "react";

const TESTIMONIALS = [
  {
    name: "Adaeze K.",
    initial: "A",
    color: "bg-[#219653]",
    quote:
      "I used to lose Netflix every other month declined charges, no warning. With Subsecute, it has not failed once in seven months. I genuinely don't think about it anymore.",
  },
  {
    name: "Tammy A.",
    initial: "T",
    color: "bg-[#962135]",
    quote:
      "I used to lose Netflix every other month declined charges, no warning. With Subsecute, it has not failed once in seven months. I genuinely don't think about it anymore.",
  },
  {
    name: "Callum K.",
    initial: "C",
    color: "bg-[#252196]",
    quote:
      "I used to lose Netflix every other month declined charges, no warning. With Subsecute, it has not failed once in seven months. I genuinely don't think about it anymore.",
  },
] as const;

// --- Tunable ---
const SLOW_SPEED = 0.3; // px per frame (~18px/s at 60fps)

function RatingDots({ filled = 5 }: { filled?: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`h-3 w-3 rounded-full ${i < filled ? "bg-[#E96D1F]" : "bg-[#DEE2E6]"}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
}) {
  return (
    <article className="w-[340px] shrink-0 sm:w-[380px] lg:w-[400px]">
      <div className="flex h-full flex-col gap-4 rounded-2xl border border-[#DEE2E6] bg-white p-5">
        <RatingDots />
        <blockquote className="flex-1 font-outfit text-sm leading-[1.5em] tracking-wide text-[#6C757D]">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="flex items-center gap-2 pt-1">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${testimonial.color}`}
          >
            <span className="font-outfit text-sm font-bold text-white">
              {testimonial.initial}
            </span>
          </div>
          <cite className="font-outfit text-sm font-semibold not-italic tracking-wide text-[#495057]">
            {testimonial.name}
          </cite>
        </div>
      </div>
    </article>
  );
}

export default function SocialProofSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const speedRef = useRef(SLOW_SPEED);
  const remainingJump = useRef(0);

  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  const animateRef = useRef<() => void>();

  const animate = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    // If there's a jump in progress, consume it
    if (remainingJump.current !== 0) {
      const step =
        Math.sign(remainingJump.current) *
        Math.min(Math.abs(remainingJump.current), 8);
      track.scrollLeft += step;
      remainingJump.current -= step;
    } else {
      track.scrollLeft += speedRef.current;
    }

    // Seamless loop
    const halfScroll = track.scrollWidth / 2;
    if (track.scrollLeft >= halfScroll) {
      track.scrollLeft -= halfScroll;
    }
    if (track.scrollLeft <= 0) {
      track.scrollLeft += halfScroll;
    }

    rafRef.current = requestAnimationFrame(() => animateRef.current?.());
  }, []);

  useEffect(() => {
    animateRef.current = animate;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const cardWidth = 420;

  const jumpLeft = useCallback(() => {
    remainingJump.current = -cardWidth;
  }, []);

  const jumpRight = useCallback(() => {
    remainingJump.current = cardWidth;
  }, []);

  return (
    <section
      aria-labelledby="social-proof-heading"
      className="bg-[#FFFEEC] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-0">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4">
            <span className="font-outfit text-sm font-medium tracking-wide text-[#E96D1F]">
              REAL USERS
            </span>
            <h2
              id="social-proof-heading"
              className="font-neue-power text-3xl font-bold leading-[1.2em] tracking-normal text-[#232323] sm:text-4xl lg:text-[48px]"
            >
              What people say
            </h2>
          </div>
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <img
              src="/images/landing/stars-yellow.svg"
              alt="4.5 star rating"
              className="h-5 lg:h-6"
            />
            <span className="font-outfit text-sm tracking-wide text-[#6C757D]">
              4.5 from 800 Play/App store reviews
            </span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Track — hide scrollbar, continuous scroll */}
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((testimonial, i) => (
              <TestimonialCard
                key={`${testimonial.name}-${i}`}
                testimonial={testimonial}
              />
            ))}
          </div>

          {/* Nav arrows — speed up on hold */}
          <button
            onClick={jumpLeft}
            aria-label="Previous testimonial"
            className="absolute -left-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#DEE2E6] bg-white p-2 shadow-sm transition-all hover:bg-[#F8F9FA] active:scale-95 lg:flex"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12 5L7 10L12 15"
                stroke="#232323"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={jumpRight}
            aria-label="Next testimonial"
            className="absolute -right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#DEE2E6] bg-white p-2 shadow-sm transition-all hover:bg-[#F8F9FA] active:scale-95 lg:flex"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M8 5L13 10L8 15"
                stroke="#232323"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
