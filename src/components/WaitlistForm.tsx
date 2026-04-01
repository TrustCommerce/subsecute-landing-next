'use client'

import { useState } from 'react'

interface WaitlistFormProps {
  variant?: 'dark' | 'light'
}

const WAITLIST_API = 'https://api.subsecute.com/subsecute-api/v1/waitlist'

export default function WaitlistForm({ variant = 'dark' }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(WAITLIST_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        const data = await res.json().catch(() => null)
        setErrorMsg(data?.message || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Unable to connect. Please check your internet and try again.')
      setStatus('error')
    }
  }

  const isDark = variant === 'dark'

  const shareText =
    'I just joined the Subsecute waitlist — it auto-pays your Netflix, DSTV, airtime, data, and power with dedicated virtual cards and payment scehdules. No more declined payments. Join here: https://subsecute.com'
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#58DC00]/20">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 10L9 14L15 6"
              stroke="#58DC00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p
          className={`font-outfit text-sm tracking-wide ${isDark ? 'text-white' : 'text-[#232323]'}`}
        >
          You&apos;re on the list! We&apos;ll notify you when we launch.
        </p>
        <p
          className={`font-outfit text-xs tracking-wide ${isDark ? 'text-white/60' : 'text-[#6C757D]'}`}
        >
          Know someone who&apos;d love this? Share it.
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
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-outfit text-xs font-medium tracking-wide transition-opacity hover:opacity-90 ${isDark ? 'bg-white/10 text-white' : 'bg-[#232323] text-white'}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Twitter
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-[440px] flex-col items-center gap-2 px-4 sm:px-0">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          placeholder="Enter your email"
          className={`h-12 w-full min-w-0 rounded-full px-5 text-center font-outfit text-sm outline-none transition-shadow focus:ring-2 focus:ring-[#E96D1F] sm:text-left sm:flex-1 ${
            isDark
              ? 'bg-white/10 text-white placeholder-white/50 border border-white/20'
              : 'bg-white text-[#232323] placeholder-[#ADB5BD] border border-[#DEE2E6]'
          } ${status === 'error' ? 'ring-2 ring-red-500' : ''}`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-12 w-full shrink-0 rounded-full bg-[#232323] px-6 font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto sm:px-7"
        >
          {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>
      {status === 'error' && (
        <p
          className={`font-outfit text-xs tracking-wide ${isDark ? 'text-red-400' : 'text-red-500'}`}
        >
          {errorMsg}
        </p>
      )}
    </div>
  )
}
