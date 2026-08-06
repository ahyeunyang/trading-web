import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./DangerButton.scss";

type DangerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function DangerButton({ children, className = "", ...props }: DangerButtonProps) {
  return (
    <button className={`danger-button${className ? ` ${className}` : ""}`} type="button" {...props}>
      {children}
    </button>
  );
}
