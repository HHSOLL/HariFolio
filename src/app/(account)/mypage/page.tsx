import { PageContainer } from "@/components/common/PageContainer";
import { DesignerModeGate } from "@/components/mypage/DesignerModeGate";
import { MyPageClient } from "@/components/mypage/MyPageClient";
import { getDefaultUserProfile, getDesigners } from "@/lib/queries";

interface MyPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function normalizeQuery(raw: Record<string, string | string[] | undefined>) {
  const normalized: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(raw)) {
    normalized[key] = Array.isArray(value) ? value[0] : value;
  }
  return normalized;
}

export default async function MyPage({ searchParams }: MyPageProps) {
  const rawQuery = await searchParams;
  const query = normalizeQuery(rawQuery);
  const mode = query.mode;
  const user = getDefaultUserProfile();
  const designers = getDesigners();

  if (mode === "designer") {
    return (
      <PageContainer className="py-8">
        <h1 className="text-[58px] font-semibold tracking-[-0.03em] text-[#111111]">디자이너 페이지 커스텀</h1>
        <p className="mt-2 text-xl text-[#6b645a]">저장하면 일반 사용자에게 보이는 디자이너 페이지에 반영됩니다.</p>
        <div className="mt-8">
          <DesignerModeGate designers={designers} requestedDesignerSlug={query.designer} />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-8">
      <h1 className="text-[58px] font-semibold tracking-[-0.03em] text-[#111111]">마이페이지</h1>
      <p className="mt-2 text-xl text-[#6b645a]">북마크, 최근 본 디자이너, 내 프로필을 관리하세요.</p>

      <div className="mt-8">
        <MyPageClient
          allDesigners={designers}
          defaultBookmarks={user.bookmarks}
          defaultViewed={user.viewedDesigners}
        />
      </div>
    </PageContainer>
  );
}
