import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPostsByTag(slug);
  return { title: data ? `#${data.tag.name}` : "タグ" };
}

export default async function TagPage({ params }: Params) {
  const { slug } = await params;
  const data = await getPostsByTag(slug);
  if (!data) notFound();

  return (
    <div>
      <Link href="/tags" className="text-sm text-ink-muted hover:text-ink">
        ← タグ一覧
      </Link>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">
        #{data.tag.name}
      </h1>
      <p className="mt-2 text-ink-muted">{data.posts.length} 件の記事</p>

      <div className="mt-10 flex flex-col gap-8">
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
