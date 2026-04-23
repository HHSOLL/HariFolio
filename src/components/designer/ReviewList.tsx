import { Review } from "@/lib/types";

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <section className="mt-10 rounded-2xl border border-[#dfd8ce] bg-white p-6">
      <h3 className="text-[30px] font-semibold tracking-[-0.02em] text-[#111111]">리뷰</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-xl bg-[#f7f4ef] p-4">
            <p className="text-sm text-[#8b8378]">{review.date}</p>
            <p className="mt-2 text-base font-medium text-[#111111]">{review.author} · ★ {review.rating}</p>
            <p className="mt-2 text-sm leading-6 text-[#4b453e]">{review.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
