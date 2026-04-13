import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import BlogCard from "@/components/ui/BlogCard";

export const metadata: Metadata = {
  title: { absolute: "Blog - Pandemonium Research" },
  description:
    "Thoughts, ideas, and writing from the people at Pandemonium Research.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
      {/* Header */}
      <div className="mb-16 max-w-2xl">
        <p
          className="text-xs uppercase tracking-[0.2em] text-[#a0a0a0] mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Blog
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold uppercase text-[#f5f5f5] leading-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          The Writing.
        </h1>
        <p className="mt-6 text-[#a0a0a0] leading-relaxed text-base">
          Ideas, perspectives, and updates from the lab.
        </p>
      </div>

      {/* Post list */}
      {posts.length === 0 ? (
        <p className="text-[#505050] text-sm border-t border-[#2a2a2a] pt-8">
          No posts yet.
        </p>
      ) : (
        <div>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
          <div className="border-t border-[#2a2a2a]" />
        </div>
      )}
    </div>
  );
}
