import { Grid2X2, List } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { Pagination } from "@/components/common/Pagination";
import { PageContainer } from "@/components/common/PageContainer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SortTabs } from "@/components/search/SortTabs";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SalonCard } from "@/components/salon/SalonCard";
import { styleKeywords } from "@/lib/mock/designers";
import { Salon } from "@/lib/types";

interface SalonListViewProps {
  title: string;
  subtitle: string;
  salons: Salon[];
  totalCount: number;
  basePath: string;
  query: Record<string, string | undefined>;
}

const sortOptions = [
  { value: "recommended", label: "추천순" },
  { value: "popular", label: "리뷰 많은 순" },
  { value: "rating", label: "평점 높은 순" },
  { value: "new", label: "신규 등록순" },
];

export function SalonListView({
  title,
  subtitle,
  salons,
  totalCount,
  basePath,
  query,
}: SalonListViewProps) {
  return (
    <PageContainer className="py-6 lg:py-7">
      <Breadcrumbs items={[{ label: "미용실 찾기" }]} />

      <div className="grid gap-6 xl:grid-cols-[242px_minmax(0,1fr)]">
        <FilterSidebar
          title="미용실 찾기"
          action={basePath}
          districtOptions={["강남", "역삼", "청담", "신사", "삼성"]}
          styleOptions={styleKeywords}
          query={query.q}
          selectedDistrict={query.district}
          selectedStyle={query.style}
          includeRating
          mode="salon"
        />

        <section>
          <h1 className="text-[18px] font-semibold tracking-[-0.03em] text-[#111111]">{title}</h1>
          <p className="mt-1 text-[12px] text-[#7a7268]">{subtitle}</p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <SortTabs basePath={basePath} currentSort={query.sort} query={query} options={sortOptions} />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-xl border border-[#e2dbd1] bg-white p-1">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff7ef] text-[#302720]">
                  <Grid2X2 className="h-3.5 w-3.5" />
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#8d8478]">
                  <List className="h-3.5 w-3.5" />
                </span>
              </div>
              <select className="rounded-xl border border-[#e2dbd1] bg-white px-3 py-2 text-[12px] text-[#6d6459]">
                <option>20개씩 보기</option>
              </select>
            </div>
          </div>

          {salons.length ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {salons.map((salon) => (
                <SalonCard key={salon.id} salon={salon} />
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState title="조건에 맞는 미용실이 없어요" description="필터를 바꿔 다시 검색해보세요." />
            </div>
          )}

          <Pagination totalCount={totalCount} />
        </section>
      </div>
    </PageContainer>
  );
}
