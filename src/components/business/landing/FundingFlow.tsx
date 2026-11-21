"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Bank,
  CreditCard,
  Wallet,
  WhatsappLogo,
  Check,
} from "@phosphor-icons/react";
import { ToolLogo } from "../ui";
import styles from "./FundingFlow.module.css";

const cardGroups = [
  {
    id: "subscription",
    title: "Subscription cards",
    funding: "Scheduled funding",
    name: "Figma",
    last4: "4412",
    currency: "USD",
  },
  {
    id: "usage",
    title: "Usage-based cards",
    funding: "Threshold-based funding",
    name: "Meta Ads",
    last4: "5621",
    currency: "USD",
  },
  {
    id: "expense",
    title: "Expense cards",
    funding: "Admin-approved funding",
    name: "Team travel",
    last4: "2048",
    currency: "NGN",
  },
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
      cardGroups.forEach((group, index) => {
        const card = box(group.id);
        const fork = (wallet.right + card.left) / 2;
        paths.push({
          id: group.id,
          delay: index * 0.65 + 0.6,
          path: mobile
            ? `M ${wallet.left} ${wallet.y} H 10 V ${card.y} H ${card.left}`
            : Math.abs(card.y - wallet.y) < 24
              ? `M ${wallet.right} ${wallet.y} H ${card.left}`
              : `M ${wallet.right} ${wallet.y} H ${fork - 12} Q ${fork} ${wallet.y} ${fork} ${wallet.y + (card.y > wallet.y ? 12 : -12)} V ${card.y + (card.y > wallet.y ? -12 : 12)} Q ${fork} ${card.y} ${fork + 12} ${card.y} H ${card.left}`,
        });
        // Only scheduled subscriptions generate renewal reminders.
        if (group.id === "subscription") {
          const junction = (card.right + reminder.left) / 2;
          paths.push({
            id: "renewal-notice",
            reminder: true,
            delay: 2,
            path: mobile
              ? `M ${card.right} ${card.y} H ${bounds.width - 10} V ${reminder.y} H ${reminder.right}`
              : `M ${card.right} ${card.y} C ${junction} ${card.y}, ${junction} ${reminder.y}, ${reminder.left} ${reminder.y}`,
          });
        }
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
      aria-label="How company card funding works"
    >
      <div className={styles.legend} aria-label="Diagram key">
        <span>
          <i /> Card funding
        </span>
        <span>
          <i className={styles.reminderKey} /> Renewal reminders
        </span>
      </div>
      <div
        className={styles.stage}
        ref={stage}
        data-running={running}
        role="group"
        aria-label="Company funding and renewal reminders"
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
          <p className={styles.nodeTitle}>Payment method</p>
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
          <p className={styles.nodeTitle}>Company wallet</p>
          <p>Your balance in naira</p>
          <div className={styles.walletFoot}>
            <span /> Ready for card funding
          </div>
        </div>

        <div className={styles.groups}>
          {cardGroups.map((group) => (
            <div className={styles.cardGroup} key={group.id}>
              <div className={styles.branchTitle}>
                <p className={styles.nodeTitle}>{group.title}</p>
                <small>{group.funding}</small>
              </div>
              <div
                className={
                  group.id === "expense" ? styles.expense : styles.subscription
                }
                data-flow-node={group.id}
              >
                <div className={styles.cardTop}>
                  {group.id === "expense" ? (
                    <CreditCard size={25} aria-hidden />
                  ) : (
                    <ToolLogo name={group.name} />
                  )}
                  <strong>{group.name}</strong>
                  <span>{group.currency}</span>
                </div>
                <div className={styles.cardBottom}>
                  <span>•••• {group.last4}</span>
                  <small>
                    {group.id === "expense"
                      ? "ADA OKAFOR"
                      : "Virtual dollar card"}
                  </small>
                </div>
              </div>
              {group.id === "subscription" && (
                <div className={styles.subscription}>
                  <div className={styles.cardTop}>
                    <ToolLogo name="Notion" />
                    <strong>Notion</strong>
                    <span>USD</span>
                  </div>
                  <div className={styles.cardBottom}>
                    <span>•••• 8216</span>
                    <small>Virtual dollar card</small>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.reminder} data-flow-node="reminder">
          <div className={styles.reminderHeader}>
            <WhatsappLogo size={23} aria-hidden />
            <span>WhatsApp reminders</span>
          </div>
          <p className={styles.nodeTitle}>A renewal is coming up.</p>
          <ul>
            <li>
              <span>Figma</span>
              <span>
                In 3 days
                <Check size={14} aria-hidden />
              </span>
            </li>
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
      </div>
    </section>
  );
}
