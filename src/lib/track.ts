import { X_PIXEL_ID, X_SIGNUP_EVENT_ID } from "@/config";

// X Ads adds twq() to window once the base pixel loads.
declare global {
  interface Window {
    twq?: (command: string, eventId: string, params?: object) => void;
  }
}

/**
 * Reports a captured email to X Ads so the campaign can measure, and later
 * optimise toward, the event that actually matters.
 *
 * This used to live inside the launch waitlist form. That form is gone now
 * the app is live, which left the conversion event with nothing to fire it,
 * so it moved here and the three tools that still capture an email call it:
 * the bill calculator, the subscription quiz, and the family planner.
 *
 * Passing the address lets X hash and match it, which attributes far better
 * than a cookie alone. No-ops when the pixel is not configured or has not
 * finished loading, so it is always safe to call.
 */
export function reportLead(email: string) {
  if (!X_PIXEL_ID || !X_SIGNUP_EVENT_ID || typeof window === "undefined") {
    return;
  }
  window.twq?.("event", `tw-${X_PIXEL_ID}-${X_SIGNUP_EVENT_ID}`, {
    email_address: email,
    status: "completed",
  });
}
