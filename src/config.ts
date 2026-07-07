export const IS_WAITLIST = process.env.NEXT_PUBLIC_LAUNCH_MODE === "waitlist";
export const SITE_URL = "https://subsecute.com";
// Social proof on the early-access page. Set NEXT_PUBLIC_WAITLIST_COUNT to your
// real signup count to show "N+ Nigerians already on the list". Left at 0 it
// shows a reassurance line instead — never a fabricated number.
export const WAITLIST_COUNT = Number(process.env.NEXT_PUBLIC_WAITLIST_COUNT ?? 0);
// Real, fixed launch target for the early-access countdown (ISO 8601, WAT).
// Keep this honest — if it passes without launch the timer shows a graceful
// "launching now" state, but a date you actually hit builds far more trust.
// Default: ~3 weeks out, 9am Lagos time.
export const LAUNCH_DATE =
  process.env.NEXT_PUBLIC_LAUNCH_DATE ?? "2026-07-31T09:00:00+01:00";
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
