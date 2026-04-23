"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Search } from "lucide-react";
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
      <div className="mx-auto flex h-[76px] w-full max-w-[1840px] items-center justify-between gap-6 px-8">
        <HairfolioLogo priority />

        <nav className="hidden items-center gap-10 lg:flex">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "pb-1 text-[16px] transition",
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
          <form className="flex h-12 items-center gap-2 rounded-full border border-[#d7d1c8] bg-white px-4">
            <input
              name="q"
              placeholder="디자이너, 스타일 검색"
              className="w-[230px] bg-transparent px-1 text-[14px] text-[#111111] placeholder:text-[#a8a39b] outline-none"
            />
            <button type="submit" formAction={routes.designerSearch} className="text-[#9b948b]" aria-label="검색">
              <Search className="h-5 w-5" />
            </button>
          </form>
          <Link href={`${routes.designerSearch}?district=강남`} className="inline-flex h-12 items-center gap-2 rounded-full border border-[#d7d1c8] bg-white px-4 text-[14px] font-medium text-[#222222]">
            <MapPin className="h-4 w-4 text-[#8c8479]" />
            내 주변
          </Link>
          <Link href={routes.mypage} className="inline-flex h-12 items-center rounded-full border border-[#d7d1c8] bg-white px-4 text-[14px] font-medium text-[#222222]">
            마이페이지
          </Link>
          <Link
            href={routes.login}
            className="inline-flex h-12 items-center rounded-full bg-[#111111] px-7 text-[14px] font-semibold text-white"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
