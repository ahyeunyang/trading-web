import { useMemo, useState } from "react";
import { useLocale } from "../../i18n/Locale";
import { SelectMenu } from "../ui/SelectMenu";
import { markets, type Market } from "./MarketPanel";

type MarketsPageProps = {
  selectedMarket: Market;
  onSelectMarket: (market: Market) => void;
};

type SortValue = "volume" | "change" | "price";

function StarIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 2.9 2.78 5.63 6.22.91-4.5 4.38 1.06 6.19L12 17.08 6.44 20l1.06-6.18L3 9.44l6.22-.91L12 2.9Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MarketsPage({
  selectedMarket,
  onSelectMarket,
}: MarketsPageProps) {
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");
  const [sort, setSort] = useState<SortValue>("volume");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const categories = useMemo(
    () => [
      { value: "전체", label: t("all") },
      { value: "최근에 나열됨", label: t("recentlyListed") },
      { value: "시장 가능 신규", label: t("newMarkets") },
      { value: "밈", label: t("meme") },
      { value: "AI 및 빅 데이터", label: t("aiBigData") },
      { value: "DeFi", label: "DeFi" },
      { value: "레이어 1", label: t("layer1") },
      { value: "레이어 2", label: t("layer2") },
      { value: "RWA", label: "RWA" },
      { value: "게이밍", label: t("gaming") },
      { value: "외환", label: t("forex") },
    ],
    [t],
  );

  const toggleFavorite = (symbol: string) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(symbol)) next.delete(symbol);
      else next.add(symbol);
      return next;
    });
  };

  const filteredMarkets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return markets.filter((market) => {
      const matchesQuery = `${market.symbol} ${market.name}`
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesCategory =
        activeCategory === "전체" ||
        activeCategory === "최근에 나열됨" ||
        activeCategory === "시장 가능 신규" ||
        market.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [activeCategory, query]);

  const sortedMarkets = useMemo(() => {
    const clone = [...filteredMarkets];
    clone.sort((a, b) => {
      if (sort === "change") return b.change - a.change;
      if (sort === "price") {
        const parsePrice = (value: string) =>
          Number(value.replace(/[$,]/g, ""));
        return parsePrice(a.price) - parsePrice(b.price);
      }
      const parseVolume = (value: string) => {
        const amount = Number(value.replace(/[^\d.]/g, ""));
        if (value.includes("조")) return amount * 1_000_000_000_000;
        if (value.includes("억")) return amount * 100_000_000;
        if (value.includes("만")) return amount * 10_000;
        return amount;
      };
      return parseVolume(b.volume) - parseVolume(a.volume);
    });
    return clone;
  }, [filteredMarkets, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedMarkets.length / pageSize));
  const visibleMarkets = sortedMarkets.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const sortOptions: Array<{ value: SortValue; label: string }> = useMemo(
    () => [
      { value: "volume", label: t("volume") },
      { value: "change", label: t("change24h") },
      { value: "price", label: t("price") },
    ],
    [t],
  );

  return (
    <div className="markets-page">
      <div className="markets-page__container">
        <div className="markets-page__content" aria-label={t("markets")}>
          <div className="markets-page__controls">
            <label className="markets-page__search" htmlFor="market-search">
              <svg viewBox="0 0 12 15" fill="none" aria-hidden="true">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.5 6.5C10.5 8.98528 8.48528 11 6 11C3.51472 11 1.5 8.98528 1.5 6.5C1.5 4.01472 3.51472 2 6 2C8.48528 2 10.5 4.01472 10.5 6.5ZM12 6.5C12 9.81371 9.31371 12.5 6 12.5C5.0458 12.5 4.14363 12.2773 3.34264 11.8809L2.04742 14.0142C1.83245 14.3683 1.37116 14.4811 1.0171 14.2661C0.663032 14.0511 0.550271 13.5898 0.765239 13.2358L2.09105 11.0521C0.810824 9.95171 0 8.32054 0 6.5C0 3.18629 2.68629 0.5 6 0.5C9.31371 0.5 12 3.18629 12 6.5Z"
                />
              </svg>
              <input
                id="market-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("searchMarkets")}
              />
            </label>
            <SelectMenu<SortValue>
              value={sort}
              options={sortOptions}
              onChange={setSort}
              ariaLabel={t("sortMarkets")}
              className="markets-page__sort"
            />
          </div>

          <div
            className="markets-page__filters"
            role="tablist"
            aria-label={t("marketCategories")}
          >
            {categories.map((category) => (
              <button
                className={
                  activeCategory === category.value ? "is-active" : undefined
                }
                type="button"
                key={category.value}
                onClick={() => {
                  setActiveCategory(category.value);
                  setPage(1);
                }}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="markets-page__table">
            <div className="markets-page__head">
              <div></div>
              <div>{t("market")}</div>
              <div>{t("price")}</div>
              <div>{t("change24h")}</div>
              <div>{t("volume")}</div>
              <div>{t("spotVolume24h")}</div>
              <div>{t("marketCap")}</div>
            </div>
            <div className="markets-page__body">
              {sortedMarkets.length === 0 ? (
                <div className="markets-page__empty">{t("noMarkets")}</div>
              ) : (
                visibleMarkets.map((market) => {
                  const isActive = selectedMarket.symbol === market.symbol;
                  return (
                    <div
                      className={`markets-page__row${
                        isActive ? " is-selected" : ""
                      }`}
                      key={market.symbol}
                    >
                      <button
                        className={`markets-page__star${
                          favorites.has(market.symbol) ? " is-favorite" : ""
                        }`}
                        type="button"
                        aria-label={`${market.name} 즐겨찾기`}
                        onClick={() => toggleFavorite(market.symbol)}
                      >
                        <StarIcon active={favorites.has(market.symbol)} />
                      </button>
                      <button
                        className="markets-page__market"
                        type="button"
                        onClick={() => onSelectMarket(market)}
                      >
                        <img src={market.image} alt={`${market.symbol} logo`} />
                        <strong>{market.name}</strong>
                        <span>{market.leverage}</span>
                      </button>
                      <div className="markets-page__price">{market.price}</div>
                      <div
                        className={`markets-page__change${
                          market.change < 0 ? " is-negative" : " is-positive"
                        }`}
                      >
                        {market.change.toFixed(2)}%
                      </div>
                      <div>{market.volume}</div>
                      <div>{market.spotVolume}</div>
                      <div>{market.marketCap}</div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="markets-page__pagination">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          aria-label={t("previousPage")}
        >
          ‹
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1)
          .slice(0, 5)
          .map((num) => (
            <button
              type="button"
              key={num}
              className={page === num ? "is-active" : undefined}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ))}
        <button
          type="button"
          disabled={page === pageCount}
          onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          aria-label={t("nextPage")}
        >
          ›
        </button>
      </div>
    </div>
  );
}
