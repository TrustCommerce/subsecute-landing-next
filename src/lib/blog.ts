import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

// A post is published once its date (YYYY-MM-DD) has arrived. Future-dated
// posts stay hidden from listings, the sitemap, and direct URLs until then —
// this is what turns a batch of committed drafts into one-post-a-day. Pages
// revalidate on a schedule (see `revalidate` in the blog routes), so a post
// goes live on its date with no redeploy needed.
function isPublished(date: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return date <= today;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
  content: string;
}

export function getAllPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "",
      author: data.author || "Subsecute Team",
      tags: data.tags || [],
      image: data.image || "",
    };
  });

  return posts
    .filter((post) => isPublished(post.date))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content: rawContent } = matter(fileContent);

  // Hard-gate future-dated posts: even a direct URL 404s until the date.
  if (data.date && !isPublished(String(data.date))) return null;

  const processed = await remark().use(html).process(rawContent);
  const content = processed.toString();

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    author: data.author || "Subsecute Team",
    tags: data.tags || [],
    image: data.image || "",
    content,
  };
}
