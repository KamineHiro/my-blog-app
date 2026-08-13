import type { Metadata } from "next";
import { getAllTags } from "@/lib/posts";
import { TagBadge } from "@/components/TagBadge";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "タグ" };

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">タグ</h1>
      <p className="mt-2 text-ink-muted">トピックから記事を探す。</p>

      {tags.length === 0 ? (
        <p className="mt-8 text-ink-muted">タグがありません。</p>
      ) : (
        <div className="mt-8 flex flex-wrap gap-3">
          {tags.map((t) => (
            <TagBadge key={t.id} tag={t} count={t.count} />
          ))}
        </div>
      )}
    </div>
  );
}
