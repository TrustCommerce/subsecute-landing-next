"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Bank,
  CreditCard,
  Wallet,
  WhatsappLogo,
  ArrowDownRight,
  Check,
} from "@phosphor-icons/react";
import { ToolLogo } from "../ui";
import styles from "./FundingFlow.module.css";

const subscriptions = [
  { name: "Figma", last4: "4412", date: "In 3 days" },
  { name: "Notion", last4: "8216", date: "In 5 days" },
  { name: "ChatGPT", last4: "3042", date: "In 7 days" },
];
const expenses = [
  { name: "Team travel", holder: "ADA OKAFOR", last4: "2048" },
  { name: "Project expenses", holder: "MUSA IBRAHIM", last4: "7631" },
];
type Connection = {
  id: string;
  path: string;
  reminder?: boolean;
  delay: number;
};

export function FundingFlow() {
  const stage = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const motion = () =>
      setRunning(visible && !document.hidden && !preference.matches);
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        motion();
      },
      { threshold: 0.1 },
    );
    visibility.observe(root);
    document.addEventListener("visibilitychange", motion);
    preference.addEventListener("change", motion);

    // Measure the actual cards so connectors also fit wrapped text and mobile layouts.
    const measure = () => {
      const bounds = root.getBoundingClientRect();
      const mobile = window.matchMedia("(max-width: 850px)").matches;
      const box = (id: string) => {
        const node = root.querySelector<HTMLElement>(
          `[data-flow-node="${id}"]`,
        )!;
        const rect = node.getBoundingClientRect();
        return {
          left: rect.left - bounds.left,
          right: rect.right - bounds.left,
          top: rect.top - bounds.top,
          bottom: rect.bottom - bounds.top,
          x: rect.left - bounds.left + rect.width / 2,
          y: rect.top - bounds.top + rect.height / 2,
        };
      };
      const payment = box("payment"),
        wallet = box("wallet"),
        reminder = box("reminder");
      const paths: Connection[] = [
        {
          id: "wallet-in",
          delay: 0,
          path: mobile
            ? `M ${payment.x} ${payment.bottom} L ${wallet.x} ${wallet.top}`
            : `M ${payment.right} ${payment.y} L ${wallet.left} ${wallet.y}`,
        },
      ];
      subscriptions.forEach((_, index) => {
        const card = box(`subscription-${index}`);
        const fork = (wallet.right + card.left) / 2;
        paths.push({
          id: `subscription-${index}`,
          delay: index * 0.65 + 0.6,
          path: mobile
            ? `M ${wallet.left} ${wallet.y} H 16 V ${card.y} H ${card.left}`
            : Math.abs(card.y - wallet.y) < 24
              ? `M ${wallet.right} ${wallet.y} H ${card.left}`
              : `M ${wallet.right} ${wallet.y} H ${fork - 12} Q ${fork} ${wallet.y} ${fork} ${wallet.y + (card.y > wallet.y ? 12 : -12)} V ${card.y + (card.y > wallet.y ? -12 : 12)} Q ${fork} ${card.y} ${fork + 12} ${card.y} H ${card.left}`,
        });
        const junction = (card.right + reminder.left) / 2;
        paths.push({
          id: `notice-${index}`,
          reminder: true,
          delay: index * 0.65 + 2,
          path: mobile
            ? `M ${card.right} ${card.y} H ${bounds.width - 16} V ${reminder.y} H ${reminder.right}`
            : `M ${card.right} ${card.y} C ${junction} ${card.y}, ${junction} ${reminder.y}, ${reminder.left} ${reminder.y}`,
        });
      });
      expenses.forEach((_, index) => {
        const card = box(`expense-${index}`);
        const bend = card.top - 30;
        paths.push({
          id: `expense-${index}`,
          delay: index * 0.85 + 1.1,
          path: mobile
            ? `M ${wallet.left} ${wallet.y} H 2 V ${bend - 12} Q 2 ${bend} 14 ${bend} H ${card.x - 12} Q ${card.x} ${bend} ${card.x} ${bend + 12} V ${card.top}`
            : `M ${wallet.x} ${wallet.bottom} V ${bend - 16} Q ${wallet.x} ${bend} ${wallet.x + 16} ${bend} H ${card.x - 16} Q ${card.x} ${bend} ${card.x} ${bend + 16} V ${card.top}`,
        });
      });
      setConnections(paths);
    };
    const resize = new ResizeObserver(measure);
    resize.observe(root);
    root
      .querySelectorAll<HTMLElement>("[data-flow-node]")
      .forEach((node) => resize.observe(node));
    return () => {
      resize.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", motion);
      preference.removeEventListener("change", motion);
    };
  }, []);

  useEffect(() => {
    if (running) svg.current?.unpauseAnimations();
    else svg.current?.pauseAnimations();
  }, [running, connections]);

  return (
    <section
      className={styles.section}
      id="funding-flow"
      aria-labelledby="funding-flow-title"
    >
      <div className={styles.heading}>
        <div>
          <h2 id="funding-flow-title">
            One company wallet. <br />A card for every purpose.
          </h2>
          <p id="funding-flow-description">
            Fund your Subsecute Business wallet in naira by bank transfer or
            saved card. Use it for virtual dollar subscription cards and team
            expense cards. Every admin and the cardholder receive WhatsApp
            reminders before renewals.
          </p>
        </div>
        <div className={styles.legend} aria-label="Diagram key">
          <span>
            <i /> Card funding
          </span>
          <span>
            <i className={styles.reminderKey} /> Renewal reminders
          </span>
        </div>
      </div>
      <div
        className={styles.stage}
        ref={stage}
        data-running={running}
        role="group"
        aria-label="Company funding and renewal reminders"
        aria-describedby="funding-flow-description"
      >
        <svg
          ref={svg}
          className={styles.connections}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <marker
              id="funding-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path
                d="M 1 1 L 9 5 L 1 9"
                fill="none"
                stroke="#b84b1c"
                strokeWidth="1.5"
              />
            </marker>
            <marker
              id="reminder-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path
                d="M 1 1 L 9 5 L 1 9"
                fill="none"
                stroke="#4b755c"
                strokeWidth="1.5"
              />
            </marker>
          </defs>
          {connections.map((connection) => (
            <g
              key={connection.id}
              className={
                connection.reminder ? styles.reminderLine : styles.fundingLine
              }
            >
              <path
                d={connection.path}
                className={styles.track}
                markerEnd={`url(#${connection.reminder ? "reminder-arrow" : "funding-arrow"})`}
              />
              <path d={connection.path} className={styles.movingDashes} />
              <circle r="4" className={styles.packet}>
                <animateMotion
                  path={connection.path}
                  dur="4.8s"
                  begin={`${-connection.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>

        <div className={styles.payment} data-flow-node="payment">
          <span className={styles.nodeIcon}>
            <Bank size={25} weight="regular" aria-hidden />
          </span>
          <h3>Your payment method</h3>
          <div className={styles.paymentOption}>
            <Bank size={17} aria-hidden /> Bank transfer
          </div>
          <div className={styles.paymentOption}>
            <CreditCard size={17} aria-hidden /> Saved company card
          </div>
        </div>

        <div className={styles.wallet} data-flow-node="wallet">
          <div className={styles.walletBrand}>
            <Image
              src="/business-assets/logo.svg"
              width={19}
              height={24}
              style={{ width: "auto", height: 24 }}
              alt=""
            />
            <span>subsecute</span>
            <Wallet size={22} aria-hidden />
          </div>
          <span className={styles.naira} aria-hidden>
            ₦
          </span>
          <h3>Company wallet</h3>
          <p>Your balance in naira</p>
          <div className={styles.walletFoot}>
            <span /> Ready for card funding
          </div>
        </div>

        <div className={styles.subscriptions}>
          <div className={styles.branchTitle}>
            <span>Subscription cards</span>
            <small>Scheduled funding</small>
          </div>
          {subscriptions.map((item, index) => (
            <div
              key={item.name}
              className={styles.subscription}
              data-flow-node={`subscription-${index}`}
              style={
                {
                  "--flow-delay": `${index * 0.65 + 1}s`,
                } as React.CSSProperties
              }
            >
              <div className={styles.cardTop}>
                <ToolLogo name={item.name} />
                <strong>{item.name}</strong>
                <span>USD</span>
              </div>
              <div className={styles.cardBottom}>
                <span>•••• {item.last4}</span>
                <small>Virtual subscription card</small>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.reminder} data-flow-node="reminder">
          <div className={styles.reminderHeader}>
            <WhatsappLogo size={23} aria-hidden />
            <span>Before the charge</span>
          </div>
          <h3>A renewal is coming up.</h3>
          <ul>
            {subscriptions.map((item) => (
              <li key={item.name}>
                <span>{item.name}</span>
                <span>
                  {item.date}
                  <Check size={14} aria-hidden />
                </span>
              </li>
            ))}
          </ul>
          <div className={styles.recipients}>
            <div className={styles.avatars} aria-hidden>
              <span>AO</span>
              <span>TB</span>
              <span>MI</span>
            </div>
            <p>
              Every admin <br />
              <strong>+ the cardholder</strong>
            </p>
          </div>
        </div>

        <div className={styles.expenseLabel}>
          <ArrowDownRight size={25} aria-hidden />
          <h3>
            For the rest of <br />
            your business spend.
          </h3>
          <p>
            Admin-approved funding. <br />A named owner for each card.
          </p>
        </div>
        <div className={styles.expenses}>
          <div className={styles.branchTitle}>
            <span>Expense cards</span>
            <small>Fund as needed</small>
          </div>
          {expenses.map((item, index) => (
            <div
              key={item.name}
              className={styles.expense}
              data-flow-node={`expense-${index}`}
            >
              <div className={styles.expenseBrand}>
                <span>subsecute</span>
                <CreditCard size={21} aria-hidden />
              </div>
              <h3>{item.name}</h3>
              <div className={styles.expenseDigits}>
                •••• <span>••••</span> {item.last4}
              </div>
              <div className={styles.expenseBottom}>
                <span>{item.holder}</span>
                <span>USD</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
