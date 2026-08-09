import { IS_WAITLIST } from "../config";
import Navbar from "./Navbar";
import WaitlistForm from "./WaitlistForm";

const LOGO_TOKEN = "pk_dorVGutZSi-4iMholcR1qA";

function logoUrl(domain: string) {
  return `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&size=64&format=png`;
}

// Real providers, shown as a quiet ticker. This replaces the old floating
// notification badges — actual logos are evidence, invented alerts are not.
const PROVIDERS = [
  { domain: "netflix.com", label: "Netflix" },
  { domain: "spotify.com", label: "Spotify" },
  { domain: "dstv.com", label: "DSTV" },
  { domain: "openai.com", label: "ChatGPT" },
  { domain: "mtn.ng", label: "MTN" },
  { domain: "gotvafrica.com", label: "GOtv" },
  { domain: "claude.ai", label: "Claude" },
  { domain: "youtube.com", label: "YouTube" },
  { domain: "ekedc.com", label: "EKEDC" },
  { domain: "airtel.com.ng", label: "Airtel" },
  { domain: "figma.com", label: "Figma" },
  { domain: "primevideo.com", label: "Prime Video" },
] as const;

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-paper"
    >
      {/* Navbar */}
      <div className="px-4 pt-5 lg:px-[100px]">
        <Navbar />
      </div>

      {/* Content */}
      <div className="mx-auto flex max-w-[1240px] flex-col items-center px-4 pt-14 lg:pt-20">
        {/* Eyebrow — flat type, no glass pill */}
        <span className="font-outfit text-[11px] font-medium uppercase tracking-[0.18em] text-ink-3">
          50+ subscriptions &amp; bills
        </span>

        {/* The visible headline is the real h1 — no hidden keyword block */}
        <h1
          id="hero-heading"
          className="mt-5 max-w-[15ch] text-center font-neue-power text-[2.75rem] font-bold leading-[0.98] tracking-[-0.035em] text-ink sm:text-6xl md:text-7xl lg:max-w-[16ch] lg:text-[5.5rem]"
        >
          The recurring money app for{" "}
          <span className="text-accent-ink">Nigerians.</span>
        </h1>

        <p className="mt-6 max-w-[46ch] text-center font-outfit text-base leading-[1.6] text-ink-2 lg:text-lg">
          Subsecute runs every subscription you have. Funds them. Tracks them.
          Shares them. Gifts them. Cancels them. So you don&apos;t have to.
        </p>

        {/* CTA — switches based on launch mode */}
        <div className="mt-9">
          {IS_WAITLIST ? (
            <WaitlistForm variant="light" />
          ) : (
            <a
              href="#download"
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 font-outfit text-base font-medium text-paper transition-colors hover:bg-accent lg:h-[52px]"
            >
              Get Started
            </a>
          )}
        </div>

        {/* Product shot — one real screen on a hairline plinth */}
        <div className="mt-16 w-full max-w-[268px] sm:max-w-[300px] lg:mt-20 lg:max-w-[340px]">
          <div className="rounded-[2rem] border border-line bg-surface p-2 shadow-plinth">
            <img
              src="/images/landing/phone-screen.png?v=2"
              alt="Subsecute app home screen showing wallet balance, active subscriptions, monthly spend, and upcoming renewals"
              className="w-full rounded-[1.6rem]"
            />
          </div>
        </div>
      </div>

      {/* Provider ticker — sits on a rule, closing the section */}
      <div className="mt-16 border-y border-line bg-surface py-4 lg:mt-20">
        <div
          className="overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="marquee-track flex gap-8">
            {/* Two copies so the -50% scroll loops with no visible seam */}
            {[...PROVIDERS, ...PROVIDERS].map((provider, i) => (
              <div
                key={`${provider.domain}-${i}`}
                className="flex shrink-0 items-center gap-2"
                aria-hidden={i >= PROVIDERS.length}
              >
                <img
                  src={logoUrl(provider.domain)}
                  alt=""
                  loading="lazy"
                  className="h-5 w-5 rounded object-contain"
                />
                <span className="whitespace-nowrap font-outfit text-sm text-ink-3">
                  {provider.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
