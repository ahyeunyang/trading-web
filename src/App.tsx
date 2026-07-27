import { useEffect, useState } from "react";
import { TradingHeader } from "./components/layout/TradingHeader";
import { MobileTradingNav } from "./components/layout/MobileTradingNav";
import { StatusBar } from "./components/layout/StatusBar";
import { MarketPanel } from "./components/trading/MarketPanel";
import { OrderBook } from "./components/trading/OrderBook";
import { OrderForm } from "./components/trading/OrderForm";
import { PositionsPanel } from "./components/trading/PositionsPanel";
import { TradeChart } from "./components/trading/TradeChart";

export function App() {
  const [loading, setLoading] = useState(true);
  const [quantityUnit, setQuantityUnit] = useState<"BTC" | "USD">("BTC");
  const [mobileView, setMobileView] = useState<"chart" | "book" | "order">(
    "chart",
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`app${loading ? " is-loading" : ""}`} aria-busy={loading}>
      <TradingHeader />

      <main className="trade" data-mobile-view={mobileView}>
        <MarketPanel quantityUnit={quantityUnit} />
        <MobileTradingNav activeView={mobileView} onChange={setMobileView} />
        <TradeChart />
        <OrderBook quantityUnit={quantityUnit} onQuantityUnitChange={setQuantityUnit} />
        <OrderForm quantityUnit={quantityUnit} onQuantityUnitChange={setQuantityUnit} />
        <PositionsPanel />
      </main>
      <StatusBar />
    </div>
  );
}
