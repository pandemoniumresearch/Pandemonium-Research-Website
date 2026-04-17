const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

function cellColor(count: number): string {
  if (count === 0) return "#1e1e1e";
  if (count <= 3) return "#1a3a2a";
  if (count <= 8) return "#215c3a";
  if (count <= 15) return "#2d8050";
  return "#3db06a";
}

function generateWeekGrid(n: number): string[][] {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() - (n - 1) * 7);

  const weeks: string[][] = [];
  for (let w = 0; w < n; w++) {
    const week: string[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      week.push(date.toISOString().split("T")[0]);
    }
    weeks.push(week);
  }
  return weeks;
}

function getMonthLabels(weeks: string[][]): (string | null)[] {
  const labels: (string | null)[] = [];
  let last = -1;
  for (const week of weeks) {
    const month = new Date(week[0]).getMonth();
    if (month !== last) {
      labels.push(MONTHS[month]);
      last = month;
    } else {
      labels.push(null);
    }
  }
  return labels;
}

interface Props {
  combinedMap: Record<string, number>;
  totalContributions: number;
  memberCount: number;
  hasToken: boolean;
}

export default function ContributionHeatmap({
  combinedMap,
  totalContributions,
  memberCount,
  hasToken,
}: Props) {
  if (!hasToken) {
    return (
      <div className="flex items-center justify-center py-12 border border-dashed border-[#2a2a2a]">
        <p
          className="text-xs text-[#505050]"
          style={{ fontFamily: "ui-monospace, monospace" }}
        >
          add GITHUB_TOKEN env var to enable contribution heatmap
        </p>
      </div>
    );
  }

  const weeks = generateWeekGrid(53);
  const monthLabels = getMonthLabels(weeks);

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: 720 }}>
        {/* Month labels */}
        <div className="flex gap-[3px] mb-1 pl-[22px]">
          {monthLabels.map((label, i) => (
            <div key={i} style={{ width: 13, flexShrink: 0 }}>
              {label && (
                <span
                  className="text-[9px] text-[#505050] whitespace-nowrap"
                  style={{ fontFamily: "ui-monospace, monospace" }}
                >
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-[3px]">
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] mr-1">
            {DAYS.map((d, i) => (
              <div
                key={i}
                style={{ width: 14, height: 13 }}
                className="flex items-center justify-center"
              >
                {i % 2 === 1 && (
                  <span
                    className="text-[9px] text-[#404040]"
                    style={{ fontFamily: "ui-monospace, monospace" }}
                  >
                    {d}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Grid */}
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((date, di) => {
                const count = combinedMap[date] ?? 0;
                return (
                  <div
                    key={di}
                    style={{
                      width: 13,
                      height: 13,
                      backgroundColor: cellColor(count),
                      borderRadius: 2,
                    }}
                    title={`${date}: ${count} contribution${count !== 1 ? "s" : ""}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 mt-3 pl-[22px]">
          <span
            className="text-[10px] text-[#505050]"
            style={{ fontFamily: "ui-monospace, monospace" }}
          >
            {totalContributions.toLocaleString()} contributions across {memberCount} members · less
          </span>
          {[0, 3, 8, 15, 25].map((n) => (
            <div
              key={n}
              style={{
                width: 11,
                height: 11,
                backgroundColor: cellColor(n),
                borderRadius: 2,
              }}
            />
          ))}
          <span
            className="text-[10px] text-[#505050]"
            style={{ fontFamily: "ui-monospace, monospace" }}
          >
            more
          </span>
        </div>
      </div>
    </div>
  );
}
