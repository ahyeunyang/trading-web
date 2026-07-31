import { ChevronDown } from "../icons/ChevronDown";

export type SelectOption<T extends string> = {
  value: T;
  label: string;
};

type SelectMenuProps<T extends string> = {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  ariaLabel: string;
};

export function SelectMenu<T extends string>({ value, options, onChange, className = "", ariaLabel }: SelectMenuProps<T>) {
  const selected = options.find((option) => option.value === value) ?? options[0];

  return (
    <details className={`select-menu${className ? ` ${className}` : ""}`}>
      <summary aria-label={ariaLabel}>
        <span>{selected.label}</span>
        <ChevronDown />
      </summary>
      <div className="select-menu__options">
        {options.map((option) => (
          <button
            className={option.value === value ? "is-active" : undefined}
            type="button"
            key={option.value}
            onClick={(event) => {
              onChange(option.value);
              event.currentTarget.closest("details")?.removeAttribute("open");
            }}
          >
            <span>{option.label}</span>
            {option.value === value && <i aria-hidden="true">✓</i>}
          </button>
        ))}
      </div>
    </details>
  );
}
