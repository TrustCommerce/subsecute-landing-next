export const SITE_URL = "https://subsecute.com";

// The live store listings. Neither address names a country: each store sends a
// visitor to their own region, and a link naming one bounces everybody else.
export const APP_STORE_URL = "https://apps.apple.com/app/id6795999539";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.subsecute";

// Store rating, shown beside the testimonials. Same rule the waitlist count
// followed: left at 0 the whole rating block is hidden rather than showing a
// number we have not earned. Set both once the listings have real reviews.
export const STORE_RATING = Number(process.env.NEXT_PUBLIC_STORE_RATING ?? 0);
export const STORE_REVIEW_COUNT = Number(
  process.env.NEXT_PUBLIC_STORE_REVIEW_COUNT ?? 0,
);

// Still live: the calculator, quiz and family planner post captured emails
// here. It is no longer a launch waitlist, just the lead endpoint.
export const WAITLIST_API =
  process.env.NEXT_PUBLIC_WAITLIST_API ??
  "https://api.subsecute.com/subsecute-api/v1/waitlist";
export const LOGO_DEV_TOKEN =
  process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN ?? "pk_dorVGutZSi-4iMholcR1qA";
// X (Twitter) Ads pixel. X_PIXEL_ID is the website-tag id from Ads Manager →
// Tools → Conversion tracking (looks like "o1abc"). X_SIGNUP_EVENT_ID is the id
// of the "Sign up / Lead" event you create there. The base tag only loads when
// the pixel id is set, so dev/preview builds stay clean.
export const X_PIXEL_ID = process.env.NEXT_PUBLIC_X_PIXEL_ID ?? "rd4kz";
export const X_SIGNUP_EVENT_ID =
  process.env.NEXT_PUBLIC_X_SIGNUP_EVENT_ID ?? "rd4lq";
export const EXCHANGE_RATE_ESTIMATE = 1550;
export const DEFAULT_SHARE_IMAGE =
  "https://res.cloudinary.com/dwambnh2n/image/upload/v1774920431/Screenshot_2026-03-31_at_2.26.31_AM_amvubi.png";
