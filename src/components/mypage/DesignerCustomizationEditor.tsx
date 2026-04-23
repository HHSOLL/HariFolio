"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Designer } from "@/lib/types";
import { designerPreferencesStore } from "@/lib/designer-preferences";
import { designerDetailRoute } from "@/lib/navigation";

interface DesignerCustomizationEditorProps {
  designers: Designer[];
  initialDesignerSlug?: string;
}

const themePresets = ["#CDB79E", "#E7C1D1", "#B8D2BE", "#A7C7E0", "#DCC8E6", "#F5A5A5"];

export function DesignerCustomizationEditor({
  designers,
  initialDesignerSlug = "jiyu",
}: DesignerCustomizationEditorProps) {
  const editableDesigners = useMemo(
    () => designers.filter((designer) => designer.role === "designer"),
    [designers]
  );
  const initialDesigner = editableDesigners.find((designer) => designer.slug === initialDesignerSlug) ?? editableDesigners[0];

  const [currentSlug, setCurrentSlug] = useState(initialDesigner?.slug ?? "");
  const currentDesigner = editableDesigners.find((designer) => designer.slug === currentSlug) ?? initialDesigner;

  const getInitialDraft = (designer: Designer) => {
    const savedCustomization = designerPreferencesStore.getDesignerCustomization(designer.slug);
    return {
      displayName: savedCustomization?.displayName || designer.name,
      headline: savedCustomization?.headline || `${designer.yearsExperience}년 경력, ${designer.location}`,
      intro: savedCustomization?.intro || designer.intro,
      themeColor: savedCustomization?.themeColor || "#CDB79E",
      primaryCtaLabel: savedCustomization?.primaryCtaLabel || "네이버 예약 바로가기",
    };
  };

  const initialDraft = currentDesigner
    ? getInitialDraft(currentDesigner)
    : {
        displayName: "",
        headline: "",
        intro: "",
        themeColor: "#CDB79E",
        primaryCtaLabel: "네이버 예약 바로가기",
      };

  const [displayName, setDisplayName] = useState(initialDraft.displayName);
  const [headline, setHeadline] = useState(initialDraft.headline);
  const [intro, setIntro] = useState(initialDraft.intro);
  const [themeColor, setThemeColor] = useState(initialDraft.themeColor);
  const [primaryCtaLabel, setPrimaryCtaLabel] = useState(initialDraft.primaryCtaLabel);
  const [saved, setSaved] = useState(false);
  const previewImage =
    currentDesigner?.slug === "jiyu" ? "/images/heroes/hero-jiyu-v2.png" : currentDesigner?.profileImage ?? "";

  if (!currentDesigner) {
    return <p className="text-[#665f56]">편집 가능한 디자이너 데이터가 없습니다.</p>;
  }

  const onChangeDesigner = (slug: string) => {
    const nextDesigner = editableDesigners.find((designer) => designer.slug === slug);
    if (!nextDesigner) return;
    const draft = getInitialDraft(nextDesigner);
    setCurrentSlug(nextDesigner.slug);
    setDisplayName(draft.displayName);
    setHeadline(draft.headline);
    setIntro(draft.intro);
    setThemeColor(draft.themeColor);
    setPrimaryCtaLabel(draft.primaryCtaLabel);
    setSaved(false);
  };

  const onSave = () => {
    designerPreferencesStore.setDesignerCustomization({
      designerSlug: currentDesigner.slug,
      displayName,
      headline,
      intro,
      themeColor,
      primaryCtaLabel,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <section className="grid gap-5 xl:grid-cols-[320px_1fr]">
      <aside className="rounded-[24px] border border-[#ddd6cb] bg-white p-5">
        <h2 className="text-[34px] font-semibold tracking-[-0.03em] text-[#111111]">포트폴리오 편집</h2>
        <p className="mt-2 text-sm text-[#6a6258]">내 브랜드 페이지를 구성하고 저장하세요.</p>

        <div className="mt-5 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#4f473d]">디자이너 선택</span>
            <select
              value={currentDesigner.slug}
              onChange={(event) => onChangeDesigner(event.target.value)}
              className="w-full rounded-xl border border-[#d7d0c6] bg-[#faf8f4] px-3 py-2.5 text-sm"
            >
              {editableDesigners.map((designer) => (
                <option key={designer.id} value={designer.slug}>
                  {designer.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#4f473d]">페이지 타이틀</span>
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="w-full rounded-xl border border-[#d7d0c6] bg-white px-3 py-2.5 text-sm"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#4f473d]">헤드라인</span>
            <input
              value={headline}
              onChange={(event) => setHeadline(event.target.value)}
              className="w-full rounded-xl border border-[#d7d0c6] bg-white px-3 py-2.5 text-sm"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#4f473d]">소개 문구</span>
            <textarea
              value={intro}
              onChange={(event) => setIntro(event.target.value)}
              rows={5}
              className="w-full rounded-xl border border-[#d7d0c6] bg-white px-3 py-2.5 text-sm"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#4f473d]">예약 버튼 문구</span>
            <input
              value={primaryCtaLabel}
              onChange={(event) => setPrimaryCtaLabel(event.target.value)}
              className="w-full rounded-xl border border-[#d7d0c6] bg-white px-3 py-2.5 text-sm"
            />
          </label>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#4f473d]">테마 컬러</p>
            <div className="flex flex-wrap gap-2">
              {themePresets.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setThemeColor(color)}
                  style={{ backgroundColor: color }}
                  className={[
                    "h-8 w-8 rounded-full border-2",
                    themeColor === color ? "border-[#111111]" : "border-transparent",
                  ].join(" ")}
                  aria-label={`${color} 테마`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onSave}
            className="w-full rounded-xl bg-[#111111] px-4 py-3 text-sm font-semibold text-white"
          >
            저장
          </button>
          {saved ? <p className="text-sm text-[#5f4a37]">저장 완료: 공개 디자이너 페이지에 반영됩니다.</p> : null}
        </div>
      </aside>

      <article className="rounded-[24px] border border-[#ddd6cb] bg-white p-4">
        <div className="rounded-[20px] border border-[#e3dccf]">
          <div className="relative min-h-[280px] overflow-hidden rounded-t-[20px]" style={{ backgroundColor: `${themeColor}40` }}>
            <Image src={previewImage} alt="디자이너 커스텀 미리보기" fill className="object-cover object-right-top" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#efe9df] via-[#efe9df]/70 to-transparent" />
            <div className="absolute left-6 top-6 max-w-[55%]">
              <p className="text-sm text-[#5f564c]">디자이너 {currentDesigner.name.replace(" 디자이너", "")}</p>
              <h3 className="mt-2 text-[56px] leading-none font-semibold tracking-[-0.04em] text-[#111111]">{displayName}</h3>
              <p className="mt-3 text-sm text-[#514a40]">{headline}</p>
              <button
                type="button"
                className="mt-5 rounded-xl bg-[#111111] px-4 py-2 text-sm font-semibold text-white"
              >
                {primaryCtaLabel}
              </button>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm font-semibold text-[#6d655b]">ABOUT ME</p>
            <p className="mt-2 whitespace-pre-line text-[#3f3830]">{intro}</p>
            <a
              href={designerDetailRoute(currentDesigner.slug)}
              target="_blank"
              className="mt-4 inline-flex rounded-lg border border-[#d6cec3] bg-[#faf7f2] px-3 py-2 text-sm text-[#3f3830]"
            >
              내 포트폴리오 보기
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
