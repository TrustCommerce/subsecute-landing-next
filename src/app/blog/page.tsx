import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides, tips, and insights about managing subscriptions and bills in Nigeria.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#FFFEEC]">
      <nav className="border-b border-[#DEE2E6] bg-white px-4 py-4">
        <div className="mx-auto flex max-w-[800px] items-center justify-between">
          <Link href="/">
            <img
              src="/images/landing/logo.png"
              alt="Subsecute"
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="font-outfit text-sm tracking-wide text-[#6C757D] hover:text-[#232323]"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-[800px] px-4 py-16">
        <h1 className="mb-2 font-neue-power text-4xl font-bold tracking-normal text-[#232323]">
          Blog
        </h1>
        <p className="mb-12 font-outfit text-lg text-[#6C757D]">
          Guides and insights about managing subscriptions and bills in Nigeria.
        </p>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-[#DEE2E6] bg-white p-12 text-center">
            <p className="font-outfit text-lg text-[#6C757D]">
              Coming soon. We&apos;re writing our first posts.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="rounded-2xl border border-[#DEE2E6] bg-white p-6 transition-shadow hover:shadow-md">
                  <div className="mb-2 flex items-center gap-3">
                    <time className="font-outfit text-xs text-[#ADB5BD]">
                      {post.date}
                    </time>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[rgba(233,109,31,0.1)] px-2 py-0.5 font-outfit text-xs text-[#E96D1F]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mb-1 font-outfit text-xl font-semibold text-[#232323]">
                    {post.title}
                  </h2>
                  <p className="font-outfit text-sm text-[#6C757D]">
                    {post.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
