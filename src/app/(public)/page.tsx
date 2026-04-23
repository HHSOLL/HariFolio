import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Heart, MapPin, Search } from "lucide-react";
import { PageContainer } from "@/components/common/PageContainer";
import { routes } from "@/lib/navigation";
import {
  getAspiringDesigners,
  getDesigners,
  getPopularSalons,
  getRecruitmentPosts,
  getTrendingStyles,
} from "@/lib/queries";

function HomeDesignerCard({
  designer,
}: {
  designer: ReturnType<typeof getDesigners>[number];
}) {
  return (
    <article className="rounded-[14px] border border-[#ece5db] bg-white p-3 shadow-[0_8px_18px_rgba(17,17,17,0.02)]">
      <div className="mb-3 flex items-start justify-between">
        <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full bg-[#efe8de]">
          <Image src={designer.profileImage} alt={designer.name} fill className="object-cover" sizes="72px" />
        </div>
        <span className="text-[12px] text-[#9a9083]">⌑</span>
      </div>

      <h3 className="text-[15px] font-semibold tracking-[-0.03em] text-[#111111]">{designer.name}</h3>
      <p className="mt-1 text-[11px] text-[#7c7469]">
        {designer.district} <span className="mx-1">|</span> {designer.location}
      </p>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {designer.styles.slice(0, 2).map((style) => (
          <span key={style} className="rounded-full bg-[#f3efe8] px-2.5 py-1 text-[10px] text-[#6f665b]">
            {style}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-[#5e564d]">
        <span className="inline-flex items-center gap-1.5">
          <Heart className="h-3 w-3" />
          {designer.likes >= 1000 ? `${(designer.likes / 1000).toFixed(1)}k` : designer.likes}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3 w-3" />
          {designer.availableAt}
        </span>
      </div>
    </article>
  );
}

function StyleRankCard({
  rank,
  title,
  subtitle,
  image,
}: {
  rank: string;
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-[10px]">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />
      <Image src={image} alt={title} width={280} height={120} className="h-[68px] w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 z-20 p-3 text-white">
        <p className="text-[13px] font-semibold">{rank}</p>
        <p className="text-[15px] font-semibold tracking-[-0.03em]">{title}</p>
        <p className="text-[11px] text-white/80">{subtitle}</p>
      </div>
    </article>
  );
}

export default function HomePage() {
  const allDesigners = getDesigners();
  const homeDesigners = ["suah", "minjun", "jiyu", "dohyeon", "yerin", "juwon"]
    .map((slug) => allDesigners.find((designer) => designer.slug === slug))
    .filter(Boolean) as ReturnType<typeof getDesigners>;
  const trendingMap = new Map(getTrendingStyles().map((style) => [style.keyword, style]));
  const trendingStyles = [
    "레이어드컷",
    "다운펌",
    "허쉬컷",
    "탈색",
    "복구매직",
    "단발",
  ]
    .map((keyword, index) => {
      const style = trendingMap.get(keyword) ?? getTrendingStyles()[index];
      return {
        rank: String(index + 1).padStart(2, "0"),
        title: keyword,
        subtitle:
          keyword === "레이어드컷"
            ? "+ C컬펌"
            : keyword === "다운펌"
              ? "+ 가르마펌"
              : keyword === "허쉬컷"
                ? "+ 빌드펌"
                : keyword === "탈색"
                  ? "+ 애쉬브라운"
                  : keyword === "복구매직"
                    ? "+ 클리닉"
                    : "+ C컬펌",
        image: style.image,
      };
    });
  const recruitments = getRecruitmentPosts().slice(0, 2);
  const aspiringMap = new Map(getAspiringDesigners().map((item) => [item.id, item]));
  const salons = getPopularSalons().slice(0, 4);

  return (
    <div>
      <section className="border-b border-[#ece4d9] bg-[#fbfaf7]">
        <PageContainer className="grid gap-6 py-7 lg:grid-cols-[0.74fr_0.8fr_0.5fr] lg:items-start lg:py-8">
          <div className="pt-5">
            <h1 className="text-[40px] leading-[1.14] font-semibold tracking-[-0.055em] text-[#111111] lg:text-[56px]">
              원하는 스타일,
              <br />
              해본 디자이너를
              <br />
              <span className="text-[#c5a989]">쉽고 빠르게.</span>
            </h1>

            <p className="mt-4 text-[14px] leading-[1.7] text-[#5f574d] lg:text-[16px]">
              실력 있는 디자이너의 포트폴리오를 보고
              <br />
              네이버 예약으로 바로 연결해 보세요.
            </p>

            <form action={routes.designerSearch} className="mt-5 flex overflow-hidden rounded-[12px] border border-[#e4dbcf] bg-white shadow-[0_8px_20px_rgba(17,17,17,0.02)]">
              <select name="district" className="min-w-[132px] border-r border-[#efe8de] px-4 py-3 text-[12px] text-[#51493f]">
                <option value="">지역 선택</option>
                <option value="강남">강남구</option>
                <option value="역삼">역삼동</option>
                <option value="청담">청담동</option>
              </select>
              <select name="style" className="min-w-[156px] border-r border-[#efe8de] px-4 py-3 text-[12px] text-[#51493f]">
                <option value="">시술/스타일 선택</option>
                <option value="레이어드컷">레이어드컷</option>
                <option value="허쉬컷">허쉬컷</option>
                <option value="다운펌">다운펌</option>
              </select>
              <select name="gender" className="min-w-[108px] border-r border-[#efe8de] px-4 py-3 text-[12px] text-[#51493f]">
                <option value="all">성별 선택</option>
                <option value="female">여성</option>
                <option value="male">남성</option>
              </select>
              <button type="submit" className="inline-flex h-[48px] w-[52px] items-center justify-center bg-[#111111] text-white">
                <Search className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {["레이어드컷", "다운펌", "탈색", "빌드펌", "허쉬컷"].map((tag) => (
                <Link
                  key={tag}
                  href={`${routes.designerSearch}?style=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-[#ddd4c8] bg-white px-3 py-1.5 text-[11px] text-[#6e655a]"
                >
                  # {tag}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden bg-[#fbfaf7] lg:min-h-[360px]">
            <Image
              src="/images/heroes/hero-home.png"
              alt="Hairfolio hero"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="object-cover object-[60%_18%]"
            />
          </div>

          <div className="space-y-3 pt-6">
            <article className="rounded-[16px] border border-[#e5ddd2] bg-white p-4 shadow-[0_8px_20px_rgba(17,17,17,0.02)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[15px] font-semibold tracking-[-0.03em] text-[#111111]">헤어모델 모집 중</h2>
                  <p className="mt-2 text-[11px] leading-[1.6] text-[#72695f]">
                    포트폴리오를 쌓고 있는
                    <br />
                    디자이너를 만나보세요.
                  </p>
                  <Link href={routes.models} className="mt-4 inline-block text-[11px] font-semibold text-[#111111]">
                    모델 지원하기 ›
                  </Link>
                </div>
                <div className="relative h-[84px] w-[110px] overflow-hidden rounded-[12px] bg-[#f2ebe2]">
                  <Image src="/images/models/model-01.png" alt="모델 모집" fill className="object-cover" sizes="110px" />
                </div>
              </div>
            </article>

            <article className="rounded-[16px] border border-[#e5ddd2] bg-white p-4 shadow-[0_8px_20px_rgba(17,17,17,0.02)]">
              <h2 className="text-[15px] font-semibold tracking-[-0.03em] text-[#111111]">오늘의 인기 스타일</h2>
              <p className="mt-1 text-[11px] leading-5 text-[#72695f]">지금 가장 많이 찾는 스타일을 확인해 보세요.</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {trendingStyles.slice(0, 4).map((style) => (
                  <div key={style.title} className="relative h-[58px] overflow-hidden rounded-[10px]">
                    <Image src={style.image} alt={style.title} fill className="object-cover" sizes="100px" />
                  </div>
                ))}
              </div>
              <Link href={routes.designerSearch} className="mt-4 inline-block text-[11px] font-medium text-[#111111]">
                더보기 ›
              </Link>
            </article>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="py-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-6">
              <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-[#111111]">내 주변 추천</h2>
              <span className="inline-flex items-center gap-1.5 text-[12px] text-[#8a8176]">
                <MapPin className="h-3.5 w-3.5" />
                강남구 역삼동 기준
              </span>
            </div>
            <div className="mt-3 flex items-center gap-5">
              <span className="border-b-2 border-[#111111] pb-2 text-[13px] font-semibold text-[#111111]">디자이너</span>
              <span className="pb-2 text-[13px] text-[#8a8176]">미용실</span>
            </div>
          </div>
          <Link href={routes.designers} className="text-[12px] text-[#6f675d]">
            더보기 ›
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
          {homeDesigners.map((designer) => (
            <HomeDesignerCard key={designer.id} designer={designer} />
          ))}
        </div>
      </PageContainer>

      <PageContainer className="pb-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-[#111111]">인기 스타일 TOP 6</h2>
          <Link href={routes.designerSearch} className="text-[12px] text-[#6f675d]">
            더보기 ›
          </Link>
        </div>
        <div className="grid gap-2 lg:grid-cols-3 xl:grid-cols-6">
          {trendingStyles.map((style) => (
            <StyleRankCard key={style.rank} rank={style.rank} title={style.title} subtitle={style.subtitle} image={style.image} />
          ))}
        </div>
      </PageContainer>

      <PageContainer className="pb-12">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-[#111111]">헤어 모델 모집</h2>
            <p className="mt-1 text-[14px] text-[#8a8176]">디자이너 준비생 포트폴리오 강화 프로젝트</p>
          </div>
          <Link href={routes.models} className="text-[14px] text-[#6f675d]">
            더보기 ›
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {recruitments.map((post) => {
            const aspiring = aspiringMap.get(post.aspiringDesignerId);
            if (!aspiring) return null;

            return (
              <div key={post.id} className="hf-surface overflow-hidden rounded-[24px] bg-white">
                <div className="grid gap-4 p-4 md:grid-cols-[160px_1fr]">
                  <div className="relative h-[170px] overflow-hidden rounded-[18px] bg-[#f0e8dd]">
                    <Image src={post.image} alt={post.title} fill className="object-cover" sizes="160px" />
                  </div>
                  <div>
                    <div className="text-[12px] text-[#8a8176]">{aspiring.name}</div>
                    <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.03em] text-[#111111]">{post.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#f3efe8] px-3 py-1 text-[12px] text-[#6f665b]">{post.condition}</span>
                      <span className="rounded-full bg-[#f3efe8] px-3 py-1 text-[12px] text-[#6f665b]">{post.priceLabel}</span>
                    </div>
                    <p className="mt-4 text-[13px] leading-6 text-[#6b6258]">
                      {post.date} · {post.location}
                    </p>
                    <div className="mt-5 flex gap-2">
                      <Link
                        href={`/auth/login?from=${encodeURIComponent(post.slug)}`}
                        className="rounded-xl bg-[#111111] px-5 py-3 text-[14px] font-semibold text-white"
                      >
                        지원하기
                      </Link>
                      <Link href={routes.models} className="rounded-xl border border-[#ddd4c8] px-5 py-3 text-[14px] font-semibold text-[#2b251f]">
                        더보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PageContainer>

      <PageContainer className="pb-16">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-[#111111]">인기 미용실</h2>
            <p className="mt-1 text-[14px] text-[#8a8176]">디자이너 비교가 쉬운 살롱</p>
          </div>
          <Link href={routes.salons} className="text-[14px] text-[#6f675d]">
            더보기 ›
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {salons.map((salon) => (
            <article key={salon.id} className="rounded-[24px] border border-[#e7dfd4] bg-white p-4 shadow-[0_12px_30px_rgba(17,17,17,0.03)]">
              <div className="relative h-[180px] overflow-hidden rounded-[18px] bg-[#efe8de]">
                <Image src={salon.image} alt={salon.name} fill className="object-cover" sizes="320px" />
              </div>
              <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.03em] text-[#111111]">{salon.name}</h3>
              <p className="mt-1 text-[13px] text-[#7a7268]">{salon.district}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {salon.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full bg-[#f3efe8] px-3 py-1 text-[12px] text-[#6f665b]">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
