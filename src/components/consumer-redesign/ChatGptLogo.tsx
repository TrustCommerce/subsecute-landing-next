import Image from "next/image";
import { LOGO_DEV_TOKEN } from "@/config";

const logoUrl = `https://img.logo.dev/openai.com?token=${LOGO_DEV_TOKEN}&size=64&format=png`;

export default function ChatGptLogo({ size = 24 }: { size?: number }) {
  return <Image src={logoUrl} alt="" width={size} height={size} unoptimized />;
}
