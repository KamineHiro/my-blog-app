import { getPublishedPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getPublishedPosts();

  return (
    <div>
      <section className="mb-12">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          記事一覧
        </h1>
        <p className="mt-2 text-ink-muted">
          Web開発の学びや実験の記録。
        </p>
      </section>

      {posts.length === 0 ? (
        <p className="text-ink-muted">
          まだ記事がありません。マイグレーションとシードを実行してください。
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
