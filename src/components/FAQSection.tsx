"use client";

import { useState } from "react";
import { FAQS } from "@/lib/faqs";

function FAQItem({ faq }: { faq: (typeof FAQS)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="pr-4 font-outfit text-base font-medium text-ink sm:text-lg">
          {faq.question}
        </span>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1V13M1 7H13"
              stroke="#232323"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-all duration-200 ease-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 font-outfit text-sm leading-[1.65] text-ink-2 sm:text-base">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-paper py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[800px] px-4">
        {/* Header */}
        <div className="mb-10 text-center lg:mb-14">
          <span className="font-outfit text-[11px] font-medium uppercase tracking-[0.18em] text-accent-ink">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="mt-4 font-neue-power text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl lg:text-[52px]"
          >
            Questions about Subsecute
          </h2>
          <p className="mt-4 font-outfit text-sm text-ink-2 sm:text-base">
            Everything you need to know about Subsecute
          </p>
        </div>

        {/* FAQ items */}
        <div className="rounded-2xl border border-line bg-surface px-6">
          {FAQS.map((faq) => (
            <FAQItem key={faq.question} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
