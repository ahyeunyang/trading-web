import { useEffect, useState } from "react";
import { TradingHeader } from "./components/layout/TradingHeader";
import { MobileTradingNav } from "./components/layout/MobileTradingNav";
import { StatusBar } from "./components/layout/StatusBar";
import { MarketPanel, markets } from "./components/trading/MarketPanel";
import { OrderBook } from "./components/trading/OrderBook";
import { OrderForm } from "./components/trading/OrderForm";
import { PositionsPanel } from "./components/trading/PositionsPanel";
import { TradeChart } from "./components/trading/TradeChart";
import { MarketsPage } from "./components/trading/MarketsPage";

export function App() {
  const [loading, setLoading] = useState(true);
  const [quantityUnit, setQuantityUnit] = useState<"BTC" | "USD">("BTC");
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isPositionsCollapsed, setIsPositionsCollapsed] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(markets[0]);
  const [mobileView, setMobileView] = useState<"chart" | "book" | "order">(
    "chart",
  );
  const [activePage, setActivePage] = useState<"trade" | "markets">("trade");

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`app${loading ? " is-loading" : ""}`} aria-busy={loading}>
      <TradingHeader
        onDepositClick={() => setIsDepositOpen(true)}
        activePage={activePage}
        onPageChange={setActivePage}
      />

      {activePage === "markets" ? (
        <MarketsPage
          selectedMarket={selectedMarket}
          onSelectMarket={setSelectedMarket}
        />
      ) : (
        <main
          className={`trade${isPositionsCollapsed ? " is-positions-collapsed" : ""}`}
          data-mobile-view={mobileView}
        >
          <MarketPanel
            quantityUnit={quantityUnit}
            selected={selectedMarket}
            onSelect={setSelectedMarket}
          />
          <MobileTradingNav activeView={mobileView} onChange={setMobileView} />
          <TradeChart market={selectedMarket} />
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
      )}
      <StatusBar />
    </div>
  );
}
