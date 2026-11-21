import { useEffect, useRef } from "react";
import { Plus } from "@phosphor-icons/react";
import { BUSINESS_FAQS } from "@/lib/business-faqs";
import { PricingSection } from "./PricingSection";

export function FaqSection() {
  const pricing = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const openPricing = () => {
      if (window.location.hash === "#pricing" && pricing.current) {
        pricing.current.open = true;
      }
    };
    const onLink = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        event.target.closest('a[href="#pricing"]') &&
        pricing.current
      ) {
        pricing.current.open = true;
      }
    };
    openPricing();
    window.addEventListener("hashchange", openPricing);
    document.addEventListener("click", onLink);
    return () => {
      window.removeEventListener("hashchange", openPricing);
      document.removeEventListener("click", onLink);
    };
  }, []);
  return (
    <section className="b-landing-faq" id="questions">
      <div>
        <h2>FAQs</h2>
        <p>Cards, funding and getting started.</p>
      </div>
      <div className="b-landing-faq-list">
        {BUSINESS_FAQS.map(([question, answer]) => {
          const isPricing =
            question === "Do you offer naira cards, and what do cards cost?";
          return (
            <details
              key={question}
              id={isPricing ? "pricing" : undefined}
              ref={isPricing ? pricing : undefined}
            >
              <summary>
                {question}
                <Plus size={20} />
              </summary>
              <p>{answer}</p>
              {isPricing && <PricingSection />}
            </details>
          );
        })}
      </div>
    </section>
  );
}
