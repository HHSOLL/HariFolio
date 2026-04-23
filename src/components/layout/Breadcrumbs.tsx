import Link from "next/link";
import { ChevronRight, House } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="mb-8 flex items-center gap-2 text-[13px] text-[#8d8478]">
      <Link href="/" className="inline-flex items-center gap-1.5 hover:text-[#111111]">
        <House className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          <ChevronRight className="h-3.5 w-3.5" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#111111]">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#5f5951]">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
