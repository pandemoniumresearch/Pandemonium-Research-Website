const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ORG = "Pandemonium-Research";

export const MEMBER_LOGINS = [
  "Sampriti2803",
  "Pranavh-2004",
  "roshr22",
  "nikhilr612",
  "Pranavjeet-Naidu",
  "Tensorflow-Ranger",
];

function restHeaders(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (GITHUB_TOKEN) h.Authorization = `Bearer ${GITHUB_TOKEN}`;
  return h;
}

function graphqlHeaders(): HeadersInit {
  const h: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (GITHUB_TOKEN) h.Authorization = `Bearer ${GITHUB_TOKEN}`;
  return h;
}

export interface GithubEvent {
  id: string;
  type: string;
  actor: { login: string };
  repo: { name: string };
  payload: {
    commits?: Array<{ message: string; sha: string }>;
    ref?: string;
    ref_type?: string;
    action?: string;
    pull_request?: { title: string; number: number; merged: boolean };
    issue?: { title: string; number: number };
  };
  created_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  pushed_at: string;
  language: string | null;
  fork: boolean;
  private: boolean;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface UserContributions {
  username: string;
  totalContributions: number;
  weeks: ContributionWeek[];
  streak: number;
  last30Days: number;
}

export async function fetchOrgEvents(): Promise<GithubEvent[]> {
  try {
    const res = await fetch(
      `https://api.github.com/orgs/${ORG}/events?per_page=50`,
      { headers: restHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchOrgRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/orgs/${ORG}/repos?per_page=100&sort=pushed&type=public`,
      { headers: restHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const repos: GithubRepo[] = await res.json();
    return repos.filter((r) => !r.fork && !r.private);
  } catch {
    return [];
  }
}

export async function fetchUserContributions(
  username: string
): Promise<UserContributions | null> {
  if (!GITHUB_TOKEN) return null;

  const now = new Date();
  const from = new Date(now);
  from.setFullYear(from.getFullYear() - 1);

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: graphqlHeaders(),
      body: JSON.stringify({
        query,
        variables: { username, from: from.toISOString(), to: now.toISOString() },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    const allDays: ContributionDay[] = calendar.weeks.flatMap(
      (w: ContributionWeek) => w.contributionDays
    );
    const today = new Date().toISOString().split("T")[0];

    let streak = 0;
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].date > today) continue;
      if (allDays[i].contributionCount > 0) streak++;
      else break;
    }

    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const last30Days = allDays
      .filter((d) => d.date >= cutoff)
      .reduce((sum, d) => sum + d.contributionCount, 0);

    return {
      username,
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
      streak,
      last30Days,
    };
  } catch {
    return null;
  }
}

export async function fetchAllContributions(): Promise<UserContributions[]> {
  const results = await Promise.all(MEMBER_LOGINS.map(fetchUserContributions));
  return results.filter((r): r is UserContributions => r !== null);
}

export function buildCombinedHeatmap(
  all: UserContributions[]
): Map<string, number> {
  const map = new Map<string, number>();
  for (const member of all) {
    for (const week of member.weeks) {
      for (const day of week.contributionDays) {
        map.set(day.date, (map.get(day.date) ?? 0) + day.contributionCount);
      }
    }
  }
  return map;
}

export function hasGithubToken(): boolean {
  return Boolean(GITHUB_TOKEN);
}
