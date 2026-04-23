import { AuthFormCard } from "@/components/auth/AuthFormCard";

export default function LoginPage() {
  return (
    <div className="py-8">
      <AuthFormCard
        title="로그인"
        description="북마크와 최근 본 디자이너를 동기화하세요."
        fields={[
          { label: "이메일", name: "email", type: "email", placeholder: "name@example.com" },
          { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호 입력" },
        ]}
        submitLabel="로그인"
        submitTo="/mypage"
        footerLinks={[
          { label: "회원가입", href: "/auth/signup" },
          { label: "비밀번호 찾기", href: "/auth/recover" },
        ]}
      />
    </div>
  );
}
