import Link from "next/link";

interface HairfolioLogoProps {
  href?: string;
  className?: string;
  priority?: boolean;
  tone?: "dark" | "light";
}

export function HairfolioLogo({
  href = "/",
  className = "",
  tone = "dark",
}: HairfolioLogoProps) {
  return (
    <Link href={href} aria-label="Hairfolio 홈" className={`inline-flex items-center py-1 ${className}`}>
      <span
        className={[
          "hf-title text-[30px] leading-none font-medium tracking-normal md:text-[34px]",
          tone === "light" ? "text-white" : "text-[#111111]",
        ].join(" ")}
      >
        Hairfolio
      </span>
    </Link>
  );
}
