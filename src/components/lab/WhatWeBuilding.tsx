import type { TeamStatusEntry } from "@/data/lab";
import type { Person } from "@/lib/types";

interface Props {
  teamStatus: TeamStatusEntry[];
  people: Person[];
}

export default function WhatWeBuilding({ teamStatus, people }: Props) {
  return (
    <div className="flex flex-col gap-0">
      <div className="border-b border-[#2a2a2a] pb-2 mb-2">
        <p
          className="text-[10px] uppercase tracking-widest text-[#505050]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Currently Working On
        </p>
      </div>
      <div className="flex flex-col gap-0">
        {teamStatus.map((entry) => {
          const person = people.find((p) => p.id === entry.memberId);
          return (
            <div
              key={entry.memberId}
              className="flex gap-2 py-1.5 border-b border-[#1a1a1a]"
            >
              <span
                className="text-[10px] text-[#505050] shrink-0 w-20 truncate"
                style={{ fontFamily: "ui-monospace, monospace" }}
              >
                {person?.name.split(" ")[0] ?? entry.memberId}
              </span>
              <span
                className="text-[10px] text-[#707070]"
                style={{ fontFamily: "ui-monospace, monospace" }}
              >
                ↳
              </span>
              <span
                className="text-[10px] text-[#f5f5f5] leading-relaxed"
                style={{ fontFamily: "ui-monospace, monospace" }}
              >
                {entry.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
