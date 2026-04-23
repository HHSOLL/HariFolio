import Link from "next/link";

interface SortTabsProps {
  basePath: string;
  currentSort?: string;
  query?: Record<string, string | undefined>;
  options: { value: string; label: string }[];
}

function buildHref(basePath: string, query: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });
  const string = search.toString();
  return string ? `${basePath}?${string}` : basePath;
}

export function SortTabs({ basePath, currentSort, query = {}, options }: SortTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const href = buildHref(basePath, { ...query, sort: option.value });
        const active = (currentSort ?? "recommended") === option.value;

        return (
          <Link
            key={option.value}
            href={href}
            className={[
              "rounded-full border px-4 py-1.5 text-[12px] font-medium",
              active
                ? "border-[#111111] bg-[#111111] text-white"
                : "border-[#e2dbd1] bg-white text-[#6d6459] hover:border-[#111111]",
            ].join(" ")}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
