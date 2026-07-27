import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "../icons/ChevronDown";
import { BitcoinIcon } from "../icons/BitcoinIcon";
import {
  FillsEmptyIcon,
  FundingEmptyIcon,
  OrdersEmptyIcon,
  PositionFilterIcon,
  PositionsEmptyIcon,
} from "../icons/PositionEmptyIcons";
import { useLocale } from "../../i18n/Locale";

type PositionTab = "positions" | "open-orders" | "fills" | "order-history" | "funding";

const tabs = [
  { id: "positions", label: "positions" },
  { id: "open-orders", label: "openOrders" },
  { id: "fills", label: "fills" },
  { id: "order-history", label: "orderHistory" },
  { id: "funding", label: "fundingPayments" },
] as const;

const emptyStates: Record<
  PositionTab,
  { icon: typeof PositionsEmptyIcon }
> = {
  positions: { icon: PositionsEmptyIcon },
  "open-orders": { icon: OrdersEmptyIcon },
  fills: { icon: FillsEmptyIcon },
  "order-history": { icon: OrdersEmptyIcon },
  funding: { icon: FundingEmptyIcon },
};
const emptyMessageKeys = {
  positions: "noPositions",
  "open-orders": "noOpenOrders",
  fills: "noFills",
  "order-history": "noOrderHistory",
  funding: "noFunding",
} as const;

type PositionsPanelProps = {
  isCollapsed: boolean;
  onCollapsedChange: (isCollapsed: boolean) => void;
};

export function PositionsPanel({
  isCollapsed,
  onCollapsedChange,
}: PositionsPanelProps) {
  const { t } = useLocale();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PositionTab>("positions");
  const [marketFilter, setMarketFilter] = useState<"all" | "BTC">("all");
  const [marginFilter, setMarginFilter] = useState<"all" | "cross" | "isolated">("all");
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFilterOpen) return;

    const closeFilter = (event: MouseEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) setIsFilterOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFilterOpen(false);
    };

    document.addEventListener("mousedown", closeFilter);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeFilter);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isFilterOpen]);

  useEffect(() => {
    if (isCollapsed) setIsFilterOpen(false);
  }, [isCollapsed]);

  const EmptyStateIcon = emptyStates[activeTab].icon;

  return (
    <section
      className={`panel pos${isCollapsed ? " is-collapsed" : ""}`}
      aria-labelledby="positions-title"
    >
      <header className="panel__header">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              className={activeTab === tab.id ? "is-active" : undefined}
              id={tab.id === "positions" ? "positions-title" : undefined}
              type="button"
              aria-pressed={activeTab === tab.id}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {t(tab.label)}
            </button>
          ))}
        </div>

        <div className="pos__controls">
          <div className="pos__filter" ref={filterRef}>
            <button
              className="pos__filter-trigger"
              type="button"
              aria-haspopup="menu"
              aria-expanded={!isCollapsed && isFilterOpen}
              onClick={() => {
                if (!isCollapsed) setIsFilterOpen((isOpen) => !isOpen);
              }}
            >
              <strong>{marketFilter === "all" ? t("all") : marketFilter}</strong>
              <span>{t("showing")}</span>
              <PositionFilterIcon />
            </button>

            {!isCollapsed && isFilterOpen && (
              <div className="pos__filter-menu" role="menu">
                <div>
                  <span>{t("view")}</span>
                  <button
                    className={marketFilter === "all" ? "is-active" : undefined}
                    type="button"
                    onClick={() => setMarketFilter("all")}
                  >
                    {t("all")}
                  </button>
                  <button
                    className={marketFilter === "BTC" ? "is-active" : undefined}
                    type="button"
                    onClick={() => setMarketFilter("BTC")}
                  >
                    <BitcoinIcon />
                    BTC
                  </button>
                </div>
                <div>
                  <span>{t("type")}</span>
                  <button
                    className={marginFilter === "all" ? "is-active" : undefined}
                    type="button"
                    onClick={() => setMarginFilter("all")}
                  >
                    {t("all")}
                  </button>
                  <button
                    className={marginFilter === "cross" ? "is-active" : undefined}
                    type="button"
                    onClick={() => setMarginFilter("cross")}
                  >
                    {t("cross")}
                  </button>
                  <button
                    className={marginFilter === "isolated" ? "is-active" : undefined}
                    type="button"
                    onClick={() => setMarginFilter("isolated")}
                  >
                    {t("isolated")}
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className="pos__collapse"
            type="button"
            aria-label={isCollapsed ? "포지션 패널 펼치기" : "포지션 패널 접기"}
            aria-expanded={!isCollapsed}
            onClick={() => onCollapsedChange(!isCollapsed)}
          >
            <ChevronDown />
          </button>
        </div>
      </header>
      {!isCollapsed && (
        <div className="empty empty--small">
          <EmptyStateIcon className="pos__icon" aria-hidden="true" />
          <p>{t(emptyMessageKeys[activeTab])}</p>
        </div>
      )}
    </section>
  );
}
