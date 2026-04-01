"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { IS_WAITLIST } from "../config";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="relative z-50 mx-auto flex max-w-[1240px] items-center justify-between rounded-xl border border-[#DEE2E6] px-5 py-2.5"
      >
        <Link href="/" aria-label="Subsecute home">
          <img
            src="/images/landing/logo.png"
            alt="Subsecute logo"
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 md:flex">
          <ul className="flex items-center" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-3 py-2 font-outfit text-sm tracking-wide text-[#232323] transition-colors hover:text-[#E96D1F]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#download"
            className="rounded-full bg-[#E96D1F] px-5 py-2 font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
          >
            {IS_WAITLIST ? "Join Waitlist" : "Get the App"}
          </a>
        </div>

        {/* Mobile hamburger — animated to X */}
        <button
          onClick={() => setOpen(!open)}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className="block h-0.5 w-5 bg-[#232323] transition-all duration-200"
            style={{
              transform: open ? "rotate(45deg) translateY(4px)" : "none",
            }}
          />
          <span
            className="block h-0.5 w-5 bg-[#232323] transition-all duration-200"
            style={{
              opacity: open ? 0 : 1,
              transform: open ? "scaleX(0)" : "scaleX(1)",
            }}
          />
          <span
            className="block h-0.5 w-5 bg-[#232323] transition-all duration-200"
            style={{
              transform: open ? "rotate(-45deg) translateY(-4px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel — full width on mobile */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-white transition-transform duration-200 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F0F0F0] px-6 py-4">
          <Link href="/" onClick={close}>
            <img
              src="/images/landing/logo.png"
              alt="Subsecute"
              className="h-7 w-auto"
            />
          </Link>
          <button
            onClick={close}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#F0F0F0]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 4L14 14M14 4L4 14"
                stroke="#232323"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-1 flex-col px-6 py-6">
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="flex items-center justify-between rounded-lg px-3 py-3 font-outfit text-base tracking-wide text-[#232323] transition-colors hover:bg-[#F8F8F8] hover:text-[#E96D1F]"
                >
                  {link.label}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-[#ADB5BD]"
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-auto pt-6">
            <a
              href="#download"
              onClick={close}
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#E96D1F] font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
            >
              {IS_WAITLIST ? "Join Waitlist" : "Get the App"}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#F0F0F0] px-6 py-4">
          <div className="flex gap-4">
            <a
              href="/privacy-policy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-outfit text-xs tracking-wide text-[#ADB5BD] transition-colors hover:text-[#232323]"
            >
              Privacy
            </a>
            <a
              href="/terms-of-service.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-outfit text-xs tracking-wide text-[#ADB5BD] transition-colors hover:text-[#232323]"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
