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
          {[
            ["#how-it-works", "How it works"],
            ["#pricing", "Pricing"],
            ["#questions", "FAQs"],
          ].map(([href, label]) => (
            <a key={href} onClick={() => setMenu(false)} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="b-landing-nav-actions">
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
        <p>Subsecute Business is a product of TrustCommerce Resources Ltd.</p>
      </div>
      <nav aria-label="Footer">
        <a href="#how-it-works">How it works</a>
        <a href="#pricing">Pricing</a>
        <a href="mailto:support@subsecute.com">support@subsecute.com</a>
        <a href="https://www.subsecute.com/privacy-policy.html">Privacy</a>
        <a href="https://www.subsecute.com/terms-of-service.html">Terms</a>
        <a href="#finance-records">Payment records</a>
        <a href="https://www.subsecute.com/">
          Subsecute Personal <ArrowUpRight size={14} />
        </a>
      </nav>
      <div className="b-landing-footer-bottom">
        <span>© {new Date().getFullYear()} Subsecute</span>
        <span>Cards are provided by our issuing partners.</span>
      </div>
    </footer>
  );
}
