import { AuthFormCard } from "@/components/auth/AuthFormCard";

export default function SignupPage() {
  return (
    <div className="py-8">
      <AuthFormCard
        title="회원가입"
        description="Hairfolio에서 포트폴리오 기반으로 디자이너를 빠르게 비교해보세요."
        fields={[
          { label: "이름", name: "name", placeholder: "이름 입력" },
          { label: "이메일", name: "email", type: "email", placeholder: "name@example.com" },
          { label: "비밀번호", name: "password", type: "password", placeholder: "8자 이상 입력" },
        ]}
        submitLabel="회원가입"
        submitTo="/auth/login"
        footerLinks={[
          { label: "이미 계정이 있으신가요? 로그인", href: "/auth/login" },
          { label: "비밀번호 찾기", href: "/auth/recover" },
        ]}
      />
    </div>
  );
}
