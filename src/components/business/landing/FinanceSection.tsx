import { useProductTour } from "./useProductTour";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Table,
  Receipt,
} from "@phosphor-icons/react";
import "./ProductProof.css";
import "./FinanceMotion.css";

const documents = [
  {
    name: "Funding record",
    format: "Record",
    Icon: Receipt,
    detail:
      "Open a payment to see the naira principal, exchange margin and funding fee separately.",
  },
  {
    name: "Company statement",
    format: "PDF",
    Icon: FileText,
    detail:
      "Choose a period and download your company’s wallet movements. Saved-card payments are listed separately.",
  },
  {
    name: "CSV export",
    format: "CSV",
    Icon: Table,
    detail:
      "Review amounts, exchange rates and fees in your spreadsheet. Transaction references stay in the file.",
  },
] as const;

function FundingRecord() {
  return (
    <>
      <div className="bp-document-overline">CARD FUNDING · 19 OCT 2026</div>
      <h3>Figma</h3>
      <p>Company wallet → card •••• 4412</p>
      <p className="bp-document-amount">US$60.00</p>
      <p>Added to the card, not a merchant purchase</p>
      <dl className="bp-facts">
        <div>
          <dt>Rate paid</dt>
          <dd>₦1,300 / US$1</dd>
        </div>
        <div>
          <dt>Naira principal</dt>
          <dd>₦74,400</dd>
        </div>
        <div>
          <dt>Exchange margin</dt>
          <dd>₦3,600</dd>
        </div>
        <div>
          <dt>Funding fee</dt>
          <dd>₦0</dd>
        </div>
        <div className="bp-total">
          <dt>Total wallet debit</dt>
          <dd>₦78,000</dd>
        </div>
      </dl>
    </>
  );
}

function SupportingDocument({ csv }: { csv: boolean }) {
  return (
    <>
      <div className="bp-document-overline">
        {csv ? "ACCOUNTING EXPORT · CSV" : "COMPANY STATEMENT · PDF"}
      </div>
      <h3>{csv ? "Funding transactions" : "October 2026"}</h3>
      <p>
        {csv
          ? "Open the export in a spreadsheet to review dates, amounts, exchange rates and fees."
          : "Forma Studio · Company wallet movements"}
      </p>
      {csv ? (
        <dl className="bp-facts">
          <div>
            <dt>Date</dt>
            <dd>19 Oct 2026</dd>
          </div>
          <div>
            <dt>Card funding</dt>
            <dd>US$60.00</dd>
          </div>
          <div>
            <dt>Rate paid</dt>
            <dd>₦1,300 / US$1</dd>
          </div>
          <div>
            <dt>Total naira cost</dt>
            <dd>₦78,000</dd>
          </div>
        </dl>
      ) : (
        <dl className="bp-facts">
          <div>
            <dt>Opening balance</dt>
            <dd>₦250,000</dd>
          </div>
          <div>
            <dt>19 Oct · Figma card funding</dt>
            <dd>−₦78,000</dd>
          </div>
          <div className="bp-total">
            <dt>Closing balance</dt>
            <dd>₦172,000</dd>
          </div>
        </dl>
      )}
      <p className="bp-document-footer">
        {csv
          ? "References stay with each transaction."
          : "Saved-card payments are listed separately."}
      </p>
    </>
  );
}

export function FinanceSection() {
  const tour = useProductTour(documents.length, 6500);
  const selected = tour.selected;
  return (
    <section
      className="bp-section"
      id="finance-records"
      aria-labelledby="finance-title"
    >
      <div className="bp-finance" {...tour.regionProps}>
        <div>
          <h2 id="finance-title">Send the records to your accountant.</h2>
          <p>
            Review the dollars funded, naira debited, exchange margin and fees
            for each payment. Records retain the rate used at the time.
          </p>
          <ul className="bf-file-list" aria-label="Example finance records">
            {documents.map(({ name, format, Icon, detail }, index) => (
              <li key={name} data-active={selected === index}>
                <button
                  type="button"
                  id={`finance-file-${index}`}
                  aria-label={`Preview ${name.toLowerCase()}`}
                  aria-pressed={selected === index}
                  aria-controls="finance-panel"
                  onClick={() => {
                    tour.select(index);
                    if (window.matchMedia("(max-width: 800px)").matches) {
                      document.getElementById("finance-panel")?.scrollIntoView({
                        behavior: tour.reducedMotion ? "instant" : "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  <Icon size={26} aria-hidden="true" />
                  <span>
                    {name}
                    <small>{format}</small>
                  </span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
                <p>{detail}</p>
              </li>
            ))}
          </ul>
          <a className="bp-link" href="#workspace-features">
            See all features <ArrowUpRight size={17} />
          </a>
          <p className="bp-example-label">
            Illustrative records, not a live exchange quote. Keep the vendor’s
            invoice separately for each purchase.
          </p>
        </div>
        <div
          className="bf-finance-demo"
          data-visible={tour.regionProps["data-visible"]}
          data-running={tour.running}
        >
          <div
            className="bf-paper-deck"
            role="region"
            aria-labelledby={`finance-file-${selected}`}
            tabIndex={0}
            id="finance-panel"
          >
            {documents.map(({ name }, index) => (
              <div
                key={name}
                className="bp-document bf-paper"
                data-active={selected === index}
                data-side={index < selected ? "before" : "after"}
                aria-hidden={selected !== index}
                inert={selected !== index}
              >
                <div className="bp-document-brand">
                  <Image
                    src="/business-assets/logo.svg"
                    width={22}
                    height={26}
                    alt=""
                  />
                  subsecute
                </div>
                {index === 0 ? (
                  <FundingRecord key={tour.revision} />
                ) : (
                  <SupportingDocument key={tour.revision} csv={index === 2} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
