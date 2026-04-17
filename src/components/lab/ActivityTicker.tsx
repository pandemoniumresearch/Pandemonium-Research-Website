"use client";

export interface TickerEvent {
  id: string;
  time: string;
  actor: string;
  repo: string;
  message: string;
  type: "push" | "pr" | "issue" | "create" | "other";
}

interface Props {
  events: TickerEvent[];
}

function typePrefix(type: TickerEvent["type"]): string {
  switch (type) {
    case "push": return "push";
    case "pr": return "pr  ";
    case "issue": return "iss ";
    case "create": return "new ";
    default: return "evt ";
  }
}

export default function ActivityTicker({ events }: Props) {
  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-50">
        <p className="text-xs text-[#505050]" style={{ fontFamily: "ui-monospace, monospace" }}>
          no events
        </p>
      </div>
    );
  }

  const doubled = [...events, ...events];

  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll ${Math.max(events.length * 3, 20)}s linear infinite;
        }
        .ticker-wrap:hover .ticker-track {
          animation-play-state: paused;
        }
      `}</style>
      <div className="ticker-wrap overflow-hidden h-full">
        <div className="ticker-track">
          {doubled.map((ev, i) => (
            <div
              key={`${ev.id}-${i}`}
              className="flex gap-2 py-1.5 border-b border-[#1e1e1e] group"
            >
              <span
                className="shrink-0 text-[10px] text-[#505050] w-14 tabular-nums leading-relaxed"
                style={{ fontFamily: "ui-monospace, monospace" }}
              >
                {ev.time}
              </span>
              <span
                className="shrink-0 text-[10px] text-[#3d6b3d] w-10 leading-relaxed"
                style={{ fontFamily: "ui-monospace, monospace" }}
              >
                {typePrefix(ev.type)}
              </span>
              <div className="min-w-0 flex-1">
                <span
                  className="text-[10px] text-[#707070] leading-relaxed"
                  style={{ fontFamily: "ui-monospace, monospace" }}
                >
                  [{ev.actor}]
                </span>{" "}
                <span
                  className="text-[10px] text-text-primary leading-relaxed"
                  style={{ fontFamily: "ui-monospace, monospace" }}
                >
                  {ev.repo.replace("Pandemonium-Research/", "")}
                </span>
                {ev.message && (
                  <p
                    className="text-[10px] text-[#707070] truncate leading-relaxed"
                    style={{ fontFamily: "ui-monospace, monospace" }}
                  >
                    {ev.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
