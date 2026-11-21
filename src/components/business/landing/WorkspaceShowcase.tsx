import Image from "next/image";
import {
  SquaresFour,
  Stack,
  CreditCard,
  Wallet,
  Receipt,
  Users,
} from "@phosphor-icons/react";
import { ToolLogo } from "../ui";
import { TourTabs } from "./TourTabs";
import { useProductTour } from "./useProductTour";
import styles from "./WorkspaceShowcase.module.css";

const views = [
  [
    {
      name: "Figma",
      detail: "In 3 days · Monthly",
      amount: "US$60.00",
      logo: true,
    },
    {
      name: "Notion",
      detail: "In 5 days · Monthly",
      amount: "US$24.00",
      logo: true,
    },
    {
      name: "ChatGPT",
      detail: "In 7 days · Monthly",
      amount: "US$20.00",
      logo: true,
    },
  ],
  [
    {
      name: "Meta Ads",
      detail: "Tops up below US$100",
      amount: "US$500.00",
      logo: true,
    },
    {
      name: "AWS",
      detail: "Tops up below US$50",
      amount: "US$200.00",
      logo: true,
    },
  ],
  [
    {
      name: "Ada Okafor",
      detail: "Team travel · NGN",
      amount: "₦50,000.00",
      logo: false,
    },
    {
      name: "Musa Ibrahim",
      detail: "Project expenses · USD",
      amount: "US$150.00",
      logo: false,
    },
  ],
];
const navigation = [
  { label: "Overview", Icon: SquaresFour },
  { label: "Subscriptions", Icon: Stack },
  { label: "Expense cards", Icon: CreditCard },
  { label: "Spend", Icon: Receipt },
  { label: "Wallet", Icon: Wallet },
  { label: "People", Icon: Users },
];

export function WorkspaceShowcase() {
  const tour = useProductTour(3, 6500);
  return (
    <div id="workspace-preview" className={styles.frame} {...tour.regionProps}>
      <aside className={styles.sidebar} aria-hidden="true">
        <Image src="/business-assets/logo.svg" width={26} height={30} alt="" />
        <div className={styles.company}>
          <span>F</span>
          <strong>
            Forma Studio<small>Business workspace</small>
          </strong>
        </div>
        <div className={styles.navigation}>
          {navigation.map(({ label, Icon }, index) => (
            <span key={label} data-active={index === 0}>
              <Icon size={18} />
              {label}
            </span>
          ))}
        </div>
        <div className={styles.account}>
          <span>AO</span>
          <strong>
            Ada Okafor<small>Workspace admin</small>
          </strong>
        </div>
      </aside>
      <div className={styles.main}>
        <div className={styles.topbar}>
          <span>
            Business workspace <span aria-hidden="true">/</span> Overview
          </span>
          <span className={styles.avatar}>AO</span>
        </div>
        <div className={styles.content}>
          <header className={styles.greeting}>
            <span>This month</span>
            <h3>
              Good morning, Ada<span>.</span>
            </h3>
            <p>Your cards, renewals and requests.</p>
          </header>
          <dl className={styles.metrics}>
            <div>
              <dt>Company wallet</dt>
              <dd>
                ₦250,000<span>.00</span>
              </dd>
            </div>
            <div>
              <dt>Scheduled funding</dt>
              <dd>
                US$104<span>.00</span>
              </dd>
            </div>
            <div>
              <dt>Awaiting review</dt>
              <dd>02</dd>
            </div>
          </dl>
          <div className={styles.cards}>
            <TourTabs
              id="workspace"
              label="Company card types"
              tour={tour}
              tabs={[
                { label: "Subscriptions" },
                { label: "Usage-based" },
                { label: "Expense cards" },
              ]}
            />
            <div className={styles.columnLabels} aria-hidden="true">
              <span>{tour.selected === 2 ? "Cardholder" : "Service"}</span>
              <span>
                {tour.selected === 0
                  ? "Scheduled amount"
                  : tour.selected === 1
                    ? "Top-up amount"
                    : "Card balance"}
              </span>
            </div>
            <div
              id="workspace-panel"
              role="tabpanel"
              aria-labelledby={`workspace-tab-${tour.selected}`}
              tabIndex={0}
              className={styles.panel}
            >
              <ul key={tour.selected} className={styles.rows}>
                {views[tour.selected].map((row) => (
                  <li key={row.name}>
                    {row.logo ? (
                      <ToolLogo name={row.name} />
                    ) : (
                      <span className={styles.person}>
                        {row.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                    <div>
                      <strong>{row.name}</strong>
                      <small>{row.detail}</small>
                    </div>
                    <strong className={styles.amount}>{row.amount}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
