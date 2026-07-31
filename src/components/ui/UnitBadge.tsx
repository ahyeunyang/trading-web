import type { ReactNode } from "react";

type UnitBadgeProps = {
  children: ReactNode;
  className?: string;
};

export function UnitBadge({ children, className = "" }: UnitBadgeProps) {
  return <b className={className}>{children}</b>;
}
