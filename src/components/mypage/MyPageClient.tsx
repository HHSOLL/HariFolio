"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Designer } from "@/lib/types";
import { getBookmarkedDesignerIds, getViewedDesignerIds } from "@/lib/local-storage";
import { designerDetailRoute } from "@/lib/navigation";

interface MyPageClientProps {
  allDesigners: Designer[];
  defaultBookmarks: string[];
  defaultViewed: string[];
}

function compactCard(designer: Designer) {
  return (
    <article key={designer.id} className="flex items-center gap-3 rounded-xl border border-[#dfd8cd] bg-white p-3">
      <div className="relative h-16 w-16 overflow-hidden rounded-full">
        <Image src={designer.profileImage} alt={designer.name} fill className="object-cover" sizes="64px" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-semibold text-[#111111]">{designer.name}</p>
        <p className="truncate text-sm text-[#6f675d]">{designer.location}</p>
      </div>
      <Link href={designerDetailRoute(designer.slug)} className="rounded-lg bg-[#111111] px-3 py-2 text-xs font-semibold text-white">
        보기
      </Link>
    </article>
  );
}

export function MyPageClient({ allDesigners, defaultBookmarks, defaultViewed }: MyPageClientProps) {
  const [bookmarks] = useState(() => {
    const local = getBookmarkedDesignerIds();
    return local.length ? local : defaultBookmarks;
  });
  const [viewed] = useState(() => {
    const local = getViewedDesignerIds();
    return local.length ? local : defaultViewed;
  });

  const bookmarkedDesigners = useMemo(
    () => bookmarks.map((id) => allDesigners.find((designer) => designer.id === id)).filter(Boolean) as Designer[],
    [allDesigners, bookmarks]
  );

  const viewedDesigners = useMemo(
    () => viewed.map((id) => allDesigners.find((designer) => designer.id === id)).filter(Boolean) as Designer[],
    [allDesigners, viewed]
  );

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-[#dfd8cd] bg-white p-8">
        <h2 className="text-[34px] font-semibold tracking-[-0.02em] text-[#111111]">내 프로필</h2>
        <p className="mt-2 text-[#665f56]">관심 디자이너와 최근 조회를 통해 빠르게 비교할 수 있어요.</p>
      </section>

      <section>
        <h3 className="mb-4 text-[30px] font-semibold tracking-[-0.02em] text-[#111111]">북마크</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {bookmarkedDesigners.length ? bookmarkedDesigners.map(compactCard) : <p className="text-[#777067]">북마크가 없습니다.</p>}
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-[30px] font-semibold tracking-[-0.02em] text-[#111111]">최근 본 디자이너</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {viewedDesigners.length ? viewedDesigners.map(compactCard) : <p className="text-[#777067]">최근 본 디자이너가 없습니다.</p>}
        </div>
      </section>
    </div>
  );
}
