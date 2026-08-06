import { useEffect, useRef, useState, type ButtonHTMLAttributes } from "react";
import { CopyIcon } from "../icons/AccountMenuIcons";
import "./CopyButton.scss";

type CopyButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  value: string;
  label: string;
  resetDelay?: number;
};

export function CopyButton({ className = "", label, resetDelay = 1600, value, ...props }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setIsCopied(false);
        timerRef.current = null;
      }, resetDelay);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <button
      className={`copy-button${isCopied ? " is-copied" : ""}${className ? ` ${className}` : ""}`}
      type="button"
      aria-label={label}
      onClick={() => void copyValue()}
      {...props}
    >
      {isCopied ? (
        <svg viewBox="0 0 17 17" fill="none" aria-hidden="true">
          <path d="m3.5 8.7 3.1 3.1 6.9-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : <CopyIcon />}
    </button>
  );
}
