import Image from "next/image";
import Link from "next/link";
import { Designer } from "@/lib/types";
import { PrimaryButton } from "@/components/common/PrimaryButton";

interface DesignerHeroProps {
  designer: Designer;
  salonHref?: string;
}

export function DesignerHero({ designer, salonHref }: DesignerHeroProps) {
  const heroImage = designer.slug === "jiyu" ? "/images/heroes/hero-jiyu.png" : designer.profileImage;

  return (
    <section className="overflow-hidden rounded-[28px] border border-[#ddd7cf] bg-[#e7dfd4]">
      <div className="grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
        <div>
          <span className="inline-flex rounded-full bg-[#d7c2a4] px-3 py-1 text-sm font-medium text-[#5d4a37]">TOP 디자이너</span>
          <h1 className="mt-5 text-[54px] font-semibold tracking-[-0.03em] text-[#111111]">{designer.name}</h1>
          <p className="mt-2 text-xl text-[#4e4840]">
            {designer.location} · {designer.yearsExperience}년차 디자이너
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {designer.styles.map((style) => (
              <span key={style} className="rounded-full bg-white/80 px-3 py-1 text-sm text-[#5d554c]">
                #{style}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-6 text-lg text-[#3f3931]">
            <span>★ {designer.rating} ({designer.reviewCount})</span>
            <span>♡ {designer.likes.toLocaleString()}</span>
          </div>

          <p className="mt-6 max-w-xl whitespace-pre-line text-[18px] leading-8 text-[#4e4840]">{designer.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://booking.naver.com" target="_blank" rel="noreferrer">
              <PrimaryButton className="min-w-44">네이버 예약하기</PrimaryButton>
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

        <div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-[#ddd4c8]">
          <Image src={heroImage} alt={designer.name} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 40vw" />
        </div>
      </div>
    </section>
  );
}
