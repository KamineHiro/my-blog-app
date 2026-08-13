-- Seed data for local/remote D1. Idempotent-ish: clears then inserts.
DELETE FROM post_tags;
DELETE FROM posts;
DELETE FROM tags;

INSERT INTO tags (id, name, slug) VALUES
  (1, 'Next.js', 'nextjs'),
  (2, 'Cloudflare', 'cloudflare'),
  (3, 'TypeScript', 'typescript'),
  (4, 'Database', 'database');

INSERT INTO posts (id, slug, title, excerpt, content, published_at, updated_at) VALUES
(
  1,
  'deploy-nextjs-to-cloudflare',
  'Next.js を Cloudflare Workers にデプロイする',
  'OpenNext アダプタを使って、App Router の Next.js アプリを Cloudflare Workers 上で動かす手順をまとめます。',
  '## OpenNext とは

`@opennextjs/cloudflare` は、Next.js のビルド出力を Cloudflare Workers 上で動かすための公式アダプタです。SSR や Server Actions もそのまま利用できます。

## セットアップ

`next.config.ts` で開発用のバインディング注入を有効にします。

```ts
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();
```

## デプロイ

ビルドしてデプロイするだけです。

```bash
npm run deploy
```

> まずは `*.workers.dev` の無料サブドメインで動作確認し、あとから独自ドメインを割り当てるのがおすすめです。',
  '2026-08-01T09:00:00.000Z',
  '2026-08-01T09:00:00.000Z'
),
(
  2,
  'type-safe-d1-with-drizzle',
  'Cloudflare D1 と Drizzle ORM で型安全なデータベース',
  'サーバーレス SQL の D1 を Drizzle ORM から扱い、マイグレーションと型安全なクエリを実現します。',
  '## D1 は「Cloudflare が管理する SQLite」

別途 DB サーバーを借りる必要はなく、`wrangler` CLI とダッシュボードだけで完結します。

## スキーマ定義

```ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
});
```

## クエリ

```ts
const rows = await db.select().from(posts).orderBy(desc(posts.publishedAt));
```

型が付くのでカラム名の typo をコンパイル時に検出できます。',
  '2026-08-05T09:00:00.000Z',
  '2026-08-05T09:00:00.000Z'
),
(
  3,
  'useful-typescript-type-tricks',
  'TypeScript の便利な型テクニック',
  '日々の開発で役立つユーティリティ型と、その使いどころを短くまとめました。',
  '## Pick と Omit

必要なプロパティだけを取り出したり、除外したりできます。

```ts
type Post = { id: number; title: string; body: string };
type PostPreview = Pick<Post, "id" | "title">;
type PostWithoutBody = Omit<Post, "body">;
```

## satisfies

型の広がりを抑えつつ、リテラルの推論を保てます。

```ts
const config = {
  theme: "minimal",
  spacing: [4, 8, 12, 16, 24, 32],
} satisfies Record<string, unknown>;
```

小さなテクニックですが、積み重ねると効きます。',
  '2026-08-10T09:00:00.000Z',
  '2026-08-10T09:00:00.000Z'
);

INSERT INTO post_tags (post_id, tag_id) VALUES
  (1, 1), (1, 2),
  (2, 2), (2, 3), (2, 4),
  (3, 3);
