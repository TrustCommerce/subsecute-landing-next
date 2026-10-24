import { useProductTour } from "./useProductTour";
import { TourTabs } from "./TourTabs";
import Image from "next/image";
import {
  ArrowUpRight,
  CreditCard,
  FileText,
  SquaresFour,
  Wallet,
} from "@phosphor-icons/react";
import { ToolLogo } from "../ui";
import styles from "./Opening.module.css";

const subscriptions = [
  {
    name: "Figma",
    owner: "Design seats",
    amount: "$60.00",
    date: "26 Oct",
    digits: "4412",
  },
  {
    name: "Notion",
    owner: "Company wiki",
    amount: "$24.00",
    date: "28 Oct",
    digits: "8216",
  },
  {
    name: "ChatGPT",
    owner: "AI tools",
    amount: "$20.00",
    date: "30 Oct",
    digits: "3042",
  },
];
const expenses = [
  {
    name: "AO",
    owner: "Ada Okafor",
    amount: "$150.00",
    purpose: "Design resources",
    digits: "2048",
  },
  {
    name: "NI",
    owner: "Nneka Ibrahim",
    amount: "$80.00",
    purpose: "Team learning",
    digits: "3916",
  },
];

export function WorkspaceShowcase() {
  const tour = useProductTour(2);
  const view = tour.selected === 0 ? "subscriptions" : "expenses";
  return (
    <div
      className={styles.showcase}
      id="workspace-preview"
      {...tour.regionProps}
    >
      <div className={styles.workspace}>
        <aside className={styles.rail} aria-label="Example workspace sections">
          <Image
            src="/business-assets/logo.svg"
            width={28}
            height={32}
            alt="Subsecute"
          />
          <span>
            <SquaresFour size={18} /> Overview
          </span>
          <span className={styles.railActive}>
            <CreditCard size={18} /> Company cards
          </span>
          <span>
            <Wallet size={18} /> Wallet
          </span>
          <span>
            <FileText size={18} /> Records
          </span>
          <small>
            Forma Studio
            <br />
            Business account
          </small>
        </aside>
        <div className={styles.workspaceBody}>
          <div className={styles.workspaceTop}>
            <span>
              Forma Studio{" "}
              <span className={styles.exampleTag}>Example account</span>
            </span>
            <span className={styles.avatar}>AO</span>
          </div>
          <div className={styles.workspaceTitle}>
            <div>
              <h2>Company overview</h2>
            </div>
            <span>October 2026</span>
          </div>
          <div className={styles.metrics}>
            <div>
              <span>Company wallet</span>
              <strong>
                ₦250,000<span>.00</span>
              </strong>
              <small>Available for company funding</small>
            </div>
            <div>
              <span>Scheduled card funding</span>
              <strong>
                US$104<span>.00</span>
              </strong>
              <small>3 subscriptions · next 14 days</small>
            </div>
            <a href="#expense-cards">
              <span>Team requests</span>
              <strong>
                02 <ArrowUpRight size={22} />
              </strong>
              <small>Waiting for Admin review</small>
            </a>
          </div>
          <div className={styles.workspaceBottom}>
            <div className={styles.cardList}>
              <TourTabs
                id="workspace"
                label="Company card types"
                tour={tour}
                tabs={[{ label: "Subscriptions" }, { label: "Expense cards" }]}
              />
              <div
                className="bl-ledger-viewport"
                id="workspace-panel"
                role="tabpanel"
                aria-labelledby={`workspace-tab-${tour.selected}`}
                tabIndex={0}
              >
                <div className={styles.listLabels}>
                  <span>
                    {view === "subscriptions" ? "Subscription" : "Cardholder"}
                  </span>
                  <span>
                    {view === "subscriptions" ? "Next funding" : "Purpose"}
                  </span>
                  <span>
                    {view === "subscriptions" ? "Amount" : "Card balance"}
                  </span>
                </div>
                <div
                  className={`${styles.rows} bl-ledger`}
                  key={`${view}-${tour.revision}`}
                >
                  {view === "subscriptions"
                    ? subscriptions.map((item) => (
                        <div className={`${styles.row} bt-row`} key={item.name}>
                          <div>
                            <ToolLogo name={item.name} />
                            <span>
                              <strong>{item.name}</strong>
                              <small>
                                Label: {item.owner} · •••• {item.digits}
                              </small>
                            </span>
                          </div>
                          <span>{item.date}</span>
                          <strong>{item.amount}</strong>
                        </div>
                      ))
                    : expenses.map((item) => (
                        <div
                          className={`${styles.row} bt-row`}
                          key={item.digits}
                        >
                          <div>
                            <span className={styles.avatar}>{item.name}</span>
                            <span>
                              <strong>{item.owner}</strong>
                              <small>Active · •••• {item.digits}</small>
                            </span>
                          </div>
                          <span>{item.purpose}</span>
                          <strong>{item.amount}</strong>
                        </div>
                      ))}
                </div>
              </div>
            </div>
            <aside
              className={`${styles.request} bt-swap`}
              key={`request-${view}`}
            >
              <span>REQUEST TO ADD MONEY</span>
              <div className={styles.requestOwner}>
                <span className={styles.avatar}>AO</span>
                <strong>
                  Ada Okafor<small>Expense card · •••• 2048</small>
                </strong>
              </div>
              <p>Design assets for the launch</p>
              <strong className={styles.requestAmount}>US$60.00</strong>
              <span className={styles.waiting}>Waiting for approval</span>
              <a href="#expense-cards">
                See how requests work <ArrowUpRight size={16} />
              </a>
            </aside>
          </div>
        </div>
      </div>
      <p className={styles.showcaseCaption}>
        One workspace for subscriptions, expense cards and company funding.
      </p>
    </div>
  );
}
