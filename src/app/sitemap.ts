import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config";
import { getAllPosts } from "@/lib/blog";

// Refresh every 5 min so a post enters the sitemap shortly after its date.
export const revalidate = 300;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/calculator`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/family`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/quiz`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/support`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/delete-account`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy-policy.html`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-of-service.html`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    ...(post.updated || post.date
      ? { lastModified: new Date(post.updated || post.date) }
      : {}),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...routes, ...posts];
}
