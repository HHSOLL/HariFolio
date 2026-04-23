import Image from "next/image";
import { BarChart3, Clock3, MapPin, Phone } from "lucide-react";
import { Salon } from "@/lib/types";

interface SalonHeroProps {
  salon: Salon;
}

export function SalonHero({ salon }: SalonHeroProps) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.02fr_1fr_0.72fr]">
      <article className="overflow-hidden rounded-[24px] bg-[#efe8de]">
        <div className="relative h-[360px]">
          <Image src={salon.image} alt={salon.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
        </div>
      </article>

      <article className="pt-2">
        <span className="inline-flex rounded-full bg-[#ead9c6] px-3 py-1 text-[12px] font-semibold text-[#6d5538]">강남구 TOP 미용실</span>
        <h1 className="mt-5 text-[52px] font-semibold tracking-[-0.055em] text-[#111111]">{salon.name}</h1>
        <p className="mt-3 text-[20px] text-[#4c463f]">★ {salon.rating} (1.2k) · 리뷰 {salon.reviewCount.toLocaleString()}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {salon.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[#e3dad0] bg-white px-3 py-1.5 text-[13px] text-[#655d53]">
              #{tag}
            </span>
          ))}
        </div>

        <p className="mt-6 whitespace-pre-line text-[18px] leading-8 text-[#514a42]">{salon.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-6 text-[15px] text-[#5b534a]">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {salon.address}
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {salon.phone}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            {salon.hours}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://booking.naver.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-[14px] bg-[#111111] px-8 py-3.5 text-[15px] font-semibold text-white"
          >
            네이버 예약하기
          </a>
          <a
            href={`tel:${salon.phone.replace(/-/g, "")}`}
            className="rounded-[14px] border border-[#cfc5b9] bg-white px-8 py-3.5 text-[15px] font-semibold text-[#312b25]"
          >
            전화 문의
          </a>
          <a
            href={`https://map.naver.com/v5/search/${encodeURIComponent(salon.address)}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-[14px] border border-[#cfc5b9] bg-white px-8 py-3.5 text-[15px] font-semibold text-[#312b25]"
          >
            길찾기
          </a>
        </div>
      </article>

      <aside className="rounded-[24px] border border-[#e7dfd4] bg-white p-6 shadow-[0_14px_30px_rgba(17,17,17,0.04)]">
        <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#111111]">고객 평점</h2>
        <div className="mt-3 flex items-end gap-2">
          <span className="text-[56px] font-semibold tracking-[-0.05em] text-[#111111]">{salon.rating}</span>
          <span className="pb-2 text-[28px] text-[#72695f]">/ 5</span>
        </div>
        <p className="mt-1 text-[15px] text-[#6d6459]">★★★★★</p>
        <div className="mt-2 text-[13px] text-[#9a9084]">리뷰 {salon.reviewCount.toLocaleString()}개 기준</div>

        <div className="mt-6 space-y-3 text-[13px] text-[#5f564d]">
          {[["5점", "1102"], ["4점", "98"], ["3점", "28"], ["2점", "9"], ["1점", "6"]].map(([label, value], index) => (
            <div key={label} className="grid grid-cols-[24px_1fr_34px] items-center gap-3">
              <span>{label}</span>
              <div className="h-1.5 rounded-full bg-[#f0ebe5]">
                <div className="h-1.5 rounded-full bg-[#7f6547]" style={{ width: index === 0 ? "92%" : index === 1 ? "14%" : "4%" }} />
              </div>
              <span>{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[18px] bg-[#fbf8f3] p-4">
          <div className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#111111]">
            <BarChart3 className="h-4 w-4" />
            이런 점이 좋아요!
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["친절해요", "시술이 꼼꼼해요", "스타일 추천을 잘해줘요", "매장이 깔끔해요", "만족스러워요"].map((tag) => (
              <span key={tag} className="rounded-full bg-white px-3 py-2 text-[12px] text-[#6e655b]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
