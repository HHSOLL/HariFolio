import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f2ede6] p-6 lg:p-10">
      <div className="mx-auto mb-8 w-full max-w-6xl">
        <Link href="/" className="hf-title text-[48px] tracking-[-0.03em] text-[#111111]">
          Hairfolio
        </Link>
      </div>
      <main className="mx-auto w-full max-w-6xl">{children}</main>
    </div>
  );
}
