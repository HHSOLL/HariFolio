"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { setAuthSession } from "@/lib/local-storage";

type LoginRole = "general" | "designer";
type LoginMethod = "phone" | "email";

export function LoginRoleSplit() {
  const router = useRouter();
  const [role, setRole] = useState<LoginRole>("general");
  const [method, setMethod] = useState<LoginMethod>("phone");
  const [designerSlug, setDesignerSlug] = useState("jiyu");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (role === "designer") {
      setAuthSession({ role: "designer", designerSlug });
      router.push(`/mypage?mode=designer&designer=${designerSlug}`);
      return;
    }

    setAuthSession({ role: "general" });
    router.push("/mypage");
  };

  return (
    <section className="overflow-hidden rounded-[28px] border border-[#ddd6cb] bg-white shadow-[0_18px_30px_rgba(20,16,12,0.06)]">
      <div className="grid min-h-[740px] lg:grid-cols-[1fr_1fr]">
        <aside className="relative hidden lg:block">
          <Image src="/images/generated/gen-salon-01.png" alt="Hairfolio login visual" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent" />
          <div className="absolute bottom-10 left-8 right-8 text-white">
            <p className="text-2xl leading-9 font-medium">디자이너와 모델을 연결하는 프리미엄 헤어 플랫폼</p>
            <p className="mt-5 text-[58px] leading-none tracking-[-0.03em]">HairFolio</p>
          </div>
        </aside>

        <article className="bg-[#f6f3ee] p-6 lg:p-10">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-[56px] font-semibold tracking-[-0.04em] text-[#111111]">로그인</h1>
            <div className="rounded-full border border-[#d6cfc5] bg-white p-1">
              <button
                type="button"
                onClick={() => setRole("general")}
                className={[
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                  role === "general" ? "bg-[#111111] text-white" : "text-[#615a50]",
                ].join(" ")}
              >
                일반 로그인
              </button>
              <button
                type="button"
                onClick={() => setRole("designer")}
                className={[
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                  role === "designer" ? "bg-[#111111] text-white" : "text-[#615a50]",
                ].join(" ")}
              >
                디자이너 로그인
              </button>
            </div>
          </div>

          <p className="mt-2 text-[#6c645a]">
            {role === "designer"
              ? "디자이너 전용 계정으로 로그인하여 내 페이지를 커스텀하세요."
              : "Hairfolio 계정으로 로그인하여 디자이너 탐색과 예약을 이어가세요."}
          </p>

          <div className="mt-8 border-b border-[#ddd6cc]">
            <button
              type="button"
              onClick={() => setMethod("phone")}
              className={[
                "mr-6 border-b-2 px-2 pb-3 text-lg font-semibold transition",
                method === "phone" ? "border-[#111111] text-[#111111]" : "border-transparent text-[#7d756a]",
              ].join(" ")}
            >
              휴대폰 로그인
            </button>
            <button
              type="button"
              onClick={() => setMethod("email")}
              className={[
                "border-b-2 px-2 pb-3 text-lg font-semibold transition",
                method === "email" ? "border-[#111111] text-[#111111]" : "border-transparent text-[#7d756a]",
              ].join(" ")}
            >
              이메일 로그인
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {role === "designer" ? (
              <label className="block space-y-2">
                <span className="text-sm font-medium text-[#4e473e]">디자이너 계정</span>
                <select
                  value={designerSlug}
                  onChange={(event) => setDesignerSlug(event.target.value)}
                  className="w-full rounded-2xl border border-[#d9d2c8] bg-white px-4 py-3 text-[15px] text-[#111111]"
                >
                  <option value="jiyu">지유 디자이너</option>
                  <option value="minjun">민준 디자이너</option>
                  <option value="yerin">예린 디자이너</option>
                </select>
              </label>
            ) : null}

            {method === "phone" ? (
              <label className="block space-y-2">
                <span className="text-sm font-medium text-[#4e473e]">휴대폰 번호</span>
                <input
                  name="phone"
                  placeholder="휴대폰 번호를 입력해주세요"
                  className="w-full rounded-2xl border border-[#d9d2c8] bg-white px-4 py-3 text-[15px] text-[#111111] placeholder:text-[#a1988d]"
                />
              </label>
            ) : (
              <label className="block space-y-2">
                <span className="text-sm font-medium text-[#4e473e]">이메일</span>
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-[#d9d2c8] bg-white px-4 py-3 text-[15px] text-[#111111] placeholder:text-[#a1988d]"
                />
              </label>
            )}

            <label className="block space-y-2">
              <span className="text-sm font-medium text-[#4e473e]">비밀번호</span>
              <input
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                className="w-full rounded-2xl border border-[#d9d2c8] bg-white px-4 py-3 text-[15px] text-[#111111] placeholder:text-[#a1988d]"
              />
            </label>

            <div className="flex items-center justify-between text-sm text-[#6b635a]">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                로그인 상태 유지
              </label>
              <Link href="/auth/recover" className="underline underline-offset-4">
                비밀번호 찾기
              </Link>
            </div>

            <button type="submit" className="w-full rounded-2xl bg-[#111111] px-4 py-3.5 text-[22px] font-semibold text-white">
              {role === "designer" ? "디자이너 로그인" : "로그인"}
            </button>
          </form>

          <div className="mt-6">
            <div className="mb-4 text-center text-sm text-[#8a8176]">또는</div>
            <div className="grid gap-2 sm:grid-cols-3">
              <button type="button" className="rounded-2xl border border-[#ddd6cb] bg-white px-3 py-3 text-sm font-medium text-[#403930]">
                Apple로 로그인
              </button>
              <button type="button" className="rounded-2xl border border-[#ddd6cb] bg-white px-3 py-3 text-sm font-medium text-[#403930]">
                카카오 로그인
              </button>
              <button type="button" className="rounded-2xl border border-[#ddd6cb] bg-white px-3 py-3 text-sm font-medium text-[#403930]">
                네이버 로그인
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#ded7cd] bg-white px-4 py-3 text-sm text-[#5f584f]">
            안전한 서비스 이용을 위해 Hairfolio는 개인정보를 안전하게 보호합니다.
          </div>
        </article>
      </div>
    </section>
  );
}
