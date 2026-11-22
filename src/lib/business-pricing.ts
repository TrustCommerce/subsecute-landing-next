// Advertised landing terms. Keep the illustration and fee table on the same basis.
export const BUSINESS_PRICING = {
  membershipNgn: 0,
  launchMonths: 3,
  fundingPercent: 1.5,
  fundingFlatNgn: 0,
  exchangeMarginPerUsd: 20,
  cardCreationUsd: 1,
  monthlyCardUsd: 1,
  nairaCreationNgn: 100,
} as const;

export const naira = (amount: number) =>
  `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const dollars = (amount: number) => `US$${amount.toFixed(2)}`;
const round = (amount: number) =>
  Math.round((amount + Number.EPSILON) * 100) / 100;
const cardAmountUsd = 60;
const baseRate = 1360;
const principal = round(cardAmountUsd * baseRate);
const margin = round(cardAmountUsd * BUSINESS_PRICING.exchangeMarginPerUsd);
const subtotal = round(principal + margin);
const fundingFee = round(
  (subtotal * BUSINESS_PRICING.fundingPercent) / 100 +
    BUSINESS_PRICING.fundingFlatNgn,
);
const total = round(subtotal + fundingFee);
export const FUNDING_EXAMPLE = {
  cardAmountUsd,
  baseRate,
  principal,
  margin,
  fundingFee,
  total,
  opening: 250000,
  closing: round(250000 - total),
} as const;

export const BUSINESS_PRICE_ROWS = [
  ["Monthly membership", `${naira(BUSINESS_PRICING.membershipNgn)} per month`],
  [
    "Card funding from the wallet",
    `${BUSINESS_PRICING.fundingPercent}% card funding fee`,
  ],
  [
    "Dollar card creation",
    `${dollars(BUSINESS_PRICING.cardCreationUsd)} per card`,
  ],
  [
    "Monthly dollar card fee",
    `${dollars(BUSINESS_PRICING.monthlyCardUsd)} per card`,
  ],
  [
    "Naira cards",
    `${naira(BUSINESS_PRICING.nairaCreationNgn)} creation; funding fees apply, no exchange margin`,
  ],
] as const;
