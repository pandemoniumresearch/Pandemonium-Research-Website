import Link from "next/link";
import type { GithubRepo } from "@/lib/github";

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "1d ago";
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${Math.floor(diffMonths / 12)}y ago`;
}

interface Props {
  repos: GithubRepo[];
}

export default function RepoStats({ repos }: Props) {
  if (repos.length === 0) {
    return (
      <p className="text-[11px] text-[#505050] p-4" style={{ fontFamily: "ui-monospace, monospace" }}>
        unable to fetch repos
      </p>
    );
  }

  const sorted = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[11px]" style={{ fontFamily: "ui-monospace, monospace" }}>
        <thead>
          <tr className="border-b border-[#2a2a2a]">
            <th className="text-left py-2 px-3 text-[#505050] font-normal uppercase tracking-wider">
              Repo
            </th>
            <th className="text-right py-2 px-3 text-[#505050] font-normal uppercase tracking-wider">
              ★
            </th>
            <th className="text-right py-2 px-3 text-[#505050] font-normal uppercase tracking-wider">
              Pushed
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((repo) => (
            <tr
              key={repo.id}
              className="border-b border-[#1e1e1e] hover:bg-[#161616] transition-colors"
            >
              <td className="py-1.5 px-3">
                <Link
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#f5f5f5] hover:text-white transition-colors"
                >
                  {repo.name}
                </Link>
                {repo.language && (
                  <span className="ml-2 text-[#505050]">{repo.language}</span>
                )}
              </td>
              <td className="py-1.5 px-3 text-right text-[#707070] tabular-nums">
                {repo.stargazers_count}
              </td>
              <td className="py-1.5 px-3 text-right text-[#505050] tabular-nums whitespace-nowrap">
                {timeAgo(repo.pushed_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
