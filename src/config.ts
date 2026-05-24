export const IS_WAITLIST = process.env.NEXT_PUBLIC_LAUNCH_MODE === "waitlist";
export const SITE_URL = "https://subsecute.com";
export const WAITLIST_API =
  process.env.NEXT_PUBLIC_WAITLIST_API ??
  "https://api.subsecute.com/subsecute-api/v1/waitlist";
export const LOGO_DEV_TOKEN =
  process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN ?? "pk_dorVGutZSi-4iMholcR1qA";
export const EXCHANGE_RATE_ESTIMATE = 1550;
export const DEFAULT_SHARE_IMAGE =
  "https://res.cloudinary.com/dwambnh2n/image/upload/v1774920431/Screenshot_2026-03-31_at_2.26.31_AM_amvubi.png";
