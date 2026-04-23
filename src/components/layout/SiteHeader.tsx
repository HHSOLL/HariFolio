"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/navigation";
import { HairfolioLogo } from "@/components/layout/HairfolioLogo";

const menuItems = [
  { label: "디자이너 찾기", href: routes.designers },
  { label: "미용실 찾기", href: routes.salons },
  { label: "헤어모델 모집", href: routes.models },
  { label: "스타일 가이드", href: routes.styleGuide },
  { label: "이벤트", href: routes.events },
];

function isActive(pathname: string, href: string) {
  if (href.startsWith("/search")) return false;
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-[#e6e1da] bg-[#f7f5f2]/95 backdrop-blur">
      <div className="mx-auto flex h-[74px] w-full max-w-[1360px] items-center justify-between gap-6 px-5 lg:px-8">
        <HairfolioLogo priority />

        <nav className="hidden items-center gap-7 lg:flex">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "pb-1 text-[15px] transition",
                isActive(pathname, item.href)
                  ? "border-b-2 border-[#111111] font-semibold text-[#111111]"
                  : "text-[#373737] hover:text-[#111111]",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <form className="flex items-center gap-2 rounded-full border border-[#d7d1c8] bg-white px-3 py-1.5">
            <input
              name="q"
              placeholder="디자이너, 스타일 검색"
              className="w-[168px] bg-transparent px-1 text-[13px] text-[#111111] placeholder:text-[#a8a39b] outline-none"
            />
            <button type="submit" formAction={routes.designerSearch} className="rounded-full bg-[#111111] px-3 py-1.5 text-[11px] font-semibold text-white">
              디자이너
            </button>
            <button type="submit" formAction={routes.salonSearch} className="rounded-full border border-[#d7d1c8] px-3 py-1.5 text-[11px] font-semibold text-[#3f3931]">
              미용실
            </button>
          </form>
          <Link href={`${routes.designerSearch}?district=강남`} className="rounded-full border border-[#d7d1c8] bg-white px-3.5 py-2 text-[13px] font-medium text-[#222222]">
            내 주변
          </Link>
          <Link href={routes.mypage} className="rounded-full border border-[#d7d1c8] bg-white px-3.5 py-2 text-[13px] font-medium text-[#222222]">
            마이페이지
          </Link>
          <Link
            href={routes.login}
            className="rounded-full bg-[#111111] px-5 py-2 text-[13px] font-semibold text-white"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
