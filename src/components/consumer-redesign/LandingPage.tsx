import Image from "next/image";
import Link from "next/link";
import { CONSUMER_FAQS } from "@/lib/consumer-faqs";
import {
  Asterisk,
  Heart,
  Lightning,
  Television,
  TwitchLogo,
  WifiHigh,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import ChatGptLogo from "./ChatGptLogo";
import StoreBadges from "../StoreBadges";
import { MobileMenu } from "./Interactions";
import RenewalJourney from "./RenewalJourney";
import s from "./landing.module.css";
import ConsumerHero from "./ConsumerHero";
import Scene from "./Scene";
import SpendingInsights from "./SpendingInsights";
import WhatsAppWalkthrough from "./WhatsAppWalkthrough";
import GiftLinkStory from "./GiftLinkStory";
import StatementStrip from "./StatementStrip";
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
      <main id="main-content" tabIndex={-1}>
        <section
          className={`${s.container} ${s.hero}`}
          aria-labelledby="hero-title"
        >
          <div className={s.heroCopy}>
            <h1 id="hero-title">
              The recurring <br />
              money app <br />
              <em>for Nigerians.</em>
            </h1>
            <p className={s.lead}>
              Give each subscription its own dollar card. Fund it in naira, get
              a reminder before renewal, and see what you’re paying for. Your
              bills and family payments belong here too.
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
            <p className={s.availability}>Available on iOS & Android.</p>
          </div>
          <ConsumerHero />
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
              Electricity{" "}
              <Lightning size={18} weight="fill" aria-hidden="true" />
            </b>
          </div>
        </div>
        <StatementStrip />
        <section id="how-it-works" className={s.darkSection}>
          <div className={s.container}>
            <div className={s.sectionIntro}>
              <div>
                <h2>
                  A separate card
                  <br />
                  for every subscription<span>.</span>
                </h2>
              </div>
              <p>
                Set up each subscription once. Keep its funding, renewal date
                and payment history together, instead of checking them in
                separate places.
              </p>
            </div>
            <RenewalJourney />
          </div>
        </section>
        <SpendingInsights />
        <section id="everyday" className={`${s.container} ${s.everyday}`}>
          <div className={s.sectionIntro}>
            <div>
              <h2>
                The subscriptions you love.
                <br />
                The bills you can’t skip.
              </h2>
            </div>
            <p>
              Your streaming, software, electricity and airtime, all in
              Subsecute.
            </p>
          </div>
          <Scene className={s.everydayGrid}>
            <article className={s.subscriptionTile}>
              <div className={s.tileTop}>
                <span>Your subscriptions</span>
                <Arrow />
              </div>
              <div
                className={s.logoComposition}
                role="img"
                aria-label="YouTube, Twitch and ChatGPT"
              >
                <span>
                  <YoutubeLogo size={48} weight="fill" aria-hidden="true" />
                </span>
                <span>
                  <TwitchLogo size={44} weight="fill" aria-hidden="true" />
                </span>
                <span>
                  <ChatGptLogo size={44} />
                </span>
              </div>
              <h3>
                Keep your favourites.
                <br />
                Keep track of the cost.
              </h3>
              <p>Dedicated cards and a clearer view of what renews next.</p>
            </article>
            <article className={s.billsTile}>
              <div className={s.tileTop}>
                <span>The home essentials</span>
                <Arrow />
              </div>
              <div className={s.receipt}>
                <span>THE EVERYDAY LIST</span>
                <div>
                  <span>
                    <Lightning size={16} weight="fill" aria-hidden="true" />
                    Electricity
                  </span>
                  <b>Your meter</b>
                </div>
                <div>
                  <span>
                    <WifiHigh size={16} weight="bold" aria-hidden="true" />
                    Data &amp; airtime
                  </span>
                  <b>Your number</b>
                </div>
                <div>
                  <span>
                    <Television size={16} weight="fill" aria-hidden="true" />
                    TV
                  </span>
                  <b>Your decoder</b>
                </div>
              </div>
              <h3>
                Electricity. Data. TV.
                <br />
                Yes, those too.
              </h3>
              <p>Pay regular bills alongside your subscriptions.</p>
            </article>
          </Scene>
        </section>
        <section id="whatsapp" className={s.whatsappSection}>
          <div className={`${s.container} ${s.whatsappGrid}`}>
            <div>
              <h2>
                Ask on WhatsApp,
                <br />
                where you already are.
              </h2>
              <p className={s.lead}>
                Ask what you’re subscribed to or what’s due next. Get an answer
                without opening another app.
              </p>
              <a href="#download" className={s.textLink}>
                Start with the Subsecute app <Arrow />
              </a>
            </div>
            <WhatsAppWalkthrough />
          </div>
        </section>
        <section id="your-people" className={`${s.container} ${s.family}`}>
          <Scene className={s.familyImage}>
            <Image
              src="/images/consumer-redesign/family-generations-rdne-pexels.jpg"
              alt="Several generations of a family smiling together on a sofa"
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <div className={s.familyNote}>
              <span className={s.power}>
                <Lightning size={18} weight="fill" aria-hidden="true" />
              </span>
              <div>
                <b>Mum’s electricity</b>
                <small>Part of your family plan</small>
              </div>
              <Heart size={16} aria-hidden="true" />
            </div>
          </Scene>
          <div>
            <h2>
              Cover their bills
              <br />
              from wherever you are.
            </h2>
            <p className={s.lead}>
              Their light, their data, their DStv. Add them to a plan, set a
              monthly limit, and the bills come out of your balance.
            </p>
            <div className={s.familyLine}>
              <Heart size={16} aria-hidden="true" />
              One plan, up to 25 people, a limit each.
            </div>
            <div className={s.familyLine}>
              <span aria-hidden="true">
                <DirectionalArrow />
              </span>
              Or a gift link, so somebody covers one of yours.
            </div>
            <Link href="/family" className={s.primaryButton}>
              Explore family plans <Arrow />
            </Link>
          </div>
        </section>
        <GiftLinkStory />
        <section className={`${s.container} ${s.faq}`}>
          <div className={s.faqIntro}>
            <h2>
              Questions people
              <br />
              ask before downloading.
            </h2>
            <p>
              Still have something on your mind?{" "}
              <Link href="/support" className={s.textLink}>
                Talk to us <Arrow />
              </Link>
            </p>
          </div>
          {/* One list, not a trust block beside an accordion. Those two were
              answering the same questions twice, and the accordion hid its
              half behind a click at the exact moment someone is deciding
              whether to hand over a card. Every line is sourced: the fee and
              rate from our own terms, the rest from the product and the
              company record already in the footer. */}
          <dl className={s.answers}>
            {CONSUMER_FAQS.map(([term, answer]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{answer}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section id="download" className={s.download}>
          <div className={s.container}>
            <h2>
              Put your next month
              <br />
              in Subsecute.
            </h2>
            <p>Start with one subscription. Add the rest as you go.</p>
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
          <p>The recurring money app for Nigerians.</p>
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
          <span>TrustCommerce Resources Ltd · RC 7131175</span>
        </div>
      </footer>
    </div>
  );
}
