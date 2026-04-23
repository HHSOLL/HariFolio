import Image from "next/image";
import Link from "next/link";
import { salonDetailRoute } from "@/lib/navigation";
import { Salon } from "@/lib/types";

interface SalonCardProps {
  salon: Salon;
}

export function SalonCard({ salon }: SalonCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#e2dbd2] bg-white shadow-[0_8px_22px_rgba(20,16,12,0.04)]">
      <div className="relative h-44">
        <Image src={salon.image} alt={salon.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 320px" />
      </div>
      <div className="p-4">
        <h3 className="text-[26px] font-semibold tracking-[-0.02em] text-[#111111]">{salon.name}</h3>
        <p className="mt-1 text-sm text-[#736b62]">{salon.district}</p>
        <p className="mt-2 text-sm text-[#5b554d]">
          ★ {salon.rating} ({salon.reviewCount.toLocaleString()})
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {salon.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-[#f1ece6] px-2.5 py-1 text-xs text-[#625a52]">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-[#8b8378]">{salon.priceRange}</span>
          <Link
            href={salonDetailRoute(salon.slug)}
            className="rounded-xl border border-[#d6cfc5] px-3 py-2 text-sm font-medium text-[#111111]"
          >
            상세보기
          </Link>
        </div>
      </div>
    </article>
  );
}
