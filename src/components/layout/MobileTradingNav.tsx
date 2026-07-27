type MobileView = "chart" | "book" | "order";

type MobileTradingNavProps = {
  activeView: MobileView;
  onChange: (view: MobileView) => void;
};

const views: Array<{ id: MobileView; label: string }> = [
  { id: "chart", label: "Chart" },
  { id: "book", label: "Orderbook" },
  { id: "order", label: "Trade" },
];

export function MobileTradingNav({
  activeView,
  onChange,
}: MobileTradingNavProps) {
  return (
    <nav className="trade-nav" aria-label="트레이딩 화면">
      {views.map((view) => (
        <button
          className={activeView === view.id ? "is-active" : undefined}
          type="button"
          aria-pressed={activeView === view.id}
          onClick={() => onChange(view.id)}
          key={view.id}
        >
          {view.label}
        </button>
      ))}
    </nav>
  );
}
