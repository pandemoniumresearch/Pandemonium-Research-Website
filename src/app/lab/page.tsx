import type { Metadata } from "next";
import Link from "next/link";
import {
  fetchOrgEvents,
  fetchOrgRepos,
  fetchAllContributions,
  buildCombinedHeatmap,
  hasGithubToken,
  type GithubEvent,
} from "@/lib/github";
import { getAllBlogPosts } from "@/lib/blog";
import { getAllPosts } from "@/lib/research";
import { people } from "@/data/people";
import { researchPipeline, teamStatus } from "@/data/lab";

import ActivityTicker, {
  type TickerEvent,
} from "@/components/lab/ActivityTicker";
import ResearchPipeline from "@/components/lab/ResearchPipeline";
import RepoStats from "@/components/lab/RepoStats";
import TeamActivityCards from "@/components/lab/TeamActivityCards";
import ContributionHeatmap from "@/components/lab/ContributionHeatmap";
import WritingCadence, {
  type WritingEntry,
} from "@/components/lab/WritingCadence";
import WhatWeBuilding from "@/components/lab/WhatWeBuilding";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Lab - Pandemonium Research" },
  description:
    "Live ops view of the Pandemonium Research lab — contributions, pipeline, and active work.",
};

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;
  return `${Math.floor(diffHours / 24)}d`;
}

function formatEvents(raw: GithubEvent[]): TickerEvent[] {
  const out: TickerEvent[] = [];
  for (const ev of raw) {
    if (ev.type === "PushEvent") {
      const branch = ev.payload.ref?.replace("refs/heads/", "") ?? "unknown";
      const msg = ev.payload.commits?.length
        ? ev.payload.commits[0].message.split("\n")[0].slice(0, 60)
        : `pushed to ${branch}`;
      out.push({
        id: ev.id,
        time: timeAgo(ev.created_at),
        actor: ev.actor.login,
        repo: ev.repo.name,
        message: msg,
        type: "push",
      });
    } else if (ev.type === "PullRequestEvent" && ev.payload.pull_request) {
      const pr = ev.payload.pull_request;
      const action = pr.merged ? "merged" : (ev.payload.action ?? "updated");
      out.push({
        id: ev.id,
        time: timeAgo(ev.created_at),
        actor: ev.actor.login,
        repo: ev.repo.name,
        message: `#${pr.number} ${action}: ${pr.title.slice(0, 60)}`,
        type: "pr",
      });
    } else if (ev.type === "IssuesEvent" && ev.payload.issue) {
      out.push({
        id: ev.id,
        time: timeAgo(ev.created_at),
        actor: ev.actor.login,
        repo: ev.repo.name,
        message: `#${ev.payload.issue.number}: ${ev.payload.issue.title.slice(0, 60)}`,
        type: "issue",
      });
    } else if (ev.type === "CreateEvent") {
      out.push({
        id: ev.id,
        time: timeAgo(ev.created_at),
        actor: ev.actor.login,
        repo: ev.repo.name,
        message: `created ${ev.payload.ref_type ?? "ref"}${ev.payload.ref ? ` "${ev.payload.ref}"` : ""}`,
        type: "create",
      });
    }
  }
  return out.slice(0, 30);
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] uppercase tracking-widest text-[#505050] mb-3"
      style={{ fontFamily: "var(--font-space-grotesk)" }}
    >
      {children}
    </p>
  );
}

function Panel({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-border bg-background ${className}`}>
      <div className="border-b border-border px-4 py-2">
        <SectionLabel>{label}</SectionLabel>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default async function LabPage() {
  const [orgEvents, orgRepos, allContributions] = await Promise.all([
    fetchOrgEvents(),
    fetchOrgRepos(),
    fetchAllContributions(),
  ]);

  const hasToken = hasGithubToken();
  const tickerEvents = formatEvents(orgEvents);

  const combinedMap = buildCombinedHeatmap(allContributions);
  const combinedRecord: Record<string, number> =
    Object.fromEntries(combinedMap);
  const totalContributions = allContributions.reduce(
    (s, c) => s + c.totalContributions,
    0,
  );

  const blogPosts = getAllBlogPosts();
  const researchPosts = getAllPosts();
  const writingEntries: WritingEntry[] = [
    ...blogPosts.map((p) => ({ date: p.date, type: "blog" as const })),
    ...researchPosts.map((p) => ({ date: p.date, type: "paper" as const })),
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <div>
          <p
            className="text-xs uppercase tracking-widest text-[#505050] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Lab
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold uppercase text-[#f5f5f5] leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            The Lab.
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#3d6b3d] border border-[#2a3a2a] px-2.5 py-1"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#3db06a]"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
              />
              Live Ops View
            </span>
          </div>
        </div>
        <Link
          href={`https://github.com/Pandemonium-Research`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs text-[#a0a0a0] hover:text-[#f5f5f5] border border-border hover:border-[#505050] px-4 py-2 transition-colors"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          View on GitHub →
        </Link>
      </div>

      {/* Row 1: Activity Ticker | What We're Building | Repo Stats — fixed equal height */}
      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4"
        style={{ gridAutoRows: "320px" }}
      >
        {/* Activity Ticker */}
        <div className="border border-border flex flex-col min-h-0">
          <div className="border-b border-border px-4 py-2 flex items-center justify-between shrink-0">
            <p
              className="text-[10px] uppercase tracking-widest text-[#505050]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Activity Ticker
            </p>
            <span
              className="text-[9px] text-[#3d6b3d]"
              style={{ fontFamily: "ui-monospace, monospace" }}
            >
              real-time
            </span>
          </div>
          <div className="p-4 flex-1 overflow-hidden min-h-0">
            <ActivityTicker events={tickerEvents} />
          </div>
        </div>

        {/* What We're Building */}
        <div className="border border-border flex flex-col min-h-0">
          <div className="border-b border-border px-4 py-2 shrink-0">
            <p
              className="text-[10px] uppercase tracking-widest text-[#505050]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              What We&rsquo;re Building
            </p>
          </div>
          <div className="p-4 flex-1 overflow-y-auto min-h-0">
            <WhatWeBuilding teamStatus={teamStatus} people={people} />
          </div>
        </div>

        {/* Repo Stats */}
        <div className="border border-border flex flex-col min-h-0">
          <div className="border-b border-border px-4 py-2 shrink-0">
            <p
              className="text-[10px] uppercase tracking-widest text-[#505050]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Public Repo Stats
            </p>
          </div>
          <div className="flex-1 overflow-y-auto min-h-0">
            <RepoStats repos={orgRepos} />
          </div>
        </div>
      </div>

      {/* Row 2: Research Pipeline — full width */}
      <div className="border border-border mb-4">
        <div className="border-b border-border px-4 py-2">
          <p
            className="text-[10px] uppercase tracking-widest text-[#505050]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Research Pipeline · Arxiv / Papers
          </p>
        </div>
        <ResearchPipeline pipeline={researchPipeline} />
      </div>

      {/* Team Activity & Hustle */}
      <div className="border border-border mb-4">
        <div className="border-b border-border px-4 py-2 flex items-center justify-between">
          <p
            className="text-[10px] uppercase tracking-widest text-[#505050]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Team Activity &amp; Hustle
          </p>
          <span
            className="text-[9px] text-[#505050]"
            style={{ fontFamily: "ui-monospace, monospace" }}
          >
            last active
          </span>
        </div>
        <div className="p-4">
          <TeamActivityCards
            people={people}
            contributions={allContributions}
            teamStatus={teamStatus}
            hasToken={hasToken}
          />
        </div>
      </div>

      {/* Lab GitHub Contributions Grid */}
      <div className="border border-border mb-4">
        <div className="border-b border-border px-4 py-2">
          <p
            className="text-[10px] uppercase tracking-widest text-[#505050]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Lab GitHub Contributions Grid · Past 12 Months
          </p>
        </div>
        <div className="p-4">
          <ContributionHeatmap
            combinedMap={combinedRecord}
            totalContributions={totalContributions}
            memberCount={allContributions.length}
            hasToken={hasToken}
          />
        </div>
      </div>

      {/* Blog & Paper Cadence */}
      <div className="border border-border">
        <div className="border-b border-border px-4 py-2">
          <p
            className="text-[10px] uppercase tracking-widest text-[#505050]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Blog &amp; Paper Cadence
          </p>
        </div>
        <div className="p-4">
          <WritingCadence entries={writingEntries} />
        </div>
      </div>
    </div>
  );
}
