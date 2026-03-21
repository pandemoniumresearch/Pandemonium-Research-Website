import { intersections } from "@/data/intersections";
import IntersectionCard from "@/components/ui/IntersectionCard";

export default function CoreIntersections() {
  return (
    <section className="border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <h2
          className="text-3xl font-bold text-[#f5f5f5] mb-12"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Core Intersections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {intersections.map((item) => (
            <IntersectionCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
