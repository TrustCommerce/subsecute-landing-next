import StoreBadges from "./StoreBadges";

/* ───────────────────────────────────────────────────────────────────
   A compact download block for the pages that are not the home page.

   The footer used to point these at "#download", an anchor that only
   exists on the home page, so on /support and /delete-account the
   primary call to action went nowhere. This gives those pages a real
   one, and the footer link now points at "/#download" so it works from
   anywhere.
   ─────────────────────────────────────────────────────────────────── */

export default function DownloadCta({
  heading = "Get Subsecute",
  sub = "Every subscription and bill on schedule, with a reminder before anything is debited.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section
      id="download"
      aria-labelledby="download-cta-heading"
      className="relative w-full overflow-hidden rounded-3xl bg-accent px-6 py-10 text-center sm:px-10 sm:py-12"
    >
      {/* The same home-screen texture the orange band on the landing page
          uses, so the two read as one family. Static here. */}
      <div
        aria-hidden="true"
        className="pixel-far pointer-events-none absolute inset-0 opacity-70"
      />

      <div className="relative flex flex-col items-center gap-5">
        <span className="font-outfit text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
          Available on iOS &amp; Android
        </span>
        <h2
          id="download-cta-heading"
          className="max-w-[20ch] font-neue-power text-[1.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl"
        >
          {heading}
        </h2>
        <p className="max-w-[46ch] font-outfit text-sm leading-[1.6] text-white/85 sm:text-base">
          {sub}
        </p>
        <StoreBadges tone="paper" className="mt-1 justify-center" />
      </div>
    </section>
  );
}
