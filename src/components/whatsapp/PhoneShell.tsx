import React from "react";
import { WALLPAPER, WALLPAPER_BG } from "./wallpaper";
import type { Msg } from "./thread";

/* ───────────────────────────────────────────────────────────────────
   An iPhone running the chat with Subsecute.

   WhatsApp's light theme, because that is the one everybody pictures:
   warm beige doodle wallpaper, white incoming bubbles, the pale green
   outgoing bubble. Colours are WhatsApp's, not ours, since the whole
   point is that this is what lands on your actual phone.

     wallpaper #EFE7DE · incoming #FFFFFF · outgoing #DCF8C6
     chrome #F6F6F6 · text #111B21 · secondary #54656F
     read ticks #53BDEB · links #0A6FA8 · send #00A884
   ─────────────────────────────────────────────────────────────────── */

export const WA = {
  chrome: "#F6F6F6",
  incoming: "#FFFFFF",
  outgoing: "#DCF8C6",
  text: "#111B21",
  // WhatsApp's secondary grey. The lighter #667781 it also uses drops to
  // 4.0:1 on the green bubble, so timestamps take the darker one.
  meta: "#54656F",
  // Read ticks stay the iconic blue. They are decorative and duplicated by
  // nothing, so the 3:1 graphic threshold applies, not 4.5:1.
  tick: "#53BDEB",
  // The light theme's link blue. #53BDEB is the DARK theme value and only
  // reaches 2.1:1 on a white bubble, which is unreadable for real text.
  link: "#0A6FA8",
  line: "#D9DBDD",
  send: "#00A884",
  typing: "#0A7C66",
} as const;

/** Delivered vs read, drawn the way WhatsApp draws them. */
function Ticks() {
  return (
    <span className="relative inline-flex h-3 w-4 items-center">
      <svg
        viewBox="0 0 16 11"
        className="absolute inset-0 h-3 w-4"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 5.5L4 8.5L9.5 2M6.5 8.5L12 2"
          stroke={WA.meta}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        viewBox="0 0 16 11"
        className="wa-tick-read absolute inset-0 h-3 w-4"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 5.5L4 8.5L9.5 2M6.5 8.5L12 2"
          stroke={WA.tick}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Bubble({
  msg,
  delay,
  live,
}: {
  msg: Msg;
  /** Intro messages are scheduled; tapped ones animate on insert instead. */
  delay?: number;
  live?: boolean;
}) {
  const mine = msg.from === "you";
  return (
    <li
      className={`${live ? "wa-live" : "wa-msg"} flex ${mine ? "justify-end" : "justify-start"}`}
      style={
        delay !== undefined
          ? ({ "--delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      <div
        className="max-w-[85%] overflow-hidden rounded-lg shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]"
        style={{
          background: mine ? WA.outgoing : WA.incoming,
          // WhatsApp squares off the corner nearest the sender.
          borderTopRightRadius: mine ? 2 : undefined,
          borderTopLeftRadius: mine ? undefined : 2,
        }}
      >
        <div className="px-2.5 pb-1.5 pt-1.5">
          <p
            className="font-outfit text-[14px] leading-[1.42]"
            style={{ color: WA.text }}
          >
            {msg.text}
          </p>
          <span className="mt-0.5 flex items-center justify-end gap-1">
            <span
              className="font-outfit text-[11px]"
              style={{ color: WA.meta }}
            >
              {msg.time}
            </span>
            {mine && <Ticks />}
          </span>
        </div>

        {msg.buttons && (
          <div className="flex flex-col">
            {msg.buttons.map((label) => (
              <span
                key={label}
                className="border-t py-2.5 text-center font-outfit text-[13.5px] font-medium"
                style={{ borderColor: WA.line, color: WA.link }}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

/** The three-dot bubble, shown while a reply is on its way. */
export function TypingBubble() {
  return (
    <li className="wa-live flex justify-start">
      <div
        className="flex items-center gap-1 rounded-lg px-3 py-3.5 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]"
        style={{ background: WA.incoming, borderTopLeftRadius: 2 }}
      >
        <span className="sr-only">Subsecute is typing</span>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className="wa-dot h-1.5 w-1.5 rounded-full"
            style={{ background: WA.meta, "--i": i } as React.CSSProperties}
          />
        ))}
      </div>
    </li>
  );
}

/** iPhone shell. Everything inside is the WhatsApp screen. */
export default function PhoneShell({
  children,
  scrollRef,
}: {
  children: React.ReactNode;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative">
      <div
        className="relative mx-auto w-[368px] max-w-full rounded-[54px] p-[12px] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.75)]"
        style={{
          background:
            "linear-gradient(155deg, #4a4a50 0%, #1b1b1f 40%, #131316 66%, #3a3a41 100%)",
        }}
      >
        <div
          className="relative flex h-[748px] w-full flex-col overflow-hidden rounded-[43px]"
          style={{ background: WALLPAPER_BG }}
        >
          {/* Status bar */}
          <div
            className="relative flex h-[48px] shrink-0 items-center justify-between px-7 pt-2"
            style={{ background: WA.chrome }}
          >
            <span
              className="font-outfit text-[14.5px] font-semibold"
              style={{ color: WA.text }}
            >
              21:40
            </span>
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-2 h-[29px] w-[98px] -translate-x-1/2 rounded-full bg-black"
            />
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <svg width="17" height="12" viewBox="0 0 17 12" fill={WA.text}>
                <rect x="0" y="8" width="3" height="4" rx="1" />
                <rect x="4.5" y="6" width="3" height="6" rx="1" />
                <rect x="9" y="3" width="3" height="9" rx="1" />
                <rect x="13.5" y="0" width="3" height="12" rx="1" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill={WA.text}>
                <path d="M8 11.2 5.6 8.6a3.4 3.4 0 0 1 4.8 0L8 11.2Zm-4.2-4.5-1.5-1.6a8.4 8.4 0 0 1 11.4 0l-1.5 1.6a6.2 6.2 0 0 0-8.4 0ZM.6 3.4-.9 1.8a11.6 11.6 0 0 1 17.8 0l-1.5 1.6a9.4 9.4 0 0 0-14.8 0Z" />
              </svg>
              <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
                <rect
                  x="0.5"
                  y="0.5"
                  width="22"
                  height="12"
                  rx="3.5"
                  stroke={WA.text}
                  strokeOpacity="0.4"
                />
                <rect x="2" y="2" width="17" height="9" rx="2" fill={WA.text} />
                <path
                  d="M24 4.5v4a2.2 2.2 0 0 0 0-4Z"
                  fill={WA.text}
                  fillOpacity="0.4"
                />
              </svg>
            </span>
          </div>

          {/* Chat header */}
          <div
            className="flex h-[62px] shrink-0 items-center gap-2.5 border-b px-3"
            style={{ background: WA.chrome, borderColor: WA.line }}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M15 5L8 12L15 19"
                stroke="#007AFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <img
              src="/favicon.png"
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="h-[44px] w-[44px] shrink-0 rounded-full bg-white object-cover ring-1 ring-black/5"
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span
                className="truncate font-outfit text-[16.5px] font-semibold"
                style={{ color: WA.text }}
              >
                Subsecute
              </span>
              <span className="relative block h-[15px] w-28">
                <span
                  className="wa-status-online absolute inset-0 font-outfit text-[12px]"
                  style={{ color: WA.meta }}
                >
                  online
                </span>
                <span
                  className="wa-status-typing absolute inset-0 font-outfit text-[12px] opacity-0"
                  style={{ color: WA.typing }}
                >
                  typing…
                </span>
              </span>
            </span>
            <span
              className="ml-auto flex items-center gap-4"
              aria-hidden="true"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="#007AFF">
                <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 3.5V7l-4 3.5Z" />
              </svg>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="#007AFF">
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1l-2.22 2.23Z" />
              </svg>
            </span>
          </div>

          {/* Conversation, on the doodle wallpaper */}
          <div
            ref={scrollRef}
            className="wa-scroll flex flex-1 flex-col overflow-y-auto px-3 py-3"
            style={{
              backgroundColor: WALLPAPER_BG,
              backgroundImage: WALLPAPER,
              backgroundSize: "220px 220px",
            }}
          >
            {/* mt-auto pins a short thread to the bottom, the way a real
                chat sits, and stops behaving once the thread is tall enough
                to scroll. */}
            <div className="mt-auto">
              <div className="mb-3 flex justify-center">
                <span
                  className="rounded-md px-2.5 py-1 font-outfit text-[11px] tracking-wide shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]"
                  style={{ background: "#FFFFFF", color: WA.meta }}
                >
                  TODAY
                </span>
              </div>
              {children}
            </div>
          </div>

          {/* Composer */}
          <div
            className="flex shrink-0 items-center gap-2 border-t px-2.5 pb-1 pt-1.5"
            style={{ background: WA.chrome, borderColor: WA.line }}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill={WA.meta}>
              <path
                d="M12 5v14M5 12h14"
                stroke={WA.meta}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div
              className="flex h-10 flex-1 items-center gap-2 rounded-full border px-3"
              style={{ background: "#FFFFFF", borderColor: WA.line }}
            >
              <span
                className="wa-caret h-4 w-px"
                style={{ background: WA.link }}
                aria-hidden="true"
              />
              <span className="ml-auto" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill={WA.meta}>
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-3.5 7a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Zm7 0a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 17.5A5 5 0 0 1 7.3 14h9.4a5 5 0 0 1-4.7 3.5Z" />
                </svg>
              </span>
            </div>
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{ background: WA.send }}
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V22h2v-3.1A7 7 0 0 0 19 12h-2Z" />
              </svg>
            </span>
          </div>

          <div
            className="flex h-[20px] shrink-0 items-center justify-center"
            style={{ background: WA.chrome }}
          >
            <span
              aria-hidden="true"
              className="h-[4px] w-[130px] rounded-full"
              style={{ background: "rgba(17,27,33,0.3)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
