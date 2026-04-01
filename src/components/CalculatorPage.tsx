'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Constants ──────────────────────────────────────────────────────────────

const LOGO_TOKEN = 'pk_dorVGutZSi-4iMholcR1qA'
const WAITLIST_API = 'https://api.subsecute.com/subsecute-api/v1/waitlist'

function logoUrl(domain: string) {
  return `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&size=64&format=png`
}

interface Subscription {
  id: string
  name: string
  price: number
  domain?: string // if undefined, we render an initial-letter icon
}

interface Category {
  label: string
  items: Subscription[]
}

const CATEGORIES: Category[] = [
  {
    label: 'Streaming',
    items: [
      { id: 'netflix-std', name: 'Netflix Standard', price: 6500, domain: 'netflix.com' },
      { id: 'netflix-pre', name: 'Netflix Premium', price: 8500, domain: 'netflix.com' },
      { id: 'showmax', name: 'Showmax Entertainment', price: 4500, domain: 'showmax.com' },
      { id: 'prime', name: 'Amazon Prime Video', price: 2300, domain: 'primevideo.com' },
      { id: 'youtube', name: 'YouTube Premium', price: 1700, domain: 'youtube.com' },
    ],
  },
  {
    label: 'Music',
    items: [
      { id: 'spotify', name: 'Spotify Premium', price: 1600, domain: 'spotify.com' },
      { id: 'apple-music', name: 'Apple Music', price: 1300, domain: 'music.apple.com' },
    ],
  },
  {
    label: 'AI & Productivity',
    items: [
      { id: 'chatgpt', name: 'ChatGPT Plus', price: 33800, domain: 'openai.com' },
      { id: 'claude', name: 'Claude Pro', price: 32000, domain: 'claude.ai' },
      { id: 'figma', name: 'Figma', price: 24000, domain: 'figma.com' },
      { id: 'canva', name: 'Canva Pro', price: 5500, domain: 'canva.com' },
      { id: 'notion', name: 'Notion', price: 2000, domain: 'notion.so' },
    ],
  },
  {
    label: 'Cable TV',
    items: [
      { id: 'dstv-prem', name: 'DSTV Premium', price: 44500, domain: 'dstv.com' },
      { id: 'dstv-comp-plus', name: 'DSTV Compact Plus', price: 30000, domain: 'dstv.com' },
      { id: 'dstv-comp', name: 'DSTV Compact', price: 19000, domain: 'dstv.com' },
      { id: 'gotv-max', name: 'GOtv Max', price: 4850, domain: 'gotvafrica.com' },
      { id: 'showmax-pl', name: 'Showmax + Premier League', price: 6500, domain: 'showmax.com' },
    ],
  },
  {
    label: 'Bills',
    items: [
      { id: 'mtn-10', name: 'MTN Data 10GB', price: 4500, domain: 'mtn.ng' },
      { id: 'mtn-20', name: 'MTN Data 20GB', price: 7500, domain: 'mtn.ng' },
      { id: 'airtime', name: 'Airtime (monthly)', price: 5000 },
      { id: 'electricity', name: 'Electricity (prepaid)', price: 20000 },
    ],
  },
]

function getComparison(annual: number): string {
  if (annual < 200_000) return "That's a new Samsung Galaxy A-series"
  if (annual < 400_000) return "That's a round-trip flight to Accra"
  if (annual < 700_000) return "That's a brand new iPhone 16"
  if (annual < 1_200_000) return "That's a round-trip flight to Dubai"
  return "That's more than Nigeria's annual minimum wage"
}

function formatNaira(n: number): string {
  return '\u20A6' + n.toLocaleString('en-NG')
}

// ─── Animated counter hook ──────────────────────────────────────────────────

function useCountUp(target: number, duration = 600) {
  const [display, setDisplay] = useState(target)
  const frameRef = useRef(0)

  useEffect(() => {
    const start = display
    const diff = target - start
    if (diff === 0) return
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress)
      setDisplay(Math.round(start + diff * eased))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration])

  return display
}

// ─── InitialIcon — coloured circle with first letter ────────────────────────

function InitialIcon({ name }: { name: string }) {
  const colors = ['#E96D1F', '#6C63FF', '#00B894', '#D63384', '#0D6EFD', '#FFC107']
  const idx = name.charCodeAt(0) % colors.length
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
      style={{ backgroundColor: colors[idx] }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

// ─── Tile component ─────────────────────────────────────────────────────────

function Tile({
  item,
  selected,
  onToggle,
}: {
  item: Subscription
  selected: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-150 sm:px-4 ${
        selected
          ? 'border-[#E96D1F] bg-[#E96D1F]/5 scale-[1.02] shadow-sm'
          : 'border-[#DEE2E6] bg-white hover:border-[#E96D1F]/40'
      }`}
    >
      {item.domain ? (
        <img
          src={logoUrl(item.domain)}
          alt=""
          className="h-8 w-8 shrink-0 rounded-lg object-contain"
          loading="lazy"
        />
      ) : (
        <InitialIcon name={item.name} />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate font-outfit text-sm font-medium text-[#232323]">{item.name}</p>
        <p className="font-outfit text-xs text-[#6C757D]">{formatNaira(item.price)}/mo</p>
      </div>
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          selected ? 'border-[#E96D1F] bg-[#E96D1F]' : 'border-[#DEE2E6]'
        }`}
      >
        {selected && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </button>
  )
}

// ─── Custom tile ────────────────────────────────────────────────────────────

function CustomTile({
  customName,
  customAmount,
  onNameChange,
  onAmountChange,
  selected,
  onToggle,
}: {
  customName: string
  customAmount: string
  onNameChange: (v: string) => void
  onAmountChange: (v: string) => void
  selected: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-xl border px-3 py-3 transition-all duration-150 sm:px-4 ${
        selected
          ? 'border-[#E96D1F] bg-[#E96D1F]/5'
          : 'border-[#DEE2E6] bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#232323] text-sm font-bold text-white">
          +
        </div>
        <p className="font-outfit text-sm font-medium text-[#232323]">Custom</p>
      </div>
      <input
        type="text"
        placeholder="Service name"
        value={customName}
        onChange={(e) => onNameChange(e.target.value)}
        className="h-9 w-full rounded-lg border border-[#DEE2E6] bg-white px-3 font-outfit text-sm text-[#232323] placeholder-[#ADB5BD] outline-none focus:border-[#E96D1F]"
      />
      <input
        type="number"
        inputMode="numeric"
        placeholder="Monthly amount (NGN)"
        value={customAmount}
        onChange={(e) => onAmountChange(e.target.value)}
        className="h-9 w-full rounded-lg border border-[#DEE2E6] bg-white px-3 font-outfit text-sm text-[#232323] placeholder-[#ADB5BD] outline-none focus:border-[#E96D1F] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      {customName && customAmount && Number(customAmount) > 0 && (
        <button
          type="button"
          onClick={onToggle}
          className={`h-9 w-full rounded-lg font-outfit text-sm font-medium transition-colors ${
            selected
              ? 'bg-[#E96D1F] text-white'
              : 'bg-[#232323] text-white hover:bg-[#E96D1F]'
          }`}
        >
          {selected ? 'Remove' : 'Add'}
        </button>
      )}
    </div>
  )
}

// ─── Main page component ────────────────────────────────────────────────────

export default function CalculatorPage() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showResult, setShowResult] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [customSelected, setCustomSelected] = useState(false)
  const [email, setEmail] = useState('')
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)

  // Calculate monthly total
  const monthlyTotal = (() => {
    let sum = 0
    for (const cat of CATEGORIES) {
      for (const item of cat.items) {
        if (selectedIds.has(item.id)) sum += item.price
      }
    }
    if (customSelected && Number(customAmount) > 0) {
      sum += Number(customAmount)
    }
    return sum
  })()

  const annualTotal = monthlyTotal * 12
  const selectedCount = selectedIds.size + (customSelected ? 1 : 0)

  const animatedMonthly = useCountUp(monthlyTotal, 400)
  const animatedAnnual = useCountUp(showResult ? annualTotal : 0, 1200)

  const toggleItem = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    setShowResult(false)
  }, [])

  const toggleCustom = useCallback(() => {
    setCustomSelected((prev) => !prev)
    setShowResult(false)
  }, [])

  const handleSeeAnnual = () => {
    setShowResult(true)
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setFormStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch(WAITLIST_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setFormStatus('success')
        setEmail('')
      } else {
        const data = await res.json().catch(() => null)
        setErrorMsg(data?.message || 'Something went wrong. Please try again.')
        setFormStatus('error')
      }
    } catch {
      setErrorMsg('Unable to connect. Please check your internet and try again.')
      setFormStatus('error')
    }
  }

  const shareText = `I spend ${formatNaira(annualTotal)}/year on subscriptions and bills. What's your number? Find out: https://subsecute.com/calculator`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`

  return (
      <div className="min-h-screen bg-[#FFFEEC]">
        {/* Nav */}
        <nav className="px-4 pt-5 lg:px-[100px]">
          <div className="relative z-50 mx-auto flex max-w-[1240px] items-center justify-between rounded-xl border border-[#DEE2E6] px-5 py-2.5">
            <a href="/" aria-label="Subsecute home">
              <img src="/images/landing/logo.png" alt="Subsecute logo" className="h-8 w-auto" />
            </a>
            <a
              href="/"
              className="rounded-full bg-[#E96D1F] px-5 py-2 font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
            >
              Back to Home
            </a>
          </div>
        </nav>

        {/* Header */}
        <header className="mx-auto max-w-[720px] px-4 pt-10 text-center lg:pt-16">
          <h1 className="font-neue-power text-3xl font-bold leading-tight text-[#232323] sm:text-4xl lg:text-5xl">
            How much Naira is leaking{' '}
            <span className="text-[#E96D1F]">from your account?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[500px] font-outfit text-sm leading-relaxed text-[#6C757D] sm:text-base lg:text-lg">
            Tap every subscription and bill you pay for. The total might surprise you.
          </p>
        </header>

        {/* Grid */}
        <section className="mx-auto max-w-[960px] px-4 pb-40 pt-8 lg:pt-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.label} className="mb-8">
              <h2 className="mb-3 font-neue-power text-sm font-bold uppercase tracking-widest text-[#6C757D]">
                {cat.label}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => (
                  <Tile
                    key={item.id}
                    item={item}
                    selected={selectedIds.has(item.id)}
                    onToggle={() => toggleItem(item.id)}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Custom */}
          <div className="mb-8">
            <h2 className="mb-3 font-neue-power text-sm font-bold uppercase tracking-widest text-[#6C757D]">
              Other
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <CustomTile
                customName={customName}
                customAmount={customAmount}
                onNameChange={setCustomName}
                onAmountChange={setCustomAmount}
                selected={customSelected}
                onToggle={toggleCustom}
              />
            </div>
          </div>

          {/* Result section */}
          {showResult && (
            <div ref={resultRef} className="mt-12 flex flex-col items-center">
              <p className="mb-2 font-outfit text-base text-[#6C757D]">You spend roughly</p>
              <p className="font-neue-power text-5xl font-bold text-[#E96D1F] sm:text-[72px] lg:text-[96px]">
                {formatNaira(animatedAnnual)}
              </p>
              <p className="mt-1 font-outfit text-base text-[#6C757D]">per year</p>
              <p className="mt-6 rounded-full border border-[#E96D1F]/20 bg-[#E96D1F]/5 px-6 py-2.5 font-outfit text-sm font-medium text-[#E96D1F] sm:text-base">
                {getComparison(annualTotal)}
              </p>

              {/* CTA */}
              <div className="mt-12 w-full max-w-[480px] rounded-2xl border border-[#DEE2E6] bg-white p-6 text-center sm:p-8">
                {formStatus === 'success' ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#58DC00]/20">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 10L9 14L15 6" stroke="#58DC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="font-outfit text-sm tracking-wide text-[#232323]">
                      You&apos;re on the list! We&apos;ll send your breakdown soon.
                    </p>
                    <p className="font-outfit text-xs tracking-wide text-[#6C757D]">
                      Share your number with friends.
                    </p>
                    <div className="flex items-center gap-3">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 font-outfit text-xs font-medium tracking-wide text-white transition-opacity hover:opacity-90"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </a>
                      <a
                        href={twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-[#232323] px-4 py-2 font-outfit text-xs font-medium tracking-wide text-white transition-opacity hover:opacity-90"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Twitter
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-outfit text-base font-medium text-[#232323] sm:text-lg">
                      Want the full breakdown and how Subsecute can handle all of this?
                    </p>
                    <form onSubmit={handleSubmit} className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (formStatus === 'error') setFormStatus('idle')
                        }}
                        placeholder="Enter your email"
                        className={`h-12 w-full min-w-0 rounded-full border border-[#DEE2E6] bg-white px-5 font-outfit text-sm text-[#232323] placeholder-[#ADB5BD] outline-none transition-shadow focus:ring-2 focus:ring-[#E96D1F] sm:flex-1 ${
                          formStatus === 'error' ? 'ring-2 ring-red-500' : ''
                        }`}
                      />
                      <button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="h-12 w-full shrink-0 rounded-full bg-[#232323] px-6 font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto sm:px-7"
                      >
                        {formStatus === 'loading' ? 'Sending...' : 'Send My Report'}
                      </button>
                    </form>
                    {formStatus === 'error' && (
                      <p className="mt-2 font-outfit text-xs text-red-500">{errorMsg}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Sticky bottom bar */}
        {!showResult && (
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#DEE2E6] bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-[960px] items-center justify-between px-4 py-3 sm:py-4">
              <div>
                <p className="font-outfit text-xs text-[#6C757D] sm:text-sm">Monthly total</p>
                <p className="font-neue-power text-xl font-bold text-[#232323] sm:text-2xl">
                  {formatNaira(animatedMonthly)}
                </p>
              </div>
              {selectedCount >= 2 && (
                <button
                  type="button"
                  onClick={handleSeeAnnual}
                  className="rounded-full bg-[#E96D1F] px-5 py-2.5 font-outfit text-sm font-medium tracking-wide text-white transition-all hover:opacity-90 sm:px-7 sm:py-3 sm:text-base"
                >
                  See my annual total
                </button>
              )}
            </div>
          </div>
        )}
      </div>
  )
}
