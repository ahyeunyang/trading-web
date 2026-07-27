import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { UnitBadge } from "../ui/UnitBadge";
import { useLocale } from "../../i18n/Locale";

type BookRow = { price: string; size: string; total: string; depth: number; hot?: boolean };

const asks: BookRow[] = [
  { price: "65,441", size: "0.6112", total: "1.4493", depth: 100, hot: true },
  { price: "65,440", size: "0.1842", total: "0.8381", depth: 58 },
  { price: "65,436", size: "0.0057", total: "0.6539", depth: 45 },
  { price: "65,434", size: "0.3056", total: "0.6482", depth: 45 },
  { price: "65,433", size: "0.0985", total: "0.3426", depth: 24 },
  { price: "65,431", size: "0.0058", total: "0.2441", depth: 17 },
  { price: "65,429", size: "0.1146", total: "0.2383", depth: 16 },
  { price: "65,426", size: "0.1146", total: "0.1237", depth: 9 },
  { price: "65,424", size: "0.0091", total: "0.0091", depth: 1 },
];
const additionalAsks: BookRow[] = [
  { price: "65,459", size: "0.1534", total: "2.1208", depth: 70 },
  { price: "65,455", size: "0.0451", total: "1.9674", depth: 67 },
  { price: "65,451", size: "0.2370", total: "1.9223", depth: 64 },
  { price: "65,448", size: "0.0821", total: "1.6853", depth: 59 },
  { price: "65,446", size: "0.0987", total: "1.6032", depth: 55 },
  { price: "65,443", size: "0.0552", total: "1.5045", depth: 52 },
];
const bids: BookRow[] = [
  { price: "65,423", size: "0.0093", total: "0.0093", depth: 1 },
  { price: "65,418", size: "0.1206", total: "0.1299", depth: 13 },
  { price: "65,412", size: "0.0116", total: "0.1415", depth: 14 },
  { price: "65,406", size: "0.0059", total: "0.1474", depth: 15 },
  { price: "65,405", size: "0.0250", total: "0.1724", depth: 17 },
  { price: "65,404", size: "0.0299", total: "0.2023", depth: 20 },
  { price: "65,403", size: "0.1000", total: "0.3023", depth: 30 },
  { price: "65,402", size: "0.1826", total: "0.4849", depth: 49, hot: true },
  { price: "65,401", size: "0.6116", total: "1.0965", depth: 100, hot: true },
];
const additionalBids: BookRow[] = [
  { price: "65,399", size: "0.0854", total: "1.1819", depth: 54 },
  { price: "65,396", size: "0.1228", total: "1.3047", depth: 59 },
  { price: "65,392", size: "0.0437", total: "1.3484", depth: 61 },
  { price: "65,389", size: "0.2175", total: "1.5659", depth: 69 },
  { price: "65,385", size: "0.0913", total: "1.6572", depth: 74 },
  { price: "65,381", size: "0.1564", total: "1.8136", depth: 83 },
];

type TradeRow = [string, string, string, "buy" | "sell", number];

const trades: TradeRow[] = [
  ["0.0010", "65607", "15:07:10", "sell", 7], ["0.0003", "65618", "15:07:08", "buy", 4],
  ["0.0005", "65622", "15:07:04", "buy", 5], ["0.0003", "65640", "15:06:59", "buy", 4],
  ["0.0001", "65646", "15:06:56", "sell", 3], ["0.0001", "65653", "15:06:38", "buy", 3],
  ["0.0003", "65658", "15:06:36", "buy", 5], ["0.0014", "65661", "15:06:34", "buy", 18],
  ["0.0128", "65656", "15:06:33", "buy", 36], ["0.0003", "65646", "15:06:29", "buy", 5],
  ["0.0029", "65653", "15:06:26", "buy", 22], ["0.0070", "65652", "15:06:26", "buy", 30],
  ["0.0001", "65641", "15:06:26", "sell", 3], ["0.1328", "65677", "15:06:25", "buy", 52],
  ["0.0250", "65672", "15:06:25", "buy", 42], ["0.0046", "65669", "15:06:25", "buy", 25],
  ["0.0081", "65669", "15:06:25", "buy", 31], ["0.3045", "65664", "15:06:25", "buy", 62],
  ["0.0250", "65663", "15:06:25", "buy", 41], ["0.0125", "65660", "15:06:24", "buy", 35],
  ["0.0014", "65660", "15:06:24", "buy", 17], ["0.0152", "65660", "15:06:23", "buy", 38],
  ["0.0014", "65660", "15:06:23", "buy", 16], ["0.0250", "65685", "15:06:20", "buy", 43],
];

function formatQuantity(value: string, price: string, unit: "BTC" | "USD") {
  return unit === "BTC" ? value : Math.round(Number(value) * Number(price.replace(",", ""))).toLocaleString("en-US");
}
function Rows({ data, side, quantityUnit }: { data: BookRow[]; side: "ask" | "bid"; quantityUnit: "BTC" | "USD" }) {
  return <div className={`book__rows book__rows--${side}`}>{data.map((row) => (
    <div className={`book__row${row.hot ? " is-hot" : ""}`} key={`${side}-${row.price}`} style={{ "--depth": `${row.depth}%` } as CSSProperties}>
      <span>{row.price}</span><span>{formatQuantity(row.size, row.price, quantityUnit)}</span><span>{formatQuantity(row.total, row.price, quantityUnit)}</span>
    </div>
  ))}</div>;
}

type OrderBookProps = {
  quantityUnit: "BTC" | "USD";
  onQuantityUnitChange: (unit: "BTC" | "USD") => void;
  isExpanded: boolean;
};

export function OrderBook({ quantityUnit, onQuantityUnitChange, isExpanded }: OrderBookProps) {
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState<"book" | "trades">("book");
  const [marketPrice, setMarketPrice] = useState(65_424);
  const [tradeRows, setTradeRows] = useState<TradeRow[]>(trades);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMarketPrice((price) => {
        const steps = [-4, -3, -2, -1, 1, 2, 3, 4];
        return Math.max(1, price + steps[Math.floor(Math.random() * steps.length)]);
      });
      setTradeRows((current) => {
        const previousPrice = Number(current[0][1]);
        const side = Math.random() > .46 ? "buy" : "sell";
        const price = Math.max(1, previousPrice + Math.round((Math.random() - .5) * 12));
        const size = (Math.random() ** 2 * .14 + .0001).toFixed(4);
        const time = new Date().toLocaleTimeString("en-GB", { hour12: false });
        const depth = Math.min(74, Math.max(3, Math.round(Number(size) * 420)));
        const nextTrade: TradeRow = [size, String(price), time, side, depth];
        return [nextTrade, ...current].slice(0, 28);
      });
    }, 1_800);
    return () => window.clearInterval(timer);
  }, []);

  const shiftedRows = (rows: BookRow[], offset: number) => rows.map((row) => {
    const size = Math.max(.0001, Number(row.size) * (.72 + Math.random() * .58));
    return {
      ...row,
      price: (Number(row.price.replace(",", "")) + offset).toLocaleString("en-US"),
      size: size.toFixed(4),
      depth: Math.min(100, Math.max(4, Math.round(row.depth * (.72 + Math.random() * .46)))),
      hot: Math.random() > .84,
    };
  });
  const { visibleAsks, visibleBids } = useMemo(() => {
    const offset = marketPrice - 65_424;
    return {
      visibleAsks: shiftedRows(isExpanded ? [...additionalAsks, ...asks] : asks, offset),
      visibleBids: shiftedRows(isExpanded ? [...bids, ...additionalBids] : bids, offset),
    };
  }, [isExpanded, marketPrice]);

  return (
    <section className={`panel book${activeTab === "trades" ? " is-trades" : ""}`} aria-labelledby="order-book-title">
      <header className="book__tabs">
        <button className={activeTab === "book" ? "is-active" : undefined} id="order-book-title" type="button" onClick={() => setActiveTab("book")}>{t("orderBook")}</button>
        <button className={activeTab === "trades" ? "is-active" : undefined} type="button" onClick={() => setActiveTab("trades")}>{t("trades")}</button>
      </header>

      {activeTab === "book" ? <>
        <div className="book__tools">
          <div><button type="button" aria-label="호가 단위 축소">−</button><i /><button type="button" aria-label="호가 단위 확대">＋</button><span>$1</span></div>
          <div>
            <button className={quantityUnit === "BTC" ? "is-active" : undefined} type="button" onClick={() => onQuantityUnitChange("BTC")}>BTC</button>
            <i />
            <button className={quantityUnit === "USD" ? "is-active" : undefined} type="button" onClick={() => onQuantityUnitChange("USD")}>USD</button>
          </div>
        </div>
        <div className="book__head" aria-hidden="true"><span>{t("price")} <UnitBadge className="book__unit">USD</UnitBadge></span><span>{t("size")} <UnitBadge className="book__unit">{quantityUnit}</UnitBadge></span><span>{t("total")} <UnitBadge className="book__unit">{quantityUnit}</UnitBadge></span></div>
        <div className="book__content">
          <Rows data={visibleAsks} side="ask" quantityUnit={quantityUnit} />
          <div className="book__spread"><span>{t("spread")}</span><strong>1</strong><span>0.00%</span></div>
          <Rows data={visibleBids} side="bid" quantityUnit={quantityUnit} />
        </div>
      </> : <>
        <div className="book__trade-head" aria-hidden="true"><span>{t("size")} <UnitBadge className="book__unit">BTC</UnitBadge></span><span>{t("price")} <UnitBadge className="book__unit">USD</UnitBadge></span><span>{t("time")}</span></div>
        <div className="book__trade-list">
          {tradeRows.map(([size, price, time, side, depth], index) => (
            <div className={`book__trade-row is-${side}`} key={`${time}-${index}`} style={{ "--trade-depth": `${depth}%` } as CSSProperties}>
              <strong>{size}</strong><span>${price}</span><time>{time}</time>
            </div>
          ))}
        </div>
      </>}
    </section>
  );
}
