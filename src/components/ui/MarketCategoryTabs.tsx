import { useLocale } from "../../i18n/Locale";

export const MARKET_CATEGORIES = [
  "전체",
  "최근에 나열됨",
  "시장 가능 신규",
  "밈",
  "AI 및 빅 데이터",
  "DeFi",
  "DePIN",
  "레이어 1",
  "레이어 2",
  "RWA",
  "게이밍",
  "외환",
] as const;

type MarketCategory = (typeof MARKET_CATEGORIES)[number];

type MarketCategoryTabsProps = {
  activeCategory: string;
  onCategoryChange: (category: MarketCategory) => void;
  toggleLabel?: string;
  toggleValue?: boolean;
  onToggleChange?: () => void;
};

export function MarketCategoryTabs({
  activeCategory,
  onCategoryChange,
  toggleLabel,
  toggleValue,
  onToggleChange,
}: MarketCategoryTabsProps) {
  const { t } = useLocale();

  const categoryLabel = (category: MarketCategory) => {
    if (category === "전체") return t("all");
    if (category === "최근에 나열됨") return t("recentlyListed");
    if (category === "시장 가능 신규") return t("newMarkets");
    if (category === "밈") return t("meme");
    if (category === "AI 및 빅 데이터") return t("aiBigData");
    if (category === "레이어 1") return t("layer1");
    if (category === "레이어 2") return t("layer2");
    if (category === "게이밍") return t("gaming");
    if (category === "외환") return t("forex");
    return category;
  };

  return (
    <div className="market-category-tabs" role="tablist" aria-label={t("marketCategories")}>
      {toggleLabel && onToggleChange && (
        <div className="market-category-tabs__toggle-wrap">
          <span>{toggleLabel}</span>
          <button
            className={`market-category-tabs__toggle${toggleValue ? " is-on" : ""}`}
            type="button"
            role="switch"
            aria-checked={toggleValue}
            aria-label={toggleLabel}
            onClick={onToggleChange}
          >
            <i aria-hidden="true" />
          </button>
        </div>
      )}

      {MARKET_CATEGORIES.map((category) => {
        const label = categoryLabel(category);
        return (
          <button
            className={activeCategory === category ? "is-active" : undefined}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            key={category}
            onClick={() => onCategoryChange(category)}
          >
            {category === "시장 가능 신규" ? (
              <>
                {label}
                <small>{t("newBadge")}</small>
              </>
            ) : (
              label
            )}
          </button>
        );
      })}
    </div>
  );
}
