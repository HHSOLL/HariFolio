import Image from "next/image";
import { Salon } from "@/lib/types";
import { PrimaryButton } from "@/components/common/PrimaryButton";

interface SalonHeroProps {
  salon: Salon;
}

export function SalonHero({ salon }: SalonHeroProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <article className="overflow-hidden rounded-3xl border border-[#dfd7cc] bg-white">
        <div className="relative h-[420px]">
          <Image src={salon.image} alt={salon.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
        </div>
      </article>

      <article className="rounded-3xl border border-[#dfd7cc] bg-white p-8">
        <p className="inline-flex rounded-full bg-[#e6d9c8] px-3 py-1 text-sm text-[#5f4b37]">강남구 TOP 미용실</p>
        <h1 className="mt-4 text-[48px] font-semibold tracking-[-0.03em] text-[#111111]">{salon.name}</h1>
        <p className="mt-2 text-xl text-[#4f493f]">★ {salon.rating} · 리뷰 {salon.reviewCount.toLocaleString()}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {salon.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[#dfd8cd] px-3 py-1 text-sm text-[#625c53]">
              #{tag}
            </span>
          ))}
        </div>

        <p className="mt-6 whitespace-pre-line text-[17px] leading-8 text-[#504a42]">{salon.description}</p>

        <div className="mt-6 space-y-2 text-sm text-[#5f5950]">
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
    </section>
  );
}
