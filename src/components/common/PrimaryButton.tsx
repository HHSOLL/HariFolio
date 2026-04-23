import { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  className?: string;
}

export function PrimaryButton({ children, type = "button", className = "" }: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#333333] ${className}`}
    >
      {children}
    </button>
  );
}
