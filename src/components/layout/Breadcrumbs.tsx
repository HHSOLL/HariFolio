import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="mb-6 flex items-center gap-2 text-sm text-[#8a8278]">
      <Link href="/" className="hover:text-[#111111]">
        홈
      </Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          <span>›</span>
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
