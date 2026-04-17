import type { ResearchPipelineData, PipelineItem } from "@/data/lab";

const STAGES: { key: keyof ResearchPipelineData; label: string }[] = [
  { key: "idea", label: "Idea" },
  { key: "inProgress", label: "In Progress" },
  { key: "submitted", label: "Submitted" },
  { key: "published", label: "Published" },
];

function PipelineCard({ item }: { item: PipelineItem }) {
  return (
    <div className="border border-[#2a2a2a] bg-[#161616] p-3 flex flex-col gap-1">
      <p
        className="text-[11px] font-bold text-[#f5f5f5] leading-snug"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {item.title}
      </p>
      <p className="text-[10px] text-[#707070]">{item.author}</p>
      {item.target && (
        <p className="text-[10px] text-[#3d6b3d] uppercase tracking-wider">
          → {item.target}
        </p>
      )}
    </div>
  );
}

function EmptySlot() {
  return (
    <div className="border border-dashed border-[#222] p-3 flex items-center justify-center min-h-[60px]">
      <span className="text-[10px] text-[#333]" style={{ fontFamily: "ui-monospace, monospace" }}>
        empty
      </span>
    </div>
  );
}

interface Props {
  pipeline: ResearchPipelineData;
}

export default function ResearchPipeline({ pipeline }: Props) {
  return (
    <div className="grid grid-cols-4 gap-0 h-full">
      {STAGES.map((stage, si) => (
        <div
          key={stage.key}
          className={`flex flex-col gap-0 ${si < STAGES.length - 1 ? "border-r border-[#2a2a2a]" : ""}`}
        >
          {/* Stage header */}
          <div className="px-3 py-2 border-b border-[#2a2a2a] flex items-center gap-2">
            {si > 0 && (
              <span className="text-[#3d6b3d] text-xs">→</span>
            )}
            <span
              className="text-[10px] font-bold uppercase tracking-widest text-[#707070]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {stage.label}
            </span>
            <span className="ml-auto text-[10px] text-[#404040]">
              {pipeline[stage.key].length}
            </span>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-2 p-2 flex-1 overflow-y-auto">
            {pipeline[stage.key].length > 0
              ? pipeline[stage.key].map((item, i) => (
                  <PipelineCard key={i} item={item} />
                ))
              : <EmptySlot />
            }
          </div>
        </div>
      ))}
    </div>
  );
}
