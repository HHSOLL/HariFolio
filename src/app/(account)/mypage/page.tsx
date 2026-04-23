import { PageContainer } from "@/components/common/PageContainer";
import { MyPageClient } from "@/components/mypage/MyPageClient";
import { getDefaultUserProfile, getDesigners } from "@/lib/queries";

export default function MyPage() {
  const user = getDefaultUserProfile();
  const designers = getDesigners();

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
