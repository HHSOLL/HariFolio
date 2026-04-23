import { DesignerListView } from "@/components/designer/DesignerListView";
import { filterDesigners } from "@/lib/queries";
import { parseDesignerSearch } from "@/lib/search";

interface DesignerSearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function normalizeQuery(raw: Record<string, string | string[] | undefined>) {
  const normalized: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(raw)) {
    normalized[key] = Array.isArray(value) ? value[0] : value;
  }
  return normalized;
}

export default async function DesignerSearchPage({ searchParams }: DesignerSearchPageProps) {
  const rawQuery = await searchParams;
  const normalizedQuery = normalizeQuery(rawQuery);
  const filters = parseDesignerSearch(rawQuery);
  const designers = filterDesigners(filters);
  const queryText = normalizedQuery.q?.trim();

  return (
    <DesignerListView
      title="디자이너 검색 결과"
      subtitle={queryText ? `“${queryText}” 검색 결과` : "조건에 맞는 디자이너를 찾았어요."}
      designers={designers}
      totalCount={designers.length}
      basePath="/search/designers"
      query={normalizedQuery}
    />
  );
}
