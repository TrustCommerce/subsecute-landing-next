import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config";

// AI search/answer-engine crawlers we explicitly welcome (GEO / "AI SEO").
// Each platform reads its own agent, so an omission is a silent block: that
// platform simply never cites us.
const AI_BOTS = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search results
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot", // Anthropic
  "anthropic-ai",
  "Claude-Web",
  "Google-Extended", // gates Gemini AND Google AI Overviews
  "Bingbot", // powers Microsoft Copilot
  "Applebot-Extended", // Apple Intelligence
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
