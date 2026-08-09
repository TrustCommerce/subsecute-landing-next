import Link from "next/link";
import Footer from "./Footer";

const HELP_TOPICS = [
  "Billing and payments",
  "Managing your subscriptions and bills",
  "Your account and access",
] as const;

export default function SupportPage() {
  return (
    <>
      <main className="relative flex min-h-screen flex-col items-center bg-paper px-4 pb-24 pt-14 sm:pt-20">
        <div className="relative z-10 flex w-full max-w-[640px] flex-col items-center text-center">
          <Link href="/" aria-label="Subsecute home">
            <img
              src="/images/landing/logo.svg"
              alt="Subsecute logo"
              className="mb-10 h-8 w-auto"
            />
          </Link>

          <h1 className="font-neue-power text-4xl font-bold tracking-normal text-[#232323] sm:text-5xl">
            Support
          </h1>
          <p className="mt-4 font-outfit text-lg text-[#5c5c54]">
            Need a hand with Subsecute? We&apos;re here to help.
          </p>

          <div className="mt-10 w-full rounded-2xl border border-[#232323]/10 bg-white/70 p-6 text-left shadow-sm sm:p-8">
            <h2 className="font-neue-power text-xl font-bold text-[#232323]">
              Contact us
            </h2>
            <p className="mt-3 font-outfit leading-relaxed text-[#5c5c54]">
              The fastest way to reach us is email. Write to{" "}
              <a
                href="mailto:support@subsecute.com"
                className="font-medium text-[#E96D1F] underline decoration-[#E96D1F]/40 underline-offset-2 transition-colors hover:decoration-[#E96D1F]"
              >
                support@subsecute.com
              </a>{" "}
              and we&apos;ll get back to you within 1–2 business days.
            </p>

            <h2 className="mt-8 font-neue-power text-xl font-bold text-[#232323]">
              What we can help with
            </h2>
            <ul role="list" className="mt-3 flex flex-col gap-2.5">
              {HELP_TOPICS.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-3 font-outfit text-[#5c5c54]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E96D1F]"
                    aria-hidden="true"
                  />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 font-outfit text-sm text-[#5c5c54]">
            Subsecute is a product of TrustCommerce Resources Ltd (RC 7131175).
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
