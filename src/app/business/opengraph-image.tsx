import { ImageResponse } from "next/og";

export const alt =
  "Subsecute Business: know before your subscriptions renew. A separate dollar card for every company subscription, funded from naira before the date.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens, copied from the light theme in src/components/business/landing.css.
const PAPER = "#fdfbf3";
const INK = "#191b18";
const ORANGE = "#a94412";
const MUTED = "#65675e";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: PAPER,
          color: INK,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          borderTop: `10px solid ${ORANGE}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 13,
              height: 13,
              borderRadius: 999,
              background: ORANGE,
            }}
          />
          <div style={{ fontSize: 23, letterSpacing: "-0.01em" }}>
            Subsecute Business
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 80,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            maxWidth: 900,
          }}
        >
          Know before your subscriptions renew.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              lineHeight: 1.45,
              color: MUTED,
              maxWidth: 620,
            }}
          >
            A separate dollar card for every company subscription, funded from
            naira before the date.
          </div>
          <div style={{ fontSize: 20, color: MUTED }}>
            business.subsecute.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
