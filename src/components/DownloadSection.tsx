import StoreBadges from "./StoreBadges";
import ParallaxField from "./ParallaxField";

export default function DownloadSection() {
  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="relative overflow-hidden bg-accent py-20 lg:py-28"
    >
      {/* A home screen, because that is what the section is asking for. */}
      <ParallaxField variant="pixels" interactive={false} />
      <div className="relative mx-auto flex max-w-[863px] flex-col items-center px-4">
        {/* Platform pill */}
        <div className="mb-8 inline-flex items-center lg:mb-10">
          <span className="font-outfit text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
            Available on iOS &amp; Android
          </span>
        </div>

        {/* Heading */}
        <h2
          id="download-heading"
          className="mb-5 max-w-[18ch] text-center font-neue-power text-[2.25rem] font-bold leading-[1.0] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[72px]"
        >
          Every recurring payment, handled.
        </h2>

        {/* Subtitle */}
        <p className="mb-10 max-w-[52ch] text-center font-outfit text-base leading-[1.6] text-white/85 sm:text-lg lg:mb-12 lg:text-xl">
          Download Subsecute. Add your subscriptions and bills. Watch everything
          renew on time, automatically.
        </p>

        <StoreBadges tone="paper" />
      </div>
    </section>
  );
}
