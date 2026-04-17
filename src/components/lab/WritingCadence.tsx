const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

function dateToISOString(d: string): string {
  return new Date(d).toISOString().split("T")[0];
}

export interface WritingEntry {
  date: string;
  type: "blog" | "paper";
}

interface Props {
  entries: WritingEntry[];
}

export default function WritingCadence({ entries }: Props) {
  const weeks = generateWeekGrid(53);
  const monthLabels = getMonthLabels(weeks);

  // Map each week's dates to types present that week
  const weekMap = new Map<string, Set<"blog" | "paper">>();
  for (const entry of entries) {
    const d = dateToISOString(entry.date);
    if (!weekMap.has(d)) weekMap.set(d, new Set());
    weekMap.get(d)!.add(entry.type);
  }

  function cellStyle(weekDates: string[]): { bg: string; title: string } {
    const types = new Set<"blog" | "paper">();
    for (const d of weekDates) {
      const s = weekMap.get(d);
      if (s) s.forEach((t) => types.add(t));
    }
    if (types.has("paper") && types.has("blog")) return { bg: "#3a2a5a", title: "paper + blog" };
    if (types.has("paper")) return { bg: "#2d1a52", title: "paper" };
    if (types.has("blog")) return { bg: "#1a2952", title: "blog" };
    return { bg: "#1e1e1e", title: "no output" };
  }

  const totalPapers = entries.filter((e) => e.type === "paper").length;
  const totalBlogs = entries.filter((e) => e.type === "blog").length;

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: 720 }}>
        {/* Month labels */}
        <div className="flex gap-[3px] mb-1 pl-[8px]">
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

        {/* Grid — single row per type */}
        {(["blog", "paper"] as const).map((type) => (
          <div key={type} className="flex items-center gap-[3px] mb-[3px]">
            <span
              className="text-[9px] w-6 text-right shrink-0"
              style={{
                fontFamily: "ui-monospace, monospace",
                color: type === "blog" ? "#1a6b6b" : "#5a3a8a",
              }}
            >
              {type === "blog" ? "Bl" : "Pp"}
            </span>
            {weeks.map((week, wi) => {
              const hasType = week.some((d) => weekMap.get(d)?.has(type));
              const bg = hasType
                ? type === "blog"
                  ? "#1a2952"
                  : "#2d1a52"
                : "#1e1e1e";
              return (
                <div
                  key={wi}
                  style={{ width: 13, height: 13, backgroundColor: bg, borderRadius: 2, flexShrink: 0 }}
                  title={`${week[0]}: ${hasType ? type : "no " + type}`}
                />
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 pl-8">
          <div className="flex items-center gap-1.5">
            <div style={{ width: 11, height: 11, backgroundColor: "#1a2952", borderRadius: 2 }} />
            <span className="text-[10px] text-[#505050]" style={{ fontFamily: "ui-monospace, monospace" }}>
              Blog ({totalBlogs})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div style={{ width: 11, height: 11, backgroundColor: "#2d1a52", borderRadius: 2 }} />
            <span className="text-[10px] text-[#505050]" style={{ fontFamily: "ui-monospace, monospace" }}>
              Paper ({totalPapers})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
