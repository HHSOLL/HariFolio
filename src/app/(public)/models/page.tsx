import { EmptyState } from "@/components/common/EmptyState";
import { PageContainer } from "@/components/common/PageContainer";
import { Pagination } from "@/components/common/Pagination";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RecruitmentCard } from "@/components/recruitment/RecruitmentCard";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SortTabs } from "@/components/search/SortTabs";
import { styleKeywords } from "@/lib/mock/designers";
import { filterRecruitmentPosts, getAspiringDesigners } from "@/lib/queries";
import { parseRecruitmentSearch } from "@/lib/search";

interface ModelPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function normalizeQuery(raw: Record<string, string | string[] | undefined>) {
  const normalized: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(raw)) {
    normalized[key] = Array.isArray(value) ? value[0] : value;
  }
  return normalized;
}

const sortOptions = [
  { value: "recommended", label: "추천순" },
  { value: "new", label: "최신 등록순" },
  { value: "available", label: "마감 임박순" },
];

export default async function ModelRecruitmentPage({ searchParams }: ModelPageProps) {
  const rawQuery = await searchParams;
  const normalizedQuery = normalizeQuery(rawQuery);
  const filters = parseRecruitmentSearch(rawQuery);
  const posts = filterRecruitmentPosts(filters);
  const aspiringMap = new Map(getAspiringDesigners().map((item) => [item.id, item]));

  return (
    <PageContainer className="py-8">
      <Breadcrumbs items={[{ label: "헤어모델 모집" }]} />

      <div className="grid gap-6 xl:grid-cols-[330px_1fr]">
        <FilterSidebar
          title="필터"
          action="/models"
          districtOptions={["강남", "역삼", "청담", "신논현"]}
          styleOptions={styleKeywords}
          query={normalizedQuery.q}
          selectedDistrict={normalizedQuery.district}
          selectedStyle={normalizedQuery.style}
          selectedGender={normalizedQuery.gender}
        />

        <section>
          <h1 className="text-[52px] font-semibold tracking-[-0.03em] text-[#111111]">헤어모델 모집</h1>
          <p className="mt-1 text-xl text-[#686157]">현재 등록된 모집글을 조건별로 비교해 보세요.</p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <SortTabs basePath="/models" currentSort={normalizedQuery.sort} query={normalizedQuery} options={sortOptions} />
            <div className="text-sm text-[#7b7368]">{posts.length.toLocaleString()}개 모집글</div>
          </div>

          {posts.length ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => {
                const aspiring = aspiringMap.get(post.aspiringDesignerId);
                if (!aspiring) return null;
                return (
                  <RecruitmentCard
                    key={post.id}
                    post={post}
                    aspiringSlug={aspiring.slug}
                    aspiringName={aspiring.name}
                  />
                );
              })}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState title="조건에 맞는 모집글이 없어요" description="필터를 바꿔 다시 확인해보세요." />
            </div>
          )}

          <Pagination totalCount={posts.length} />
        </section>
      </div>
    </PageContainer>
  );
}
