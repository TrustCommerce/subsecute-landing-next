const FOOTER_LINKS = [
  {
    heading: 'PRODUCT',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Downloads', href: '#download' }
    ]
  },
  {
    heading: 'COMPANY',
    links: [
      { label: 'About us', href: '#about' },
      { label: 'FAQ', href: '#faq' }
    ]
  },
  {
    heading: 'LEGAL',
    links: [
      { label: 'Privacy policy', href: '/privacy-policy.html' },
      { label: 'Terms of service', href: '/terms-of-service.html' }
    ]
  }
] as const

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="bg-[#202020] py-14 lg:py-[72px]">
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
            Every recurring payment, on autopilot. Virtual USD cards for subscriptions. Automatic
            bill pay for airtime, data, power, and cable.
          </p>
        </div>

        {/* Link columns */}
        <nav aria-label="Footer navigation" className="grid grid-cols-3 gap-8 lg:gap-16">
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
                      {...(link.href.endsWith('.html')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
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
          © {new Date().getFullYear()} Subsecute. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
