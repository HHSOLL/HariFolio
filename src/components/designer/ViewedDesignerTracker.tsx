"use client";

import { useEffect } from "react";
import { designerPreferencesStore } from "@/lib/designer-preferences";

interface ViewedDesignerTrackerProps {
  designerId: string;
}

export function ViewedDesignerTracker({ designerId }: ViewedDesignerTrackerProps) {
  useEffect(() => {
    designerPreferencesStore.addViewedDesignerId(designerId);
  }, [designerId]);

  return null;
}
