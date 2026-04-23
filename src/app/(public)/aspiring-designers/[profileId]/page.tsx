import Image from "next/image";
import Link from "next/link";
import { AtSign, CalendarDays, Heart, MapPin, MessageCircle, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/common/PageContainer";
import { PortfolioGrid } from "@/components/designer/PortfolioGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  getAspiringDesignerBySlug,
  getAspiringPortfolio,
  getRecruitmentsByAspiringDesigner,
} from "@/lib/queries";

interface AspiringProfilePageProps {
  params: Promise<{ profileId: string }>;
}

export default async function AspiringProfilePage({ params }: AspiringProfilePageProps) {
  const { profileId } = await params;
  const aspiring = getAspiringDesignerBySlug(profileId);

  if (!aspiring) notFound();

  const portfolio = getAspiringPortfolio(profileId);
  const recruitments = getRecruitmentsByAspiringDesigner(aspiring.id).slice(0, 3);

  return (
    <PageContainer className="py-8 lg:py-10">
      <Breadcrumbs items={[{ label: "헤어모델 모집", href: "/models" }, { label: aspiring.name }]} />

      <section className="overflow-hidden rounded-[32px] bg-[linear-gradient(90deg,#efe7db_0%,#f9f6f0_52%,#efe4d6_100%)]">
        <div className="grid gap-6 px-8 py-8 lg:grid-cols-[0.94fr_1.06fr_0.52fr] lg:px-10 lg:py-10">
          <div className="relative z-10 pt-4">
            <span className="inline-flex rounded-full bg-[#ead9c6] px-3 py-1 text-[12px] font-semibold text-[#6d5538]">
              디자이너 준비생
            </span>
            <h1 className="mt-5 text-[56px] font-semibold tracking-[-0.055em] text-[#111111]">{aspiring.name}</h1>
            <p className="mt-2 text-[22px] text-[#4f493f]">디자이너 준비생</p>
            <p className="mt-4 text-[18px] leading-8 text-[#514a42]">{aspiring.bio}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] text-[#5d554c]">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {aspiring.district}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                1999.05.21
              </span>
              <span className="inline-flex items-center gap-2">
                <AtSign className="h-4 w-4" />
                {aspiring.instagram}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {aspiring.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/85 px-3 py-1.5 text-[13px] text-[#5d554c]">
                  # {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-3 rounded-[22px] bg-white/88 p-5 shadow-[0_12px_24px_rgba(17,17,17,0.04)] sm:grid-cols-2 xl:grid-cols-4">
              <article>
                <p className="text-[13px] text-[#8a8176]">누적 좋아요</p>
                <p className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#111111]">{aspiring.stats.likes.toLocaleString()}</p>
              </article>
              <article>
                <p className="text-[13px] text-[#8a8176]">모델 경험</p>
                <p className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#111111]">{aspiring.stats.portfolioCount}명</p>
              </article>
              <article>
                <p className="text-[13px] text-[#8a8176]">리뷰 평점</p>
                <p className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#111111]">{aspiring.stats.rating}</p>
              </article>
              <article>
                <p className="text-[13px] text-[#8a8176]">활동 기간</p>
                <p className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#111111]">{aspiring.stats.monthsActive}개월</p>
              </article>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/models" className="rounded-[14px] bg-[#111111] px-8 py-3.5 text-[15px] font-semibold text-white">
                헤어모델 모집하기
              </Link>
              <Link href="/auth/login" className="rounded-[14px] border border-[#cfc5b9] bg-white px-8 py-3.5 text-[15px] font-semibold text-[#312b25]">
                프로필 편집
              </Link>
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-[24px]">
            <Image src={aspiring.heroImage} alt={aspiring.name} fill priority className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 48vw" />
          </div>

          <aside className="self-center rounded-[24px] border border-[#e7dfd4] bg-white p-6 shadow-[0_14px_30px_rgba(17,17,17,0.04)]">
            <h2 className="text-[22px] font-semibold tracking-[-0.04em] text-[#111111]">프로필 공유하기</h2>
            <div className="mt-4 flex h-[120px] items-center justify-center rounded-[18px] bg-[#f7f3ed]">
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 25 }).map((_, index) => (
                  <span key={index} className={`h-4 w-4 rounded-sm ${index % 3 === 0 ? "bg-[#111111]" : "bg-[#d7d0c6]"}`} />
                ))}
              </div>
            </div>
            <p className="mt-4 text-[14px] leading-6 text-[#6b6258]">QR 코드를 스캔해 내 프로필을 공유해보세요!</p>
            <button className="mt-4 inline-flex w-full items-center justify-center rounded-[14px] border border-[#e0d8ce] px-4 py-3 text-[14px] font-semibold text-[#2f2923]">
              링크 복사하기
            </button>
            <div className="mt-4 flex gap-2">
              {[AtSign, MessageCircle, Share2].map((Icon, index) => (
                <span key={index} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e3dbd0] text-[#665e54]">
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-8 border-b border-[#ebe2d7]">
        <div className="flex flex-wrap gap-10 px-2">
          {["포트폴리오", "헤어모델 모집", "리뷰", "자기소개", "활동 기록"].map((tab, index) => (
            <span
              key={tab}
              className={[
                "border-b-2 pb-4 text-[16px]",
                index === 0 ? "border-[#111111] font-semibold text-[#111111]" : "border-transparent text-[#8a8176]",
              ].join(" ")}
            >
              {tab}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {["전체", "여성컷", "남성컷", "펌", "염색", "스타일링", "기타"].map((tag, index) => (
            <span
              key={tag}
              className={[
                "rounded-full border px-4 py-2 text-[13px]",
                index === 0 ? "border-[#111111] bg-[#111111] text-white" : "border-[#e2dbd1] bg-white text-[#72695f]",
              ].join(" ")}
            >
              {tag}
            </span>
          ))}
        </div>
        <select className="rounded-full border border-[#e2dbd1] bg-white px-4 py-2 text-[13px] text-[#6f675d]">
          <option>최신순</option>
        </select>
      </section>

      <PortfolioGrid title="포트폴리오" items={portfolio.slice(0, 4)} />

      <section className="mt-10 grid gap-5 xl:grid-cols-3">
        <div className="rounded-[24px] border border-[#e7dfd4] bg-white p-6 shadow-[0_12px_24px_rgba(17,17,17,0.03)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[22px] font-semibold tracking-[-0.04em] text-[#111111]">헤어모델 모집 중</h3>
            <Link href="/models" className="text-[13px] text-[#7b7368]">
              전체보기 ›
            </Link>
          </div>
          <div className="space-y-4">
            {recruitments.map((post) => (
              <div key={post.id} className="flex items-center gap-3 rounded-[18px] bg-[#fbf8f3] p-3">
                <div className="relative h-20 w-20 overflow-hidden rounded-[14px] bg-[#efe8de]">
                  <Image src={post.image} alt={post.title} fill className="object-cover" sizes="80px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-[#111111]">{post.title}</p>
                  <p className="mt-1 text-[13px] text-[#6d655b]">{post.date}</p>
                  <p className="mt-1 text-[13px] text-[#6d655b]">{post.gender === "male" ? "남성" : "여성"} · {post.condition}</p>
                </div>
                <span className="text-[20px] font-semibold text-[#31a25d]">{post.deadlineLabel}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[#e7dfd4] bg-white p-6 shadow-[0_12px_24px_rgba(17,17,17,0.03)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[22px] font-semibold tracking-[-0.04em] text-[#111111]">최근 리뷰</h3>
            <Link href="/models" className="text-[13px] text-[#7b7368]">
              전체보기 ›
            </Link>
          </div>
          <div className="space-y-4">
            {["은비", "지수", "민서"].map((reviewer, index) => (
              <div key={reviewer} className="rounded-[18px] bg-[#fbf8f3] p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#eee4d7] text-[#6e5a43]">
                    <Heart className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111111]">{reviewer}</p>
                    <p className="text-[12px] text-[#c28b3f]">★★★★★ 5.0</p>
                  </div>
                </div>
                <p className="mt-3 text-[14px] leading-6 text-[#5f564d]">
                  {index === 0
                    ? "정말 친절하시고 머리도 너무 마음에 들어요!"
                    : index === 1
                      ? "원하는 스타일을 정확히 캐치해주셨어요."
                      : "처음 모델 참여했는데 편안하게 대해주셔서 좋았어요."}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[#e7dfd4] bg-white p-6 shadow-[0_12px_24px_rgba(17,17,17,0.03)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[22px] font-semibold tracking-[-0.04em] text-[#111111]">자기소개</h3>
            <Link href="/auth/login" className="text-[13px] text-[#7b7368]">
              수정하기
            </Link>
          </div>
          <p className="text-[15px] leading-8 text-[#5f564d]">
            안녕하세요! 디자이너를 꿈꾸는 {aspiring.name}입니다.
            <br />
            한 분 한 분의 개성과 분위기를 살린
            <br />
            헤어스타일을 디자인하는 것을 좋아해요.
          </p>
          <div className="mt-6 space-y-3 text-[14px] text-[#5f564d]">
            <p>경력 · 디자이너 준비생 {aspiring.stats.monthsActive}개월</p>
            <p>교육 · OO 미용학원 디자이너 과정 수료</p>
            <p>자격증 · 미용사(일반) 국가자격증</p>
            <p>수상 · 2023 OO 헤어 디자인 공모전 입선</p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-[24px] bg-[#f5f1eb] px-8 py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-[30px] font-semibold tracking-[-0.04em] text-[#111111]">함께 성장하고 싶은 디자이너를 찾고 있나요?</h3>
            <p className="mt-2 text-[15px] text-[#746b60]">Hairfolio에서 당신의 가능성을 보여주세요.</p>
          </div>
          <Link href="/models" className="rounded-[14px] bg-[#111111] px-8 py-4 text-[15px] font-semibold text-white">
            헤어모델 모집하기
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
