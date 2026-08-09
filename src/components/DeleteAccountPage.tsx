import Link from "next/link";
import Footer from "./Footer";

const APP_STEPS = [
  "Open Subsecute and sign in",
  "Go to Account",
  "Tap Account & Security",
  "Tap Delete account and confirm",
] as const;

const DELETED = [
  "Your name, email address, phone number and home address",
  "Your profile photo",
  "Your identity verification records",
  "Your saved cards and bank accounts",
  "Your subscriptions, bill schedules and plans",
  "Your device and notification settings",
] as const;

function Bullet() {
  return (
    <span
      className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
      aria-hidden="true"
    />
  );
}

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="font-outfit text-[11px] font-medium uppercase tracking-[0.18em] text-accent-ink">
        {heading}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function DeleteAccountPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-paper px-4 pb-24 pt-14 sm:pt-20">
        <div className="w-full max-w-[680px]">
          <Link href="/" aria-label="Subsecute home">
            <img
              src="/images/landing/logo.svg"
              alt="Subsecute logo"
              className="mb-12 h-8 w-auto"
            />
          </Link>

          <h1 className="font-neue-power text-[2.25rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl">
            Delete your Subsecute account
          </h1>
          <p className="mt-5 font-outfit text-lg leading-[1.6] text-ink-2">
            You can delete your Subsecute account and the personal data held
            with it at any time.
          </p>

          <div className="mt-12 flex flex-col gap-8">
            <Section heading="Delete from the app">
              <ol className="flex flex-col gap-3">
                {APP_STEPS.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-baseline gap-3 font-outfit leading-[1.6] text-ink-2"
                  >
                    <span className="font-neue-power text-sm font-bold text-accent-ink">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Section>

            <Section heading="Request deletion without the app">
              <p className="font-outfit leading-[1.7] text-ink-2">
                Email{" "}
                <a
                  href="mailto:hello@subsecute.com?subject=Delete%20my%20account"
                  className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
                >
                  hello@subsecute.com
                </a>{" "}
                from the address on your account with the subject{" "}
                <span className="font-medium text-ink">
                  &ldquo;Delete my account&rdquo;
                </span>
                . We will confirm your identity and delete the account within 30
                days.
              </p>
            </Section>

            <Section heading="What is deleted">
              <ul role="list" className="flex flex-col gap-2.5">
                {DELETED.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-outfit leading-[1.6] text-ink-2"
                  >
                    <Bullet />
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section heading="What we must keep, and why">
              <p className="font-outfit leading-[1.7] text-ink-2">
                Nigerian financial regulations require us to retain records of
                completed transactions and identity verification for five years
                after an account closes. These records are kept only to meet
                those obligations, are not used to contact you, and are deleted
                once the retention period ends.
              </p>
            </Section>

            <Section heading="Before you delete">
              <p className="font-outfit leading-[1.7] text-ink-2">
                Withdraw any remaining wallet balance and cancel active
                subscriptions first. An account cannot be deleted while it still
                holds money or has a subscription running, so the app will ask
                you to clear both before it lets you continue. Once the account
                is deleted it cannot be restored.
              </p>
            </Section>
          </div>

          <p className="mt-12 border-t border-line pt-8 font-outfit text-sm text-ink-3">
            Questions?{" "}
            <a
              href="mailto:hello@subsecute.com"
              className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
            >
              hello@subsecute.com
            </a>
            . Subsecute is a product of TrustCommerce Resources Ltd (RC
            7131175).
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
