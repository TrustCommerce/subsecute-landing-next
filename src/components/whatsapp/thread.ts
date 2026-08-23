/**
 * The conversation. Every reply here is something the assistant can actually
 * produce: each maps to a real tool (list_subscriptions, list_bill_schedules,
 * get_payment_history, list_gift_payments, request_cancel_subscription) and
 * follows its house style, which is why money reads "NGN 9,143" and dates
 * read "Sat 5 Sep" rather than using the naira sign.
 */

export type Msg = {
  id: string;
  from: "them" | "you";
  text: string;
  time: string;
  buttons?: readonly string[];
};

/** Plays on scroll. Two messages, then it hands over to the reader. */
export const INTRO: readonly Msg[] = [
  {
    id: "intro-1",
    from: "them",
    text: "Hi Sandra. Netflix renews Sat 5 Sep for NGN 9,143. We charge your saved card a few days before.",
    time: "21:38",
    buttons: ["Keep it", "Cancel subscription"],
  },
  {
    id: "intro-2",
    from: "them",
    text: "Anything else? Ask me about your subscriptions, your bills, what you spent, or your gift link.",
    time: "21:38",
  },
] as const;

export type Prompt = {
  id: string;
  /** What the reader taps, and what gets sent. */
  q: string;
  a: string;
  buttons?: readonly string[];
};

export const PROMPTS: readonly Prompt[] = [
  {
    id: "subs",
    q: "What am I subscribed to?",
    a: "Five: Netflix, Spotify Duo, OpenAI, Claude, and Esele's Twitch. Two of them renew this week.",
  },
  {
    id: "due",
    q: "What is due this week?",
    a: "Netflix on Sat 5 Sep, NGN 9,143. Mum's light on Sun 6 Sep, NGN 20,000. Both are covered.",
  },
  {
    id: "spend",
    q: "How much did I spend in August?",
    a: "NGN 38,412 across five subscriptions. The biggest was OpenAI at NGN 27,221.",
  },
  {
    id: "gifts",
    q: "Who has funded my gift link?",
    a: "Three people this month. Chinazor sent NGN 13,200 for Spotify Duo, Uncle Femi NGN 19,000 for DSTV.",
  },
  {
    id: "cancel",
    q: "Cancel my Twitch sub",
    a: "Sent you a confirmation for Esele's Twitch. Nothing happens until you tap it.",
    buttons: ["Confirm cancel", "Keep it"],
  },
] as const;

/** How long the intro takes, so the prompts unlock only once it has finished. */
export const INTRO_MS = 2400;
