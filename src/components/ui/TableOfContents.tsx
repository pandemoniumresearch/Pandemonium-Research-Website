"use client";

import { useEffect, useState } from "react";
import type { ResearchHeading } from "@/lib/types";

export default function TableOfContents({
  headings,
}: {
  headings: ResearchHeading[];
}) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "0px 0px -70% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p
        className="text-[10px] uppercase tracking-[0.18em] text-[#707070] mb-4"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        On this page
      </p>
      <ul className="flex flex-col gap-1">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={[
                "block text-xs leading-relaxed transition-colors duration-150",
                level === 3 ? "pl-3" : "",
                active === id
                  ? "text-[#f5f5f5]"
                  : "text-[#a0a0a0] hover:text-[#d0d0d0]",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
