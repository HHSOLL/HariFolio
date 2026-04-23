import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeader({ title, subtitle, href, linkLabel = "더보기" }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-[#111111] lg:text-[20px]">{title}</h2>
        {subtitle ? <p className="mt-1 text-[13px] text-[#8a8176] lg:text-[14px]">{subtitle}</p> : null}
      </div>
      {href ? (
        <Link href={href} className="text-[13px] font-medium text-[#6f675d] hover:text-[#111111]">
          {linkLabel} ›
        </Link>
      ) : null}
    </div>
  );
}
