import type { NewsItem } from "@/lib/types";

export const newsItems: NewsItem[] = [
  {
    id: "li-7448420968466784256",
    title: "Conversation Tree Architecture: Fixing Context Poisoning in LLMs",
    date: "2026-04-10",
    summary:
      "Every LLM conversation has a quiet failure mode nobody talks about — logical context poisoning. We published our preprint on the Conversation Tree Architecture (CTA), a hierarchical framework that treats conversations as trees rather than threads, letting context flow selectively and enabling true parallel reasoning.",
    source: "linkedin",
    url: "https://www.linkedin.com/posts/pandemonium-research_every-llm-conversation-has-a-quiet-failure-activity-7448420968466784256-Ca7U",
    tags: ["research", "paper"],
  },
  {
    id: "li-7445153792154628096",
    title: "We built DevMonitor",
    date: "2026-04-01",
    summary:
      "As developers, we spend more time hunting for information than actually using it. DevMonitor is a real-time developer intelligence dashboard that pulls GitHub trending, LLM leaderboards with live ELO rankings, arXiv papers, Hacker News, and CVE feeds into one place — open source and free to use.",
    source: "linkedin",
    url: "https://www.linkedin.com/posts/pandemonium-research_as-developers-we-spend-more-time-hunting-activity-7445153792154628096-bnXR",
    tags: ["project", "devtools"],
  },
  {
    id: "li-7444810496152760320",
    title: "Introducing Pandemonium Research",
    date: "2026-03-31",
    summary:
      "Most research happens inside institutions — inside labs with budgets, approval chains, and carefully scoped problems. We wanted to see what happens when you strip all of that away. Pandemonium Research is an independent engineering and research organization, founded by two undergrads who got tired of waiting for permission to work on things that matter.",
    source: "linkedin",
    url: "https://www.linkedin.com/posts/pandemonium-research_most-research-happens-inside-institutions-activity-7444810496152760320-bwEl",
    tags: ["announcement"],
  },
];
