import { Plus } from "@phosphor-icons/react";

export function FaqSection() {
  return (
    <section className="b-landing-faq" id="questions">
      <div>
        <h2>Questions about Subsecute Business.</h2>
        <p>What the cards do, how funding works and what to expect.</p>
      </div>
      <div className="b-landing-faq-list">
        {[
          [
            "Who receives the WhatsApp renewal reminders?",
            "Every company admin and the subscription cardholder. If the card has no holder, only admins receive it. Other team members are not notified.",
          ],
          [
            "How are subscription cards and expense cards different?",
            "A subscription card is for one recurring tool, with its own funding amount and schedule. An expense card is for approved team purchases. Give it an owner and add the amount they need. Its funded balance is not a recurring monthly spending limit.",
          ],
          [
            "What do I need before I can use a card?",
            "Complete the required business and administrator checks, then create and fund the card. For an existing subscription, add the new card as the payment method with the software provider. Creating it in Subsecute does not change the provider’s billing details.",
          ],
          [
            "Can I fund a card from my wallet or a saved card?",
            "Yes. For manual funding, choose the company wallet or an eligible saved card and review the cost before confirming. Scheduled subscription funding uses the company’s naira wallet, so keep enough available for the next funding run. Funding adds dollars to the card; the merchant charges it separately. Merchant acceptance is not guaranteed.",
          ],
          [
            "Can I pause or cancel a subscription?",
            "An Admin can pause, resume or cancel a subscription in Subsecute. Pausing is reversible, and applicable monthly card fees continue while it is paused. Cancellation closes the card permanently; it does not end your agreement with the software provider. Cancel with the provider too if you no longer want the service.",
          ],
          [
            "Who can freeze an expense card?",
            "The company Admin or the card’s assigned holder can freeze it. A holder can unfreeze a card they froze themselves; an Admin must lift an Admin freeze. Check the confirmed card status after requesting a change.",
          ],
          [
            "What does Subsecute Business cost?",
            "There is no monthly membership fee. Each card costs US$1 to open and US$1 per month while it stays open. Wallet-funded card top-ups carry no Subsecute processing fee. Review the total for your chosen payment source before confirming.",
          ],
          [
            "What can I send to my accountant?",
            "Download a PDF company statement or a CSV export. Statements include company-wallet movements and identify saved-card debits separately. Funding records show the recorded naira cost, exchange rate and fees where available. A card top-up is not a merchant purchase, and a Subsecute statement is not the vendor’s invoice.",
          ],
          [
            "Can I connect my accounting software?",
            "Direct accounting integrations are not available. Download a CSV export to work with the records in a spreadsheet. Keep vendor invoices and receipts separately.",
          ],
        ].map(([question, answer]) => (
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
