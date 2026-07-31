import { useLocale } from "../../i18n/Locale";

export type SortDirection = "asc" | "desc";

type VolumeSortButtonProps = {
  label: string;
  direction: SortDirection;
  onToggle: () => void;
  className?: string;
};

function SortArrow({ active, down = false }: { active: boolean; down?: boolean }) {
  return (
    <svg
      className={active ? "is-active" : undefined}
      width="6"
      height="9"
      viewBox="0 0 6 9"
      fill="none"
      style={down ? { transform: "rotate(180deg)" } : undefined}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.22 3.53A.75.75 0 0 1 .22 2.47L2.47.22a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V2.56l-.97.97a.75.75 0 0 1-1.06 0Z"
      />
    </svg>
  );
}

export function VolumeSortButton({
  label,
  direction,
  onToggle,
  className = "",
}: VolumeSortButtonProps) {
  const { t } = useLocale();

  return (
    <button
      className={`market-picker__sort ${className}`.trim()}
      type="button"
      onClick={onToggle}
      aria-label={`${label} ${direction === "desc" ? t("descending") : t("ascending")}`}
    >
      <span>{label}</span>
      <i aria-hidden="true">
        <SortArrow active={direction === "asc"} />
        <SortArrow active={direction === "desc"} down />
      </i>
    </button>
  );
}
