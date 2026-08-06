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
import { PortfolioPage } from "./components/portfolio/PortfolioPage";
import { MegaAyxxPage } from "./components/megaayxx/MegaAyxxPage";
import { TermsPage } from "./components/legal/TermsPage";
import { PrivacyPage } from "./components/legal/PrivacyPage";
import { DepositModal } from "./components/account/DepositModal";

export type AppPage = "trade" | "markets" | "portfolio" | "megaayxx" | "terms" | "privacy";

export function App() {
  const [loading, setLoading] = useState(true);
  const [quantityUnit, setQuantityUnit] = useState<"BTC" | "USD">("BTC");
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isPositionsCollapsed, setIsPositionsCollapsed] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(markets[0]);
  const [favoriteMarkets, setFavoriteMarkets] = useState<Set<string>>(new Set());
  const [mobileView, setMobileView] = useState<"chart" | "book" | "order">(
    "chart",
  );
  const [activePage, setActivePage] = useState<AppPage>("trade");

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleFavoriteMarket = (symbol: string) => {
    setFavoriteMarkets((current) => {
      const next = new Set(current);
      if (next.has(symbol)) next.delete(symbol);
      else next.add(symbol);
      return next;
    });
  };

  return (
    <div className={`app${loading ? " is-loading" : ""}`} aria-busy={loading}>
      <TradingHeader
        activePage={activePage}
        onPageChange={setActivePage}
      />

      {activePage === "markets" ? (
        <MarketsPage
          selectedMarket={selectedMarket}
          onSelectMarket={setSelectedMarket}
          favorites={favoriteMarkets}
          onToggleFavorite={toggleFavoriteMarket}
        />
      ) : activePage === "portfolio" ? (
        <PortfolioPage onDepositClick={() => setIsDepositOpen(true)} />
      ) : activePage === "megaayxx" ? (
        <MegaAyxxPage />
      ) : activePage === "terms" ? (
        <TermsPage />
      ) : activePage === "privacy" ? (
        <PrivacyPage />
      ) : (
        <main
          className={`trade${isPositionsCollapsed ? " is-positions-collapsed" : ""}`}
          data-mobile-view={mobileView}
        >
          <MarketPanel
            quantityUnit={quantityUnit}
            selected={selectedMarket}
            onSelect={setSelectedMarket}
            favorites={favoriteMarkets}
            onToggleFavorite={toggleFavoriteMarket}
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
            onDepositClick={() => setIsDepositOpen(true)}
          />
          <PositionsPanel
            isCollapsed={isPositionsCollapsed}
            onCollapsedChange={setIsPositionsCollapsed}
          />
        </main>
      )}
      {isDepositOpen && <DepositModal onClose={() => setIsDepositOpen(false)} />}
      <StatusBar />
    </div>
  );
}
