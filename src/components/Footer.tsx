const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/subsecute",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/subsecute_",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@subsecute",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.93a8.16 8.16 0 0 0 4.77 1.52V7a4.79 4.79 0 0 1-1.84-.31z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/14dBDtDQg1h/",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5 3.66 9.16 8.44 9.93v-7.02H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.77 8.43-4.93 8.43-9.93z" />
      </svg>
    ),
  },
] as const;

const FOOTER_LINKS = [
  {
    heading: "PRODUCT",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Downloads", href: "#download" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "About us", href: "#about" },
      { label: "FAQ", href: "#faq" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    heading: "LEGAL",
    links: [
      { label: "Privacy policy", href: "/privacy-policy.html" },
      { label: "Terms of service", href: "/terms-of-service.html" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="bg-[#202020] py-14 lg:py-[72px]"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between lg:gap-[90px] lg:px-0">
        {/* Left column */}
        <div className="flex max-w-[420px] flex-col gap-6">
          <img
            src="/images/landing/logo-footer.png"
            alt="Subsecute"
            className="h-8 w-auto self-start lg:h-10"
            loading="lazy"
          />
          <p className="font-outfit text-sm leading-[1.5em] tracking-wide text-[#ADB5BD] lg:text-base">
            The recurring money app for Nigerians. Pay your bills, your
            family&apos;s bills, anyone&apos;s bills — from anywhere.
          </p>
          <ul
            role="list"
            className="flex items-center gap-3"
            aria-label="Social media"
          >
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2F2F2F] text-[#ADB5BD] transition-colors hover:border-[#E96D1F] hover:text-white"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Link columns */}
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-3 gap-8 lg:gap-16"
        >
          {FOOTER_LINKS.map((column) => (
            <div key={column.heading} className="flex flex-col gap-1.5">
              <h3 className="pb-2 font-outfit text-xs font-medium tracking-wide text-white lg:text-sm">
                {column.heading}
              </h3>
              <ul role="list">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.href.endsWith(".html")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="block py-1.5 font-outfit text-xs tracking-wide text-[#ADB5BD] transition-colors hover:text-white lg:text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-10 max-w-[1240px] border-t border-[#2F2F2F] px-4 pt-6 lg:px-0">
        <p className="font-outfit text-xs tracking-wide text-[#6C757D]">
          © {new Date().getFullYear()} Subsecute. A product of TrustCommerce
          Resources Ltd (RC 7131175).
        </p>
      </div>
    </footer>
  );
}
