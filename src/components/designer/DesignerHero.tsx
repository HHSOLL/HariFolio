"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { Designer } from "@/lib/types";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { designerPreferencesStore } from "@/lib/designer-preferences";
import { DESIGNER_CUSTOM_EVENT } from "@/lib/local-storage";

interface DesignerHeroProps {
  designer: Designer;
  salonHref?: string;
}

const defaultCtaLabel = "네이버 예약하기";

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return `rgba(215,194,164,${alpha})`;
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function DesignerHero({ designer, salonHref }: DesignerHeroProps) {
  const heroImage = designer.slug === "jiyu" ? "/images/heroes/hero-jiyu-v2.png" : designer.profileImage;
  const customization = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => undefined;
      const onCustom = () => onStoreChange();
      window.addEventListener(DESIGNER_CUSTOM_EVENT, onCustom);
      window.addEventListener("storage", onCustom);
      return () => {
        window.removeEventListener(DESIGNER_CUSTOM_EVENT, onCustom);
        window.removeEventListener("storage", onCustom);
      };
    },
    () => designerPreferencesStore.getDesignerCustomization(designer.slug),
    () => null
  );

  const customDisplayName = customization?.displayName || designer.name;
  const customHeadline = customization?.headline || `${designer.location} · ${designer.yearsExperience}년차 디자이너`;
  const customIntro = customization?.intro || designer.intro;
  const customThemeColor = customization?.themeColor || "#d7c2a4";
  const customCtaLabel = customization?.primaryCtaLabel || defaultCtaLabel;

  const tintBackground = useMemo(() => hexToRgba(customThemeColor, 0.18), [customThemeColor]);
  const tintTag = useMemo(() => hexToRgba(customThemeColor, 0.55), [customThemeColor]);

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-[#ddd7cf]" style={{ backgroundColor: tintBackground }}>
      <div className="absolute right-5 top-5 z-10 flex items-center gap-2">
        <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-sm text-[#3d372f]">
          ⤴
        </button>
        <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-sm text-[#3d372f]">
          ♡
        </button>
      </div>
      <div className="grid gap-7 p-6 lg:grid-cols-[1.06fr_0.94fr] lg:p-8">
        <div>
          <span className="inline-flex rounded-full px-3 py-1 text-sm font-medium text-[#5d4a37]" style={{ backgroundColor: tintTag }}>
            TOP 디자이너
          </span>
          <h1 className="mt-4 text-[42px] font-semibold tracking-[-0.03em] text-[#111111] lg:text-[46px]">{customDisplayName}</h1>
          <p className="mt-2 text-[17px] text-[#4e4840] lg:text-[18px]">{customHeadline}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {designer.styles.map((style) => (
              <span key={style} className="rounded-full bg-white/80 px-3 py-1 text-[13px] text-[#5d554c]">
                #{style}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-5 text-[16px] text-[#3f3931]">
            <span>★ {designer.rating} ({designer.reviewCount})</span>
            <span>♡ {designer.likes.toLocaleString()}</span>
          </div>

          <p className="mt-5 max-w-xl whitespace-pre-line text-[16px] leading-7 text-[#4e4840]">{customIntro}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="https://booking.naver.com" target="_blank" rel="noreferrer">
              <PrimaryButton className="min-w-44">{customCtaLabel}</PrimaryButton>
            </a>
            <a
              href="https://open.kakao.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-[#c9c0b6] bg-white px-6 py-3 text-sm font-medium text-[#3c362f]"
            >
              1:1 문의하기
            </a>
          </div>

          {salonHref ? (
            <Link href={salonHref} className="mt-4 inline-flex text-sm text-[#666057] underline underline-offset-4">
              소속 살롱 보기
            </Link>
          ) : null}
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-3xl bg-[#ddd4c8] lg:min-h-[420px]">
          <Image src={heroImage} alt={designer.name} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 40vw" />
        </div>
      </div>
    </section>
  );
}
