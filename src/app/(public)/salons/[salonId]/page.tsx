import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Heart } from "lucide-react";
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
    <PageContainer className="py-8 lg:py-10">
      <Breadcrumbs items={[{ label: "미용실 찾기", href: "/salons" }, { label: salon.name }]} />

      <SalonHero salon={salon} />

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[28px] font-semibold tracking-[-0.04em] text-[#111111]">소속 디자이너</h2>
          <Link href="/designers" className="text-[14px] text-[#72695f]">
            디자이너 더보기 ›
          </Link>
        </div>

        <div className="grid gap-4 xl:grid-cols-6">
          {designers.map((designer) => (
            <article key={designer.id} className="rounded-[22px] border border-[#e7dfd4] bg-white p-4 shadow-[0_12px_24px_rgba(17,17,17,0.03)]">
              <div className="relative h-[92px] w-[92px] overflow-hidden rounded-full bg-[#efe8de]">
                <Image src={designer.profileImage} alt={designer.name} fill className="object-cover" sizes="92px" />
              </div>
              <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.03em] text-[#111111]">{designer.name}</h3>
              <p className="mt-1 text-[13px] text-[#8a8176]">{designer.yearsExperience}년차 디자이너</p>
              <p className="mt-3 text-[13px] text-[#6f665b]">{designer.styles.slice(0, 2).join(" · ")}</p>
              <div className="mt-4 flex items-center justify-between text-[13px] text-[#5f564d]">
                <span className="inline-flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5" />
                  {designer.likes >= 1000 ? `${(designer.likes / 1000).toFixed(1)}k` : designer.likes}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {designer.availableAt}
                </span>
              </div>
              <Link
                href={designerDetailRoute(designer.slug)}
                className="mt-5 inline-flex w-full items-center justify-center rounded-[14px] border border-[#ded6cb] bg-[#fbf8f3] px-4 py-3 text-[14px] font-semibold text-[#2f2923]"
              >
                프로필 보기
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[28px] font-semibold tracking-[-0.04em] text-[#111111]">대표 스타일</h2>
            <div className="flex flex-wrap gap-2">
              {["전체", "레이어드컷", "펌", "염색", "탈색", "복구매직", "클리닉"].map((tag, index) => (
                <span
                  key={tag}
                  className={[
                    "rounded-full border px-4 py-2 text-[13px]",
                    index === 0 ? "border-[#111111] bg-[#111111] text-white" : "border-[#e2dbd1] bg-white text-[#72695f]",
                  ].join(" ")}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Link href="/search/designers" className="text-[14px] text-[#72695f]">
            스타일 더보기 ›
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {styles.map((style) => (
            <article key={style.rank} className="overflow-hidden rounded-[18px] bg-[#f1ebe4]">
              <div className="relative h-[250px]">
                <Image src={style.image} alt={style.keyword} fill className="object-cover" sizes="220px" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
