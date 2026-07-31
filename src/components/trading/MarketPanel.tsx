import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, MarketDown } from "../icons/ChevronDown";
import { Tooltip } from "../ui/Tooltip";
import { useLocale } from "../../i18n/Locale";
import avaxImage from "../../assets/images/coins/avax.png";
import algoImage from "../../assets/images/coins/algo.png";
import ayxxImage from "../../assets/images/coins/ayxx.png";
import bnbImage from "../../assets/images/coins/bnb.png";
import btcImage from "../../assets/images/coins/btc.png";
import dogeImage from "../../assets/images/coins/doge.png";
import ethImage from "../../assets/images/coins/eth.png";
import hypeImage from "../../assets/images/coins/hype.png";
import hbarImage from "../../assets/images/coins/hbar.png";
import linkImage from "../../assets/images/coins/link.png";
import nearImage from "../../assets/images/coins/near.png";
import paxgImage from "../../assets/images/coins/paxg.png";
import pepeImage from "../../assets/images/coins/pepe.png";
import shibImage from "../../assets/images/coins/shib.png";
import solImage from "../../assets/images/coins/sol.png";
import suiImage from "../../assets/images/coins/sui.png";
import taoImage from "../../assets/images/coins/tao.png";
import xrpImage from "../../assets/images/coins/xrp.png";
import uniImage from "../../assets/images/coins/uni.png";
import zecImage from "../../assets/images/coins/zec.png";

type MarketPanelProps = {
  quantityUnit: "BTC" | "USD";
  selected: Market;
  onSelect: (market: Market) => void;
};

export type Market = {
  symbol: string;
  name: string;
  leverage: string;
  price: string;
  change: number;
  volume: string;
  spotVolume: string;
  marketCap: string;
  color: string;
  category: string;
  image: string;
};

export const markets: Market[] = [
  { symbol: "BTC", name: "BTC-USD", leverage: "50×", price: "$65,247", change: 1.19, volume: "US$486만", spotVolume: "US$162억", marketCap: "US$1.31조", color: "#f7931a", category: "전체", image: btcImage },
  { symbol: "ETH", name: "ETH-USD", leverage: "50×", price: "$1,951.7", change: 3.58, volume: "US$246만", spotVolume: "US$80.5억", marketCap: "US$2360억", color: "#8d95a5", category: "레이어 1", image: ethImage },
  { symbol: "XRP", name: "XRP-USD", leverage: "10×", price: "$1.1056", change: .43, volume: "US$40.9만", spotVolume: "US$6.85억", marketCap: "US$692억", color: "#26333a", category: "레이어 1", image: xrpImage },
  { symbol: "SOL", name: "SOL-USD", leverage: "20×", price: "$76.22", change: 1.64, volume: "US$38.8만", spotVolume: "US$11.9억", marketCap: "US$445억", color: "#7e4bf5", category: "레이어 1", image: solImage },
  { symbol: "SHIB", name: "SHIB-USD", leverage: "10×", price: "$0.₅5082", change: -6.17, volume: "US$7.69만", spotVolume: "US$4.89억", marketCap: "US$30.1억", color: "#ef6d3c", category: "밈", image: shibImage },
  { symbol: "BNB", name: "BNB-USD", leverage: "10×", price: "$573.38", change: .55, volume: "US$4.86만", spotVolume: "US$8.21억", marketCap: "US$763억", color: "#f3ba2f", category: "레이어 1", image: bnbImage },
  { symbol: "HYPE", name: "HYPE-USD", leverage: "5×", price: "$0.189", change: 2.78, volume: "US$4.82만", spotVolume: "US$2.08억", marketCap: "US$153억", color: "#3fd6b1", category: "DeFi", image: hypeImage },
  { symbol: "DOGE", name: "DOGE-USD", leverage: "10×", price: "$0.07271", change: -.45, volume: "US$4.52만", spotVolume: "US$5.72억", marketCap: "US$113억", color: "#c9ad42", category: "밈", image: dogeImage },
  { symbol: "PEPE", name: "PEPE-USD", leverage: "10×", price: "$0.₅29523", change: 1.93, volume: "US$4.25만", spotVolume: "US$3.32억", marketCap: "US$12.2억", color: "#4a9a55", category: "밈", image: pepeImage },
  { symbol: "ZEC", name: "ZEC-USD", leverage: "5×", price: "$502.84", change: 2.95, volume: "US$3.21만", spotVolume: "US$3.34억", marketCap: "US$84.7억", color: "#ecb32b", category: "외환", image: zecImage },
  { symbol: "TAO", name: "TAO-USD", leverage: "5×", price: "$198.69", change: 1.22, volume: "US$2.33만", spotVolume: "US$1.05억", marketCap: "US$22.2억", color: "#ededed", category: "AI 및 빅 데이터", image: taoImage },
  { symbol: "PAXG", name: "PAXG-USD", leverage: "5×", price: "$4,081", change: .73, volume: "US$1.75만", spotVolume: "US$7910만", marketCap: "US$18.2억", color: "#e7cc22", category: "RWA", image: paxgImage },
  { symbol: "AVAX", name: "AVAX-USD", leverage: "10×", price: "$6.691", change: -.81, volume: "US$1.71만", spotVolume: "US$2.16억", marketCap: "US$28.9억", color: "#e84142", category: "레이어 1", image: avaxImage },
  { symbol: "LINK", name: "LINK-USD", leverage: "10×", price: "$8.42", change: 1.08, volume: "US$1.62만", spotVolume: "US$1.94억", marketCap: "US$58.1억", color: "#2a5ada", category: "DeFi", image: linkImage },
  { symbol: "HBAR", name: "HBAR-USD", leverage: "10×", price: "$0.0913", change: -.32, volume: "US$1.48만", spotVolume: "US$8520만", marketCap: "US$38.4억", color: "#101010", category: "레이어 1", image: hbarImage },
  { symbol: "ALGO", name: "ALGO-USD", leverage: "10×", price: "$0.1178", change: .76, volume: "US$1.31만", spotVolume: "US$6240만", marketCap: "US$10.4억", color: "#08ced2", category: "레이어 1", image: algoImage },
  { symbol: "SUI", name: "SUI-USD", leverage: "10×", price: "$1.49", change: 2.11, volume: "US$1.18만", spotVolume: "US$3.14억", marketCap: "US$54.2억", color: "#6fbcf0", category: "레이어 1", image: suiImage },
  { symbol: "NEAR", name: "NEAR-USD", leverage: "10×", price: "$1.23", change: -.18, volume: "US$9820", spotVolume: "US$7460만", marketCap: "US$15.8억", color: "#00ec97", category: "AI 및 빅 데이터", image: nearImage },
  { symbol: "UNI", name: "UNI-USD", leverage: "10×", price: "$5.37", change: 1.34, volume: "US$8740", spotVolume: "US$1.28억", marketCap: "US$32.1억", color: "#ff4dba", category: "DeFi", image: uniImage },
  { symbol: "AYXX", name: "AYXX-USD", leverage: "5×", price: "$0.63", change: .44, volume: "US$7610", spotVolume: "US$4380만", marketCap: "US$4.8억", color: "#6966ff", category: "DeFi", image: ayxxImage },
];

const categories = ["전체", "최근에 나열됨", "시장 가능 신규", "밈", "AI 및 빅 데이터", "DeFi", "DePIN", "레이어 1", "레이어 2", "RWA", "게이밍", "외환"];

function CoinMark({ market }: { market: Market }) {
  return <img src={market.image} alt={`${market.symbol} 로고`} />;
}

function StarIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2.9 2.78 5.63 6.22.91-4.5 4.38 1.06 6.19L12 17.08 6.44 20l1.06-6.18L3 9.44l6.22-.91L12 2.9Z" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function MarketPanel({ quantityUnit, selected, onSelect }: MarketPanelProps) {
  const { lang, t } = useLocale();
  const marketValue = (value: string) => {
    if (lang === "ko") return value;
    const amount = Number(value.replace(/[^\d.]/g, ""))
      * (value.includes("조") ? 1_000_000_000_000 : value.includes("억") ? 100_000_000 : value.includes("만") ? 10_000 : 1);
    const formats = {
      en: [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "K"]],
      ja: [[1e12, "兆"], [1e8, "億"], [1e4, "万"]],
      zh: [[1e12, "万亿"], [1e8, "亿"], [1e4, "万"]],
      vi: [[1e12, " nghìn tỷ"], [1e9, " tỷ"], [1e6, " triệu"], [1e3, " nghìn"]],
      fr: [[1e12, " Bn"], [1e9, " Md"], [1e6, " M"], [1e3, " k"]],
    } as const;
    const [divisor, suffix] = formats[lang].find(([threshold]) => amount >= threshold) ?? [1, ""];
    return `US$${Number((amount / divisor).toPrecision(3))}${suffix}`;
  };
  const categoryLabel = (item: string) => {
    if (item === "전체") return t("all");
    if (item === "최근에 나열됨") return t("recentlyListed");
    if (item === "시장 가능 신규") return t("newMarkets");
    if (item === "밈") return t("meme");
    if (item === "AI 및 빅 데이터") return t("aiBigData");
    if (item === "레이어 1") return t("layer1");
    if (item === "레이어 2") return t("layer2");
    if (item === "게이밍") return t("gaming");
    if (item === "외환") return t("forex");
    return item;
  };
  const rootRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [volumeSort, setVolumeSort] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const filteredMarkets = useMemo(() => markets.filter((market) => {
    const matchesQuery = `${market.symbol} ${market.name}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesCategory = category === "전체" || category === "최근에 나열됨" || category === "시장 가능 신규" || market.category === category;
    return matchesQuery && matchesCategory && (!favoritesOnly || favorites.has(market.symbol));
  }), [category, favorites, favoritesOnly, query]);
  const sortedMarkets = useMemo(() => [...filteredMarkets].sort((a, b) => {
    const volumeValue = (value: string) => {
      const amount = Number(value.replace(/[^\d.]/g, ""));
      if (value.includes("조")) return amount * 1_000_000_000_000;
      if (value.includes("억")) return amount * 100_000_000;
      if (value.includes("만")) return amount * 10_000;
      return amount;
    };
    return volumeSort === "asc"
      ? volumeValue(a.volume) - volumeValue(b.volume)
      : volumeValue(b.volume) - volumeValue(a.volume);
  }), [filteredMarkets, volumeSort]);
  const pageCount = Math.max(1, Math.ceil(sortedMarkets.length / pageSize));
  const visibleMarkets = sortedMarkets.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [category, favorites, favoritesOnly, pageSize, query]);

  const toggleFavorite = (symbol: string) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(symbol)) next.delete(symbol);
      else next.add(symbol);
      return next;
    });
  };

  return (
    <section ref={rootRef} className="panel market" aria-label="마켓 정보">
      <button className="market__select" type="button" aria-expanded={isOpen} onClick={() => setIsOpen((value) => !value)}>
        <span className="market__coin"><CoinMark market={selected} /></span>
        <span><strong>{selected.name}</strong></span>
        <MarketDown className="market__arrow" />
      </button>

      <dl className="stats">
        <div className="stats__price"><dt className="sr-only">현재 가격</dt><dd>{selected.price}</dd></div>
        <div><dt>{t("oraclePrice")}</dt><dd>{selected.price}</dd></div>
        <div><dt>{t("change24h")}</dt><dd className={selected.change < 0 ? "is-negative stats__change" : "is-positive stats__change"}>{selected.change.toFixed(2)}%</dd></div>
        <div><dt>{t("volume24h")}</dt><dd>{selected.volume}</dd></div>
        <div><dt>{t("trades24h")}</dt><dd>2,781</dd></div>
        <div><dt>{t("openInterest")}</dt><dd className="stats__unit">{quantityUnit === "BTC" ? "308.31" : "19,588,069"} <span>{quantityUnit}</span></dd></div>
        <div><dt>{t("funding1h")}</dt><dd className="is-positive"><Tooltip content={t("fundingAnnualized")}>0.00006%</Tooltip></dd></div>
        <div><dt>{t("nextFunding")}</dt><dd>41:10</dd></div>
        <div>
          <dt>
            <Tooltip
              title={t("maxLeverage")}
              content={t("maxLeverageTip")}
              tooltipClassName="hint__pop--wide"
            >
              {t("maxLeverage")}
            </Tooltip>
          </dt>
          <dd>50.00×</dd>
        </div>
      </dl>

      {isOpen && (
        <div className="market-picker">
          <label className="market-picker__search">
            <svg width="12" height="15" viewBox="0 0 12 15" fill="none" aria-hidden="true">
              <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M10.5 6.5C10.5 8.98528 8.48528 11 6 11C3.51472 11 1.5 8.98528 1.5 6.5C1.5 4.01472 3.51472 2 6 2C8.48528 2 10.5 4.01472 10.5 6.5ZM12 6.5C12 9.81371 9.31371 12.5 6 12.5C5.0458 12.5 4.14363 12.2773 3.34264 11.8809L2.04742 14.0142C1.83245 14.3683 1.37116 14.4811 1.0171 14.2661C0.663032 14.0511 0.550271 13.5898 0.765239 13.2358L2.09105 11.0521C0.810824 9.95171 0 8.32054 0 6.5C0 3.18629 2.68629 0.5 6 0.5C9.31371 0.5 12 3.18629 12 6.5Z" />
            </svg>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("searchPlaceholder")} autoFocus />
          </label>

          <div className="market-picker__filters">
            <span>{t("availableMarkets")}</span>
            <button className={`market-picker__toggle${favoritesOnly ? " is-on" : ""}`} type="button" role="switch" aria-checked={favoritesOnly} onClick={() => setFavoritesOnly((value) => !value)}><i /></button>
            {categories.map((item) => <button className={category === item ? "is-active" : undefined} type="button" key={item} onClick={() => setCategory(item)}>{categoryLabel(item)}</button>)}
          </div>

          <div className="market-picker__table">
            <div className="market-picker__head">
              <span>{t("market")}</span><span>{t("price")}</span><span>{t("change24h")}</span>
              <button className="market-picker__sort" type="button" onClick={() => setVolumeSort((value) => value === "desc" ? "asc" : "desc")}>
                <span>{t("volume")}</span>
                <i aria-hidden="true">
                  <svg className={volumeSort === "asc" ? "is-active" : undefined} width="6" height="9" viewBox="0 0 6 9" fill="none"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M.22 3.53A.75.75 0 0 1 .22 2.47L2.47.22a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V2.56l-.97.97a.75.75 0 0 1-1.06 0Z" /></svg>
                  <svg className={volumeSort === "desc" ? "is-active" : undefined} width="6" height="9" viewBox="0 0 6 9" fill="none"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M.22 3.53A.75.75 0 0 1 .22 2.47L2.47.22a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V2.56l-.97.97a.75.75 0 0 1-1.06 0Z" /></svg>
                </i>
              </button>
              <span>{t("spotVolume24h")}</span><span>{t("marketCap")}</span>
            </div>
            <div className="market-picker__body">
              {visibleMarkets.map((market) => (
                <div className={`market-picker__row${selected.symbol === market.symbol ? " is-selected" : ""}`} key={market.symbol}>
                  <button className={`market-picker__star${favorites.has(market.symbol) ? " is-favorite" : ""}`} type="button" aria-label={`${market.name} 즐겨찾기`} onClick={() => toggleFavorite(market.symbol)}><StarIcon active={favorites.has(market.symbol)} /></button>
                  <button className="market-picker__market" type="button" onClick={() => { onSelect(market); setIsOpen(false); }}>
                    <span className="market-picker__coin"><CoinMark market={market} /></span>
                    <strong>{market.name}</strong><small>{market.leverage}</small>
                  </button>
                  <strong>{market.price}</strong>
                  <strong className={market.change < 0 ? "is-negative" : "is-positive"}>{market.change.toFixed(2)}%</strong>
                  <strong>{marketValue(market.volume)}</strong><strong>{marketValue(market.spotVolume)}</strong><strong>{marketValue(market.marketCap)}</strong>
                </div>
              ))}
              {filteredMarkets.length === 0 && <p className="market-picker__empty">{t("noMarkets")}</p>}
            </div>
          </div>
          <div className="market-picker__footer">
            <span className="market-picker__count">
              {filteredMarkets.length} / {visibleMarkets.length} {t("showing")}
            </span>
            <nav className="market-picker__pagination" aria-label="시장 목록 페이지">
              <button type="button" aria-label={t("previousPage")} disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>‹</button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).slice(0, 4).map((number) => (
                <button className={page === number ? "is-active" : undefined} type="button" key={number} onClick={() => setPage(number)}>{number}</button>
              ))}
              <button type="button" aria-label={t("nextPage")} disabled={page === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>›</button>
            </nav>
            <div className="market-picker__page-size">
              <details>
                <summary>
                  <span>{pageSize}</span>
                  <ChevronDown />
                </summary>
                <div className="market-picker__page-size-menu">
                  {[5, 10, 15, 20, 50].map((size) => (
                    <button className={pageSize === size ? "is-active" : undefined} type="button" key={size} onClick={(event) => {
                      setPageSize(size);
                      event.currentTarget.closest("details")?.removeAttribute("open");
                    }}>
                      <span>{size}</span>
                      {pageSize === size && <i aria-hidden="true">✓</i>}
                    </button>
                  ))}
                </div>
              </details>
              <span>{t("view")}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
