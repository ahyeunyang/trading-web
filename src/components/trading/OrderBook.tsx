import { useState } from "react";
import type { CSSProperties } from "react";

type BookRow = {
  price: string;
  size: string;
  total: string;
  depth: number;
  hot?: boolean;
};

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

function Unit({ children }: { children: string }) {
  return <b className="book__unit">{children}</b>;
}

function Rows({ data, side }: { data: BookRow[]; side: "ask" | "bid" }) {
  return (
    <div className={`book__rows book__rows--${side}`}>
      {data.map((row) => (
        <div
          className={`book__row${row.hot ? " is-hot" : ""}`}
          key={`${side}-${row.price}`}
          style={{ "--depth": `${row.depth}%` } as CSSProperties}
        >
          <span>{row.price}</span>
          <span>{row.size}</span>
          <span>{row.total}</span>
        </div>
      ))}
    </div>
  );
}

export function OrderBook() {
  const [quantityUnit, setQuantityUnit] = useState<"BTC" | "USD">("BTC");

  return (
    <section className="panel book" aria-labelledby="order-book-title">
      <header className="book__tabs">
        <button className="is-active" id="order-book-title" type="button">호가창</button>
        <button type="button">거래</button>
      </header>

      <div className="book__tools">
        <div>
          <button type="button" aria-label="호가 단위 축소">−</button>
          <i />
          <button type="button" aria-label="호가 단위 확대">＋</button>
          <span>$1</span>
        </div>
        <div>
          <button
            className={quantityUnit === "BTC" ? "is-active" : undefined}
            type="button"
            aria-pressed={quantityUnit === "BTC"}
            onClick={() => setQuantityUnit("BTC")}
          >
            BTC
          </button>
          <i />
          <button
            className={quantityUnit === "USD" ? "is-active" : undefined}
            type="button"
            aria-pressed={quantityUnit === "USD"}
            onClick={() => setQuantityUnit("USD")}
          >
            USD
          </button>
        </div>
      </div>

      <div className="book__head" aria-hidden="true">
        <span>가격 <Unit>USD</Unit></span>
        <span>규모 <Unit>{quantityUnit}</Unit></span>
        <span>총 <Unit>{quantityUnit}</Unit></span>
      </div>

      <div className="book__content">
        <Rows data={asks} side="ask" />
        <div className="book__spread">
          <span>스프레드</span>
          <strong>1</strong>
          <span>0.00%</span>
        </div>
        <Rows data={bids} side="bid" />
      </div>
    </section>
  );
}
