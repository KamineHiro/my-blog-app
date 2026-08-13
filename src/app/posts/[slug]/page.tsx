import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug } from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/format";
import { TagBadge } from "@/components/TagBadge";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "記事が見つかりません" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);

  return (
    <article>
      <Link
        href="/"
        className="text-sm text-ink-muted hover:text-ink"
      >
        ← 記事一覧
      </Link>

      <header className="mt-6 mb-10 border-b border-border pb-8">
        <time className="text-xs uppercase tracking-wide text-ink-muted">
          {formatDate(post.publishedAt)}
        </time>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <TagBadge key={t.id} tag={t} />
            ))}
          </div>
        )}
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
