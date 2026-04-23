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
    <PageContainer className="py-7">
      <Breadcrumbs items={[{ label: "디자이너 찾기" }]} />

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <FilterSidebar
          title="필터"
          action={basePath}
          districtOptions={["강남", "역삼", "청담", "신사", "삼성"]}
          styleOptions={styleKeywords}
          query={query.q}
          selectedDistrict={query.district}
          selectedStyle={query.style}
          selectedGender={query.gender}
          includePrice
          includeAvailability
        />

        <section>
          <h1 className="text-[42px] font-semibold tracking-[-0.03em] text-[#111111] lg:text-[46px]">{title}</h1>
          <p className="mt-1 text-[16px] text-[#686157]">{subtitle}</p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <SortTabs basePath={basePath} currentSort={query.sort} query={query} options={sortOptions} />
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1 rounded-xl border border-[#ddd6cc] bg-white p-1">
                <span className="rounded-lg bg-[#f3eee7] px-2 py-1 text-xs text-[#4f483f]">▦</span>
                <span className="rounded-lg px-2 py-1 text-xs text-[#a0978c]">☰</span>
              </div>
              <select className="rounded-xl border border-[#ddd6cc] bg-white px-3 py-2 text-[13px] text-[#4f483f]" defaultValue="20">
                <option value="20">20개씩 보기</option>
                <option value="40">40개씩 보기</option>
              </select>
              <div className="text-[13px] text-[#7b7368]">{totalCount.toLocaleString()}명의 디자이너</div>
            </div>
          </div>

          {designers.length ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
