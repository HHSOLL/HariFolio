interface PaginationProps {
  totalCount: number;
  pageSize?: number;
  current?: number;
}

export function Pagination({ totalCount, pageSize = 20, current = 1 }: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
  const visible = Array.from({ length: Math.min(5, pageCount) }).map((_, index) => index + 1);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {visible.map((page) => (
        <span
          key={page}
          className={[
            "inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm",
            page === current
              ? "border-[#111111] bg-[#111111] text-white"
              : "border-[#ded8cf] bg-white text-[#666666]",
          ].join(" ")}
        >
          {page}
        </span>
      ))}
      {pageCount > 5 ? <span className="px-2 text-[#999999]">… {pageCount}</span> : null}
    </div>
  );
}
