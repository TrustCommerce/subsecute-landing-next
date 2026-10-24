import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { businessPath } from "../pricing";
import {
  ArrowUpRight,
  CheckCircle,
  CreditCard,
  FileText,
} from "@phosphor-icons/react";
import { ToolLogo } from "../ui";
import { subscriptionTools } from "./content";

export function RenewalCard() {
  const [selected, setSelected] = useState(0);
  const tool = subscriptionTools[selected];
  return (
    <div className="b-landing-product">
      <div className="b-landing-product-top">
        <span className="b-landing-company-mark">
          <Image
            src="/business-assets/logo.svg"
            width={30}
            height={30}
            alt="Subsecute"
          />
        </span>
        <span>
          Forma Studio <small>Business account</small>
        </span>
        <span className="b-landing-avatar">AO</span>
      </div>
      <div className="b-landing-product-heading">
        <div>
          <span className="b-landing-overline">SUBSCRIPTIONS</span>
          <h3>Upcoming card funding</h3>
        </div>
        <span className="b-landing-count">3 subscriptions</span>
      </div>
      <div
        className="b-landing-product-tabs"
        aria-label="Business subscriptions"
      >
        {subscriptionTools.map((item, index) => (
          <button
            key={item.name}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
          >
            <ToolLogo name={item.name} />
            <span>{item.name}</span>
            <span className="b-landing-tool-amount">
              ${item.amount}
              <small>/mo</small>
            </span>
          </button>
        ))}
      </div>
      <div className="b-landing-renewal">
        <div className="b-landing-renewal-header">
          <span>
            <span className="b-landing-status-dot" /> Scheduled renewal
          </span>
          <span>{tool.date} 2026</span>
        </div>
        <div className="b-landing-renewal-amount">
          <strong>
            ${tool.amount}
            <span>.00</span>
          </strong>
          <span>
            Dedicated
            <br />
            dollar card
          </span>
        </div>
        <div className="b-landing-mini-card">
          <CreditCard size={22} />
          <span>SUBSECUTE BUSINESS</span>
          <span>•••• {tool.digits}</span>
        </div>
        <div className="b-landing-funding-note">
          <CheckCircle size={17} weight="fill" /> Scheduled funding from your
          wallet
        </div>
      </div>
      <Link
        href={businessPath("/dashboard/subscriptions")}
        className="b-landing-preview-link"
      >
        See how card funding works <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}

function PaymentRecord() {
  return (
    <div className="b-landing-receipt">
      <div className="b-landing-receipt-head">
        <FileText size={21} />
        <span>PAYMENT RECORDS</span>
      </div>
      <h3>
        Review the cost
        <br />
        of a payment.
      </h3>
      <p>What your payment record includes</p>
      <dl>
        <div>
          <dt>Card funding</dt>
          <dd>Amount in USD</dd>
        </div>
        <div>
          <dt>Naira principal</dt>
          <dd>Conversion cost</dd>
        </div>
        <div>
          <dt>Exchange margin</dt>
          <dd>Recorded margin</dd>
        </div>
        <div>
          <dt>Funding fee</dt>
          <dd>Recorded fee</dd>
        </div>
        <div className="b-landing-receipt-total">
          <dt>Total cost</dt>
          <dd>Amount in NGN</dd>
        </div>
      </dl>
      <span className="b-landing-receipt-reference">
        RECORDED AT THE TIME OF PAYMENT
      </span>
    </div>
  );
}

export function MechanismArtwork({ active }: { active: number }) {
  if (active === 2)
    return (
      <div className="b-landing-step-receipt">
        <PaymentRecord />
        <span className="b-landing-artifact-label">
          Company payment record · not a merchant invoice
        </span>
      </div>
    );
  if (active === 1)
    return (
      <div className="b-landing-schedule">
        <div className="b-landing-schedule-title">
          <span>September 2026</span>
          <span>Upcoming renewals</span>
        </div>
        <div className="b-landing-week">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <span key={i}>{day}</span>
          ))}
          {[14, 15, 16, 17, 18, 19, 20].map((day) => (
            <span className={day === 19 ? "selected" : ""} key={day}>
              {day}
            </span>
          ))}
        </div>
        <div className="b-landing-schedule-event">
          <ToolLogo name="Figma" large />
          <div>
            <strong>Figma renewal</strong>
            <span>19 September · $45.00</span>
          </div>
          <CheckCircle size={23} />
        </div>
        <div className="b-landing-schedule-timeline">
          <div>
            <i />
            <span>
              <strong>Before renewal</strong>Scheduled card funding
            </span>
          </div>
          <div>
            <i />
            <span>
              <strong>On renewal day</strong>The provider attempts payment
            </span>
          </div>
          <div>
            <i />
            <span>
              <strong>After a charge</strong>Review the payment record
            </span>
          </div>
        </div>
        <small>Example schedule. Funding depends on your wallet balance.</small>
      </div>
    );
  return (
    <div className="b-landing-card-stack">
      {subscriptionTools.map((tool, i) => (
        <div className={`b-landing-dollar-card card-${i}`} key={tool.name}>
          <div>
            <ToolLogo name={tool.name} />
            <span>{tool.name}</span>
            <span>USD</span>
          </div>
          <span className="b-landing-card-digits">
            •••• &nbsp; •••• &nbsp; •••• &nbsp; {tool.digits}
          </span>
          <footer>
            <span>FORMA STUDIO</span>
            <Image
              src="/business-assets/logo.svg"
              width="22"
              height="27"
              alt="Subsecute"
            />
          </footer>
        </div>
      ))}
      <span className="b-landing-artifact-label">
        Example subscription cards
      </span>
    </div>
  );
}
