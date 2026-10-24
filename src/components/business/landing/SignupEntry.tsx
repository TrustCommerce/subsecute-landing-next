import { ArrowRight } from "@phosphor-icons/react";
import styles from "./Opening.module.css";

export function SignupEntry({ onRequest }: { onRequest: () => void }) {
  return (
    <div className={styles.entry}>
      <button className="b-button primary" type="button" onClick={onRequest}>
        Request access <ArrowRight size={18} aria-hidden="true" />
      </button>
      <p className={styles.accessNote}>Tell us a little about your business.</p>
    </div>
  );
}
