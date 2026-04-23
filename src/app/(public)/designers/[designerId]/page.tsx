import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/common/PageContainer";
import { DesignerHero } from "@/components/designer/DesignerHero";
import { PortfolioGrid } from "@/components/designer/PortfolioGrid";
import { ReviewList } from "@/components/designer/ReviewList";
import { ViewedDesignerTracker } from "@/components/designer/ViewedDesignerTracker";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getDesignerBySlug, getSalonById } from "@/lib/queries";
import { salonDetailRoute } from "@/lib/navigation";

interface DesignerDetailPageProps {
  params: Promise<{ designerId: string }>;
}

export default async function DesignerDetailPage({ params }: DesignerDetailPageProps) {
  const { designerId } = await params;
  const designer = getDesignerBySlug(designerId);

  if (!designer) notFound();

  const salon = designer.salonId ? getSalonById(designer.salonId) : undefined;
  const grouped = designer.portfolio.reduce<Record<string, typeof designer.portfolio>>((acc, item) => {
    const key = item.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <PageContainer className="py-8">
      <ViewedDesignerTracker designerId={designer.id} />
      <Breadcrumbs
        items={[
          { label: "디자이너 찾기", href: "/designers" },
          { label: designer.name },
        ]}
      />

      <DesignerHero designer={designer} salonHref={salon ? salonDetailRoute(salon.slug) : undefined} />

      <section className="mt-6 rounded-2xl border border-[#ddd6cb] bg-white p-4 lg:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-xl border border-[#ece4d9] bg-[#faf7f2] p-4">
            <p className="text-sm text-[#746d63]">위치</p>
            <p className="mt-2 text-base font-medium text-[#111111]">{designer.location}</p>
          </article>
          <article className="rounded-xl border border-[#ece4d9] bg-[#faf7f2] p-4">
            <p className="text-sm text-[#746d63]">경력</p>
            <p className="mt-2 text-base font-medium text-[#111111]">{designer.yearsExperience}년차 디자이너</p>
          </article>
          <article className="rounded-xl border border-[#ece4d9] bg-[#faf7f2] p-4">
            <p className="text-sm text-[#746d63]">시술 가격</p>
            <p className="mt-2 text-base font-medium text-[#111111]">컷 {designer.priceFrom.toLocaleString()}원부터</p>
          </article>
          <article className="rounded-xl border border-[#ece4d9] bg-[#faf7f2] p-4">
            <p className="text-sm text-[#746d63]">예약 가능</p>
            <p className="mt-2 text-base font-medium text-[#111111]">{designer.availableAt}</p>
          </article>
        </div>
      </section>

      <section className="mt-5 border-b border-[#e3dccf]">
        <div className="flex flex-wrap gap-7 pb-3 text-[18px] font-medium text-[#7a7268]">
          <span className="border-b-2 border-[#111111] pb-3 text-[#111111]">포트폴리오</span>
          <span>시술 메뉴</span>
          <span>리뷰 {designer.reviewCount}</span>
          <span>스타일 설명</span>
          <span>예약 안내</span>
        </div>
      </section>

      {Object.entries(grouped).map(([category, items]) => (
        <PortfolioGrid key={category} title={category} items={items} />
      ))}

      <ReviewList reviews={designer.reviews} />

      <section className="mt-10 rounded-2xl border border-[#d8d1c6] bg-[#efe9df] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-[34px] font-semibold tracking-[-0.02em] text-[#111111]">바로 예약 가능한 외부 플랫폼으로 이동</h3>
            <p className="mt-1 text-[#615a50]">Hairfolio에서는 포트폴리오 탐색 후 네이버 예약으로 연결됩니다.</p>
          </div>
          <Link
            href="https://booking.naver.com"
            target="_blank"
            className="rounded-xl bg-[#111111] px-6 py-3 text-sm font-semibold text-white"
          >
            네이버 예약으로 이동
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
