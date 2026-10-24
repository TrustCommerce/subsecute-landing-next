import { useProductTour } from "./useProductTour";
import { BellRinging, Check, WhatsappLogo } from "@phosphor-icons/react";
import { ToolLogo } from "../ui";
import styles from "./RenewalWarning.module.css";

export function RenewalWarning() {
  const tour = useProductTour(2, 7000);
  const adminHoldsCard = tour.selected === 1;
  const recipients = [
    {
      name: "Ada Okafor",
      role: adminHoldsCard ? "Admin · cardholder" : "Admin",
      initials: "AO",
    },
    { name: "Tunde Bello", role: "Admin", initials: "TB" },
    ...(!adminHoldsCard
      ? [{ name: "Musa Ibrahim", role: "Cardholder", initials: "MI" }]
      : []),
  ];
  return (
    <div className={styles.warning} id="renewal-warnings" {...tour.regionProps}>
      <div className={styles.messageSide}>
        <div className={styles.channel}>
          <WhatsappLogo size={22} aria-hidden="true" />
          <span>WhatsApp renewal reminder</span>
        </div>
        <div className={styles.message}>
          <div className={styles.sender}>
            <BellRinging size={20} aria-hidden="true" /> Subsecute Business
          </div>
          <h2>Figma renews on 26 Oct.</h2>
          <p>Check your company wallet before the next scheduled funding.</p>
          <div className={styles.subscription}>
            <ToolLogo name="Figma" />
            <span>
              Figma <small>Subscription card · •••• 4412</small>
            </span>
            <strong>US$60</strong>
          </div>
        </div>
        <p className={styles.caption}>
          Illustrative reminder and company details.
        </p>
      </div>
      <div className={styles.routing}>
        <h3>Who gets the reminder?</h3>
        <p>
          Every admin and the cardholder. If an admin holds the card, they
          receive it once.
        </p>
        <ul
          key={String(adminHoldsCard)}
          className={styles.recipients}
          aria-live={tour.running ? "off" : "polite"}
        >
          {recipients.map((person) => (
            <li key={person.name}>
              <span className={styles.avatar}>{person.initials}</span>
              <span>
                <strong>{person.name}</strong>
                <small>{person.role}</small>
              </span>
              <span className={styles.once}>
                <Check size={15} aria-hidden="true" /> One reminder
              </span>
            </li>
          ))}
        </ul>
        <label className={styles.scenario}>
          <input
            type="checkbox"
            checked={adminHoldsCard}
            onChange={(event) => tour.select(event.target.checked ? 1 : 0)}
          />
          See when an admin holds the card
        </label>
        <span className={styles.excluded}>
          Other team members are not notified.
        </span>
      </div>
    </div>
  );
}
