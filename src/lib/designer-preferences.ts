import {
  addViewedDesignerId,
  getBookmarkedDesignerIds,
  getViewedDesignerIds,
  toggleBookmarkedDesignerId,
} from "@/lib/local-storage";

export interface DesignerPreferencesStore {
  addViewedDesignerId(designerId: string): string[];
  getBookmarkedDesignerIds(): string[];
  getViewedDesignerIds(): string[];
  toggleBookmarkedDesignerId(designerId: string): string[];
}

// Web keeps browser storage behind a small adapter so native can swap this boundary later.
export const designerPreferencesStore: DesignerPreferencesStore = {
  addViewedDesignerId,
  getBookmarkedDesignerIds,
  getViewedDesignerIds,
  toggleBookmarkedDesignerId,
};
