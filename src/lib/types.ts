export type Gender = "female" | "male" | "all";

export type SortOption =
  | "recommended"
  | "popular"
  | "rating"
  | "available"
  | "new";

export interface PortfolioItem {
  id: string;
  image: string;
  category: string;
  title: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}

export interface Designer {
  id: string;
  slug: string;
  name: string;
  role: "designer" | "aspiring";
  district: string;
  location: string;
  gender: Gender;
  salonId?: string;
  salonName?: string;
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  likes: number;
  availableAt: string;
  priceFrom: number;
  styles: string[];
  tags: string[];
  profileImage: string;
  intro: string;
  portfolio: PortfolioItem[];
  reviews: Review[];
  socialLinks?: { label: string; href: string }[];
}

export interface Salon {
  id: string;
  slug: string;
  name: string;
  district: string;
  address: string;
  phone: string;
  hours: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  tags: string[];
  image: string;
  gallery: string[];
  description: string;
  designerIds: string[];
  styles: string[];
  reviews: Review[];
}

export interface RecruitmentPost {
  id: string;
  slug: string;
  aspiringDesignerId: string;
  title: string;
  style: string;
  condition: string;
  priceLabel: string;
  date: string;
  location: string;
  gender: Gender;
  shooting: "available" | "not_available";
  deadlineLabel: string;
  image: string;
}

export interface AspiringDesigner {
  id: string;
  slug: string;
  name: string;
  district: string;
  profileImage: string;
  heroImage: string;
  bio: string;
  instagram: string;
  tags: string[];
  stats: {
    likes: number;
    portfolioCount: number;
    rating: number;
    monthsActive: number;
  };
  socialLinks: { label: string; href: string }[];
}

export interface UserProfile {
  id: string;
  name: string;
  district: string;
  avatar: string;
  bookmarks: string[];
  viewedDesigners: string[];
}

export interface DesignerPageCustomization {
  designerSlug: string;
  displayName: string;
  headline: string;
  intro: string;
  themeColor: string;
  primaryCtaLabel: string;
}

export interface DesignerFilterInput {
  district?: string;
  style?: string;
  gender?: Gender;
  maxPrice?: number;
  availableOnly?: boolean;
  query?: string;
  sort?: SortOption;
}

export interface SalonFilterInput {
  district?: string;
  style?: string;
  minRating?: number;
  query?: string;
  sort?: SortOption;
}

export interface RecruitmentFilterInput {
  district?: string;
  style?: string;
  gender?: Gender;
  paid?: "all" | "free" | "paid";
  shooting?: "all" | "available" | "not_available";
  query?: string;
}
