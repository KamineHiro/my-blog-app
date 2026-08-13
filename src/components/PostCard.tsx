import Link from "next/link";
import type { PostWithTags } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { TagBadge } from "./TagBadge";

/** List item for a post: date, title, excerpt, tags. Whitespace-first. */
export function PostCard({ post }: { post: PostWithTags }) {
  return (
    <article className="border-b border-border pb-8">
      <div className="flex flex-col gap-2">
        <time className="text-xs uppercase tracking-wide text-ink-muted">
          {formatDate(post.publishedAt)}
        </time>
        <h2 className="font-display text-xl font-bold tracking-tight">
          <Link href={`/posts/${post.slug}`} className="hover:text-accent">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="text-ink-muted leading-relaxed">{post.excerpt}</p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <TagBadge key={t.id} tag={t} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
