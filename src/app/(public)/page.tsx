import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
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
  const heroModels = recommendedDesigners.slice(0, 3);
  const heroStyles = trendingStyles.slice(0, 4);

  return (
    <div>
      <section className="relative min-h-[590px] overflow-hidden border-b border-[#e5dfd5] bg-[#f4f1ec]">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[66%]">
          <Image
            src="/images/heroes/hero-home-v2.png"
            alt="Hairfolio hero"
            fill
            priority
            className="object-cover object-[68%_center]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f4f1ec] via-[#f4f1ec]/88 to-[#f4f1ec]/8" />

        <PageContainer className="relative z-10 !max-w-[1840px] py-10 lg:py-12">
          <div className="grid min-h-[520px] gap-8 lg:grid-cols-[0.98fr_1.02fr]">
            <article className="flex max-w-[660px] flex-col justify-center">
              <h1 className="text-[44px] leading-[1.15] font-semibold tracking-normal text-[#111111] sm:text-[56px] lg:text-[66px]">
                원하는 스타일,
                <br />
                해본 디자이너를
                <br />
                <span className="text-[#aa967f]">쉽고 빠르게.</span>
              </h1>
              <p className="mt-6 max-w-[520px] text-[17px] leading-8 text-[#5d574f] lg:text-[20px]">
                실력 있는 디자이너의 포트폴리오를 보고 네이버 예약으로 바로 연결해 보세요.
              </p>

              <form action={routes.designerSearch} className="mt-8 flex max-w-[720px] flex-wrap overflow-hidden rounded-[16px] border border-[#d7d0c6] bg-white shadow-[0_12px_28px_rgba(17,17,17,0.08)]">
                <label className="min-w-[160px] flex-1 border-r border-[#ece6dd] px-5 py-3">
                  <span className="block text-[11px] font-semibold text-[#9a9187]">지역</span>
                  <select name="district" className="mt-1 w-full bg-transparent text-[15px] font-medium text-[#39342f] outline-none">
                    <option value="">지역 선택</option>
                    <option value="강남">강남</option>
                    <option value="역삼">역삼</option>
                    <option value="청담">청담</option>
                  </select>
                </label>
                <label className="min-w-[185px] flex-1 border-r border-[#ece6dd] px-5 py-3">
                  <span className="block text-[11px] font-semibold text-[#9a9187]">시술/스타일</span>
                  <select name="style" className="mt-1 w-full bg-transparent text-[15px] font-medium text-[#39342f] outline-none">
                    <option value="">선택</option>
                    <option value="레이어드컷">레이어드컷</option>
                    <option value="허쉬컷">허쉬컷</option>
                    <option value="다운펌">다운펌</option>
                  </select>
                </label>
                <label className="min-w-[150px] flex-1 border-r border-[#ece6dd] px-5 py-3">
                  <span className="block text-[11px] font-semibold text-[#9a9187]">성별</span>
                  <select name="gender" className="mt-1 w-full bg-transparent text-[15px] font-medium text-[#39342f] outline-none">
                    <option value="all">전체</option>
                    <option value="female">여성</option>
                    <option value="male">남성</option>
                  </select>
                </label>
                <button type="submit" className="inline-flex min-w-[112px] items-center justify-center gap-2 bg-[#111111] px-5 text-[15px] font-semibold text-white">
                  <Search className="h-4 w-4" />
                  검색
                </button>
              </form>

              <div className="mt-5 flex flex-wrap gap-2">
                {["레이어드컷", "다운펌", "탈색", "빌드펌", "허쉬컷"].map((tag) => (
                  <Link
                    key={tag}
                    href={`${routes.designerSearch}?style=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-[#d7d0c6] bg-white/90 px-4 py-2 text-[14px] text-[#655f58]"
                  >
                    # {tag}
                  </Link>
                ))}
              </div>
            </article>

            <article className="relative flex min-h-[420px] flex-col justify-center gap-5 lg:block">
              <div className="grid w-full max-w-[480px] grid-cols-[1fr_190px] overflow-hidden rounded-[18px] border border-white/55 bg-white/48 shadow-[0_18px_42px_rgba(35,27,18,0.14)] backdrop-blur-[18px] lg:absolute lg:right-[110px] lg:top-[36px]">
                <div className="p-6">
                  <h3 className="text-[23px] font-semibold tracking-normal text-[#111111]">헤어모델 모집 중</h3>
                  <p className="mt-4 text-[15px] leading-7 text-[#5f564c]">포트폴리오를 쌓고 있는 디자이너를 만나보세요.</p>
                  <Link href={routes.models} className="mt-6 inline-flex text-[15px] font-semibold text-[#111111]">
                    모델 프로필 보기 ›
                  </Link>
                </div>
                <div className="relative min-h-[180px] bg-[#eee7df]">
                  {heroModels.map((designer, index) => (
                    <div
                      key={designer.id}
                      className="absolute bottom-0 overflow-hidden rounded-t-[999px]"
                      style={{
                        left: `${index * 52}px`,
                        width: 90,
                        height: 152 + index * 14,
                        zIndex: heroModels.length - index,
                      }}
                    >
                      <Image src={designer.profileImage} alt={designer.name} fill className="object-cover object-top" sizes="120px" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full max-w-[480px] overflow-hidden rounded-[18px] border border-white/55 bg-white/48 p-6 shadow-[0_18px_42px_rgba(35,27,18,0.14)] backdrop-blur-[18px] lg:absolute lg:bottom-[44px] lg:right-0">
                <div className="grid grid-cols-[1fr_190px] gap-5">
                  <div>
                    <h3 className="text-[23px] font-semibold tracking-normal text-[#111111]">오늘의 인기 스타일</h3>
                    <p className="mt-4 text-[15px] leading-7 text-[#5f564c]">지금 가장 많이 찾는 스타일을 확인해 보세요.</p>
                    <Link href={routes.designerSearch} className="mt-6 inline-flex text-[15px] font-semibold text-[#111111]">
                      더보기 ›
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {heroStyles.map((style) => (
                      <div key={style.rank} className="relative h-[86px] overflow-hidden rounded-[10px] border border-white/50">
                        <Image src={style.image} alt={style.keyword} fill className="object-cover" sizes="120px" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
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
                <p className="text-[28px] font-semibold tracking-normal">{style.keyword}</p>
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
