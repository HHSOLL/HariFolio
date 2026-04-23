import Link from "next/link";
import { HairfolioLogo } from "@/components/layout/HairfolioLogo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f2ede6] p-6 lg:p-10">
      <div className="mx-auto mb-8 flex w-full max-w-6xl items-center justify-between gap-4">
        <HairfolioLogo priority />
        <div className="hidden items-center gap-3 text-sm text-[#5f584f] md:flex">
          <span>아직 Hairfolio 계정이 없으신가요?</span>
          <Link href="/auth/signup" className="rounded-xl border border-[#ded6cb] bg-white px-4 py-2 font-medium text-[#2d2720]">
            회원가입
          </Link>
        </div>
      </div>
      <main className="mx-auto w-full max-w-6xl">{children}</main>
    </div>
  );
}
