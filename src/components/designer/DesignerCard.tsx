import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Heart } from "lucide-react";
import { designerDetailRoute } from "@/lib/navigation";
import { Designer } from "@/lib/types";
import { BookmarkDesignerButton } from "@/components/designer/BookmarkDesignerButton";

interface DesignerCardProps {
  designer: Designer;
}

export function DesignerCard({ designer }: DesignerCardProps) {
  return (
    <article className="group rounded-[16px] border border-[#ebe4da] bg-white p-3 shadow-[0_8px_18px_rgba(17,17,17,0.02)]">
      <div className="relative mb-3 overflow-hidden rounded-[14px] bg-[#f1ebe4]">
        <div className="absolute left-2 top-2 z-10 inline-flex rounded-full bg-[#ead9c6] px-2 py-0.5 text-[9px] font-semibold text-[#6d5538]">
          {designer.tags[0]}
        </div>
        <div className="absolute right-2 top-2 z-10">
          <div className="rounded-full bg-white/90 p-0.5 shadow-sm">
            <BookmarkDesignerButton designerId={designer.id} />
          </div>
        </div>
        <div className="relative h-[128px] w-full">
          <Image
            src={designer.profileImage}
            alt={designer.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 176px"
          />
        </div>
        <div className="absolute bottom-2 right-2 inline-flex rounded-full bg-[#2d2a26] px-2 py-0.5 text-[9px] font-semibold text-white">
          {designer.tags[1] ?? "포트폴리오"}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/18 to-transparent" />
      </div>

      <div>
        <h3 className="text-[15px] font-semibold tracking-[-0.03em] text-[#111111]">{designer.name}</h3>
        <p className="mt-1 text-[10px] text-[#7a7268]">
          {designer.district} <span className="mx-1">|</span> {designer.location}
        </p>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {designer.styles.slice(0, 2).map((style) => (
          <span key={style} className="rounded-full bg-[#f3efe9] px-2 py-1 text-[10px] text-[#6d655a]">
            {style}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-[10px] text-[#5f5951]">
        <span className="inline-flex items-center gap-1.5">
          <Heart className="h-3 w-3" />
          {designer.likes >= 1000 ? `${(designer.likes / 1000).toFixed(1)}k` : designer.likes}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3 w-3" />
          {designer.availableAt}
        </span>
      </div>

      <Link href={designerDetailRoute(designer.slug)} className="sr-only">
        {designer.name} 프로필 보기
      </Link>
    </article>
  );
}
