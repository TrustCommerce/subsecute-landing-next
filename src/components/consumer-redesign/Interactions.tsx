"use client";

import { useState } from "react";
import Link from "next/link";
import s from "./landing.module.css";

const steps = [
  {
    title: "Add your subscription",
    copy: "A dedicated virtual card for each subscription. Less guesswork about what is charging you.",
    label: "A card with one job.",
    detail:
      "Keep your subscription payments separate, and see what belongs where.",
    footer: "Dedicated to your subscription",
  },
  {
    title: "Choose how to fund it",
    copy: "Connect a saved card or direct debit. Choose the funding method that works for you.",
    label: "Your money. Your choice.",
    detail:
      "Manage your funding method in the app, with the payment details in one place.",
    footer: "Saved card or direct debit",
  },
  {
    title: "Stay one step ahead",
    copy: "See upcoming renewals and get reminders, so the next payment does not sneak up on you.",
    label: "Know what comes next.",
    detail:
      "A clearer view of the next renewal, with time to check your payment method.",
    footer: "Renewal reminders",
  },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className={s.mobileMenu}>
      <button
        className={s.menuButton}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close −" : "Menu +"}
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={s.mobileLinks}
        >
          {[
            ["#how-it-works", "How it works"],
            ["#everyday", "The everyday"],
            ["#your-people", "For your people"],
            ["/blog", "Blog"],
            ["#download", "Get the app"],
          ].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

export function RenewalStory() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  return (
    <div className={s.storyGrid}>
      <div className={s.steps} aria-label="Explore how Subsecute works">
        {steps.map((item, index) => (
          <button
            key={item.title}
            aria-pressed={active === index}
            aria-controls="renewal-detail"
            className={`${s.step} ${active === index ? s.activeStep : ""}`}
            onClick={() => setActive(index)}
          >
            <span className={s.stepNumber}>0{index + 1}</span>
            <span>
              <strong>{item.title}</strong>
              <span>{item.copy}</span>
            </span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div
        id="renewal-detail"
        className={s.renewalDetail}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className={s.panelEyebrow}>YOUR SUBSCRIPTION, CONNECTED</div>
        <h3>{step.label}</h3>
        <p>{step.detail}</p>
        <div className={s.virtualCard}>
          <div>
            <b>subsecute</b>
            <span>Virtual card</span>
          </div>
          <span className={s.cardMark} aria-hidden="true">
            s.
          </span>
          <div>
            <span>ONE CARD. ONE SUBSCRIPTION.</span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>
        <div className={s.detailFooter}>
          <span className={s.tick}>✓</span>
          {step.footer}
          <span>0{active + 1} / 03</span>
        </div>
      </div>
    </div>
  );
}
