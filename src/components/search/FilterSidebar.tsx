import Link from "next/link";
import {
  Briefcase,
  CircleDollarSign,
  Clock3,
  Crosshair,
  MapPin,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";

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
  mode?: "designer" | "salon" | "model";
}

function Chip({
  name,
  value,
  label,
  selected,
}: {
  name: string;
  value: string;
  label: string;
  selected?: boolean;
}) {
  return (
    <label
      className={[
        "inline-flex cursor-pointer items-center rounded-full border px-3 py-1.5 text-[11px] font-medium transition",
        selected
          ? "border-[#111111] bg-[#111111] text-white"
          : "border-[#e1dbd1] bg-white text-[#71685d]",
      ].join(" ")}
    >
      <input defaultChecked={selected} type="radio" name={name} value={value} className="sr-only" />
      {label}
    </label>
  );
}

function Checkbox({
  name,
  value,
  label,
}: {
  name: string;
  value: string;
  label: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-[11px] text-[#71685d]">
      <input type="checkbox" name={name} value={value} className="h-4 w-4 rounded border border-[#d9d1c6]" />
      {label}
    </label>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[#f0ebe5] pt-4 first:border-t-0 first:pt-0">
      <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-[#26211d]">
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </section>
  );
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
  mode = "designer",
}: FilterSidebarProps) {
  const district = selectedDistrict ?? districtOptions[0] ?? "강남구";
  const isModel = mode === "model";
  const isSalon = mode === "salon";

  return (
    <aside className="hf-surface rounded-[18px] bg-white p-4">
      <form action={action} className="space-y-4">
        {query ? <input type="hidden" name="q" value={query} /> : null}

        <Section icon={<MapPin className="h-4 w-4" />} title="지역">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold tracking-[-0.03em] text-[#111111]">{title}</h2>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#e5ddd3] px-2.5 py-1 text-[10px] text-[#736a60]">
              <Crosshair className="h-3.5 w-3.5" />
              내 주변
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <select defaultValue="서울" className="rounded-[10px] border border-[#e5ddd3] bg-white px-3 py-2 text-[11px] text-[#40392f]">
              <option>서울</option>
            </select>
            <select
              name="district"
              defaultValue={district}
              className="rounded-[10px] border border-[#e5ddd3] bg-white px-3 py-2 text-[11px] text-[#40392f]"
            >
              {districtOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select defaultValue="역삼동" className="rounded-[10px] border border-[#e5ddd3] bg-white px-3 py-2 text-[11px] text-[#40392f]">
              <option>역삼동</option>
              <option>신논현</option>
              <option>청담동</option>
            </select>
          </div>

          <div className="mt-4">
            <div className="mb-2 text-[11px] font-medium text-[#62584b]">반경</div>
            <input type="range" min="1" max="10" defaultValue="3" className="h-1 w-full accent-[#111111]" />
            <div className="mt-2 flex items-center justify-between text-[10px] text-[#857c72]">
              <span>1km</span>
              <span className="font-semibold text-[#111111]">3km</span>
              <span>5km</span>
              <span>10km</span>
            </div>
          </div>
        </Section>

        {(mode === "designer" || mode === "model") && (
          <Section icon={<UserRound className="h-4 w-4" />} title="성별">
            <div className="flex flex-wrap gap-2">
              <Chip name="gender" value="all" label="전체" selected={!selectedGender || selectedGender === "all"} />
              <Chip name="gender" value="male" label="남성" selected={selectedGender === "male"} />
              <Chip name="gender" value="female" label="여성" selected={selectedGender === "female"} />
            </div>
          </Section>
        )}

        <Section icon={<Sparkles className="h-4 w-4" />} title={isModel ? "모집 분야" : "시술/스타일"}>
          <div className="flex flex-wrap gap-2">
            <Chip name="style" value="" label="전체" selected={!selectedStyle} />
            {styleOptions.slice(0, isModel ? 7 : 10).map((style) => (
              <Chip
                key={style}
                name="style"
                value={style}
                label={style}
                selected={selectedStyle === style}
              />
            ))}
          </div>
        </Section>

        {includePrice ? (
          <Section icon={<CircleDollarSign className="h-4 w-4" />} title="가격대">
            <div className="flex flex-wrap gap-2">
              <Chip name="maxPrice" value="" label="전체" selected />
              <Chip name="maxPrice" value="30000" label="~3만원" />
              <Chip name="maxPrice" value="50000" label="3~5만원" />
              <Chip name="maxPrice" value="70000" label="5~7만원" />
              <Chip name="maxPrice" value="999999" label="7만원~" />
            </div>
          </Section>
        ) : null}

        {includeRating ? (
          <Section icon={<Star className="h-4 w-4" />} title="평점">
            <div className="mb-3 flex flex-wrap gap-2">
              <Chip name="minRating" value="" label="전체" selected />
              <Chip name="minRating" value="4.5" label="4.5점 이상" />
              <Chip name="minRating" value="4.0" label="4.0점 이상" />
              <Chip name="minRating" value="3.5" label="3.5점 이상" />
            </div>
            {isSalon ? (
              <div className="space-y-3">
                <div className="text-[11px] font-medium text-[#62584b]">편의시설</div>
                <div className="grid grid-cols-2 gap-y-3">
                  <Checkbox name="amenity" value="parking" label="주차 가능" />
                  <Checkbox name="amenity" value="private" label="1인 시술실" />
                  <Checkbox name="amenity" value="naver" label="네이버 예약 가능" />
                  <Checkbox name="amenity" value="same-day" label="당일 예약 가능" />
                  <Checkbox name="amenity" value="pet" label="반려동물 동반" />
                </div>
              </div>
            ) : null}
          </Section>
        ) : null}

        {includeAvailability ? (
          <Section icon={<Briefcase className="h-4 w-4" />} title="경력">
            <div className="mb-3 flex flex-wrap gap-2">
              <Chip name="experience" value="" label="전체" selected />
              <Chip name="experience" value="1" label="신입" />
              <Chip name="experience" value="3" label="1~3년" />
              <Chip name="experience" value="5" label="3~5년" />
              <Chip name="experience" value="6" label="5년 이상" />
            </div>
            <label className="inline-flex items-center gap-2 text-[13px] text-[#71685d]">
              <input type="checkbox" name="availableOnly" value="true" className="h-4 w-4 rounded border border-[#d9d1c6]" />
              오늘 예약 가능한 디자이너만 보기
            </label>
          </Section>
        ) : null}

        {isModel ? (
          <>
            <Section icon={<SlidersHorizontal className="h-4 w-4" />} title="모델 조건">
              <div className="flex flex-wrap gap-2">
                <Chip name="paid" value="all" label="전체" selected />
                <Chip name="paid" value="free" label="무료 (재료비 X)" />
                <Chip name="paid" value="paid" label="재료비 있음" />
              </div>
            </Section>

            <Section icon={<Clock3 className="h-4 w-4" />} title="촬영 여부">
              <div className="flex flex-wrap gap-2">
                <Chip name="shooting" value="all" label="전체" selected />
                <Chip name="shooting" value="available" label="촬영 있음" />
                <Chip name="shooting" value="not_available" label="촬영 없음" />
              </div>
            </Section>

            <Section icon={<Clock3 className="h-4 w-4" />} title="가능 날짜">
              <input
                type="text"
                name="date"
                placeholder="날짜 선택"
                className="w-full rounded-[10px] border border-[#e5ddd3] bg-white px-3 py-2 text-[11px] text-[#40392f] placeholder:text-[#a89f93]"
              />
            </Section>
          </>
        ) : null}

        <div className="flex gap-3 pt-2">
          <Link
            href={action}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#ddd6cc] bg-white px-4 py-4 text-[15px] font-semibold text-[#2c2723]"
          >
            <RotateCcw className="h-4 w-4" />
            초기화
          </Link>
          <button
            type="submit"
            className="inline-flex flex-[1.5] items-center justify-center gap-2 rounded-2xl bg-[#111111] px-4 py-4 text-[15px] font-semibold text-white"
          >
            검색하기
          </button>
        </div>
      </form>
    </aside>
  );
}
