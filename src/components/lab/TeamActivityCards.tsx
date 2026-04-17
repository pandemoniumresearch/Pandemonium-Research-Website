import Link from "next/link";
import type { Person } from "@/lib/types";
import type { UserContributions, ContributionWeek } from "@/lib/github";
import type { TeamStatusEntry } from "@/data/lab";

function extractGithubLogin(url?: string): string | null {
  if (!url) return null;
  const m = url.match(/github\.com\/([^/]+)/);
  return m ? m[1] : null;
}

function cellColor(count: number): string {
  if (count === 0) return "#1e1e1e";
  if (count <= 2) return "#1a3a2a";
  if (count <= 5) return "#215c3a";
  if (count <= 10) return "#2d8050";
  return "#3db06a";
}

function MiniHeatmap({ weeks }: { weeks: ContributionWeek[] }) {
  const recent = weeks.slice(-13);
  return (
    <div className="flex gap-[2px]" aria-hidden>
      {recent.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[2px]">
          {week.contributionDays.map((day, di) => (
            <div
              key={di}
              style={{
                width: 8,
                height: 8,
                backgroundColor: cellColor(day.contributionCount),
                borderRadius: 1,
              }}
              title={`${day.date}: ${day.contributionCount}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center px-3 py-2 border border-[#2a2a2a] bg-[#161616]">
      <span
        className="text-sm font-bold text-[#f5f5f5] tabular-nums"
        style={{ fontFamily: "ui-monospace, monospace" }}
      >
        {value}
      </span>
      <span
        className="text-[9px] text-[#505050] uppercase tracking-wider mt-0.5"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {label}
      </span>
    </div>
  );
}

interface Props {
  people: Person[];
  contributions: UserContributions[];
  teamStatus: TeamStatusEntry[];
  hasToken: boolean;
}

export default function TeamActivityCards({
  people,
  contributions,
  teamStatus,
  hasToken,
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {people.map((person) => {
        const login = extractGithubLogin(person.links?.github);
        const contrib = login
          ? contributions.find(
              (c) => c.username.toLowerCase() === login.toLowerCase()
            )
          : undefined;
        const status = teamStatus.find((s) => s.memberId === person.id);

        return (
          <div
            key={person.id}
            className="border border-[#2a2a2a] bg-[#141414] p-4 flex flex-col gap-3"
          >
            {/* Name + role */}
            <div>
              <p
                className="text-xs font-bold text-[#f5f5f5] uppercase tracking-wide leading-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {person.name.split(" ")[0]}
              </p>
              <p className="text-[10px] text-[#505050] mt-0.5">{person.role.split("&")[0].trim()}</p>
            </div>

            {/* Stats */}
            {hasToken && contrib ? (
              <>
                <div className="flex gap-2">
                  <StatPill label="30d" value={contrib.last30Days} />
                  <StatPill label="streak" value={contrib.streak === 0 ? "—" : `${contrib.streak}d`} />
                </div>
                <MiniHeatmap weeks={contrib.weeks} />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center py-4">
                {hasToken ? (
                  <p className="text-[10px] text-[#404040]" style={{ fontFamily: "ui-monospace, monospace" }}>
                    no data
                  </p>
                ) : (
                  <p className="text-[10px] text-[#404040]" style={{ fontFamily: "ui-monospace, monospace" }}>
                    set GITHUB_TOKEN
                  </p>
                )}
              </div>
            )}

            {/* Current work */}
            {status && (
              <p
                className="text-[10px] text-[#707070] leading-relaxed border-t border-[#1e1e1e] pt-2"
                style={{ fontFamily: "ui-monospace, monospace" }}
              >
                ↳ {status.status}
              </p>
            )}

            {/* GitHub link */}
            {person.links?.github && (
              <Link
                href={person.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-[#404040] hover:text-[#707070] transition-colors mt-auto"
                style={{ fontFamily: "ui-monospace, monospace" }}
              >
                @{login}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
