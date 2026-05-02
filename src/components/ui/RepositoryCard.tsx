import Image from "next/image";
import Link from "next/link";
import FoldedCard from "./FoldedCard";
import BuildingIcon from "@/components/icons/BuildingIcon";
import { RepositoryProject } from "@/lib/types";

function buildGithubPreview(repositoryFullName: string) {
  return `https://opengraph.githubassets.com/1/${repositoryFullName}`;
}

function formatDownloads(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toString();
}

export default function RepositoryCard({
  name,
  description,
  repositoryUrl,
  repositoryFullName,
  liveUrl,
  thumbnailUrl,
  npmDownloads,
}: RepositoryProject) {
  const thumUrl = liveUrl ? `https://image.thum.io/get/width/1200/${liveUrl}` : null;
  const previewImage =
    thumbnailUrl ??
    (repositoryFullName ? buildGithubPreview(repositoryFullName) : null) ??
    thumUrl;

  return (
    <FoldedCard className="flex flex-col h-full overflow-hidden">
      <div className="relative w-full aspect-video border-b border-border bg-surface-elevated">
        {previewImage ? (
          <Image
            src={previewImage}
            alt={`${name} preview thumbnail`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="eager"
            unoptimized={previewImage === thumUrl}
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <BuildingIcon size={56} className="text-border" />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1">
        <h3
          className="text-sm font-bold text-text-primary"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {name}
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed flex-1 line-clamp-3">
          {description}
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          {repositoryUrl ? (
            <Link
              href={repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-xs font-medium text-text-secondary hover:text-text-primary transition-colors border border-border hover:border-[#505050] px-4 py-2"
            >
              Repository
            </Link>
          ) : null}

          {(liveUrl || npmDownloads != null) ? (
            <div className="inline-flex items-center">
              {liveUrl ? (
                <Link
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-xs font-medium text-text-secondary hover:text-text-primary transition-colors border border-border hover:border-[#505050] px-4 py-2"
                >
                  Live Site
                </Link>
              ) : null}

              {npmDownloads != null ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary border border-border border-l-0 px-4 py-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 1v7M6 8l-2.5-2.5M6 8l2.5-2.5M1.5 10.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {formatDownloads(npmDownloads)} downloads
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </FoldedCard>
  );
}
