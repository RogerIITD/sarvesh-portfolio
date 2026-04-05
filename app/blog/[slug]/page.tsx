import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchPostBySlug, fetchPublishedPosts } from "@/lib/notion";
import ShareButtonClient from "@/components/ShareButton";
import type { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const posts = await fetchPublishedPosts();
    return posts
      .filter((p) => p.type === "essay")
      .map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = await fetchPostBySlug(params.slug);
    if (!post) return { title: "Post Not Found" };
    return {
      title: `${post.title} | Sarvesh Khimesra`,
      description: post.excerpt,
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  let post;
  try {
    post = await fetchPostBySlug(params.slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Fetch related posts (same tag, max 3, excluding current)
  let relatedPosts: { title: string; slug: string }[] = [];
  try {
    const allPosts = await fetchPublishedPosts();
    relatedPosts = allPosts
      .filter(
        (p) =>
          p.slug !== post!.slug &&
          p.type === "essay" &&
          p.tags.some((t) => post!.tags.includes(t))
      )
      .slice(0, 3)
      .map((p) => ({ title: p.title, slug: p.slug }));
  } catch {
    // ignore
  }

  return (
    <div className="max-w-[680px] mx-auto px-6 pt-24 pb-20">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-primary hover:text-secondary transition-colors mb-8"
      >
        &larr; Back to blog
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1 className="font-heading text-3xl md:text-4xl text-secondary mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text/60">
          <span>Sarvesh Khimesra</span>
          <time>{formattedDate}</time>
          <span>{post.readTime} min read</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content */}
      <article
        className="prose prose-slate max-w-none
          prose-headings:font-heading prose-headings:text-secondary
          prose-p:leading-relaxed prose-p:text-text/85
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-primary
          prose-code:font-mono prose-code:text-sm prose-code:bg-parchment prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-secondary prose-pre:text-bg prose-pre:rounded-xl
          prose-blockquote:border-l-primary prose-blockquote:text-text/70
          prose-img:rounded-xl
          prose-figure:text-center
          prose-figcaption:text-sm prose-figcaption:text-text/50 prose-figcaption:mt-2
        "
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Share button */}
      <div className="mt-12 pt-8 border-t border-secondary/10">
        <ShareButtonClient />
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h3 className="font-heading text-xl text-secondary mb-4">
            Related posts
          </h3>
          <div className="space-y-3">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="block p-4 bg-white rounded-lg border border-secondary/5 hover:shadow-sm transition-shadow text-secondary hover:text-primary"
              >
                {rp.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
