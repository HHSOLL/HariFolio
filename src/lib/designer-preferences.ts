import {
  addViewedDesignerId,
  getDesignerCustomization,
  getBookmarkedDesignerIds,
  getViewedDesignerIds,
  setDesignerCustomization,
  toggleBookmarkedDesignerId,
} from "@/lib/local-storage";
import type { DesignerPageCustomization } from "@/lib/types";

export interface DesignerPreferencesStore {
  addViewedDesignerId(designerId: string): string[];
  getBookmarkedDesignerIds(): string[];
  getViewedDesignerIds(): string[];
  toggleBookmarkedDesignerId(designerId: string): string[];
  getDesignerCustomization(designerSlug: string): DesignerPageCustomization | null;
  setDesignerCustomization(customization: DesignerPageCustomization): DesignerPageCustomization | null;
}

// Web keeps browser storage behind a small adapter so native can swap this boundary later.
export const designerPreferencesStore: DesignerPreferencesStore = {
  addViewedDesignerId,
  getBookmarkedDesignerIds,
  getDesignerCustomization,
  getViewedDesignerIds,
  setDesignerCustomization,
  toggleBookmarkedDesignerId,
};
