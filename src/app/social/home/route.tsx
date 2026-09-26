import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 80px",
        background: "#faf8ef",
        color: "#1b201a",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
        subsecute
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: -5,
          lineHeight: 1.04,
          marginTop: 46,
        }}
      >
        <span>The recurring money app</span>
        <span style={{ color: "#b94b16" }}>for Nigerians.</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 26,
          marginTop: 36,
          color: "#62665b",
        }}
      >
        Subscriptions. Dollar cards. Bills. Your people.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 20,
          marginTop: "auto",
          color: "#b94b16",
        }}
      >
        Made for Nigerians · iOS & Android · subsecute.com
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
