import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/common/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DesignerCard } from "@/components/designer/DesignerCard";
import { RecruitmentCard } from "@/components/recruitment/RecruitmentCard";
import { SalonCard } from "@/components/salon/SalonCard";
import { routes } from "@/lib/navigation";
import {
  getAspiringDesigners,
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
      <section className="border-b border-[#e5dfd5] bg-[#f0eeeb]">
        <PageContainer className="grid gap-6 py-10 lg:grid-cols-[1fr_1fr] lg:py-14">
          <article className="space-y-7">
            <h1 className="max-w-xl text-[70px] leading-[1.07] font-semibold tracking-[-0.04em] text-[#111111]">
              원하는 스타일,
              <br />
              해본 디자이너를
              <br />
              <span className="text-[#b49a7f]">쉽고 빠르게.</span>
            </h1>
            <p className="max-w-lg text-[23px] leading-9 text-[#575149]">
              실력 있는 디자이너의 포트폴리오를 보고
              <br />
              네이버 예약으로 바로 연결해 보세요.
            </p>

            <form action={routes.designerSearch} className="flex flex-wrap overflow-hidden rounded-2xl border border-[#d9d2c7] bg-white">
              <select name="district" className="min-w-[160px] border-r border-[#ece6dd] px-4 py-3.5 text-sm text-[#575149]">
                <option value="">지역 선택</option>
                <option value="강남">강남</option>
                <option value="역삼">역삼</option>
                <option value="청담">청담</option>
              </select>
              <select name="style" className="min-w-[170px] border-r border-[#ece6dd] px-4 py-3.5 text-sm text-[#575149]">
                <option value="">시술/스타일 선택</option>
                <option value="레이어드컷">레이어드컷</option>
                <option value="허쉬컷">허쉬컷</option>
                <option value="다운펌">다운펌</option>
              </select>
              <select name="gender" className="min-w-[140px] border-r border-[#ece6dd] px-4 py-3.5 text-sm text-[#575149]">
                <option value="all">성별 선택</option>
                <option value="female">여성</option>
                <option value="male">남성</option>
              </select>
              <button type="submit" className="flex-1 bg-[#111111] px-5 py-3.5 text-sm font-semibold text-white">
                디자이너 검색
              </button>
            </form>

            <div className="flex flex-wrap gap-2">
              {["레이어드컷", "다운펌", "탈색", "빌드펌", "허쉬컷"].map((tag) => (
                <Link
                  key={tag}
                  href={`${routes.designerSearch}?style=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-[#d7d0c6] bg-white px-4 py-1.5 text-sm text-[#655f58]"
                >
                  # {tag}
                </Link>
              ))}
            </div>
          </article>

          <article className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <div className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-[#e0dad0] bg-[#d7d2cc]">
              <Image src="/images/heroes/hero-home.png" alt="Hairfolio hero" fill className="object-cover" priority />
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-[#ddd6cb] bg-white p-4">
                <h3 className="text-[30px] font-semibold tracking-[-0.02em] text-[#111111]">헤어모델 모집 중</h3>
                <p className="mt-2 text-sm text-[#6b645a]">포트폴리오를 쌓고 있는 디자이너를 만나보세요.</p>
                <Link href={routes.models} className="mt-3 inline-flex text-sm font-semibold text-[#111111] underline underline-offset-4">
                  모델 지원하기
                </Link>
              </div>

              <div className="rounded-2xl border border-[#ddd6cb] bg-white p-4">
                <h3 className="text-[30px] font-semibold tracking-[-0.02em] text-[#111111]">오늘의 인기 스타일</h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {trendingStyles.slice(0, 4).map((style) => (
                    <div key={style.rank} className="relative h-24 overflow-hidden rounded-xl">
                      <Image src={style.image} alt={style.keyword} fill className="object-cover" sizes="200px" />
                    </div>
                  ))}
                </div>
                <Link href={routes.designerSearch} className="mt-3 inline-flex text-sm text-[#111111]">
                  더보기 ›
                </Link>
              </div>
            </div>
          </article>
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

            return (
              <RecruitmentCard
                key={post.id}
                post={post}
                aspiringSlug={aspiring.slug}
                aspiringName={aspiring.name}
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
