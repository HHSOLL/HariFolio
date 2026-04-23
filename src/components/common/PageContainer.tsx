import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return <div className={`mx-auto w-full max-w-[1360px] px-5 lg:px-8 ${className}`}>{children}</div>;
}
