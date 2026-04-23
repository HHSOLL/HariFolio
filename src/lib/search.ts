import {
  DesignerFilterInput,
  RecruitmentFilterInput,
  SalonFilterInput,
  SortOption,
} from "@/lib/types";

function first(input?: string | string[]) {
  if (!input) return undefined;
  return Array.isArray(input) ? input[0] : input;
}

export function parseDesignerSearch(
  params: Record<string, string | string[] | undefined>
): DesignerFilterInput {
  const maxPrice = Number(first(params.maxPrice));
  const availableOnly = first(params.availableOnly) === "true";
  const sort = first(params.sort) as SortOption | undefined;

  return {
    district: first(params.district),
    style: first(params.style),
    gender: first(params.gender) as DesignerFilterInput["gender"] | undefined,
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : undefined,
    availableOnly,
    query: first(params.q),
    sort,
  };
}

export function parseSalonSearch(
  params: Record<string, string | string[] | undefined>
): SalonFilterInput {
  const minRating = Number(first(params.minRating));
  const sort = first(params.sort) as SortOption | undefined;

  return {
    district: first(params.district),
    style: first(params.style),
    minRating: Number.isFinite(minRating) && minRating > 0 ? minRating : undefined,
    query: first(params.q),
    sort,
  };
}

export function parseRecruitmentSearch(
  params: Record<string, string | string[] | undefined>
): RecruitmentFilterInput {
  return {
    district: first(params.district),
    style: first(params.style),
    gender: first(params.gender) as RecruitmentFilterInput["gender"] | undefined,
    paid: (first(params.paid) as RecruitmentFilterInput["paid"] | undefined) ?? "all",
    shooting:
      (first(params.shooting) as RecruitmentFilterInput["shooting"] | undefined) ??
      "all",
    query: first(params.q),
  };
}
