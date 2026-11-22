import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

// Crawlers that collect content for AI training or AI answers.
// Only honest bots read robots.txt; names change, so check this list now and then.
const AI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", // OpenAI
  "ClaudeBot", "Claude-User", "Claude-SearchBot", // Anthropic
  "Google-Extended", // Gemini training (Google Search is unaffected)
  "Applebot-Extended", // Apple AI training (Siri/Spotlight unaffected)
  "meta-externalagent", // Meta
  "CCBot", // Common Crawl, used by many AI datasets
  "PerplexityBot",
  "Bytespider",
  "Amazonbot",
  "cohere-training-data-crawler",
  "Diffbot",
  "ImagesiftBot",
];

// served as /robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/admin" },
      { userAgent: AI_BOTS, disallow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
