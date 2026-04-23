import { AuthFormCard } from "@/components/auth/AuthFormCard";

export default function RecoverPasswordPage() {
  return (
    <div className="py-8">
      <AuthFormCard
        title="비밀번호 찾기"
        description="가입한 이메일로 비밀번호 재설정 링크를 전송합니다."
        fields={[{ label: "이메일", name: "email", type: "email", placeholder: "name@example.com" }]}
        submitLabel="재설정 링크 보내기"
        submitTo="/auth/login"
        footerLinks={[
          { label: "로그인으로 돌아가기", href: "/auth/login" },
          { label: "회원가입", href: "/auth/signup" },
        ]}
      />
    </div>
  );
}
