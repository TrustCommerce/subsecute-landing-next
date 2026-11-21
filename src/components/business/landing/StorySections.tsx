import { SignupEntry } from "./SignupEntry";

export function FinalCallToAction({ onRequest }: { onRequest: () => void }) {
  return (
    <section
      className="b-landing-final-cta"
      id="release-status"
      aria-labelledby="business-start-title"
    >
      <h2 id="business-start-title">Put company spending in order.</h2>
      <p className="b-landing-final-description">
        One naira wallet for subscriptions, usage-based tools and team expenses.
      </p>
      <SignupEntry onRequest={onRequest} />
    </section>
  );
}
