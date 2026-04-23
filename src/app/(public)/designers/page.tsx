import { DesignerListView } from "@/components/designer/DesignerListView";
import { filterDesigners } from "@/lib/queries";
import { parseDesignerSearch } from "@/lib/search";

interface DesignersPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function normalizeQuery(raw: Record<string, string | string[] | undefined>) {
  const normalized: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(raw)) {
    normalized[key] = Array.isArray(value) ? value[0] : value;
  }
  return normalized;
}

export default async function DesignersPage({ searchParams }: DesignersPageProps) {
  const rawQuery = await searchParams;
  const normalizedQuery = normalizeQuery(rawQuery);
  const filters = parseDesignerSearch(rawQuery);
  const designers = filterDesigners(filters);

  return (
    <DesignerListView
      title="디자이너 찾기"
      subtitle="포트폴리오와 후기 기반으로 비교해보세요."
      designers={designers}
      totalCount={designers.length}
      basePath="/designers"
      query={normalizedQuery}
    />
  );
}
