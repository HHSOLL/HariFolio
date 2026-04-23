import Image from "next/image";
import Link from "next/link";
import { Bookmark, CalendarDays, CircleDollarSign, UserCircle2 } from "lucide-react";
import { aspiringProfileRoute } from "@/lib/navigation";
import { RecruitmentPost } from "@/lib/types";

interface RecruitmentCardProps {
  post: RecruitmentPost;
  aspiringSlug: string;
  aspiringName: string;
}

export function RecruitmentCard({ post, aspiringSlug, aspiringName }: RecruitmentCardProps) {
  return (
    <article className="overflow-hidden rounded-[16px] border border-[#ebe4da] bg-white shadow-[0_8px_18px_rgba(17,17,17,0.02)]">
      <div className="relative h-[148px] bg-[#ece8e1]">
        <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 220px" />
        <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold text-[#c28643]">{post.deadlineLabel}</span>
        <div className="absolute right-2 top-2 rounded-full bg-white/92 p-1.5 text-[#766d61]">
          <Bookmark className="h-3.5 w-3.5" />
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#efe7dc] text-[#7c6851]">
            <UserCircle2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12px] font-semibold text-[#29231d]">{aspiringName}</p>
            <p className="text-[10px] text-[#8a8176]">{post.location}</p>
          </div>
        </div>

        <h3 className="mt-3 text-[15px] font-semibold tracking-[-0.03em] text-[#111111]">{post.title}</h3>

        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-[#f2ede7] px-2 py-1 text-[10px] text-[#655d53]">{post.gender === "male" ? "남성" : post.gender === "female" ? "여성" : "전체"}</span>
          <span className="rounded-full bg-[#f2ede7] px-2 py-1 text-[10px] text-[#655d53]">{post.condition}</span>
          <span className="rounded-full bg-[#f2ede7] px-2 py-1 text-[10px] text-[#655d53]">
            {post.shooting === "available" ? "촬영 가능" : "촬영 없음"}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] text-[#5b554d]">
          <span className="inline-flex items-center gap-1.5">
            <CircleDollarSign className="h-3 w-3" />
            {post.priceLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3" />
            {post.date}
          </span>
          <span>{post.shooting === "available" ? "촬영 있음" : "촬영 없음"}</span>
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={aspiringProfileRoute(aspiringSlug)} className="sr-only">
            {aspiringName} 프로필
          </Link>
          <Link
            href={`/auth/login?from=${encodeURIComponent(post.slug)}`}
            className="flex-1 rounded-[10px] bg-[#ede5da] px-3 py-2.5 text-center text-[12px] font-semibold text-[#2d261f]"
          >
            지원하기
          </Link>
        </div>
      </div>
    </article>
  );
}
