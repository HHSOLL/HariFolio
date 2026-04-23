import { Grid2X2, List } from "lucide-react";
import { Designer } from "@/lib/types";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EmptyState } from "@/components/common/EmptyState";
import { Pagination } from "@/components/common/Pagination";
import { PageContainer } from "@/components/common/PageContainer";
import { DesignerCard } from "@/components/designer/DesignerCard";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SortTabs } from "@/components/search/SortTabs";
import { styleKeywords } from "@/lib/mock/designers";

interface DesignerListViewProps {
  title: string;
  subtitle: string;
  designers: Designer[];
  totalCount: number;
  basePath: string;
  query: Record<string, string | undefined>;
}

const sortOptions = [
  { value: "recommended", label: "추천순" },
  { value: "popular", label: "인기순" },
  { value: "rating", label: "평점순" },
  { value: "available", label: "예약가능순" },
  { value: "new", label: "신규 등록순" },
];

export function DesignerListView({
  title,
  subtitle,
  designers,
  totalCount,
  basePath,
  query,
}: DesignerListViewProps) {
  return (
    <PageContainer className="py-6 lg:py-7">
      <Breadcrumbs items={[{ label: "디자이너 찾기" }]} />

      <div className="grid gap-6 xl:grid-cols-[242px_minmax(0,1fr)]">
        <FilterSidebar
          title="디자이너 찾기"
          action={basePath}
          districtOptions={["강남", "역삼", "청담", "신사", "삼성"]}
          styleOptions={styleKeywords}
          query={query.q}
          selectedDistrict={query.district}
          selectedStyle={query.style}
          selectedGender={query.gender}
          includePrice
          includeAvailability
          mode="designer"
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

          {designers.length ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {designers.map((designer) => (
                <DesignerCard key={designer.id} designer={designer} />
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState title="조건에 맞는 디자이너가 없어요" description="필터를 완화하거나 다른 지역으로 검색해보세요." />
            </div>
          )}

          <Pagination totalCount={totalCount} />
        </section>
      </div>
    </PageContainer>
  );
}
