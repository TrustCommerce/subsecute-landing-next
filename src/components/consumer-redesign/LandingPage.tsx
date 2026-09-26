import Image from "next/image";
import { CONSUMER_FAQS } from "@/lib/consumer-faqs";
import Link from "next/link";
import { Asterisk, TwitchLogo } from "@phosphor-icons/react/dist/ssr";
import ChatGptLogo from "./ChatGptLogo";
import StoreBadges from "../StoreBadges";
import { MobileMenu, RenewalStory } from "./Interactions";
import s from "./landing.module.css";
import AppShowcase from "./AppShowcase";
import SpendingInsights from "./SpendingInsights";
import WhatsAppWalkthrough from "./WhatsAppWalkthrough";
import GiftLinkStory from "./GiftLinkStory";
import DirectionalArrow from "./DirectionalArrow";

function Brand() {
  return (
    <a href="#top" className={s.brand} aria-label="Subsecute home">
      <Image src="/images/landing/logo.svg" width={38} height={38} alt="" />
      <span>subsecute</span>
    </a>
  );
}

function Arrow() {
  return (
    <span aria-hidden="true">
      <DirectionalArrow />
    </span>
  );
}

const renewals = [
  {
    mark: <TwitchLogo size={24} weight="fill" />,
    name: "Twitch",
    description: "Keep up with your favourite creators",
    when: "Tomorrow",
    style: s.twitch,
  },
  {
    mark: "ϟ",
    name: "Mum’s power",
    description: "A little care, on repeat",
    when: "In 3 days",
    style: s.power,
  },
  {
    mark: <ChatGptLogo />,
    name: "ChatGPT",
    description: "For your next big idea",
    when: "In 5 days",
    style: s.chatgpt,
  },
];

function MonthVisual() {
  return (
    <div className={s.monthVisual}>
      <div className={s.orbit} aria-hidden="true" />
      <div className={s.floatingNote}>
        <span>✓</span> A little less on your mind.
      </div>
      <div className={s.monthPanel}>
        <div className={s.panelTop}>
          <span className={s.panelEyebrow}>LIFE, A LITTLE MORE ORGANISED</span>
          <span aria-hidden="true">
            <DirectionalArrow />
          </span>
        </div>
        <h2>
          Your next seven days<span>.</span>
        </h2>
        <div className={s.week} aria-hidden="true">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} className={i === 1 ? s.selectedDay : ""}>
              <span>{d}</span>
              <b>{14 + i}</b>
              {[1, 3, 5].includes(i) && <i />}
            </div>
          ))}
        </div>
        <div className={s.renewals}>
          {renewals.map((r) => (
            <div key={r.name} className={s.renewalRow}>
              <span
                className={`${s.serviceMark} ${r.style}`}
                aria-hidden="true"
              >
                {r.mark}
              </span>
              <div>
                <strong>{r.name}</strong>
                <small>{r.description}</small>
              </div>
              <span className={s.when}>{r.when}</span>
            </div>
          ))}
        </div>
        <div className={s.panelBottom}>
          <span className={s.tick}>✓</span>
          <span>One place for what comes next.</span>
        </div>
      </div>
      <div className={s.smallCard} aria-hidden="true">
        <b>subsecute</b>
        <span>
          Made for your
          <br />
          everyday.
        </span>
        <i>
          <DirectionalArrow />
        </i>
      </div>
      <span className={s.visualCaption}>
        YOUR ROUTINE. WITH ROOM TO BREATHE.
      </span>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className={s.page} id="top">
      <a className={s.skipLink} href="#main-content">
        Skip to content
      </a>
      <header className={s.header}>
        <Brand />
        <nav className={s.desktopNav} aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#everyday">The everyday</a>
          <a href="#your-people">For your people</a>
          <Link href="/blog">Blog</Link>
        </nav>
        <a className={s.headerCta} href="#download">
          Get the app <Arrow />
        </a>
        <MobileMenu />
      </header>
      <main id="main-content">
        <section
          className={`${s.container} ${s.hero}`}
          aria-labelledby="hero-title"
        >
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>
              <span /> FOR THE LIFE YOU HAVE ON REPEAT
            </p>
            <h1 id="hero-title">
              The recurring
              <br />
              money app
              <br />
              <em>for Nigerians.</em>
            </h1>
            <p className={s.lead}>
              Subsecute runs every subscription you have. Funds them. Tracks
              them. Shares them. Gifts them. Cancels them. So you don’t have to.
            </p>
            <div className={s.heroActions}>
              <a href="#download" className={s.primaryButton}>
                Get Subsecute <Arrow />
              </a>
              <a href="#how-it-works" className={s.textLink}>
                See how it works{" "}
                <span aria-hidden="true">
                  <DirectionalArrow direction="down" />
                </span>
              </a>
            </div>
            <p className={s.availability}>
              Made for your everyday. Available on iOS & Android.
            </p>
          </div>
          <MonthVisual />
        </section>
        <div className={`${s.container} ${s.serviceStrip}`}>
          <span>
            FROM YOUR FAVOURITES
            <br />
            TO YOUR EVERYDAY ESSENTIALS
          </span>
          <div>
            <b>Twitch</b>
            <b className={s.netflix}>NETFLIX</b>
            <b className={s.chatgptWordmark}>
              <ChatGptLogo size={22} /> ChatGPT
            </b>
            <b>DStv</b>
            <b>
              Electricity <span aria-hidden="true">ϟ</span>
            </b>
          </div>
        </div>
        <AppShowcase />
        <SpendingInsights />
        <section id="how-it-works" className={s.darkSection}>
          <div className={s.container}>
            <div className={s.sectionIntro}>
              <div>
                <p className={s.eyebrow}>A LITTLE SETUP. A LOT LESS CHASING.</p>
                <h2>
                  Ready before
                  <br />
                  the renewal<span>.</span>
                </h2>
              </div>
              <p>
                One subscription. One dedicated card.
                <br />A clear next step.
              </p>
            </div>
            <RenewalStory />
          </div>
        </section>
        <section id="everyday" className={`${s.container} ${s.everyday}`}>
          <div className={s.sectionIntro}>
            <div>
              <p className={s.eyebrow}>MORE LIFE. LESS ADMIN.</p>
              <h2>
                All the things
                <br />
                that keep life going.
              </h2>
            </div>
            <p>
              From your favourite shows to the lights at home.
              <br />
              Make room for the things that matter.
            </p>
          </div>
          <div className={s.everydayGrid}>
            <article className={s.subscriptionTile}>
              <div className={s.tileTop}>
                <span>01 / YOUR SUBSCRIPTIONS</span>
                <Arrow />
              </div>
              <div className={s.logoComposition} aria-hidden="true">
                <span>▶</span>
                <span>≈</span>
                <span>
                  <Asterisk size="1em" weight="bold" aria-hidden="true" />
                </span>
              </div>
              <h3>
                Keep your favourites.
                <br />
                Lose the mental tabs.
              </h3>
              <p>Dedicated cards and a clearer view of what renews next.</p>
            </article>
            <article className={s.billsTile}>
              <div className={s.tileTop}>
                <span>02 / THE HOME ESSENTIALS</span>
                <Arrow />
              </div>
              <div className={s.receipt}>
                <span>THE EVERYDAY LIST</span>
                <div>
                  <span>ϟ Electricity</span>
                  <b>Home, powered.</b>
                </div>
                <div>
                  <span>◉ Data & airtime</span>
                  <b>Stay connected.</b>
                </div>
                <div>
                  <span>▣ TV</span>
                  <b>Time to unwind.</b>
                </div>
              </div>
              <h3>
                Life doesn’t stop.
                <br />
                Neither do the essentials.
              </h3>
              <p>Bring your regular bills into the same simple routine.</p>
            </article>
          </div>
        </section>
        <section id="whatsapp" className={s.whatsappSection}>
          <div className={`${s.container} ${s.whatsappGrid}`}>
            <div>
              <p className={s.eyebrow}>RIGHT WHERE YOU ALREADY ARE</p>
              <h2>
                Less app-hopping.
                <br />
                More “sorted.”
              </h2>
              <p className={s.lead}>
                A familiar conversation. A simpler way to keep up with your
                subscriptions through Subsecute on WhatsApp.
              </p>
              <a href="#download" className={s.textLink}>
                Start with the Subsecute app <Arrow />
              </a>
            </div>
            <WhatsAppWalkthrough />
          </div>
        </section>
        <section id="your-people" className={`${s.container} ${s.family}`}>
          <div className={s.familyImage}>
            <Image
              src="/images/consumer-redesign/family-laura-tancredi-pexels.webp"
              alt="A smiling woman talking on her phone against a warm beige background"
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <div className={s.familyNote}>
              <span className={s.power}>ϟ</span>
              <div>
                <b>A little care, on repeat.</b>
                <small>For the people who feel like home.</small>
              </div>
              <span aria-hidden="true">♡</span>
            </div>
          </div>
          <div>
            <p className={s.eyebrow}>FOR YOUR PEOPLE</p>
            <h2>
              Care that keeps
              <br />
              showing up.
            </h2>
            <p className={s.lead}>
              Their power. Their data. Their favourite shows. Keep the everyday
              things covered, even when you’re miles away.
            </p>
            <div className={s.familyLine}>
              <span aria-hidden="true">♡</span>One plan. The people you choose.
            </div>
            <div className={s.familyLine}>
              <span aria-hidden="true">
                <DirectionalArrow />
              </span>
              A gift that lasts beyond today.
            </div>
            <Link href="/family" className={s.primaryButton}>
              Explore family plans <Arrow />
            </Link>
          </div>
        </section>
        <GiftLinkStory />
        <section className={`${s.container} ${s.faq}`}>
          <div>
            <p className={s.eyebrow}>GOOD QUESTIONS.</p>
            <h2>
              A little clarity
              <br />
              goes a long way.
            </h2>
            <p>Still have something on your mind?</p>
            <Link href="/support" className={s.textLink}>
              Talk to us <Arrow />
            </Link>
          </div>
          <div className={s.questions}>
            {CONSUMER_FAQS.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="download" className={s.download}>
          <div className={s.container}>
            <p className={s.eyebrow}>TAKE SOMETHING OFF YOUR MIND.</p>
            <h2>
              Your everyday.
              <br />A little lighter.
            </h2>
            <p>Make room for life. Let’s get your month together.</p>
            <StoreBadges className={s.storeBadges} />
            <span className={s.downloadStar} aria-hidden="true">
              <Asterisk size="1em" weight="bold" />
            </span>
          </div>
        </section>
      </main>
      <footer className={`${s.container} ${s.footer}`}>
        <div>
          <Brand />
          <p>Your everyday, already handled.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/support">Support</Link>
          <Link href="/family">Family plans</Link>
          <Link href="/blog">Blog</Link>
          <a href="/privacy-policy.html">Privacy</a>
          <a href="/terms-of-service.html">Terms</a>
          <a href="mailto:hello@subsecute.com">
            Say hello <Arrow />
          </a>
        </nav>
        <div className={s.footerBottom}>
          <span>
            © {new Date().getFullYear()} Subsecute. All rights reserved.
          </span>
          <span>Made for the way you live.</span>
        </div>
      </footer>
    </div>
  );
}
