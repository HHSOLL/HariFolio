import Image from "next/image";

interface ReferenceScreenProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function ReferenceScreen({ src, alt, width, height }: ReferenceScreenProps) {
  return (
    <section className="flex w-full justify-center bg-[#f3f3f3]">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        priority
        className="h-auto w-full"
        style={{ maxWidth: `${width}px` }}
      />
    </section>
  );
}
