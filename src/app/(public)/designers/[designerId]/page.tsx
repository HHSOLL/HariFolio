import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/common/PageContainer";
import { DesignerHero } from "@/components/designer/DesignerHero";
import { PortfolioGrid } from "@/components/designer/PortfolioGrid";
import { ViewedDesignerTracker } from "@/components/designer/ViewedDesignerTracker";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getDesignerBySlug, getSalonById } from "@/lib/queries";
import { salonDetailRoute } from "@/lib/navigation";

interface DesignerDetailPageProps {
  params: Promise<{ designerId: string }>;
}

const tabLabels = ["포트폴리오", "시술 메뉴", "리뷰 532", "스타일 설명", "예약 안내"];

export default async function DesignerDetailPage({ params }: DesignerDetailPageProps) {
  const { designerId } = await params;
  const designer = getDesignerBySlug(designerId);

  if (!designer) notFound();

  const salon = designer.salonId ? getSalonById(designer.salonId) : undefined;
  const categories = ["레이어드컷", "빌드펌", "염색", "스타일링"];
  const portfolioByCategory = categories.map((category) => ({
    category,
    items: designer.portfolio.filter((item) => item.category === category).slice(0, 4),
  }));

  return (
    <PageContainer className="py-8 lg:py-10">
      <ViewedDesignerTracker designerId={designer.id} />
      <Breadcrumbs items={[{ label: "디자이너 찾기", href: "/designers" }, { label: designer.name }]} />

      <DesignerHero designer={designer} salonHref={salon ? salonDetailRoute(salon.slug) : undefined} />

      <section className="mt-6 border-b border-[#ebe2d7]">
        <div className="flex flex-wrap gap-10 px-2">
          {tabLabels.map((tab, index) => (
            <span
              key={tab}
              className={[
                "border-b-2 pb-4 text-[16px]",
                index === 0 ? "border-[#111111] font-semibold text-[#111111]" : "border-transparent text-[#8a8176]",
              ].join(" ")}
            >
              {tab}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {["전체", "레이어드컷", "허쉬컷", "빌드펌", "매직/볼륨매직", "염색", "스타일링"].map((tag, index) => (
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
        <select className="rounded-full border border-[#e2dbd1] bg-white px-4 py-2 text-[13px] text-[#6f675d]">
          <option>최신순</option>
        </select>
      </section>

      {portfolioByCategory.map(({ category, items }) =>
        items.length ? <PortfolioGrid key={category} title={category} items={items} /> : null
      )}

      <section className="mt-12 rounded-[24px] bg-[#f5f1eb] px-8 py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-[30px] font-semibold tracking-[-0.04em] text-[#111111]">
              나에게 딱 맞는 스타일,
              <br />
              {designer.name.split(" ")[0]} 디자이너와 상담해보세요.
            </h3>
            <p className="mt-2 text-[15px] text-[#746b60]">1:1 맞춤 상담으로 최적의 스타일을 찾아드려요.</p>
          </div>
          <div className="flex gap-3">
            <a
              href="https://booking.naver.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-[14px] bg-[#111111] px-8 py-4 text-[15px] font-semibold text-white"
            >
              예약하기
            </a>
            <Link href="/auth/login" className="rounded-[14px] border border-[#cfc6bb] bg-white px-8 py-4 text-[15px] font-semibold text-[#2f2923]">
              1:1 문의하기
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
