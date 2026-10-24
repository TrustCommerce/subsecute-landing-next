import { Plus } from "@phosphor-icons/react";
import { BUSINESS_FAQS } from "@/lib/business-faqs";

export function FaqSection() {
  return (
    <section className="b-landing-faq" id="questions">
      <div>
        <h2>Questions about Subsecute Business.</h2>
        <p>What the cards do, how funding works and what to expect.</p>
      </div>
      <div className="b-landing-faq-list">
        {BUSINESS_FAQS.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <Plus size={20} />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
