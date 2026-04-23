"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { routes } from "@/lib/navigation";

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
    <header className="sticky top-0 z-20 border-b border-[#ece4d9] bg-[#f9f7f3]/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1248px] items-center justify-between gap-5 px-4 lg:px-5">
        <Link href="/" className="text-[28px] font-medium leading-none tracking-[-0.055em] text-[#111111]" aria-label="Hairfolio 홈">
          Hairfolio
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "pb-1 text-[11px] font-medium transition",
                isActive(pathname, item.href)
                  ? "border-b-2 border-[#111111] font-semibold text-[#111111]"
                  : "text-[#373737] hover:text-[#111111]",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <form className="flex items-center gap-2 rounded-full border border-[#ddd6cc] bg-white px-4 py-2">
            <Search className="h-3.5 w-3.5 text-[#8f867a]" />
            <input
              name="q"
              placeholder="디자이너, 스타일 검색"
              className="w-[140px] bg-transparent text-[11px] text-[#111111] placeholder:text-[#b3aa9f]"
            />
            <button type="submit" formAction={routes.designerSearch} className="sr-only">
              검색
            </button>
          </form>
          <Link
            href={`${routes.designerSearch}?district=강남`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#ddd6cc] bg-white px-3.5 py-2 text-[11px] font-medium text-[#222222]"
          >
            <MapPin className="h-3.5 w-3.5 text-[#70675d]" />
            내 주변
          </Link>
          <Link
            href={routes.login}
            className="inline-flex min-w-[56px] items-center justify-center rounded-full bg-[#111111] px-4 py-2 text-[11px] font-semibold text-white"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
