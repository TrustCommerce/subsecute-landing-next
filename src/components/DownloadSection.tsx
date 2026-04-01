import { IS_WAITLIST } from '../config'
import WaitlistForm from './WaitlistForm'

export default function DownloadSection() {
  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="bg-[#E96D1F] py-16 lg:py-24"
    >
      <div className="mx-auto flex max-w-[863px] flex-col items-center px-4">
        {/* Platform pill */}
        <div className="mb-8 inline-flex items-center rounded-full border border-white/30 bg-[rgba(255,255,255,0.25)] px-4 py-2 backdrop-blur-lg lg:mb-10">
          <span className="font-outfit text-sm font-medium tracking-wide text-white">
            {IS_WAITLIST ? 'Coming soon to iOS & Android' : 'Available on iOS & Android'}
          </span>
        </div>

        {/* Heading */}
        <h2
          id="download-heading"
          className="mb-4 text-center font-neue-power text-2xl font-bold leading-[1.15] tracking-normal text-white sm:text-4xl md:text-5xl lg:text-[64px]"
        >
          {IS_WAITLIST ? 'Be the first to automate everything' : 'Every recurring payment, handled'}
        </h2>

        {/* Subtitle */}
        <p className="mb-10 max-w-[600px] text-center font-outfit text-base leading-[1.5em] tracking-wide text-white/80 sm:text-lg lg:mb-12 lg:text-xl">
          {IS_WAITLIST
            ? "Join the waitlist. We'll let you know when Subsecute is ready to handle your subscriptions and bills."
            : 'Download Subsecute. Add your subscriptions and bills. Watch everything renew on time, automatically.'}
        </p>

        {/* CTA — switches based on launch mode */}
        {IS_WAITLIST ? (
          <WaitlistForm variant="dark" />
        ) : (
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#"
              aria-label="Download on the App Store"
              className="flex items-center gap-2 rounded-full bg-[#232323] px-6 py-3.5 transition-opacity hover:opacity-90"
            >
              <img
                src="/images/landing/apple-icon.svg"
                alt=""
                aria-hidden="true"
                className="h-7 w-7"
              />
              <div className="flex flex-col justify-center">
                <span className="font-outfit text-xs tracking-wide text-[#ADB5BD]">
                  Download on the
                </span>
                <span className="font-outfit text-base font-bold leading-[1.1em] tracking-wide text-white">
                  App Store
                </span>
              </div>
            </a>
            <a
              href="#"
              aria-label="Get it on Google Play"
              className="flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.2)] px-6 py-3.5 transition-opacity hover:opacity-90"
            >
              <img
                src="/images/landing/playstore-icon.svg"
                alt=""
                aria-hidden="true"
                className="h-7 w-7"
              />
              <div className="flex flex-col justify-center">
                <span className="font-outfit text-xs tracking-wide text-white/60">Get it on</span>
                <span className="font-outfit text-base font-bold leading-[1.1em] tracking-wide text-white">
                  Google Play
                </span>
              </div>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
