import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config";

// AI search/answer-engine crawlers we explicitly welcome (GEO / "AI SEO").
// Unlisted crawlers inherit the wildcard rule. Search access and training
// permissions are different; preserve existing training permissions here.
const AI_BOTS = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search results
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot", // Anthropic
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Claude-Web",
  "Google-Extended", // some Gemini uses; Googlebot controls Google Search AI
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
