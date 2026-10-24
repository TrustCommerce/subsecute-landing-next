import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
export function Brand() {
  return (
    <Link
      className="b-brand"
      href="#business-main"
      aria-label="Subsecute Business home"
    >
      <Image src="/business-assets/logo.svg" width={28} height={34} alt="" />
      <span>
        subsecute<span className="b-brand-business">business</span>
      </span>
    </Link>
  );
}
export function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="b-button primary" href={href}>
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}
export function ToolLogo({
  name,
  large = false,
}: {
  name: string;
  large?: boolean;
}) {
  const known: Record<string, string> = {
    Figma: "figma",
    Notion: "notion",
    ChatGPT: "openai",
    Framer: "framer",
    "Google Workspace": "google",
  };
  return (
    <span
      className={
        "b-tool-logo " + (known[name] || "neutral") + (large ? " large" : "")
      }
    >
      {known[name] ? (
        <Image
          src={"/business-assets/" + known[name] + ".svg"}
          width={large ? 28 : 22}
          height={large ? 28 : 22}
          alt=""
        />
      ) : (
        name.slice(0, 1)
      )}
    </span>
  );
}
