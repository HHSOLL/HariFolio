import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalCount: number;
  pageSize?: number;
  current?: number;
}

export function Pagination({ totalCount, pageSize = 20, current = 1 }: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
  const visible = Array.from({ length: Math.min(5, pageCount) }).map((_, index) => index + 1);

  return (
    <div className="mt-8 flex items-center justify-center gap-1.5">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e3ddd4] bg-white text-[#8f867a]">
        <ChevronLeft className="h-3.5 w-3.5" />
      </span>
      {visible.map((page) => (
        <span
          key={page}
          className={[
            "inline-flex h-8 w-8 items-center justify-center rounded-full border text-[12px] font-medium",
            page === current
              ? "border-[#111111] bg-[#111111] text-white"
              : "border-[#e3ddd4] bg-white text-[#666666]",
          ].join(" ")}
        >
          {page}
        </span>
      ))}
      {pageCount > 5 ? <span className="px-2 text-[12px] text-[#999999]">…</span> : null}
      <span className="text-[12px] text-[#8f867a]">{pageCount > 5 ? pageCount : ""}</span>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e3ddd4] bg-white text-[#8f867a]">
        <ChevronRight className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}
