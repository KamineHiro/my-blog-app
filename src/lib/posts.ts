import { desc, eq, isNotNull, and } from "drizzle-orm";
import { getDb } from "@/db";
import { posts, tags, postTags, type Post, type Tag } from "@/db/schema";

export type PostWithTags = Post & { tags: Tag[] };

/** Attach tags to a list of posts with a single extra query (avoids N+1). */
async function withTags(rows: Post[]): Promise<PostWithTags[]> {
  if (rows.length === 0) return [];
  const db = await getDb();
  const links = await db
    .select({
      postId: postTags.postId,
      id: tags.id,
      name: tags.name,
      slug: tags.slug,
    })
    .from(postTags)
    .innerJoin(tags, eq(postTags.tagId, tags.id));

  const byPost = new Map<number, Tag[]>();
  for (const l of links) {
    const list = byPost.get(l.postId) ?? [];
    list.push({ id: l.id, name: l.name, slug: l.slug });
    byPost.set(l.postId, list);
  }
  return rows.map((p) => ({ ...p, tags: byPost.get(p.id) ?? [] }));
}

/** All published posts, newest first. */
export async function getPublishedPosts(): Promise<PostWithTags[]> {
  const db = await getDb();
  const rows = await db
    .select()
    .from(posts)
    .where(isNotNull(posts.publishedAt))
    .orderBy(desc(posts.publishedAt));
  return withTags(rows);
}

/** A single published post by slug, or null. */
export async function getPostBySlug(slug: string): Promise<PostWithTags | null> {
  const db = await getDb();
  const rows = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), isNotNull(posts.publishedAt)))
    .limit(1);
  const [post] = await withTags(rows);
  return post ?? null;
}

/** All tags with a count of published posts. */
export async function getAllTags(): Promise<(Tag & { count: number })[]> {
  const db = await getDb();
  const rows = await db
    .select({ id: tags.id, name: tags.name, slug: tags.slug, postId: postTags.postId })
    .from(tags)
    .leftJoin(postTags, eq(postTags.tagId, tags.id))
    .leftJoin(posts, and(eq(postTags.postId, posts.id), isNotNull(posts.publishedAt)));

  const map = new Map<number, Tag & { count: number }>();
  for (const r of rows) {
    const entry = map.get(r.id) ?? { id: r.id, name: r.name, slug: r.slug, count: 0 };
    if (r.postId) entry.count += 1;
    map.set(r.id, entry);
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** A tag by slug plus its published posts. */
export async function getPostsByTag(
  slug: string,
): Promise<{ tag: Tag; posts: PostWithTags[] } | null> {
  const db = await getDb();
  const [tag] = await db.select().from(tags).where(eq(tags.slug, slug)).limit(1);
  if (!tag) return null;

  const rows = await db
    .select({
      id: posts.id,
      slug: posts.slug,
      title: posts.title,
      excerpt: posts.excerpt,
      content: posts.content,
      publishedAt: posts.publishedAt,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .innerJoin(postTags, eq(postTags.postId, posts.id))
    .where(and(eq(postTags.tagId, tag.id), isNotNull(posts.publishedAt)))
    .orderBy(desc(posts.publishedAt));

  return { tag, posts: await withTags(rows) };
}
