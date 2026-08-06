import type { ButtonHTMLAttributes } from "react";
import "./ToggleSwitch.scss";

type ToggleSwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function ToggleSwitch({ checked, className = "", onChange, ...props }: ToggleSwitchProps) {
  return (
    <button
      className={`toggle-switch${checked ? " is-checked" : ""}${className ? ` ${className}` : ""}`}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      {...props}
    >
      <span />
    </button>
  );
}
