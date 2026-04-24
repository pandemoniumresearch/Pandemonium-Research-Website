import type { Metadata } from "next";
import { newsItems } from "@/data/news";
import NewsCard from "@/components/ui/NewsCard";

export const metadata: Metadata = {
  title: { absolute: "News - Pandemonium Research" },
  description:
    "Updates, announcements, and posts from Pandemonium Research across LinkedIn, X, and more.",
};

export default function NewsPage() {
  const sorted = [...newsItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
      {/* Header */}
      <div className="mb-16 max-w-2xl">
        <p
          className="text-xs uppercase tracking-[0.2em] text-[#a0a0a0] mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          News
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold uppercase text-[#f5f5f5] leading-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          The Updates.
        </h1>
        <p className="mt-6 text-[#a0a0a0] leading-relaxed text-base">
          Announcements and posts from our team across LinkedIn, X, and beyond.
        </p>
      </div>

      {/* News list */}
      {sorted.length === 0 ? (
        <p className="text-[#505050] text-sm border-t border-[#2a2a2a] pt-8">
          No posts yet.
        </p>
      ) : (
        <div>
          {sorted.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
          <div className="border-t border-[#2a2a2a]" />
        </div>
      )}
    </div>
  );
}
