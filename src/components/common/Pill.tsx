import { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  active?: boolean;
}

export function Pill({ children, active }: PillProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-sm",
        active
          ? "border-[#111111] bg-[#111111] text-white"
          : "border-[#d9d4cd] bg-white text-[#555555]",
      ].join(" ")}
    >
      {children}
    </span>
  );
}
