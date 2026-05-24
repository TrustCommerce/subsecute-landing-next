import type { Metadata } from "next";
import { Outfit, DM_Sans, Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit-loaded",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans-loaded",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk-loaded",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Subsecute — The Recurring Money App for Nigerians",
    template: "%s | Subsecute",
  },
  description:
    "Pay every recurring bill on autopilot — yours, your family's, anyone's. Virtual USD cards for Netflix, Spotify, ChatGPT. Auto-pay for airtime, data, DSTV, and power. Built for Nigerians at home and abroad.",
  keywords:
    "automate subscriptions Nigeria, virtual dollar card Nigeria, pay Netflix Nigeria, recurring bill payment Nigeria, auto-pay airtime Nigeria",
  metadataBase: new URL("https://subsecute.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Subsecute — The Recurring Money App for Nigerians",
    description:
      "Pay every recurring bill on autopilot — yours, your family's, anyone's. Virtual USD cards for Netflix, Spotify, ChatGPT. Auto-pay for airtime, data, DSTV, and power. Built for Nigerians at home and abroad.",
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
    title: "Subsecute — The Recurring Money App for Nigerians",
    description:
      "Pay every recurring bill on autopilot — yours, your family's, anyone's. Virtual USD cards for Netflix, Spotify, ChatGPT. Auto-pay for airtime, data, DSTV, and power. Built for Nigerians at home and abroad.",
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
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-NG"
      className={`${outfit.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${syne.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
