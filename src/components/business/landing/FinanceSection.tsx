import {
  FUNDING_EXAMPLE as example,
  BUSINESS_PRICING,
  naira,
  dollars,
} from "@/lib/business-pricing";
import { useProductTour } from "./useProductTour";
import Image from "next/image";
import { ArrowRight, FileText, Table, Receipt } from "@phosphor-icons/react";
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
      <div className="bp-document-overline">CARD FUNDING · THIS MONTH</div>
      <div className="bp-document-title">Figma</div>
      <p>Company wallet → card •••• 4412</p>
      <p className="bp-document-amount">{dollars(example.cardAmountUsd)}</p>
      <dl className="bp-facts">
        <div>
          <dt>Base exchange rate</dt>
          <dd>{naira(example.baseRate)} / US$1</dd>
        </div>
        <div>
          <dt>Naira principal</dt>
          <dd>{naira(example.principal)}</dd>
        </div>
        <div>
          <dt>
            Exchange margin ({naira(BUSINESS_PRICING.exchangeMarginPerUsd)}
            /US$1)
          </dt>
          <dd>{naira(example.margin)}</dd>
        </div>
        <div>
          <dt>Card funding fee ({BUSINESS_PRICING.fundingPercent}%)</dt>
          <dd>{naira(example.fundingFee)}</dd>
        </div>
        <div className="bp-total">
          <dt>Total wallet debit</dt>
          <dd>{naira(example.total)}</dd>
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
      <div className="bp-document-title">
        {csv ? "Funding transactions" : "This month"}
      </div>
      <p>
        {csv
          ? "Funding amounts, costs and references."
          : "Forma Studio · Wallet statement"}
      </p>
      {csv ? (
        <dl className="bp-facts">
          <div>
            <dt>Date</dt>
            <dd>This month</dd>
          </div>
          <div>
            <dt>Card funding</dt>
            <dd>{dollars(example.cardAmountUsd)}</dd>
          </div>
          <div>
            <dt>Base exchange rate</dt>
            <dd>{naira(example.baseRate)} / US$1</dd>
          </div>
          <div>
            <dt>Total naira cost</dt>
            <dd>{naira(example.total)}</dd>
          </div>
          <div>
            <dt>Closing balance</dt>
            <dd>{naira(example.closing)}</dd>
          </div>
        </dl>
      ) : (
        <dl className="bp-facts">
          <div>
            <dt>Opening balance</dt>
            <dd>{naira(example.opening)}</dd>
          </div>
          <div>
            <dt>Figma card funding</dt>
            <dd>−{naira(example.total)}</dd>
          </div>
          <div className="bp-total">
            <dt>Closing balance</dt>
            <dd>{naira(example.closing)}</dd>
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
          <h2 id="finance-title">Clear records for your accountant.</h2>
          <p>
            Download statements and CSV records with the costs recorded for each
            payment.
          </p>
          <ul className="bf-file-list" aria-label="Example finance records">
            {documents.map(({ name, format, Icon }, index) => (
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
              </li>
            ))}
          </ul>
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
