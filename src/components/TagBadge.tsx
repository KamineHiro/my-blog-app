import Link from "next/link";
import type { Tag } from "@/db/schema";

/** Small pill linking to a tag page. Restrained color per the minimal skill. */
export function TagBadge({ tag, count }: { tag: Tag; count?: number }) {
  return (
    <Link
      href={`/tags/${tag.slug}`}
      className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent"
    >
      {tag.name}
      {typeof count === "number" && (
        <span className="text-ink-muted">({count})</span>
      )}
    </Link>
  );
}
