import Image from "next/image";
import { Bell, Lightning } from "@phosphor-icons/react/dist/ssr";
import home from "../../../public/images/landing/phone-screen.png";
import ChatGptLogo from "./ChatGptLogo";
import Scene from "./Scene";
import s from "./ConsumerHero.module.css";

export default function ConsumerHero() {
  return (
    <Scene className={s.stage}>
      <div className={s.backdrop} aria-hidden="true" />
      <div className={s.phoneDrift}>
        <div className={s.phone}>
          <Image
            src={home}
            alt="Subsecute home: active subscriptions, spending, gift link and upcoming renewals"
            sizes="(max-width: 760px) 254px, 300px"
            preload
          />
        </div>
      </div>
      <div className={s.reminder}>
        <span className={s.bell}>
          <Bell size={18} weight="fill" aria-hidden="true" />
        </span>
        <div>
          <span>Before your renewal</span>
          <strong>A heads-up. Time to decide.</strong>
        </div>
      </div>
      <div className={s.card}>
        <span className={s.cardBrand}>
          subsecute <span>VIRTUAL</span>
        </span>
        <div className={s.cardService}>
          <ChatGptLogo size={24} />
          <strong>ChatGPT</strong>
        </div>
        <span className={s.cardNumber}>
          •••• &nbsp; •••• &nbsp; •••• &nbsp; 3042
        </span>
        <span className={s.cardCaption}>One subscription. Its own card.</span>
      </div>
      <div className={s.bill}>
        <Lightning size={18} weight="fill" aria-hidden="true" />
        <span>And Mum’s electricity.</span>
      </div>
      <p className={s.caption}>Your subscriptions. Your bills. Your people.</p>
    </Scene>
  );
}
