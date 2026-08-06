import { useEffect, useMemo, useRef, useState } from "react";
import "./MarketsPage.scss";
import { useLocale, type Lang } from "../../i18n/Locale";
import { FavoriteStar } from "../ui/FavoriteStar";
import { MarketCategoryTabs } from "../ui/MarketCategoryTabs";
import { VolumeSortButton, type SortDirection } from "../ui/VolumeSortButton";
import { markets, type Market } from "./MarketPanel";

type MarketsPageProps = {
  selectedMarket: Market;
  onSelectMarket: (market: Market) => void;
  favorites: Set<string>;
  onToggleFavorite: (symbol: string) => void;
};

function formatMarketValue(value: string, lang: Lang) {
  if (value === "—" || lang === "ko") return value;

  const amount = Number(value.replace(/[^\d.]/g, ""))
    * (value.includes("조")
      ? 1_000_000_000_000
      : value.includes("억")
        ? 100_000_000
        : value.includes("만")
          ? 10_000
          : 1);
  const formats = {
    en: [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "K"]],
    ja: [[1e12, "兆"], [1e8, "億"], [1e4, "万"]],
    zh: [[1e12, "万亿"], [1e8, "亿"], [1e4, "万"]],
    vi: [[1e12, " nghìn tỷ"], [1e9, " tỷ"], [1e6, " triệu"], [1e3, " nghìn"]],
    fr: [[1e12, " Bn"], [1e9, " Md"], [1e6, " M"], [1e3, " k"]],
  } as const;
  const [divisor, suffix] = formats[lang].find(([threshold]) => amount >= threshold) ?? [1, ""];
  return `US$${Number((amount / divisor).toPrecision(3))}${suffix}`;
}

function marketSeed(symbol: string) {
  return [...symbol].reduce((seed, char) => seed + char.charCodeAt(0), 0);
}

function initialSparkline(symbol: string, change: number) {
  const seed = marketSeed(symbol);
  const trend = change / 24;
  const volatility = 1.1 + (seed % 7) * 0.24;
  let value = 48 + ((seed % 9) - 4);
  let momentum = 0;

  return Array.from({ length: 32 }, (_, index) => {
    const wave = Math.sin((index + seed) * 0.47) * volatility;
    const noise = (((seed * (index + 5) * 23) % 19) - 9) * 0.18 * volatility;
    const impulse = (index + seed) % 17 === 0 ? ((seed % 2 ? 1 : -1) * volatility * 3.8) : 0;
    momentum = momentum * 0.58 + wave * 0.24 + noise + trend;
    value = Math.max(7, Math.min(91, value + momentum + impulse));
    return value;
  });
}

function MarketSparkline({ symbol, change }: { symbol: string; change: number }) {
  const isPositive = change >= 0;
  const seed = useMemo(() => marketSeed(symbol), [symbol]);
  const tick = useRef(0);
  const momentum = useRef(0);
  const [values, setValues] = useState(() => initialSparkline(symbol, change));

  useEffect(() => {
    setValues(initialSparkline(symbol, change));
    tick.current = 0;
    momentum.current = 0;
  }, [change, symbol]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      tick.current += 1;
      setValues((current) => {
        const previous = current[current.length - 1];
        const volatility = 0.75 + (seed % 8) * 0.18;
        const wave = Math.sin((seed + tick.current) * 0.63) * volatility;
        const noise = (((seed + tick.current * 29) % 17) - 8) * 0.13 * volatility;
        const impulse = (seed + tick.current * 7) % 41 === 0
          ? (seed % 2 ? 1 : -1) * volatility * 5.2
          : 0;
        const centerPull = (50 - previous) * 0.012;
        momentum.current = momentum.current * 0.62 + wave * 0.22 + noise + centerPull;
        const next = Math.max(6, Math.min(94, previous + momentum.current + impulse));
        return [...current.slice(1), next];
      });
    }, 720 + (seed % 5) * 55);

    return () => window.clearInterval(timer);
  }, [seed]);

  const pointPairs = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 76 + 1;
      const y = 53 - (value / 100) * 50;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    });
  const points = pointPairs.join(" ");
  const [lastX, lastY] = pointPairs[pointPairs.length - 1].split(",").map(Number);

  return (
    <svg
      className={isPositive ? "is-positive" : "is-negative"}
      viewBox="0 0 78 56"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" />
      <circle className="markets-page__sparkline-tick" cx={lastX} cy={lastY} r="1.8" fill="currentColor" />
    </svg>
  );
}

function PaginationChevron({ next = false }: { next?: boolean }) {
  return (
    <svg
      className={next ? "is-next" : undefined}
      width="11"
      height="19"
      viewBox="0 0 11 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.5 2L2.70711 8.79289C2.31658 9.18342 2.31658 9.81658 2.70711 10.2071L9.5 17"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MarketsPage({
  selectedMarket,
  onSelectMarket,
  favorites,
  onToggleFavorite,
}: MarketsPageProps) {
  const { lang, t } = useLocale();
  const formatMessage = (template: string, values: Record<string, string | number>) =>
    Object.entries(values).reduce(
      (message, [key, value]) => message.replace(`{${key}}`, String(value)),
      template,
    );
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");
  const [showLaunchable, setShowLaunchable] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [volumeSort, setVolumeSort] = useState<SortDirection>("desc");

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
    const parseVolume = (value: string) => {
      const amount = Number(value.replace(/[^\d.]/g, ""));
      if (value.includes("조")) return amount * 1_000_000_000_000;
      if (value.includes("억")) return amount * 100_000_000;
      if (value.includes("만")) return amount * 10_000;
      return amount;
    };

    return [...filteredMarkets].sort((a, b) => {
      const favoriteDifference =
        Number(favorites.has(b.symbol)) - Number(favorites.has(a.symbol));
      const volumeDifference = volumeSort === "asc"
        ? parseVolume(a.volume) - parseVolume(b.volume)
        : parseVolume(b.volume) - parseVolume(a.volume);
      return favoriteDifference || volumeDifference;
    });
  }, [favorites, filteredMarkets, volumeSort]);

  const pageCount = Math.max(1, Math.ceil(sortedMarkets.length / pageSize));
  const paginationNumbers =
    pageCount <= 5
      ? Array.from({ length: pageCount }, (_, i) => i + 1)
      : [1, 2, 3, 4, pageCount];
  const visibleMarkets = sortedMarkets.slice(
    (page - 1) * pageSize,
    page * pageSize,
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
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder={t("searchMarkets")}
              />
            </label>
          </div>

          <MarketCategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={(category) => {
              setActiveCategory(category);
              setPage(1);
            }}
            toggleLabel={t("availableMarkets")}
            toggleValue={showLaunchable}
            onToggleChange={() => setShowLaunchable((current) => !current)}
          />

          <div className="markets-page__table">
            <div className="markets-page__head">
              <div>{t("market")}</div>
              <div>{t("oraclePrice")}</div>
              <div>{t("last24Hours")}</div>
              <div>{t("change24h")}</div>
              <VolumeSortButton
                className="markets-page__sort"
                label={t("volume24h")}
                direction={volumeSort}
                onToggle={() => setVolumeSort((value) => value === "desc" ? "asc" : "desc")}
              />
              <div>{t("spotVolume24h")}</div>
              <div>{t("marketCap")}</div>
              <div>{t("trades24h")}</div>
              <div>{t("openInterest")}</div>
              <div>{t("funding1h")}</div>
            </div>
            <div className="markets-page__body">
              {sortedMarkets.length === 0 ? (
                <div className="markets-page__empty">{t("noMarkets")}</div>
              ) : (
                visibleMarkets.map((market, index) => {
                  const isActive = selectedMarket.symbol === market.symbol;
                  const fundingRate = Math.max(
                    0.00001,
                    Math.abs(market.change) * 0.00004,
                  ).toFixed(5);
                  return (
                    <div
                      className={`markets-page__row${
                        isActive ? " is-selected" : ""
                      }`}
                      key={market.symbol}
                    >
                      <div className="markets-page__identity">
                        <button
                          className={`markets-page__star${
                            favorites.has(market.symbol) ? " is-favorite" : ""
                          }`}
                          type="button"
                          aria-label={`${market.name} ${t("favoriteMarket")}`}
                          onClick={() => {
                            onToggleFavorite(market.symbol);
                            setPage(1);
                          }}
                        >
                          <FavoriteStar active={favorites.has(market.symbol)} />
                        </button>
                        <button
                          className="markets-page__market"
                          type="button"
                          onClick={() => onSelectMarket(market)}
                        >
                          <img src={market.image} alt={`${market.symbol} logo`} />
                          <strong>{market.name.replace(/-USD$/, "")}</strong>
                          <span>{market.leverage}</span>
                        </button>
                      </div>
                      <div className="markets-page__price">{market.price}</div>
                      <div className="markets-page__sparkline">
                        <MarketSparkline symbol={market.symbol} change={market.change} />
                      </div>
                      <div
                        className={`markets-page__change${
                          market.change < 0 ? " is-negative" : " is-positive"
                        }`}
                      >
                        {market.change.toFixed(2)}%
                      </div>
                      <div>{formatMarketValue(market.volume, lang)}</div>
                      <div>{formatMarketValue(market.spotVolume, lang)}</div>
                      <div>{formatMarketValue(market.marketCap, lang)}</div>
                      <div>{index + 1}</div>
                      <div>{formatMarketValue(market.volume, lang)}</div>
                      <div className="markets-page__funding">{fundingRate}%</div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="markets-page__pagination">
          <div className="markets-page__page-summary">
            {formatMessage(t("marketCountSummary"), {
              total: sortedMarkets.length,
              end: Math.min(page * pageSize, sortedMarkets.length),
              start: sortedMarkets.length === 0 ? 0 : (page - 1) * pageSize + 1,
            })}
          </div>

          <div className="markets-page__pages">
            <button
              className="markets-page__page-arrow"
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label={t("previousPage")}
            >
              <PaginationChevron />
            </button>
            {paginationNumbers.map((num) => (
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
              className="markets-page__page-arrow"
              type="button"
              disabled={page === pageCount}
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              aria-label={t("nextPage")}
            >
              <PaginationChevron next />
            </button>
          </div>

          <label className="markets-page__page-size">
            <select
              value={pageSize}
              aria-label={t("marketsPerPage")}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>{t("view")}</span>
          </label>
          </div>
        </div>
      </div>
    </div>
  );
}
