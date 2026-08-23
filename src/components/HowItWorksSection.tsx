import ParallaxField from "./ParallaxField";

const STEPS = [
  {
    number: "01",
    title: "Download & sign up",
    description:
      "Create your account and add a card or direct debit. Ready in under 5 minutes.",
  },
  {
    number: "02",
    title: "Add your subscriptions and bills",
    description:
      "Add Netflix, Spotify, or any subscription. Set up recurring airtime, data, power, and cable payments.",
  },
  {
    number: "03",
    title: "We handle the rest",
    description:
      "Each subscription gets a virtual USD card, funded from your payment method before it renews. Bills pay on schedule.",
  },
  {
    number: "04",
    title: "Cancel anything, anytime",
    description:
      "Freeze or kill any subscription with one tap. Pause a bill. You're always in control.",
  },
] as const;

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative overflow-hidden border-y border-line bg-surface py-20 lg:py-28"
    >
      {/* A schedule drawn as a dashed route with waypoints, because this
          section is four steps in order rather than a set of facts. */}
      <ParallaxField variant="route" interactive={false} />

      <div className="relative mx-auto max-w-[1240px] px-4 lg:px-0">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4 lg:max-w-[461px]">
            <span className="font-outfit text-[11px] font-medium uppercase tracking-[0.18em] text-accent-ink">
              HOW IT WORKS
            </span>
            <h2
              id="how-it-works-heading"
              className="font-neue-power text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl lg:text-[52px]"
            >
              Automate your subscriptions and bills in 5 minutes
            </h2>
          </div>
          <p className="font-outfit text-base leading-[1.6] text-ink-2 lg:max-w-[370px]">
            Set it up once. Subsecute handles every renewal from there: funding,
            reminders, the whole thing!
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {STEPS.map((step, index) => (
            <article
              key={step.number}
              className={`flex flex-col gap-3 ${
                index < STEPS.length - 1
                  ? "lg:border-r lg:border-line lg:pr-8"
                  : ""
              } ${index > 0 ? "lg:pl-8" : ""}`}
            >
              <span className="font-neue-power text-base font-bold tracking-wide text-accent-ink">
                {step.number}
              </span>
              <h3 className="font-outfit text-lg font-semibold leading-[1.25] tracking-tight text-ink lg:text-xl">
                {step.title}
              </h3>
              <p className="font-outfit text-sm leading-[1.6] text-ink-2">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
