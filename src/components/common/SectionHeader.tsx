import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeader({ title, subtitle, href, linkLabel = "더보기" }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-[#111111] lg:text-[28px]">{title}</h2>
        {subtitle ? <p className="mt-1 text-[15px] text-[#666666]">{subtitle}</p> : null}
      </div>
      {href ? (
        <Link href={href} className="text-[14px] font-medium text-[#555555] hover:text-[#111111]">
          {linkLabel} ›
        </Link>
      ) : null}
    </div>
  );
}
