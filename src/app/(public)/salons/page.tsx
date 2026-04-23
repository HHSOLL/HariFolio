import { SalonListView } from "@/components/salon/SalonListView";
import { filterSalons } from "@/lib/queries";
import { parseSalonSearch } from "@/lib/search";

interface SalonsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function normalizeQuery(raw: Record<string, string | string[] | undefined>) {
  const normalized: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(raw)) {
    normalized[key] = Array.isArray(value) ? value[0] : value;
  }
  return normalized;
}

export default async function SalonsPage({ searchParams }: SalonsPageProps) {
  const rawQuery = await searchParams;
  const normalizedQuery = normalizeQuery(rawQuery);
  const filters = parseSalonSearch(rawQuery);
  const salons = filterSalons(filters);

  return (
    <SalonListView
      title="미용실 찾기"
      subtitle="가격대와 후기, 소속 디자이너를 함께 비교해보세요."
      salons={salons}
      totalCount={salons.length}
      basePath="/salons"
      query={normalizedQuery}
    />
  );
}
