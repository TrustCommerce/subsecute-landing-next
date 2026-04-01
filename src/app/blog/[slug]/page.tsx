import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date
    }
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-[#FFFEEC]">
      <nav className="border-b border-[#DEE2E6] bg-white px-4 py-4">
        <div className="mx-auto flex max-w-[800px] items-center justify-between">
          <Link href="/">
            <img src="/images/landing/logo.png" alt="Subsecute" className="h-8 w-auto" />
          </Link>
          <Link
            href="/blog"
            className="font-outfit text-sm tracking-wide text-[#6C757D] hover:text-[#232323]"
          >
            All Posts
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-[800px] px-4 py-16">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <time className="font-outfit text-sm text-[#ADB5BD]">{post.date}</time>
            <span className="font-outfit text-sm text-[#ADB5BD]">by {post.author}</span>
          </div>
          <h1 className="mb-4 font-neue-power text-3xl font-bold leading-[1.2em] tracking-normal text-[#232323] sm:text-4xl">
            {post.title}
          </h1>
          <p className="font-outfit text-lg text-[#6C757D]">{post.description}</p>
        </div>

        <div
          className="prose prose-lg max-w-none font-outfit prose-headings:font-neue-power prose-headings:tracking-normal prose-headings:text-[#232323] prose-p:text-[#495057] prose-a:text-[#E96D1F] prose-strong:text-[#232323]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 rounded-2xl bg-[#E96D1F] p-8 text-center">
          <h2 className="mb-2 font-neue-power text-2xl font-bold text-white">
            Ready to automate your subscriptions?
          </h2>
          <p className="mb-6 font-outfit text-white/80">
            Join the waitlist and be first to know when Subsecute launches.
          </p>
          <Link
            href="/#download"
            className="inline-flex h-12 items-center rounded-full bg-[#232323] px-8 font-outfit text-sm font-medium text-white hover:opacity-90"
          >
            Join the Waitlist
          </Link>
        </div>
      </article>
    </div>
  )
}
