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
    <PageContainer className="py-8">
      <Breadcrumbs items={[{ label: "미용실 찾기" }]} />

      <div className="grid gap-6 xl:grid-cols-[330px_1fr]">
        <FilterSidebar
          title="필터"
          action={basePath}
          districtOptions={["강남", "역삼", "청담", "신사", "삼성"]}
          styleOptions={styleKeywords}
          query={query.q}
          selectedDistrict={query.district}
          selectedStyle={query.style}
          includeRating
        />

        <section>
          <h1 className="text-[52px] font-semibold tracking-[-0.03em] text-[#111111]">{title}</h1>
          <p className="mt-1 text-xl text-[#686157]">{subtitle}</p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <SortTabs basePath={basePath} currentSort={query.sort} query={query} options={sortOptions} />
            <div className="text-sm text-[#7b7368]">{totalCount.toLocaleString()}개의 미용실</div>
          </div>

          {salons.length ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
