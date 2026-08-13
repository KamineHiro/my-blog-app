# my-blog

個人・技術ブログ。**Next.js (App Router) + React + TypeScript** で構築し、**Cloudflare Workers**（[OpenNext](https://opennext.js.org/cloudflare) アダプタ）上で動かします。記事データは **Cloudflare D1**（サーバーレス SQL）に保存し、Markdown をサーバー側で HTML に変換して表示します。

- デザイン: [awesome-design-skills](https://github.com/bergside/awesome-design-skills) の **minimal** スキルに準拠（`.codex/skills/design-system/SKILL.md`）
- シンタックスハイライト: Shiki（`rehype-pretty-code`、ライト/ダーク両対応）
- 機能: 記事一覧 `/`・記事詳細 `/posts/[slug]`・タグ一覧 `/tags`・タグ別 `/tags/[slug]`・About `/about`

## 必要環境

- **Node.js 22 以上**（`wrangler` の要件。`.nvmrc` あり → `nvm use`）
- Cloudflare アカウント（デプロイ時）

## セットアップ（ローカル）

```bash
nvm use            # Node 22
npm install
npm run db:migrate:local   # ローカル D1 にスキーマ適用
npm run db:seed:local      # サンプル記事を投入
npm run dev                # http://localhost:3000
```

`next dev` 起動時、`next.config.ts` の `initOpenNextCloudflareForDev()` が
wrangler 経由で D1 バインディング（`DB`）をローカルに注入します。

## データベース（Cloudflare D1）

スキーマは Drizzle ORM（`src/db/schema.ts`）で定義し、マイグレーションは
`drizzle-kit` で生成、`wrangler` で適用します。

```bash
npm run db:generate        # schema.ts からマイグレーション SQL を生成
npm run db:migrate:local   # ローカル D1 に適用
npm run db:migrate:remote  # 本番 D1 に適用（要ログイン）
```

テーブル: `posts` / `tags` / `post_tags`（多対多）。

## 本番デプロイ（Cloudflare）

> 以下は **あなたの Cloudflare アカウント** での操作です。

1. ログインと D1 データベース作成:

   ```bash
   npx wrangler login
   npx wrangler d1 create my-blog-db
   ```

2. 出力された `database_id` を `wrangler.jsonc` の
   `d1_databases[0].database_id`（`REPLACE_WITH_YOUR_D1_DATABASE_ID`）に貼り付ける。

3. 本番 D1 にマイグレーションとシードを適用:

   ```bash
   npm run db:migrate:remote
   npm run db:seed:remote   # 任意（サンプル投入）
   ```

4. ビルド & デプロイ:

   ```bash
   npm run deploy
   ```

   まずは `https://my-blog.<subdomain>.workers.dev` で公開されます。
   独自ドメイン（例: kaminehiro.com）を使う場合は、Cloudflare ダッシュボードで
   ドメインを Cloudflare に追加（ネームサーバ移管）し、Workers のカスタムドメインとして割り当てます。

### 本番同等のローカル確認

```bash
npm run preview   # OpenNext ビルド + workerd(wrangler dev) で実行
```

## 補足

- 旧構成（Xserver への FTP デプロイ／静的 HTML）は撤去済みです。
- CI で自動デプロイしたい場合は、Cloudflare ダッシュボードの
  **Workers Builds**（GitHub 連携）を使うのが簡単です（API トークンの管理不要）。
