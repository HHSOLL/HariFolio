import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/common/PageContainer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SalonHero } from "@/components/salon/SalonHero";
import { designerDetailRoute } from "@/lib/navigation";
import { getDesignersBySalon, getSalonBySlug, getTrendingStyles } from "@/lib/queries";

interface SalonDetailPageProps {
  params: Promise<{ salonId: string }>;
}

export default async function SalonDetailPage({ params }: SalonDetailPageProps) {
  const { salonId } = await params;
  const salon = getSalonBySlug(salonId);

  if (!salon) notFound();

  const designers = getDesignersBySalon(salon.id);
  const styles = getTrendingStyles();

  return (
    <PageContainer className="py-8">
      <Breadcrumbs items={[{ label: "미용실 찾기", href: "/salons" }, { label: salon.name }]} />

      <SalonHero salon={salon} />

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[34px] font-semibold tracking-[-0.02em] text-[#111111]">소속 디자이너</h2>
          <span className="text-sm text-[#7b7368]">총 {designers.length}명</span>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {["전체", "남성 디자이너", "여성 디자이너"].map((tab, index) => (
            <button
              type="button"
              key={tab}
              className={[
                "rounded-full border px-4 py-1.5 text-sm transition",
                index === 0 ? "border-[#111111] bg-[#111111] text-white" : "border-[#ddd6cb] bg-white text-[#625b51]",
              ].join(" ")}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {designers.map((designer) => (
            <article key={designer.id} className="rounded-2xl border border-[#dfd8ce] bg-white p-3">
              <div className="flex gap-2">
                <div className="relative h-14 w-14 overflow-hidden rounded-full">
                  <Image src={designer.profileImage} alt={designer.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1">
                  <p className="text-[22px] leading-tight font-semibold tracking-[-0.02em] text-[#111111]">{designer.name}</p>
                  <p className="text-xs text-[#6f675d]">{designer.styles.slice(0, 2).join(" · ")}</p>
                  <p className="mt-0.5 text-xs text-[#5f5951]">★ {designer.rating} ({designer.reviewCount})</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-[#6f675d]">{designer.availableAt}</span>
                <Link
                  href={designerDetailRoute(designer.slug)}
                  className="rounded-xl border border-[#d3ccc2] bg-[#f8f5f0] px-3 py-1.5 text-xs font-medium text-[#111111]"
                >
                  프로필 보기
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-[34px] font-semibold tracking-[-0.02em] text-[#111111]">대표 스타일</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {["전체", ...salon.styles].map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={[
                "rounded-full border px-4 py-1.5 text-sm transition",
                index === 0 ? "border-[#111111] bg-[#111111] text-white" : "border-[#ddd6cb] bg-white text-[#625b51]",
              ].join(" ")}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          {styles.map((style) => (
            <article key={style.rank} className="overflow-hidden rounded-2xl border border-[#dfd8ce] bg-white">
              <div className="relative h-52">
                <Image src={style.image} alt={style.keyword} fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
              </div>
              <div className="p-4">
                <p className="text-sm text-[#7b7368]">TOP {style.rank}</p>
                <p className="text-[26px] font-semibold tracking-[-0.02em] text-[#111111]">{style.keyword}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-[#ded7cd] bg-white p-6">
        <h2 className="text-[34px] font-semibold tracking-[-0.02em] text-[#111111]">리뷰</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {salon.reviews.map((review) => (
            <article key={review.id} className="rounded-xl bg-[#f7f2ea] p-4">
              <p className="text-sm text-[#7b7368]">{review.date}</p>
              <p className="mt-1 text-base font-medium text-[#111111]">{review.author} · ★ {review.rating}</p>
              <p className="mt-2 text-sm text-[#585247]">{review.content}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-[#d8d1c6] bg-[#efe9df] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-[34px] font-semibold tracking-[-0.02em] text-[#111111]">외부 예약으로 바로 연결</h3>
            <p className="mt-1 text-[#615a50]">살롱 비교가 끝났다면 네이버 예약에서 원하는 디자이너를 선택하세요.</p>
          </div>
          <Link
            href="https://booking.naver.com"
            target="_blank"
            className="rounded-xl bg-[#111111] px-6 py-3 text-sm font-semibold text-white"
          >
            네이버 예약하기
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
