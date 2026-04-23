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

      <section className="mt-10 rounded-2xl border border-[#ddd6cb] bg-white p-6">
        <h2 className="text-[34px] font-semibold tracking-[-0.02em] text-[#111111]">시술 정보</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl bg-[#f7f2ea] p-4">
            <p className="text-sm text-[#746d63]">기본 컷</p>
            <p className="mt-1 text-[26px] font-semibold text-[#111111]">₩ {designer.priceFrom.toLocaleString()}~</p>
          </article>
          <article className="rounded-xl bg-[#f7f2ea] p-4">
            <p className="text-sm text-[#746d63]">예약 가능</p>
            <p className="mt-1 text-[26px] font-semibold text-[#111111]">{designer.availableAt}</p>
          </article>
          <article className="rounded-xl bg-[#f7f2ea] p-4">
            <p className="text-sm text-[#746d63]">소속 살롱</p>
            <p className="mt-1 text-[26px] font-semibold text-[#111111]">{designer.salonName ?? "프리랜서"}</p>
          </article>
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
