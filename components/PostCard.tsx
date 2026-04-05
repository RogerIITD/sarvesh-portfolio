import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/types";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (post.type === "short take") {
    return (
      <article className="bg-white rounded-xl p-6 shadow-sm border border-secondary/5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            short take
          </span>
          <time className="text-xs text-text/50">{formattedDate}</time>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-heading text-lg text-secondary mb-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-text/70 leading-relaxed">{post.excerpt}</p>
        )}
      </article>
    );
  }

  // Essay card
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-secondary/5 hover:shadow-md transition-shadow">
        {post.coverUrl && (
          <div className="aspect-[16/9] overflow-hidden">
            <Image
              src={post.coverUrl}
              alt={post.title}
              width={800}
              height={450}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
              essay
            </span>
            <time className="text-xs text-text/50">{formattedDate}</time>
            <span className="text-xs text-text/50">
              {post.readTime} min read
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-heading text-xl text-secondary mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-text/60 leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
