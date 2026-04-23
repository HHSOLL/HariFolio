import Image from "next/image";
import Link from "next/link";
import { designerDetailRoute } from "@/lib/navigation";
import { Designer } from "@/lib/types";
import { BookmarkDesignerButton } from "@/components/designer/BookmarkDesignerButton";

interface DesignerCardProps {
  designer: Designer;
}

export function DesignerCard({ designer }: DesignerCardProps) {
  return (
    <article className="rounded-[24px] border border-[#dfd8ce] bg-white p-3 shadow-[0_8px_22px_rgba(20,16,12,0.04)]">
      <div className="relative mb-4 rounded-[20px] border border-[#ece5db] bg-[#f5f1eb] p-2">
        <BookmarkDesignerButton designerId={designer.id} className="absolute right-4 top-4 z-10" />
        <div className="relative h-56 overflow-hidden rounded-[999px_999px_14px_14px] bg-[#ece7df]">
          <Image src={designer.profileImage} alt={designer.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 240px" />
          <div className="absolute bottom-2 left-2 flex items-center gap-2">
            <span className="rounded-full bg-[#e8d9c7] px-2.5 py-1 text-xs font-semibold text-[#5f503f]">{designer.tags[0]}</span>
            <span className="rounded-full bg-[#111111be] px-2.5 py-1 text-xs font-semibold text-white">{designer.tags[1] ?? "포트폴리오"}</span>
          </div>
        </div>
      </div>

      <h3 className="text-[34px] leading-tight font-semibold tracking-[-0.03em] text-[#111111]">{designer.name}</h3>
      <p className="mt-1 text-sm text-[#6e665d]">
        {designer.district} | {designer.location}
      </p>

      <div className="mt-3 flex min-h-[60px] flex-wrap gap-2">
        {designer.styles.slice(0, 3).map((style) => (
          <span key={style} className="rounded-full bg-[#f0ebe4] px-2.5 py-1 text-xs text-[#625c55]">
            {style}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-[#5f5951]">
        <span>♡ {designer.likes.toLocaleString()}</span>
        <span>★ {designer.rating} ({designer.reviewCount})</span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-[#5f5951]">{designer.availableAt}</span>
        <Link
          href={designerDetailRoute(designer.slug)}
          className="rounded-xl border border-[#d7d1c8] bg-[#f9f6f1] px-3 py-2 text-sm font-medium text-[#111111]"
        >
          프로필 보기
        </Link>
      </div>
    </article>
  );
}
