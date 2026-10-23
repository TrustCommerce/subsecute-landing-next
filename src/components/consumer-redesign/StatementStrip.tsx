"use client";

import { useEffect, useRef, useState } from "react";
import s from "./StatementStrip.module.css";

// The comparison illustrates named records inside Subsecute. It does not
// claim that we edit a bank statement or discover external subscriptions.

type Row = {
  date: string;
  code: string;
  /** Set only on the foreign software charges, which are the ones that
   *  arrive as a code and resolve to a name. */
  name?: string;
  amount: string;
};

const ROWS: Row[] = [
  { date: "01 Sep", code: "POS PURCHASE SHOPRITE LEKKI", amount: "₦18,450" },
  {
    date: "03 Sep",
    code: "WEB*SFT 4471 SAN FRANCISCO",
    name: "Figma",
    amount: "$12.00",
  },
  { date: "04 Sep", code: "BOLT TRIP LAGOS", amount: "₦3,200" },
  {
    date: "05 Sep",
    code: "DD*APPSVC 88213 DUBLIN",
    name: "ChatGPT Plus",
    amount: "$9.99",
  },
  {
    date: "06 Sep",
    code: "PAYPAL *DGTLSRV 402-935",
    name: "Claude Pro",
    amount: "$15.00",
  },
];

export default function StatementStrip() {
  const [resolved, setResolved] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // Someone who asked for less motion gets the answer straight
        // away. Everyone else holds the unresolved state long enough to
        // read it, or the swap is the only thing they see.
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        timer = setTimeout(() => setResolved(true), reduced ? 0 : 1400);
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={s.section}
      aria-labelledby="stmt-title"
    >
      <div className={s.layout}>
        <div>
          <div className={s.statement}>
            <div className={s.statementHead}>
              <span>{resolved ? "IN SUBSECUTE" : "ON A BANK STATEMENT"}</span>
              <span>Example</span>
            </div>
            {ROWS.map((row) => (
              <div
                key={row.code}
                className={`${s.row} ${row.name ? s.flagged : ""}`}
              >
                <span className={s.date}>{row.date}</span>
                {row.name ? (
                  <span
                    className={`${s.desc} ${resolved ? s.resolved : s.unresolved}`}
                  >
                    <span className={s.code}>{row.code}</span>
                    <span className={s.named}>{row.name}</span>
                  </span>
                ) : (
                  <span className={s.desc}>
                    <span className={s.code}>{row.code}</span>
                  </span>
                )}
                <span className={s.amount}>{row.amount}</span>
              </div>
            ))}
          </div>
          <p className={s.caption} aria-live="polite">
            {resolved
              ? "Subscription records in Subsecute. Your bank statement stays unchanged."
              : "Merchant descriptions can be hard to recognise."}
          </p>
        </div>

        <div className={s.copy}>
          <h2 id="stmt-title">Which subscription was that?</h2>
          <p>
            A dedicated card keeps each subscription’s name and funding history
            together in Subsecute. Find the service you paid for without
            decoding a merchant description.
          </p>
          <button
            type="button"
            className={s.replay}
            onClick={() => setResolved((v) => !v)}
          >
            {resolved
              ? "Compare with a bank statement"
              : "See the Subsecute view"}
          </button>
        </div>
      </div>
    </section>
  );
}
