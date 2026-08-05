import type { ReactNode } from "react";
import { Tooltip } from "./Tooltip";

type CheckboxFieldProps = {
  checked: boolean;
  className?: string;
  label: string;
  onChange: (checked: boolean) => void;
  tooltip?: ReactNode;
};

export function CheckboxField({ checked, className, label, onChange, tooltip }: CheckboxFieldProps) {
  return (
    <label className={`order__check${className ? ` ${className}` : ""}`}>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="order__checkbox" aria-hidden="true" />
      {tooltip
        ? <Tooltip portal title={label} content={tooltip} tooltipClassName="hint__pop--order-option">{label}</Tooltip>
        : <span>{label}</span>}
    </label>
  );
}
