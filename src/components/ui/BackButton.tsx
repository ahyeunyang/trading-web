import type { ButtonHTMLAttributes } from "react";
import "./BackButton.scss";

type BackButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export function BackButton({ className = "", label, ...props }: BackButtonProps) {
  return (
    <button className={`back-button${className ? ` ${className}` : ""}`} type="button" aria-label={label} {...props}>
      <svg viewBox="0 0 11 19" fill="none" aria-hidden="true">
        <path d="M9.5 2 2.70711 8.79289a1 1 0 0 0 0 1.41421L9.5 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </button>
  );
}
