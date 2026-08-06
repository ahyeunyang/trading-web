import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./LoadingButton.scss";

type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  loadingLabel?: string;
};

export function LoadingButton({
  children,
  className = "",
  disabled,
  isLoading = false,
  loadingLabel = "Loading",
  ...props
}: LoadingButtonProps) {
  return (
    <button
      className={`loading-button${isLoading ? " is-loading" : ""}${className ? ` ${className}` : ""}`}
      type="button"
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-live="polite"
      {...props}
    >
      {isLoading ? (
        <span className="loading-button__indicator" aria-label={loadingLabel}>
          <i /><i /><i />
        </span>
      ) : children}
    </button>
  );
}
