interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d9d4cd] bg-white p-10 text-center">
      <h3 className="text-xl font-semibold text-[#111111]">{title}</h3>
      <p className="mt-2 text-[#666666]">{description}</p>
    </div>
  );
}
