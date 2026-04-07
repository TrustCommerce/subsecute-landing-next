import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Subsecute — Automate Your Bills in Nigeria",
    template: "%s | Subsecute",
  },
  description:
    "Auto-pay airtime, data, DSTV, GOtv, and electricity in Nigeria. Set it once, forget it.",
  keywords:
    "auto-pay bills Nigeria, automate airtime Nigeria, auto-pay DSTV Nigeria, recurring bill payment Nigeria, auto-pay electricity Nigeria",
  metadataBase: new URL("https://subsecute.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Subsecute — Automate Your Bills in Nigeria",
    description:
      "Auto-pay airtime, data, DSTV, GOtv, and electricity in Nigeria. Set it once, forget it.",
    url: "https://subsecute.com",
    siteName: "Subsecute",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dwambnh2n/image/upload/v1774920431/Screenshot_2026-03-31_at_2.26.31_AM_amvubi.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subsecute — Automate Your Bills in Nigeria",
    description:
      "Auto-pay airtime, data, DSTV, GOtv, and electricity in Nigeria. Set it once, forget it.",
    images: [
      "https://res.cloudinary.com/dwambnh2n/image/upload/v1774920431/Screenshot_2026-03-31_at_2.26.31_AM_amvubi.png",
    ],
  },
  other: {
    "geo.region": "NG",
    "geo.placename": "Nigeria",
    "theme-color": "#E96D1F",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/dwambnh2n/image/upload/v1775598688/Subsecute_qubygc.svg",
        type: "image/svg+xml",
      },
      {
        url: "https://res.cloudinary.com/dwambnh2n/image/upload/v1775598701/Subsecute_Icon_sastth.png",
        type: "image/png",
      },
    ],
    apple:
      "https://res.cloudinary.com/dwambnh2n/image/upload/v1775598701/Subsecute_Icon_sastth.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
