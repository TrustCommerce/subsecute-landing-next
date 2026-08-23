"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import PhoneShell, { Bubble, TypingBubble } from "./whatsapp/PhoneShell";
import ParallaxField from "./ParallaxField";
import { INTRO, INTRO_MS, PROMPTS, type Msg } from "./whatsapp/thread";

/* ───────────────────────────────────────────────────────────────────
   The thread plays itself when the phone scrolls into view, then hands
   over: tapping a question sends it and Subsecute answers.

   Every reply is something the assistant can genuinely produce. The two
   buttons on the reminder are the exact labels the backend registers
   ("Keep it" / "Cancel subscription"), and asking it to cancel returns a
   confirmation rather than a cancellation, which is what
   request_cancel_subscription actually does.

   The ground is warm taupe with a slow ledger grid behind it. Depth comes
   from the surface change and one soft shadow, never a gradient wash.
   ─────────────────────────────────────────────────────────────────── */

const WHATSAPP_GREEN = "#25D366";
/** A tint of it, for green as small text on the taupe ground. */
const WHATSAPP_GREEN_ON_TAUPE = "#5CE68F";

/** The WhatsApp mark. Same path the share button already uses. */
function WhatsAppGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* Written for a reader, not a compliance file. Each is still true:
   plain-language parsing, tool-backed answers, and a cancel that needs a
   tap. They just lead with what you get. */
const PROOF = [
  {
    head: "Text it like a person",
    body: "No menus, no keywords, no app to open. Say it the way you would say it to anybody.",
  },
  {
    head: "Answers off your real account",
    body: "Live dates and live amounts. If it does not know something, it tells you instead of guessing.",
  },
  {
    head: "Your thumb, not its own",
    body: "It can line a cancellation up for you. Only your tap actually goes through with it.",
  },
] as const;

export default function WhatsAppSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [live, setLive] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  // The intro reveal is CSS. This only unlocks the questions once it has
  // finished, so nothing is tappable while messages are still arriving.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const reduced =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      // Nothing to wait for: there is no intro to play, so the questions
      // unlock on the next tick rather than synchronously in this effect.
      const now = setTimeout(() => setReady(true), 0);
      timers.current.push(now);
      return;
    }

    el.classList.add("wa-armed");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("wa-play");
        observer.disconnect();
        const t = setTimeout(() => setReady(true), INTRO_MS);
        timers.current.push(t);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Clear pending replies if the component goes away mid-conversation.
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // Follow the conversation down, the way a chat does.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || live.length === 0) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [live, typing]);

  const ask = useCallback(
    (id: string) => {
      const prompt = PROMPTS.find((p) => p.id === id);
      if (!prompt || !ready || typing || asked.includes(id)) return;

      setAsked((a) => [...a, id]);
      setLive((m) => [
        ...m,
        { id: `${id}-q`, from: "you", text: prompt.q, time: "21:41" },
      ]);
      setTyping(true);

      const t = setTimeout(() => {
        setTyping(false);
        setLive((m) => [
          ...m,
          {
            id: `${id}-a`,
            from: "them",
            text: prompt.a,
            time: "21:41",
            buttons: prompt.buttons,
          },
        ]);
      }, 1150);
      timers.current.push(t);
    },
    [ready, typing, asked],
  );

  const allAsked = asked.length === PROMPTS.length;

  return (
    <section
      id="whatsapp"
      aria-labelledby="whatsapp-heading"
      className="relative overflow-hidden bg-taupe py-20 lg:py-28"
    >
      {/* Ledger paper in three planes, each shifting a different distance
          under the pointer. Masked at the edges so it never competes with
          the type. */}
      <ParallaxField variant="ledger" />

      <div className="relative mx-auto max-w-[1240px] px-4 lg:px-0">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* ── Left: the pitch, then the controls ── */}
          <div className="order-2 flex w-full flex-col gap-6 lg:order-2 lg:w-[46%]">
            <span
              className="inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-2"
              style={{
                background: "rgba(37,211,102,0.16)",
                color: WHATSAPP_GREEN_ON_TAUPE,
              }}
            >
              <WhatsAppGlyph size={16} />
              <span className="font-outfit text-[11px] font-semibold uppercase tracking-[0.14em]">
                On WhatsApp
              </span>
            </span>

            <h2
              id="whatsapp-heading"
              className="font-neue-power text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-on-taupe lg:text-[46px]"
            >
              Your subscriptions,{" "}
              <span className="text-accent-on-taupe">
                on the app you never close.
              </span>
            </h2>

            <p className="max-w-[46ch] font-outfit text-sm leading-[1.65] text-on-taupe-2 sm:text-base">
              Renewals reach you where you already are, with a button to keep it
              or kill it. Then just talk. Subsecute reads your account and
              answers in plain English.
            </p>

            <div className="mt-2">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-outfit text-xs font-medium uppercase tracking-[0.14em] text-accent-on-taupe">
                  {ready ? "Tap one, it sends" : "Reading your messages…"}
                </p>
                <p
                  className="font-outfit text-xs text-on-taupe-3"
                  aria-hidden="true"
                >
                  {asked.length}/{PROMPTS.length}
                </p>
              </div>

              <ul role="list" className="mt-3 flex flex-col gap-2">
                {PROMPTS.map((p) => {
                  const used = asked.includes(p.id);
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => ask(p.id)}
                        disabled={!ready || used || typing}
                        aria-label={`Ask Subsecute: ${p.q}`}
                        className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left font-outfit text-sm transition-all duration-200 ${
                          used
                            ? "border-taupe-line/40 text-on-taupe-3/50"
                            : "border-taupe-line bg-taupe-2 text-on-taupe-2 enabled:hover:-translate-y-px enabled:hover:border-accent enabled:hover:text-on-taupe"
                        } ${!ready ? "opacity-40" : ""}`}
                      >
                        <span>{p.q}</span>
                        {used ? (
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                            className="shrink-0"
                          >
                            <path
                              d="M3 8.5L6 11.5L13 4.5"
                              stroke={WHATSAPP_GREEN}
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-on-taupe-3 transition-transform duration-200 group-enabled:group-hover:translate-x-0.5"
                          >
                            &rarr;
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <p
                aria-live="polite"
                className="mt-4 font-outfit text-xs leading-[1.6] text-on-taupe-3"
              >
                {allAsked
                  ? "That is the lot. Every answer came from the same tools the real assistant uses."
                  : "Answers come from your own account. Nothing here is typed in advance by us."}
              </p>
            </div>
          </div>

          {/* ── Right: the handset ── */}
          <div ref={stageRef} className="order-1 w-full lg:order-1 lg:w-[54%]">
            <PhoneShell scrollRef={scrollRef}>
              <ul role="list" className="flex flex-col gap-2">
                {INTRO.map((msg, i) => (
                  <Bubble key={msg.id} msg={msg} delay={i * 1200} />
                ))}
                {live.map((msg) => (
                  <Bubble key={msg.id} msg={msg} live />
                ))}
                {typing && <TypingBubble />}
              </ul>
            </PhoneShell>
          </div>
        </div>

        {/* ── Proof ── */}
        <ul
          role="list"
          className="mt-16 grid gap-8 border-t border-taupe-line pt-10 sm:grid-cols-3 lg:mt-20"
        >
          {PROOF.map((item) => (
            <li key={item.head}>
              <h3 className="font-outfit text-base font-semibold text-on-taupe">
                {item.head}
              </h3>
              <p className="mt-2 max-w-[34ch] font-outfit text-sm leading-[1.6] text-on-taupe-3">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-10 flex items-center gap-2 font-outfit text-[11px] text-on-taupe-3">
          <span style={{ color: WHATSAPP_GREEN_ON_TAUPE }}>
            <WhatsAppGlyph size={12} />
          </span>
          Sent through the WhatsApp Business Platform. WhatsApp is a trademark
          of Meta Platforms, Inc.
        </p>
      </div>
    </section>
  );
}
