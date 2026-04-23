import Image from "next/image";
import { PortfolioItem } from "@/lib/types";

interface PortfolioGridProps {
  title: string;
  items: PortfolioItem[];
}

export function PortfolioGrid({ title, items }: PortfolioGridProps) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[24px] font-semibold tracking-[-0.03em] text-[#111111]">{title}</h3>
        <span className="text-[13px] text-[#7b7368]">더보기 ›</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-[18px] bg-[#f0ebe5]">
            <div className="relative h-[250px]">
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
