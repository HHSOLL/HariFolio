"use client";

import { useEffect } from "react";
import { addViewedDesignerId } from "@/lib/local-storage";

interface ViewedDesignerTrackerProps {
  designerId: string;
}

export function ViewedDesignerTracker({ designerId }: ViewedDesignerTrackerProps) {
  useEffect(() => {
    addViewedDesignerId(designerId);
  }, [designerId]);

  return null;
}
