import Image from "next/image";
import { PortfolioItem } from "@/lib/types";

interface PortfolioGridProps {
  title: string;
  items: PortfolioItem[];
}

export function PortfolioGrid({ title, items }: PortfolioGridProps) {
  return (
    <section className="mt-10">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[32px] font-semibold tracking-[-0.02em] text-[#111111]">{title}</h3>
        <span className="text-sm text-[#7b7368]">더보기 ›</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-2xl border border-[#e2dbd1] bg-white">
            <div className="relative h-52">
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </div>
            <div className="p-3">
              <p className="text-sm text-[#8b8378]">{item.category}</p>
              <p className="mt-1 text-base font-medium text-[#111111]">{item.title}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
