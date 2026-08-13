import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="prose max-w-none">
      <h1 className="font-display text-3xl font-bold tracking-tight">About</h1>
      <p className="mt-4 text-ink-muted">
        はじめまして、KamineHiro です。Web 開発の学びや実験をこのブログに記録しています。
        （このプロフィールはプレースホルダーです。後で自由に書き換えてください。）
      </p>

      <h2>興味・関心</h2>
      <ul>
        <li>フロントエンド（React / Next.js）</li>
        <li>エッジ / サーバーレス（Cloudflare Workers・D1）</li>
        <li>TypeScript と開発体験の改善</li>
      </ul>

      <h2>このサイトについて</h2>
      <p>
        Next.js（App Router）+ React で構築し、Cloudflare Workers 上で
        OpenNext を使って動かしています。記事データは Cloudflare D1
        （サーバーレス SQL）に保存し、Markdown をサーバー側で HTML
        に変換して表示しています。
      </p>

      <h2>連絡先</h2>
      <p>お問い合わせは各種 SNS または メール までお気軽にどうぞ。</p>
    </div>
  );
}
