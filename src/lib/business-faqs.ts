// The answers rendered on the business landing page, and the FAQPage
// schema, from one array. The consumer side learned this the hard way: when
// the visible copy and the schema are maintained separately they drift, and
// a FAQPage whose answers differ from the page is a Google policy violation.
// See src/lib/consumer-faqs.ts, which exists for the same reason.
export const BUSINESS_FAQS = [
  [
    "Who receives the WhatsApp renewal reminders?",
    "All company admins and the assigned cardholder. If no cardholder is assigned, only admins are notified.",
  ],
  [
    "How are subscription cards and expense cards different?",
    "Subscription cards fund recurring tools on a schedule. Expense cards are assigned to team members and funded for company purchases.",
  ],
  [
    "What do I need before I can use a card?",
    "Complete company and director verification, then create and fund your card. Add the card as your payment method with the service provider.",
  ],
  [
    "Can I fund a card from my wallet or a saved card?",
    "Expense-card funding can use your company wallet or default saved card. Subscription top-ups and scheduled funding use the company wallet. Review the total before confirming.",
  ],
  [
    "Can I pause or cancel a subscription?",
    "Admins can pause, resume or cancel subscriptions. Monthly card fees continue while paused. Cancellation permanently closes the card; cancel separately with the provider to end the service.",
  ],
  [
    "Who can stop an expense card?",
    "Admins and assigned cardholders can stop a card. Cardholders can restart cards they stopped; only an admin can restart an admin-stopped card.",
  ],
  [
    "What does Subsecute Business cost?",
    "There is no monthly membership fee. Card issuance, upkeep and funding fees are shown before you confirm. Eligible launch offers are reflected in your quote.",
  ],
  [
    "What can I send to my accountant?",
    "Download statements as PDF or CSV. Wallet movements and saved-card payments are listed separately. Funding records include recorded costs, exchange rates and fees where available.",
  ],
  [
    "Does Subsecute Business work for companies outside Nigeria?",
    "No. Subsecute Business is for companies registered in Nigeria, funding cards from a naira wallet.",
  ],
  [
    "Can I connect my accounting software?",
    "Direct accounting integrations are not available. Export records as CSV and attach vendor receipts to matching transactions in the workspace.",
  ],
] as const;
