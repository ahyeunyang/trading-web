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
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isPositionsCollapsed, setIsPositionsCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState<"chart" | "book" | "order">(
    "chart",
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`app${loading ? " is-loading" : ""}`} aria-busy={loading}>
      <TradingHeader onDepositClick={() => setIsDepositOpen(true)} />

      <main
        className={`trade${isPositionsCollapsed ? " is-positions-collapsed" : ""}`}
        data-mobile-view={mobileView}
      >
        <MarketPanel quantityUnit={quantityUnit} />
        <MobileTradingNav activeView={mobileView} onChange={setMobileView} />
        <TradeChart />
        <OrderBook
          quantityUnit={quantityUnit}
          onQuantityUnitChange={setQuantityUnit}
          isExpanded={isPositionsCollapsed}
        />
        <OrderForm
          quantityUnit={quantityUnit}
          onQuantityUnitChange={setQuantityUnit}
          isDepositOpen={isDepositOpen}
          onDepositOpenChange={setIsDepositOpen}
        />
        <PositionsPanel
          isCollapsed={isPositionsCollapsed}
          onCollapsedChange={setIsPositionsCollapsed}
        />
      </main>
      <StatusBar />
    </div>
  );
}
