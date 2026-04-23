import { recruitmentPosts } from "@/lib/mock/recruitments";
import { designers, styleKeywords } from "@/lib/mock/designers";
import { salons } from "@/lib/mock/salons";
import { aspiringDesigners, defaultUserProfile } from "@/lib/mock/users";
import {
  AspiringDesigner,
  Designer,
  DesignerFilterInput,
  RecruitmentFilterInput,
  Salon,
  SalonFilterInput,
  SortOption,
} from "@/lib/types";

function matchesQuery(target: string, query?: string) {
  if (!query) return true;
  return target.toLowerCase().includes(query.toLowerCase());
}

function sortDesigners(items: Designer[], sort: SortOption = "recommended") {
  const copy = [...items];
  if (sort === "popular") return copy.sort((a, b) => b.likes - a.likes);
  if (sort === "rating") return copy.sort((a, b) => b.rating - a.rating);
  if (sort === "available")
    return copy.sort((a, b) => a.availableAt.localeCompare(b.availableAt, "ko"));
  if (sort === "new") return copy.sort((a, b) => a.yearsExperience - b.yearsExperience);
  return copy.sort(
    (a, b) =>
      b.rating * 100 + b.reviewCount + b.likes / 10 -
      (a.rating * 100 + a.reviewCount + a.likes / 10)
  );
}

function sortSalons(items: Salon[], sort: SortOption = "recommended") {
  const copy = [...items];
  if (sort === "popular") return copy.sort((a, b) => b.reviewCount - a.reviewCount);
  if (sort === "rating") return copy.sort((a, b) => b.rating - a.rating);
  if (sort === "new") return copy.reverse();
  return copy.sort((a, b) => b.rating * 100 + b.reviewCount - (a.rating * 100 + a.reviewCount));
}

export function getDesigners() {
  return designers;
}

export function getDesignerBySlug(slug: string) {
  return designers.find((designer) => designer.slug === slug);
}

export function filterDesigners(filters: DesignerFilterInput) {
  const filtered = designers.filter((designer) => {
    const joined = [
      designer.name,
      designer.location,
      designer.district,
      designer.styles.join(" "),
      designer.tags.join(" "),
    ].join(" ");

    if (filters.district && !designer.district.includes(filters.district)) return false;
    if (filters.style && !designer.styles.includes(filters.style)) return false;
    if (filters.gender && filters.gender !== "all" && designer.gender !== filters.gender)
      return false;
    if (filters.maxPrice && designer.priceFrom > filters.maxPrice) return false;
    if (filters.availableOnly && !designer.availableAt.includes("오늘")) return false;
    if (!matchesQuery(joined, filters.query)) return false;
    return true;
  });

  return sortDesigners(filtered, filters.sort ?? "recommended");
}

export function getTrendingStyles() {
  const styleImages = [
    "/images/generated/gen-style-female-01-v2.png",
    "/images/generated/gen-style-male-01-v2.png",
    "/images/portfolio/style-03.png",
    "/images/portfolio/style-04.png",
    "/images/portfolio/style-05.png",
    "/images/portfolio/style-06.png",
  ];

  return styleKeywords.slice(0, 6).map((keyword, index) => ({
    rank: index + 1,
    keyword,
    image: styleImages[index],
  }));
}

export function getHomeRecommendedDesigners() {
  return sortDesigners(designers, "recommended").slice(0, 6);
}

export function getSalons() {
  return salons;
}

export function getSalonBySlug(slug: string) {
  return salons.find((salon) => salon.slug === slug);
}

export function filterSalons(filters: SalonFilterInput) {
  const filtered = salons.filter((salon) => {
    const joined = `${salon.name} ${salon.district} ${salon.tags.join(" ")} ${salon.styles.join(" ")}`;
    if (filters.district && !salon.district.includes(filters.district)) return false;
    if (filters.style && !salon.styles.includes(filters.style)) return false;
    if (filters.minRating && salon.rating < filters.minRating) return false;
    if (!matchesQuery(joined, filters.query)) return false;
    return true;
  });

  return sortSalons(filtered, filters.sort ?? "recommended");
}

export function getPopularSalons() {
  return sortSalons(salons, "popular").slice(0, 6);
}

export function getDesignersBySalon(salonId: string) {
  return designers.filter((designer) => designer.salonId === salonId);
}

export function getRecruitmentPosts() {
  return recruitmentPosts;
}

export function filterRecruitmentPosts(filters: RecruitmentFilterInput) {
  return recruitmentPosts.filter((post) => {
    const joined = `${post.title} ${post.style} ${post.location}`;
    if (filters.district && !post.location.includes(filters.district)) return false;
    if (filters.style && post.style !== filters.style) return false;
    if (filters.gender && filters.gender !== "all" && post.gender !== filters.gender) return false;
    if (filters.paid === "free" && !post.priceLabel.includes("무료")) return false;
    if (filters.paid === "paid" && post.priceLabel.includes("무료")) return false;
    if (filters.shooting === "available" && post.shooting !== "available") return false;
    if (filters.shooting === "not_available" && post.shooting !== "not_available") return false;
    if (!matchesQuery(joined, filters.query)) return false;
    return true;
  });
}

export function getAspiringDesigners() {
  return aspiringDesigners;
}

export function getAspiringDesignerBySlug(slug: string): AspiringDesigner | undefined {
  return aspiringDesigners.find((designer) => designer.slug === slug);
}

export function getRecruitmentsByAspiringDesigner(aspiringDesignerId: string) {
  return recruitmentPosts.filter((post) => post.aspiringDesignerId === aspiringDesignerId);
}

export function getAspiringPortfolio(aspiringSlug: string) {
  const linkedDesigner = designers.find((designer) => designer.slug === aspiringSlug);
  if (linkedDesigner) return linkedDesigner.portfolio;

  const fallback = designers.find((designer) => designer.role === "aspiring");
  return fallback?.portfolio ?? [];
}

export function getDefaultUserProfile() {
  return defaultUserProfile;
}

export function getDesignersByIds(ids: string[]) {
  return ids
    .map((id) => designers.find((designer) => designer.id === id))
    .filter(Boolean) as Designer[];
}

export function getSalonById(id: string) {
  return salons.find((salon) => salon.id === id);
}
