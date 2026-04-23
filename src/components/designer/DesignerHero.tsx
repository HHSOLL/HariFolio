"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Share2 } from "lucide-react";
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
    <section className="relative min-h-[560px] overflow-hidden rounded-[24px] border border-[#ddd7cf]" style={{ backgroundColor: tintBackground }}>
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <Image src={heroImage} alt={designer.name} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 58vw" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#f0ebe3] via-[#f0ebe3]/88 to-[#f0ebe3]/18" />
      <div className="absolute right-5 top-5 z-10 flex items-center gap-2">
        <button type="button" aria-label="공유하기" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/88 text-[#3d372f] shadow-sm">
          <Share2 className="h-4 w-4" />
        </button>
        <button type="button" aria-label="디자이너 좋아요" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/88 text-[#3d372f] shadow-sm">
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div className="relative z-10 flex min-h-[560px] items-end p-6 lg:items-center lg:p-10">
        <div className="max-w-[620px]">
          <span className="inline-flex rounded-full px-3 py-1 text-sm font-medium text-[#5d4a37]" style={{ backgroundColor: tintTag }}>
            TOP 디자이너
          </span>
          <h1 className="mt-5 text-[44px] font-semibold tracking-normal text-[#111111] lg:text-[56px]">{customDisplayName}</h1>
          <p className="mt-3 text-[17px] text-[#4e4840] lg:text-[19px]">{customHeadline}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {designer.styles.slice(0, 3).map((style) => (
              <span key={style} className="rounded-full bg-white/80 px-3 py-1 text-[13px] text-[#5d554c]">
                #{style}
              </span>
            ))}
          </div>

          <div className="mt-6 grid max-w-[520px] grid-cols-3 divide-x divide-[#dfd7cb] rounded-[16px] border border-white/70 bg-white/68 backdrop-blur">
            <div className="p-4">
              <p className="text-xs text-[#766e63]">평점</p>
              <p className="mt-1 text-[18px] font-semibold text-[#111111]">{designer.rating}</p>
            </div>
            <div className="p-4">
              <p className="text-xs text-[#766e63]">리뷰</p>
              <p className="mt-1 text-[18px] font-semibold text-[#111111]">{designer.reviewCount.toLocaleString()}</p>
            </div>
            <div className="p-4">
              <p className="text-xs text-[#766e63]">좋아요</p>
              <p className="mt-1 text-[18px] font-semibold text-[#111111]">{designer.likes.toLocaleString()}</p>
            </div>
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
      </div>
    </section>
  );
}
