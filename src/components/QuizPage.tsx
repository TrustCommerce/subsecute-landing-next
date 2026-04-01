'use client'

import { useState, useEffect, useRef } from 'react'

const WAITLIST_API = 'https://api.subsecute.com/subsecute-api/v1/waitlist'

interface Question {
  id: number
  text: string
  options: { label: string; points: number }[]
}

const questions: Question[] = [
  {
    id: 1,
    text: 'How many subscriptions and recurring bills do you pay for?',
    options: [
      { label: '1-2', points: 15 },
      { label: '3-5', points: 10 },
      { label: '6-10', points: 5 },
      { label: 'More than 10', points: 2 }
    ]
  },
  {
    id: 2,
    text: 'When was the last time you checked which subscriptions are still active?',
    options: [
      { label: 'This week', points: 15 },
      { label: 'This month', points: 10 },
      { label: "Can't remember", points: 3 },
      { label: 'Wait, I should do that?', points: 0 }
    ]
  },
  {
    id: 3,
    text: 'Has your bank card ever been declined on an international subscription?',
    options: [
      { label: 'Never', points: 15 },
      { label: 'Once or twice', points: 8 },
      { label: 'It happens regularly', points: 3 },
      { label: "I've lost access to a service because of it", points: 0 }
    ]
  },
  {
    id: 4,
    text: 'How do you handle your airtime and data?',
    options: [
      { label: 'It auto-renews, I never think about it', points: 15 },
      { label: "I buy it manually but I'm consistent", points: 8 },
      { label: 'I buy it when I remember', points: 3 },
      { label: 'I run out at midnight regularly', points: 0 }
    ]
  },
  {
    id: 5,
    text: 'Has your DSTV or cable ever expired because you forgot to renew?',
    options: [
      { label: 'Never', points: 15 },
      { label: 'Once', points: 8 },
      { label: 'More than once', points: 3 },
      { label: 'During a match', points: 0 }
    ]
  },
  {
    id: 6,
    text: 'Do you share subscription costs with anyone?',
    options: [
      { label: "Yes and it's well organized", points: 15 },
      { label: "Yes but it's chaotic", points: 5 },
      { label: 'No', points: 10 },
      { label: "I've given up trying to collect money from people", points: 0 }
    ]
  },
  {
    id: 7,
    text: 'Could you cancel any subscription right now in under 60 seconds?',
    options: [
      { label: 'Yes, easily', points: 10 },
      { label: "Probably, but I'd have to find the card details first", points: 5 },
      { label: "I'd have to log into multiple apps and websites", points: 2 },
      { label: "I honestly don't know how", points: 0 }
    ]
  }
]

interface ScoreTier {
  label: string
  description: string
  color: string
  range: [number, number]
}

const scoreTiers: ScoreTier[] = [
  {
    range: [0, 30],
    label: 'Subscription Chaos',
    description:
      'Your subscriptions and bills are running you, not the other way around. You\'re losing money to declined cards, forgotten renewals, and midnight data runs.',
    color: '#EF4444'
  },
  {
    range: [31, 60],
    label: 'Getting By',
    description:
      "You're managing, but it's manual and messy. One forgotten payment away from losing access to something important.",
    color: '#EAB308'
  },
  {
    range: [61, 85],
    label: 'Almost Automated',
    description:
      "You've got most things under control, but there are gaps. A few subscriptions are probably charging you that you forgot about.",
    color: '#22C55E'
  },
  {
    range: [86, 100],
    label: 'Fully in Control',
    description:
      "Impressive. You're one of the rare few who actually tracks everything. Subsecute would just make it effortless.",
    color: '#3B82F6'
  }
]

interface Fix {
  questionId: number
  threshold: number
  text: string
}

const fixes: Fix[] = [
  {
    questionId: 3,
    threshold: 8,
    text: 'Subsecute gives each subscription its own virtual USD card. No more declines.'
  },
  {
    questionId: 4,
    threshold: 8,
    text: 'Auto-pay your airtime and data. Set it once, never run out again.'
  },
  {
    questionId: 5,
    threshold: 8,
    text: 'Your DSTV renews automatically. No more expired subscriptions.'
  },
  {
    questionId: 6,
    threshold: 10,
    text: 'Share plans with family. Everyone gets access, you keep control.'
  },
  {
    questionId: 7,
    threshold: 5,
    text: 'Cancel any subscription with one tap. No calls, no dark patterns.'
  }
]

type Stage = 'landing' | 'quiz' | 'calculating' | 'email' | 'result'

export default function QuizPage() {
  const [stage, setStage] = useState<Stage>('landing')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left')
  const [animating, setAnimating] = useState(false)
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [displayScore, setDisplayScore] = useState(0)
  const scoreRef = useRef(0)

  const totalScore = answers.reduce((sum, pts) => sum + pts, 0)

  const getTier = (score: number) => {
    return scoreTiers.find((t) => score >= t.range[0] && score <= t.range[1]) || scoreTiers[0]
  }

  const getRelevantFixes = () => {
    const relevant = fixes
      .filter((f) => {
        const answerIdx = f.questionId - 1
        if (answerIdx >= answers.length) return false
        return answers[answerIdx] < f.threshold
      })
      .slice(0, 3)
    return relevant
  }

  const handleAnswer = (points: number) => {
    if (animating) return
    const newAnswers = [...answers, points]
    setAnswers(newAnswers)

    if (currentQ < questions.length - 1) {
      setSlideDir('left')
      setAnimating(true)
      setTimeout(() => {
        setCurrentQ((prev) => prev + 1)
        setAnimating(false)
      }, 300)
    } else {
      // Last question — go to calculating
      setStage('calculating')
      setTimeout(() => {
        setStage('email')
      }, 1500)
    }
  }

  // Animated score count-up
  useEffect(() => {
    if (stage !== 'result') return
    scoreRef.current = 0
    setDisplayScore(0)
    const target = totalScore
    const duration = 1500
    const steps = 60
    const increment = target / steps
    const interval = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      setDisplayScore(Math.round(current))
    }, interval)

    return () => clearInterval(timer)
  }, [stage, totalScore])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setEmailStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(WAITLIST_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (res.ok) {
        setStage('result')
      } else {
        const data = await res.json().catch(() => null)
        setErrorMsg(data?.message || 'Something went wrong. Please try again.')
        setEmailStatus('error')
      }
    } catch {
      setErrorMsg('Unable to connect. Please check your internet and try again.')
      setEmailStatus('error')
    }
  }

  const tier = getTier(totalScore)
  const shareText = `I scored ${totalScore}/100 on my subscription score. ${tier.label}. What's yours? https://subsecute.com/quiz`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`

  return (
      <div className="relative min-h-screen bg-[#FFFEEC] font-neue-power">
        {/* Nav */}
        <nav className="flex items-center justify-between px-4 pt-5 lg:px-[100px]">
          <a href="/">
            <img src="/images/landing/logo.png" alt="Subsecute" className="h-7 lg:h-8" />
          </a>
        </nav>

        {/* Landing */}
        {stage === 'landing' && (
          <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4">
            <div className="flex flex-col items-center text-center">
              <img
                src="/images/landing/logo.png"
                alt="Subsecute"
                className="mb-8 h-10 lg:h-12"
              />
              <h1 className="mb-4 font-neue-power text-4xl font-bold tracking-tight text-[#232323] sm:text-5xl">
                What&apos;s your subscription score?
              </h1>
              <p className="mb-10 max-w-md font-outfit text-base text-[#6C757D] sm:text-lg">
                7 questions. 60 seconds. Find out if you&apos;re in control — or in chaos.
              </p>
              <button
                onClick={() => setStage('quiz')}
                className="h-14 rounded-full bg-[#E96D1F] px-10 font-outfit text-base font-medium tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]"
              >
                Start Quiz
              </button>
            </div>
          </div>
        )}

        {/* Quiz */}
        {stage === 'quiz' && (
          <div className="flex min-h-[calc(100vh-80px)] flex-col px-4 pt-8 lg:px-[100px]">
            {/* Progress bar */}
            <div className="mx-auto mb-2 w-full max-w-lg">
              <div className="flex items-center justify-between">
                <span className="font-outfit text-xs text-[#6C757D]">
                  {currentQ + 1} of {questions.length}
                </span>
                <span className="font-outfit text-xs text-[#6C757D]">
                  {Math.round(((currentQ + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#E96D1F]/15">
                <div
                  className="h-full rounded-full bg-[#E96D1F] transition-all duration-500 ease-out"
                  style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="flex flex-1 flex-col items-center justify-center">
              <div
                className={`w-full max-w-lg transition-all duration-300 ${
                  animating
                    ? 'translate-x-[-40px] opacity-0'
                    : 'translate-x-0 opacity-100'
                }`}
              >
                <h2 className="mb-8 text-center font-neue-power text-2xl font-bold tracking-tight text-[#232323] sm:text-3xl">
                  {questions[currentQ].text}
                </h2>
                <div className="flex flex-col gap-3">
                  {questions[currentQ].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.points)}
                      className="w-full rounded-2xl border border-[#DEE2E6] bg-white px-5 py-4 text-left font-outfit text-sm font-medium text-[#232323] transition-all hover:border-[#E96D1F] hover:bg-[#E96D1F]/5 active:scale-[0.98] sm:text-base"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calculating */}
        {stage === 'calculating' && (
          <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4">
            <div className="flex flex-col items-center gap-5">
              {/* Spinner */}
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#E96D1F]/20 border-t-[#E96D1F]" />
              <p className="font-outfit text-lg font-medium tracking-wide text-[#232323]">
                Calculating your score...
              </p>
            </div>
          </div>
        )}

        {/* Email gate */}
        {stage === 'email' && (
          <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4">
            <div className="flex w-full max-w-md flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E96D1F]/10">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E96D1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h2 className="mb-2 font-neue-power text-2xl font-bold tracking-tight text-[#232323] sm:text-3xl">
                Your score is ready!
              </h2>
              <p className="mb-8 font-outfit text-sm text-[#6C757D] sm:text-base">
                Enter your email to see your score and how to fix it.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex w-full flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailStatus === 'error') setEmailStatus('idle')
                  }}
                  placeholder="Enter your email"
                  className={`h-12 w-full rounded-full border border-[#DEE2E6] bg-white px-5 text-center font-outfit text-sm text-[#232323] placeholder-[#ADB5BD] outline-none transition-shadow focus:ring-2 focus:ring-[#E96D1F] ${
                    emailStatus === 'error' ? 'ring-2 ring-red-500' : ''
                  }`}
                />
                <button
                  type="submit"
                  disabled={emailStatus === 'loading'}
                  className="h-12 w-full rounded-full bg-[#E96D1F] font-outfit text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {emailStatus === 'loading' ? 'Submitting...' : 'See My Score'}
                </button>
              </form>
              {emailStatus === 'error' && (
                <p className="mt-2 font-outfit text-xs text-red-500">{errorMsg}</p>
              )}
            </div>
          </div>
        )}

        {/* Result */}
        {stage === 'result' && (
          <div className="flex min-h-[calc(100vh-80px)] flex-col items-center px-4 pt-8 pb-16">
            <div className="flex w-full max-w-lg flex-col items-center text-center">
              {/* Score circle */}
              <div className="mb-6 flex flex-col items-center">
                <div
                  className="flex h-40 w-40 items-center justify-center rounded-full border-4 sm:h-48 sm:w-48"
                  style={{ borderColor: tier.color }}
                >
                  <div className="flex flex-col items-center">
                    <span
                      className="font-neue-power text-5xl font-bold sm:text-6xl"
                      style={{ color: tier.color }}
                    >
                      {displayScore}
                    </span>
                    <span className="font-outfit text-sm text-[#6C757D]">/100</span>
                  </div>
                </div>
              </div>

              {/* Label */}
              <div
                className="mb-3 inline-block rounded-full px-4 py-1.5"
                style={{ backgroundColor: `${tier.color}15` }}
              >
                <span className="font-outfit text-sm font-semibold" style={{ color: tier.color }}>
                  {tier.label}
                </span>
              </div>

              {/* Description */}
              <p className="mb-10 max-w-md font-outfit text-sm leading-relaxed text-[#6C757D] sm:text-base">
                {tier.description}
              </p>

              {/* Fixes */}
              {getRelevantFixes().length > 0 && (
                <div className="mb-10 w-full">
                  <h3 className="mb-4 font-neue-power text-lg font-bold text-[#232323]">
                    What Subsecute would fix for you
                  </h3>
                  <div className="flex flex-col gap-3">
                    {getRelevantFixes().map((fix, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-2xl border border-[#DEE2E6] bg-white px-5 py-4 text-left"
                      >
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E96D1F]">
                          <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
                            <path
                              d="M5 10L9 14L15 6"
                              stroke="white"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <p className="font-outfit text-sm text-[#232323]">{fix.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="flex flex-col items-center gap-3">
                <p className="font-outfit text-xs text-[#6C757D]">
                  Challenge a friend — share your score
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-outfit text-xs font-medium tracking-wide text-white transition-opacity hover:opacity-90"
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
                    className="flex items-center gap-2 rounded-full bg-[#232323] px-5 py-2.5 font-outfit text-xs font-medium tracking-wide text-white transition-opacity hover:opacity-90"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Twitter
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10">
                <a
                  href="/"
                  className="inline-block rounded-full border border-[#DEE2E6] bg-white px-6 py-3 font-outfit text-sm font-medium text-[#232323] transition-all hover:border-[#E96D1F] hover:bg-[#E96D1F]/5"
                >
                  Learn more about Subsecute
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
  )
}
