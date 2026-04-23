import Image from "next/image";
import Link from "next/link";
import { RecruitmentPost } from "@/lib/types";

interface RecruitmentCardProps {
  post: RecruitmentPost;
  aspiringName: string;
  profileHref?: string;
}

export function RecruitmentCard({ post, aspiringName, profileHref }: RecruitmentCardProps) {
  const card = (
    <article
      className={[
        "overflow-hidden rounded-2xl border border-[#e2dbd2] bg-white shadow-[0_8px_22px_rgba(20,16,12,0.04)] transition",
        profileHref ? "group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_28px_rgba(20,16,12,0.1)]" : "",
      ].join(" ")}
    >
        <div className="relative h-40 bg-[#ece8e1]">
          <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 280px" />
          <span className="absolute left-3 top-3 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-[#b78a56]">{post.deadlineLabel}</span>
        </div>

        <div className="p-4">
          <p className="text-sm text-[#726a60]">{aspiringName}</p>
          <h3 className="mt-1 text-[24px] font-semibold tracking-[-0.02em] text-[#111111]">{post.title}</h3>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#f2ede7] px-2.5 py-1 text-xs text-[#655d53]">{post.gender === "male" ? "남성" : post.gender === "female" ? "여성" : "전체"}</span>
            <span className="rounded-full bg-[#f2ede7] px-2.5 py-1 text-xs text-[#655d53]">{post.condition}</span>
            <span className="rounded-full bg-[#f2ede7] px-2.5 py-1 text-xs text-[#655d53]">
              {post.shooting === "available" ? "촬영 가능" : "촬영 없음"}
            </span>
          </div>

          <div className="mt-4 space-y-1 text-sm text-[#5b554d]">
            <p>{post.priceLabel}</p>
            <p>{post.date}</p>
            <p>{post.location}</p>
          </div>

          <div className="mt-4 rounded-xl border border-[#d4cdc2] bg-[#f7f3ec] px-3 py-2 text-center text-sm font-semibold text-[#111111]">
            {profileHref ? "프로필 보기 ›" : "현재 모집 정보"}
          </div>
        </div>
      </article>
  );

  if (!profileHref) {
    return card;
  }

  return (
    <Link href={profileHref} className="group block">
      {card}
    </Link>
  );
}
