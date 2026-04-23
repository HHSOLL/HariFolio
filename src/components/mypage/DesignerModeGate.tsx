"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Designer } from "@/lib/types";
import { getAuthSession, AUTH_SESSION_EVENT } from "@/lib/local-storage";
import { DesignerCustomizationEditor } from "@/components/mypage/DesignerCustomizationEditor";

interface DesignerModeGateProps {
  designers: Designer[];
  requestedDesignerSlug?: string;
}

export function DesignerModeGate({
  designers,
  requestedDesignerSlug,
}: DesignerModeGateProps) {
  const session = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => undefined;
      const onSessionChange = () => onStoreChange();
      window.addEventListener(AUTH_SESSION_EVENT, onSessionChange);
      window.addEventListener("storage", onSessionChange);
      return () => {
        window.removeEventListener(AUTH_SESSION_EVENT, onSessionChange);
        window.removeEventListener("storage", onSessionChange);
      };
    },
    () => getAuthSession(),
    () => null
  );

  if (session?.role !== "designer") {
    return (
      <section className="rounded-[24px] border border-[#ddd6cb] bg-white p-6">
        <h2 className="text-[32px] font-semibold tracking-[-0.03em] text-[#111111]">
          디자이너 로그인 후 접근 가능합니다.
        </h2>
        <p className="mt-2 text-[#6b645a]">
          커스텀 페이지 편집은 디자이너 전용 기능입니다.
        </p>
        <div className="mt-5 flex gap-3">
          <Link
            href="/auth/login"
            className="rounded-xl bg-[#111111] px-4 py-3 text-sm font-semibold text-white"
          >
            디자이너 로그인
          </Link>
          <Link
            href="/mypage"
            className="rounded-xl border border-[#d8d1c6] px-4 py-3 text-sm font-semibold text-[#111111]"
          >
            일반 마이페이지
          </Link>
        </div>
      </section>
    );
  }

  const editableSlug = session.designerSlug ?? requestedDesignerSlug ?? "jiyu";
  return (
    <DesignerCustomizationEditor
      designers={designers}
      initialDesignerSlug={editableSlug}
    />
  );
}
