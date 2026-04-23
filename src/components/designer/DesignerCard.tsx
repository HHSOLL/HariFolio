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
    <article className="rounded-2xl border border-[#e3ddd4] bg-white p-4 shadow-[0_8px_24px_rgba(20,16,12,0.04)]">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-[#ece8e2]">
          <Image
            src={designer.profileImage}
            alt={designer.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 240px"
          />
          <div className="absolute bottom-2 left-2 inline-flex rounded-full bg-[#111111b3] px-2 py-1 text-xs text-white">
            {designer.tags[0]}
          </div>
        </div>
        <BookmarkDesignerButton designerId={designer.id} />
      </div>

      <h3 className="text-[26px] font-semibold tracking-[-0.02em] text-[#111111]">{designer.name}</h3>
      <p className="mt-1 text-sm text-[#6e665d]">
        {designer.district} | {designer.location}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {designer.styles.slice(0, 3).map((style) => (
          <span key={style} className="rounded-full bg-[#f0ebe4] px-2.5 py-1 text-xs text-[#625c55]">
            {style}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-[#5f5951]">
        <span>♡ {designer.likes.toLocaleString()}</span>
        <span>★ {designer.rating} ({designer.reviewCount})</span>
      </div>

      <div className="mt-4 flex items-center justify-between">
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
