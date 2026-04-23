import Image from "next/image";
import Link from "next/link";

interface HairfolioLogoProps {
  href?: string;
  className?: string;
  priority?: boolean;
}

export function HairfolioLogo({ href = "/", className = "", priority = false }: HairfolioLogoProps) {
  return (
    <Link href={href} aria-label="Hairfolio 홈" className={className}>
      <Image
        src="/brand/hairfolio-logo.png"
        alt="Hairfolio"
        width={176}
        height={58}
        priority={priority}
        className="h-auto w-[132px] object-contain md:w-[164px]"
      />
    </Link>
  );
}
