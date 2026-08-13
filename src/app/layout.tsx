import type { Metadata } from "next";
import { Open_Sans, Inter, Inconsolata } from "next/font/google";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KamineHiro Blog",
    template: "%s — KamineHiro Blog",
  },
  description: "個人・技術ブログ。Web開発の学びや実験を記録します。",
};

// Set the theme class before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${openSans.variable} ${inter.variable} ${inconsolata.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="font-display text-lg font-bold tracking-tight"
            >
              KamineHiro
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-ink-muted hover:text-ink">
                記事
              </Link>
              <Link href="/tags" className="text-ink-muted hover:text-ink">
                タグ
              </Link>
              <Link href="/about" className="text-ink-muted hover:text-ink">
                About
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
          {children}
        </main>

        <footer className="border-t border-border">
          <div className="mx-auto max-w-3xl px-6 py-8 text-sm text-ink-muted">
            © {new Date().getFullYear()} KamineHiro. Built with Next.js on
            Cloudflare.
          </div>
        </footer>
      </body>
    </html>
  );
}
