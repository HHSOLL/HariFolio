import Image from "next/image";
import Link from "next/link";
import { Bookmark, CalendarDays, Globe, MapPin, Star } from "lucide-react";
import { salonDetailRoute } from "@/lib/navigation";
import { Salon } from "@/lib/types";

interface SalonCardProps {
  salon: Salon;
}

export function SalonCard({ salon }: SalonCardProps) {
  return (
    <article className="overflow-hidden rounded-[16px] border border-[#ebe4da] bg-white shadow-[0_8px_18px_rgba(17,17,17,0.02)]">
      <div className="relative h-[146px] bg-[#eee7de]">
        <Image src={salon.image} alt={salon.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 220px" />
        <div className="absolute left-2 top-2 inline-flex rounded-full bg-[#ead9c6] px-2 py-0.5 text-[9px] font-semibold text-[#6d5538]">
          {salon.reviewCount > 900 ? "TOP" : "NEW"}
        </div>
        <div className="absolute right-2 top-2 rounded-full bg-white/92 p-1.5 text-[#766d61]">
          <Bookmark className="h-3.5 w-3.5" />
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-[15px] font-semibold tracking-[-0.03em] text-[#111111]">{salon.name}</h3>
        <p className="mt-1 text-[10px] text-[#736b62]">{salon.district}</p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#5b554d]">
          <Star className="h-3 w-3 fill-current text-[#8b6136]" />
          {salon.rating} ({salon.reviewCount.toLocaleString()})
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {salon.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-[#f3efe9] px-2 py-1 text-[10px] text-[#625a52]">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] text-[#6e665d]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            {salon.address.includes("강남") ? "320m" : "820m"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Globe className="h-3 w-3" />
            WWW
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3" />
            리뷰 {salon.reviewCount}
          </span>
        </div>

        <Link href={salonDetailRoute(salon.slug)} className="sr-only">
          {salon.name} 상세보기
        </Link>
      </div>
    </article>
  );
}
