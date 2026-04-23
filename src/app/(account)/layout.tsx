import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
