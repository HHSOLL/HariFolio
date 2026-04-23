import Image from "next/image";
import { Salon } from "@/lib/types";
import { PrimaryButton } from "@/components/common/PrimaryButton";

interface SalonHeroProps {
  salon: Salon;
}

export function SalonHero({ salon }: SalonHeroProps) {
  const distribution = [
    { label: "5점", value: 0.86 },
    { label: "4점", value: 0.1 },
    { label: "3점", value: 0.03 },
    { label: "2점", value: 0.008 },
    { label: "1점", value: 0.002 },
  ];

  return (
    <section className="grid gap-5 xl:grid-cols-[1.05fr_1fr_0.78fr]">
      <article className="overflow-hidden rounded-3xl border border-[#dfd7cc] bg-white">
        <div className="relative h-[360px] lg:h-[430px]">
          <Image src={salon.image} alt={salon.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
          <button
            type="button"
            className="absolute bottom-4 right-4 rounded-xl bg-[#111111b8] px-3 py-2 text-[13px] font-medium text-white"
          >
            사진 더보기 20+
          </button>
        </div>
      </article>

      <article className="rounded-3xl border border-[#dfd7cc] bg-white p-6 lg:p-8">
        <p className="inline-flex rounded-full bg-[#e6d9c8] px-3 py-1 text-sm text-[#5f4b37]">강남구 TOP 미용실</p>
        <h1 className="mt-4 text-[42px] leading-tight font-semibold tracking-normal text-[#111111] lg:text-[48px]">{salon.name}</h1>
        <p className="mt-2 text-[17px] text-[#4f493f]">
          ★ {salon.rating} ({salon.reviewCount.toLocaleString()}) · 리뷰 {salon.reviewCount.toLocaleString()}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {salon.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[#dfd8cd] px-3 py-1 text-[13px] text-[#625c53]">
              #{tag}
            </span>
          ))}
        </div>

        <p className="mt-5 whitespace-pre-line text-[15px] leading-7 text-[#504a42]">{salon.description}</p>

        <div className="mt-6 space-y-2 text-[13px] text-[#5f5950]">
          <p>📍 {salon.address}</p>
          <p>☎ {salon.phone}</p>
          <p>🕒 {salon.hours}</p>
          <p>💳 {salon.priceRange}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="https://booking.naver.com" target="_blank" rel="noreferrer">
            <PrimaryButton>네이버 예약하기</PrimaryButton>
          </a>
          <a
            href={`tel:${salon.phone.replace(/-/g, "")}`}
            className="rounded-xl border border-[#cec6bb] bg-white px-5 py-3 text-sm font-medium text-[#3f3932]"
          >
            전화 문의
          </a>
          <a
            href={`https://map.naver.com/v5/search/${encodeURIComponent(salon.address)}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-[#cec6bb] bg-white px-5 py-3 text-sm font-medium text-[#3f3932]"
          >
            길찾기
          </a>
        </div>
      </article>

      <aside className="rounded-3xl border border-[#dfd7cc] bg-white p-6">
        <h2 className="text-[28px] font-semibold tracking-normal text-[#111111]">고객 평점</h2>
        <div className="mt-3 flex items-end gap-2">
          <p className="text-[44px] leading-none font-semibold text-[#111111]">{salon.rating}</p>
          <p className="pb-1 text-[16px] text-[#6e665d]">/ 5</p>
        </div>
        <p className="mt-1 text-[13px] text-[#6e665d]">리뷰 {salon.reviewCount.toLocaleString()}개 기준</p>

        <div className="mt-5 space-y-2">
          {distribution.map((row) => (
            <div key={row.label} className="flex items-center gap-2">
              <span className="w-6 text-xs text-[#6b645a]">{row.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#efebe5]">
                <div className="h-full rounded-full bg-[#92785f]" style={{ width: `${Math.max(2, row.value * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-[#f7f3ec] p-4">
          <p className="text-[13px] font-semibold text-[#433c34]">이런 점이 좋아요!</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["친절해요", "시술이 꼼꼼해요", "스타일 추천을 잘해줘요", "매장이 깔끔해요", "만족스러워요"].map((item) => (
              <span key={item} className="rounded-full border border-[#ddd4c9] bg-white px-2.5 py-1 text-[11px] text-[#5b5349]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
