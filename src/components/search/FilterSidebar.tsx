import { PrimaryButton } from "@/components/common/PrimaryButton";

interface FilterSidebarProps {
  title: string;
  action: string;
  districtOptions: string[];
  styleOptions: string[];
  query?: string;
  selectedDistrict?: string;
  selectedStyle?: string;
  selectedGender?: string;
  includePrice?: boolean;
  includeAvailability?: boolean;
  includeRating?: boolean;
}

export function FilterSidebar({
  title,
  action,
  districtOptions,
  styleOptions,
  query,
  selectedDistrict,
  selectedStyle,
  selectedGender,
  includePrice,
  includeAvailability,
  includeRating,
}: FilterSidebarProps) {
  const activeGender = selectedGender ?? "all";

  return (
    <aside className="rounded-[26px] border border-[#ddd6cb] bg-white p-5">
      <h2 className="text-[34px] font-semibold tracking-[-0.03em] text-[#111111]">{title}</h2>
      <form action={action} className="mt-5 space-y-5">
        <label className="block space-y-2">
          <span className="text-[16px] font-semibold text-[#403930]">검색</span>
          <input
            name="q"
            defaultValue={query}
            placeholder="디자이너, 스타일 검색"
            className="w-full rounded-2xl border border-[#d7d0c6] bg-[#faf8f4] px-4 py-3 text-[14px] placeholder:text-[#a1988d]"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-[16px] font-semibold text-[#403930]">지역</span>
          <select name="district" defaultValue={selectedDistrict ?? ""} className="w-full rounded-2xl border border-[#d7d0c6] bg-white px-4 py-3 text-[14px]">
            <option value="">전체</option>
            {districtOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <div className="space-y-3">
          <p className="text-[16px] font-semibold text-[#403930]">반경</p>
          <input type="range" min={1} max={10} defaultValue={3} className="w-full accent-[#111111]" />
          <div className="flex items-center justify-between text-[13px] text-[#7a7268]">
            <span>1km</span>
            <span>3km</span>
            <span>5km</span>
            <span>10km</span>
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-[16px] font-semibold text-[#403930]">성별</legend>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "all", label: "전체" },
              { value: "male", label: "남성" },
              { value: "female", label: "여성" },
            ].map((option) => (
              <label
                key={option.value}
                className={[
                  "flex cursor-pointer items-center justify-center rounded-full border px-3 py-2 text-[13px] transition",
                  activeGender === option.value
                    ? "border-[#111111] bg-[#111111] text-white"
                    : "border-[#ddd6cb] bg-white text-[#625b51]",
                ].join(" ")}
              >
                <input type="radio" name="gender" value={option.value} defaultChecked={activeGender === option.value} className="sr-only" />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block space-y-2">
          <span className="text-[16px] font-semibold text-[#403930]">시술/스타일</span>
          <select name="style" defaultValue={selectedStyle ?? ""} className="w-full rounded-2xl border border-[#d7d0c6] bg-white px-4 py-3 text-[14px]">
            <option value="">전체</option>
            {styleOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div className="mt-3 flex flex-wrap gap-2">
            {styleOptions.slice(0, 10).map((style) => (
              <button key={style} type="submit" name="style" value={style} className="rounded-full border border-[#e0d8ce] bg-[#faf8f4] px-3 py-1 text-[11px] text-[#645d53]">
                {style}
              </button>
            ))}
          </div>
        </label>

        {includePrice ? (
          <fieldset className="space-y-2">
            <legend className="text-[16px] font-semibold text-[#403930]">가격대</legend>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "", label: "전체" },
                { value: "30000", label: "~3만원" },
                { value: "50000", label: "3~5만원" },
                { value: "70000", label: "5~7만원" },
              ].map((option, index) => (
                <label key={option.label} className="cursor-pointer">
                  <input type="radio" name="maxPrice" value={option.value} defaultChecked={index === 0} className="sr-only" />
                  <span className="inline-flex rounded-full border border-[#ddd6cb] bg-white px-3 py-1.5 text-[13px] text-[#645d53]">{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {includeRating ? (
          <label className="block space-y-2">
            <span className="text-[16px] font-semibold text-[#403930]">최소 평점</span>
            <select name="minRating" className="w-full rounded-2xl border border-[#d7d0c6] bg-white px-4 py-3 text-[14px]">
              <option value="">전체</option>
              <option value="4.5">4.5 이상</option>
              <option value="4.0">4.0 이상</option>
              <option value="3.5">3.5 이상</option>
            </select>
          </label>
        ) : null}

        {includeAvailability ? (
          <label className="flex items-center gap-2 rounded-2xl border border-[#e2dbd1] bg-[#f7f2ea] px-4 py-3 text-[13px] text-[#534b42]">
            <input type="checkbox" name="availableOnly" value="true" className="h-4 w-4" />
            오늘 예약 가능
          </label>
        ) : null}

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button type="reset" className="rounded-2xl border border-[#d7d0c6] bg-white px-4 py-3 text-[13px] font-semibold text-[#4a433b]">
            초기화
          </button>
          <PrimaryButton type="submit" className="w-full rounded-2xl py-3">
            검색하기
          </PrimaryButton>
        </div>
      </form>
    </aside>
  );
}
