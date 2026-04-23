import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CalendarDays, Clock3, Heart, MapPin, Scissors } from "lucide-react";
import { Designer } from "@/lib/types";

interface DesignerHeroProps {
  designer: Designer;
  salonHref?: string;
}

export function DesignerHero({ designer, salonHref }: DesignerHeroProps) {
  const heroImage = designer.slug === "jiyu" ? "/images/heroes/hero-jiyu.png" : designer.profileImage;

  return (
    <section className="overflow-hidden rounded-[32px] bg-[linear-gradient(90deg,#efe7db_0%,#f8f5f0_52%,#eee2d3_100%)]">
      <div className="relative grid gap-8 px-8 py-8 lg:min-h-[520px] lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-10">
        <div className="relative z-10 flex flex-col justify-center">
          <div className="inline-flex w-fit rounded-full bg-[#efd4a5] px-3 py-1 text-[12px] font-semibold text-[#6d5636]">
            TOP 디자이너
          </div>
          <h1 className="mt-5 flex items-center gap-2 text-[56px] font-semibold tracking-[-0.055em] text-[#111111]">
            {designer.name}
            <BadgeCheck className="h-6 w-6 fill-[#111111] text-white" />
          </h1>
          <p className="mt-2 text-[18px] text-[#4f493f]">
            {designer.salonName ?? designer.location} <span className="mx-3 text-[#c4b8aa]">|</span> {designer.yearsExperience}년차 디자이너
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {designer.styles.slice(0, 4).map((style) => (
              <span key={style} className="rounded-full bg-white/85 px-3 py-1.5 text-[13px] text-[#5d554c]">
                # {style}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-6 text-[16px] text-[#332d28]">
            <span>★ {designer.rating} ({designer.reviewCount})</span>
            <span>♡ {designer.likes >= 1000 ? `${(designer.likes / 1000).toFixed(1)}k` : designer.likes}</span>
            <span>답변 98%</span>
          </div>

          <p className="mt-6 max-w-[420px] whitespace-pre-line text-[17px] leading-8 text-[#514a42]">{designer.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://booking.naver.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-[14px] bg-[#111111] px-8 py-3.5 text-[15px] font-semibold text-white"
            >
              예약하기
            </a>
            <a
              href="https://open.kakao.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-[14px] border border-[#cfc5b9] bg-white px-8 py-3.5 text-[15px] font-semibold text-[#312b25]"
            >
              문의하기
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[16px] bg-white/88 px-5 py-4 text-[14px] text-[#574f45] shadow-[0_12px_24px_rgba(17,17,17,0.04)]">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {designer.availableAt}
            </span>
            <span className="text-[#cec3b6]">|</span>
            <span>예약 가능 시간 보기</span>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[24px] lg:min-h-[480px]">
          <Image src={heroImage} alt={designer.name} fill priority className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 56vw" />
        </div>
      </div>

      <div className="-mt-6 px-8 pb-8 lg:px-10 lg:pb-10">
        <div className="grid gap-6 rounded-[24px] border border-[#ebe2d7] bg-white px-6 py-6 shadow-[0_16px_32px_rgba(17,17,17,0.04)] lg:grid-cols-4">
          <article className="flex items-start gap-3 border-b border-[#f1ebe4] pb-4 lg:border-b-0 lg:border-r lg:border-r-[#f1ebe4] lg:pb-0">
            <MapPin className="mt-1 h-5 w-5 text-[#5d554b]" />
            <div className="text-[14px] text-[#5a5248]">
              <p className="font-semibold text-[#22201c]">위치</p>
              <p className="mt-2">{designer.district}</p>
              <p>{designer.location}</p>
            </div>
          </article>
          <article className="flex items-start gap-3 border-b border-[#f1ebe4] pb-4 lg:border-b-0 lg:border-r lg:border-r-[#f1ebe4] lg:pb-0">
            <Heart className="mt-1 h-5 w-5 text-[#5d554b]" />
            <div className="text-[14px] text-[#5a5248]">
              <p className="font-semibold text-[#22201c]">경력</p>
              <p className="mt-2">{designer.yearsExperience}년차 디자이너</p>
            </div>
          </article>
          <article className="flex items-start gap-3 border-b border-[#f1ebe4] pb-4 lg:border-b-0 lg:border-r lg:border-r-[#f1ebe4] lg:pb-0">
            <Scissors className="mt-1 h-5 w-5 text-[#5d554b]" />
            <div className="text-[14px] text-[#5a5248]">
              <p className="font-semibold text-[#22201c]">시술 가격</p>
              <p className="mt-2">컷 {designer.priceFrom.toLocaleString()}원부터</p>
              <p>펌 120,000원부터</p>
              <p>염색 100,000원부터</p>
            </div>
          </article>
          <article className="flex items-start gap-3">
            <Clock3 className="mt-1 h-5 w-5 text-[#5d554b]" />
            <div className="text-[14px] text-[#5a5248]">
              <p className="font-semibold text-[#22201c]">영업시간</p>
              <p className="mt-2">평일 10:00 - 21:00</p>
              <p>주말 10:00 - 20:00</p>
              <p>매주 월요일 휴무</p>
            </div>
          </article>
        </div>

        {salonHref ? (
          <Link href={salonHref} className="sr-only">
            소속 살롱 보기
          </Link>
        ) : null}
      </div>
    </section>
  );
}
