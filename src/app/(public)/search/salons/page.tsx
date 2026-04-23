import { SalonListView } from "@/components/salon/SalonListView";
import { filterSalons } from "@/lib/queries";
import { parseSalonSearch } from "@/lib/search";

interface SalonSearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function normalizeQuery(raw: Record<string, string | string[] | undefined>) {
  const normalized: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(raw)) {
    normalized[key] = Array.isArray(value) ? value[0] : value;
  }
  return normalized;
}

export default async function SalonSearchPage({ searchParams }: SalonSearchPageProps) {
  const rawQuery = await searchParams;
  const normalizedQuery = normalizeQuery(rawQuery);
  const filters = parseSalonSearch(rawQuery);
  const salons = filterSalons(filters);
  const queryText = normalizedQuery.q?.trim();

  return (
    <SalonListView
      title="미용실 검색 결과"
      subtitle={queryText ? `“${queryText}” 검색 결과` : "조건에 맞는 미용실을 찾았어요."}
      salons={salons}
      totalCount={salons.length}
      basePath="/search/salons"
      query={normalizedQuery}
    />
  );
}
