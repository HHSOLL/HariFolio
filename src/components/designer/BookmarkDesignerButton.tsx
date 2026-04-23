"use client";

import { useState } from "react";
import { designerPreferencesStore } from "@/lib/designer-preferences";

interface BookmarkDesignerButtonProps {
  designerId: string;
}

export function BookmarkDesignerButton({ designerId }: BookmarkDesignerButtonProps) {
  const [bookmarked, setBookmarked] = useState(() =>
    typeof window === "undefined"
      ? false
      : designerPreferencesStore.getBookmarkedDesignerIds().includes(designerId)
  );

  const onToggle = () => {
    const next = designerPreferencesStore.toggleBookmarkedDesignerId(designerId);
    setBookmarked(next.includes(designerId));
  };

  return (
    <button
      onClick={onToggle}
      type="button"
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d7d1c8] bg-white text-sm"
      aria-label="북마크"
    >
      {bookmarked ? "♥" : "♡"}
    </button>
  );
}
