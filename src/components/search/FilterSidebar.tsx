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
  return (
    <aside className="rounded-2xl border border-[#ddd6cb] bg-white p-5">
      <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111111]">{title}</h2>
      <form action={action} className="mt-4 space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[#504940]">검색</span>
          <input
            name="q"
            defaultValue={query}
            placeholder="디자이너, 스타일 검색"
            className="w-full rounded-xl border border-[#d7d0c6] bg-[#faf8f4] px-3 py-2.5 text-sm placeholder:text-[#a1988d]"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[#504940]">지역</span>
          <select name="district" defaultValue={selectedDistrict ?? ""} className="w-full rounded-xl border border-[#d7d0c6] bg-white px-3 py-2.5 text-sm">
            <option value="">전체</option>
            {districtOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[#504940]">스타일</span>
          <select name="style" defaultValue={selectedStyle ?? ""} className="w-full rounded-xl border border-[#d7d0c6] bg-white px-3 py-2.5 text-sm">
            <option value="">전체</option>
            {styleOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[#504940]">성별</span>
          <select name="gender" defaultValue={selectedGender ?? "all"} className="w-full rounded-xl border border-[#d7d0c6] bg-white px-3 py-2.5 text-sm">
            <option value="all">전체</option>
            <option value="female">여성</option>
            <option value="male">남성</option>
          </select>
        </label>

        {includePrice ? (
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[#504940]">최대 가격</span>
            <select name="maxPrice" className="w-full rounded-xl border border-[#d7d0c6] bg-white px-3 py-2.5 text-sm">
              <option value="">전체</option>
              <option value="40000">4만원 이하</option>
              <option value="50000">5만원 이하</option>
              <option value="70000">7만원 이하</option>
            </select>
          </label>
        ) : null}

        {includeRating ? (
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[#504940]">최소 평점</span>
            <select name="minRating" className="w-full rounded-xl border border-[#d7d0c6] bg-white px-3 py-2.5 text-sm">
              <option value="">전체</option>
              <option value="4.5">4.5 이상</option>
              <option value="4.0">4.0 이상</option>
              <option value="3.5">3.5 이상</option>
            </select>
          </label>
        ) : null}

        {includeAvailability ? (
          <label className="flex items-center gap-2 rounded-xl bg-[#f7f2ea] px-3 py-2 text-sm text-[#534b42]">
            <input type="checkbox" name="availableOnly" value="true" className="h-4 w-4" />
            오늘 예약 가능
          </label>
        ) : null}

        <div className="pt-2">
          <PrimaryButton type="submit" className="w-full">
            검색하기
          </PrimaryButton>
        </div>
      </form>
    </aside>
  );
}
