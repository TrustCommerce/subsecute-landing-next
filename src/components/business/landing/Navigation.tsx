import { useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { Brand } from "../ui";

export function LandingNavigation({ onRequest }: { onRequest: () => void }) {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <header className="b-landing-nav">
        <Brand />
        <nav
          id="business-navigation"
          aria-label="Business navigation"
          className={menu ? "is-open" : ""}
        >
          <a onClick={() => setMenu(false)} href="#business-cards">
            Subscriptions
          </a>
          <a onClick={() => setMenu(false)} href="#how-it-works">
            How it works
          </a>
          <a onClick={() => setMenu(false)} href="#workspace-features">
            Features
          </a>
          <a onClick={() => setMenu(false)} href="#finance-records">
            Records
          </a>
          <a onClick={() => setMenu(false)} href="#questions">
            FAQs
          </a>
        </nav>
        <div className="b-landing-nav-actions">
          <a className="b-landing-login" href="#card-controls">
            Card controls <ArrowUpRight size={15} />
          </a>
          <button
            className="b-button primary"
            type="button"
            onClick={() => {
              setMenu(false);
              onRequest();
            }}
          >
            Request access <ArrowUpRight size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="b-landing-menu-button"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="business-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </header>
    </>
  );
}

export function LandingFooter() {
  return (
    <footer className="b-landing-footer">
      <div>
        <Brand />
        <p>Subscription reminders, dollar cards and team expenses.</p>
      </div>
      <nav aria-label="Footer">
        <a href="#how-it-works">How it works</a>
        <a href="#workspace-features">Features</a>
        <a href="#finance-records">Payment records</a>
        <a href="https://www.subsecute.com/">
          Subsecute Personal <ArrowUpRight size={14} />
        </a>
      </nav>
      <div className="b-landing-footer-bottom">
        <span>© {new Date().getFullYear()} Subsecute</span>
        <span>Built for businesses in Nigeria.</span>
      </div>
    </footer>
  );
}
