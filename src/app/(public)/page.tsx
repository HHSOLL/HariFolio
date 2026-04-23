import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/common/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DesignerCard } from "@/components/designer/DesignerCard";
import { RecruitmentCard } from "@/components/recruitment/RecruitmentCard";
import { SalonCard } from "@/components/salon/SalonCard";
import { aspiringProfileRoute, designerDetailRoute, routes } from "@/lib/navigation";
import {
  getAspiringDesigners,
  getDesignerBySlug,
  getHomeRecommendedDesigners,
  getPopularSalons,
  getRecruitmentPosts,
  getTrendingStyles,
} from "@/lib/queries";

export default function HomePage() {
  const recommendedDesigners = getHomeRecommendedDesigners();
  const trendingStyles = getTrendingStyles();
  const recruitments = getRecruitmentPosts().slice(0, 4);
  const popularSalons = getPopularSalons().slice(0, 4);
  const aspiringMap = new Map(getAspiringDesigners().map((item) => [item.id, item]));

  return (
    <div>
      <section className="border-b border-[#e5dfd5] bg-[#efede9]">
        <PageContainer className="py-5 lg:py-7">
          <div className="relative overflow-hidden rounded-[32px] border border-[#ddd6cb] bg-[#e8e5e0]">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[57%]">
              <Image
                src="/images/heroes/hero-home-v2.png"
                alt="Hairfolio hero"
                fill
                priority
                className="object-cover object-[72%_center]"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#efede9] via-[#efede9]/90 to-transparent" />

            <div className="relative z-10 grid gap-6 p-5 lg:min-h-[560px] lg:grid-cols-[1.04fr_0.96fr] lg:p-8">
              <article className="space-y-6 lg:max-w-[560px]">
                <h1 className="text-[44px] leading-[1.14] font-semibold tracking-[-0.04em] text-[#111111] lg:text-[68px]">
                  원하는 스타일,
                  <br />
                  해본 디자이너를
                  <br />
                  <span className="text-[#b4a28f]">쉽고 빠르게.</span>
                </h1>
                <p className="max-w-[480px] text-[16px] leading-7 text-[#60584e] lg:text-[20px] lg:leading-8">
                  실력 있는 디자이너의 포트폴리오를 보고
                  <br />
                  네이버 예약으로 바로 연결해 보세요.
                </p>

                <form action={routes.designerSearch} className="flex flex-wrap overflow-hidden rounded-[18px] border border-[#d7d0c6] bg-white/95 shadow-[0_14px_28px_rgba(17,17,17,0.08)]">
                  <select name="district" className="min-w-[150px] border-r border-[#ece6dd] px-4 py-3.5 text-[13px] text-[#575149]">
                    <option value="">지역 선택</option>
                    <option value="강남">강남</option>
                    <option value="역삼">역삼</option>
                    <option value="청담">청담</option>
                  </select>
                  <select name="style" className="min-w-[165px] border-r border-[#ece6dd] px-4 py-3.5 text-[13px] text-[#575149]">
                    <option value="">시술/스타일 선택</option>
                    <option value="레이어드컷">레이어드컷</option>
                    <option value="허쉬컷">허쉬컷</option>
                    <option value="다운펌">다운펌</option>
                  </select>
                  <select name="gender" className="min-w-[136px] border-r border-[#ece6dd] px-4 py-3.5 text-[13px] text-[#575149]">
                    <option value="all">성별 선택</option>
                    <option value="female">여성</option>
                    <option value="male">남성</option>
                  </select>
                  <button type="submit" className="min-w-[76px] bg-[#111111] px-5 py-3.5 text-lg text-white">
                    ⌕
                  </button>
                </form>

                <div className="flex flex-wrap gap-2">
                  {["레이어드컷", "다운펌", "탈색", "빌드펌", "허쉬컷"].map((tag) => (
                    <Link
                      key={tag}
                      href={`${routes.designerSearch}?style=${encodeURIComponent(tag)}`}
                      className="rounded-full border border-[#d7d0c6] bg-white/90 px-3.5 py-1.5 text-[13px] text-[#655f58]"
                    >
                      # {tag}
                    </Link>
                  ))}
                </div>
              </article>

              <article className="flex flex-col justify-end gap-4 lg:items-end lg:py-3">
                <div className="w-full max-w-[330px] rounded-[26px] border border-white/50 bg-white/48 p-5 shadow-[0_18px_36px_rgba(35,27,18,0.12)] backdrop-blur-[18px]">
                  <h3 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111111]">헤어모델 모집 중</h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#5f564c]">포트폴리오를 쌓고 있는 디자이너를 만나보세요.</p>
                  <Link href={routes.models} className="mt-4 inline-flex text-sm font-semibold text-[#111111]">
                    모델 프로필 보기 ›
                  </Link>
                </div>

                <div className="w-full max-w-[330px] rounded-[26px] border border-white/50 bg-white/48 p-5 shadow-[0_18px_36px_rgba(35,27,18,0.12)] backdrop-blur-[18px]">
                  <h3 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111111]">오늘의 인기 스타일</h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#5f564c]">지금 가장 많이 찾는 스타일을 확인해 보세요.</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {trendingStyles.slice(0, 4).map((style) => (
                      <div key={style.rank} className="relative h-[88px] overflow-hidden rounded-xl border border-white/40">
                        <Image src={style.image} alt={style.keyword} fill className="object-cover" sizes="200px" />
                      </div>
                    ))}
                  </div>
                  <Link href={routes.designerSearch} className="mt-4 inline-flex text-sm font-semibold text-[#111111]">
                    더보기 ›
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="py-12">
        <SectionHeader title="내 주변 추천" subtitle="강남구 역삼동 기준" href={routes.designers} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recommendedDesigners.map((designer) => (
            <DesignerCard key={designer.id} designer={designer} />
          ))}
        </div>
      </PageContainer>

      <PageContainer className="py-3">
        <SectionHeader title="인기 스타일 TOP 6" href={routes.designerSearch} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trendingStyles.map((style) => (
            <article key={style.rank} className="relative overflow-hidden rounded-2xl border border-[#dbd5cb] bg-[#131313]">
              <Image src={style.image} alt={style.keyword} width={480} height={260} className="h-44 w-full object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/55" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-2xl font-semibold">{String(style.rank).padStart(2, "0")}</p>
                <p className="text-[28px] font-semibold tracking-[-0.02em]">{style.keyword}</p>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>

      <PageContainer className="py-12">
        <SectionHeader title="헤어 모델 모집" subtitle="디자이너 준비생 포트폴리오 강화 프로젝트" href={routes.models} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recruitments.map((post) => {
            const aspiring = aspiringMap.get(post.aspiringDesignerId);
            if (!aspiring) return null;
            const designerMatch = getDesignerBySlug(aspiring.slug);
            const profileHref =
              designerMatch?.role === "designer"
                ? designerDetailRoute(designerMatch.slug)
                : aspiringProfileRoute(aspiring.slug);

            return (
              <RecruitmentCard
                key={post.id}
                post={post}
                aspiringName={aspiring.name}
                profileHref={profileHref}
              />
            );
          })}
        </div>
      </PageContainer>

      <PageContainer className="py-3 pb-16">
        <SectionHeader title="인기 미용실" subtitle="디자이너 비교가 쉬운 살롱" href={routes.salons} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {popularSalons.map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
