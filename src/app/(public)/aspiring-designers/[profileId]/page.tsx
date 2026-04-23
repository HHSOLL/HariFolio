import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/common/PageContainer";
import { PortfolioGrid } from "@/components/designer/PortfolioGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RecruitmentCard } from "@/components/recruitment/RecruitmentCard";
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
  const recruitments = getRecruitmentsByAspiringDesigner(aspiring.id);

  return (
    <PageContainer className="py-8">
      <Breadcrumbs
        items={[
          { label: "헤어모델 모집", href: "/models" },
          { label: aspiring.name },
        ]}
      />

      <section className="overflow-hidden rounded-[28px] border border-[#ddd6cb] bg-[#e8dfd3]">
        <div className="grid gap-6 p-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full bg-[#d7c2a4] px-3 py-1 text-sm text-[#5f4a37]">디자이너 준비생</span>
            <h1 className="mt-4 text-[56px] font-semibold tracking-[-0.03em] text-[#111111]">{aspiring.name}</h1>
            <p className="mt-2 text-xl text-[#4f493f]">{aspiring.bio}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {aspiring.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/80 px-3 py-1 text-sm text-[#5d554c]">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-3 rounded-2xl border border-[#d7cfc4] bg-white/70 p-4 sm:grid-cols-2 xl:grid-cols-4">
              <article>
                <p className="text-sm text-[#7a7268]">누적 좋아요</p>
                <p className="text-[30px] font-semibold text-[#111111]">{aspiring.stats.likes.toLocaleString()}</p>
              </article>
              <article>
                <p className="text-sm text-[#7a7268]">포트폴리오</p>
                <p className="text-[30px] font-semibold text-[#111111]">{aspiring.stats.portfolioCount}</p>
              </article>
              <article>
                <p className="text-sm text-[#7a7268]">리뷰 평점</p>
                <p className="text-[30px] font-semibold text-[#111111]">{aspiring.stats.rating}</p>
              </article>
              <article>
                <p className="text-sm text-[#7a7268]">활동 기간</p>
                <p className="text-[30px] font-semibold text-[#111111]">{aspiring.stats.monthsActive}개월</p>
              </article>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/models" className="rounded-xl bg-[#111111] px-6 py-3 text-sm font-semibold text-white">
                헤어모델 모집하기
              </Link>
              <Link
                href="/auth/login"
                className="rounded-xl border border-[#ccc4ba] bg-white px-6 py-3 text-sm font-semibold text-[#3f3932]"
              >
                프로필 편집
              </Link>
            </div>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-3xl bg-[#d4c9bb]">
            <Image src={aspiring.heroImage} alt={aspiring.name} fill className="object-cover object-top" priority />
          </div>
        </div>
      </section>

      <PortfolioGrid title="포트폴리오" items={portfolio} />

      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[34px] font-semibold tracking-[-0.02em] text-[#111111]">모델 모집글</h2>
          <span className="text-sm text-[#7b7368]">총 {recruitments.length}건</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recruitments.map((post) => (
            <RecruitmentCard
              key={post.id}
              post={post}
              aspiringSlug={aspiring.slug}
              aspiringName={aspiring.name}
            />
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-[#ddd6cb] bg-white p-6">
        <h2 className="text-[34px] font-semibold tracking-[-0.02em] text-[#111111]">소셜 링크</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {aspiring.socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              className="rounded-xl border border-[#d7d0c6] px-4 py-2 text-sm text-[#3f3932]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
