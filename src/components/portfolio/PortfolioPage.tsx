import { useState, type SVGProps } from "react";

type SidebarIconProps = SVGProps<SVGSVGElement> & {
  kind: "overview" | "positions" | "orders" | "history" | "fees" | "tiers";
};

function SidebarIcon({ kind, ...props }: SidebarIconProps) {
  const paths = {
    overview: <><circle cx="8" cy="6" r="2" /><circle cx="5" cy="10" r="2" /><circle cx="11" cy="10" r="2" /></>,
    positions: <><path d="m3 6 5-3 5 3-5 3-5-3Z" /><path d="m3 9 5 3 5-3" /></>,
    orders: <><circle cx="8" cy="8" r="5" strokeDasharray="2 2" /></>,
    history: <><path d="M3 5v3h3" /><path d="M4 8a4 4 0 1 0 1-3" /><path d="M8 5v3l2 1" /></>,
    fees: <><rect x="4" y="3" width="8" height="10" rx="1" /><path d="M6 6h4M6 8h4M6 10h3" /></>,
    tiers: <><path d="M4 5h8M4 8h8M4 11h8" /></>,
  };

  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}>
      {paths[kind]}
    </svg>
  );
}

const accountItems = [
  { kind: "overview" as const, label: "개요" },
  { kind: "positions" as const, label: "포지션" },
  { kind: "orders" as const, label: "주문" },
  { kind: "history" as const, label: "내역" },
];

const otherItems = [
  { kind: "fees" as const, label: "수수료" },
  { kind: "tiers" as const, label: "자본 등급" },
];

export function PortfolioPage({ onDepositClick }: { onDepositClick: () => void }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <main className={`portfolio-page${isSidebarCollapsed ? " is-sidebar-collapsed" : ""}`}>
      <aside className="portfolio-sidebar" aria-label="포트폴리오 메뉴">
        {isSidebarCollapsed ? (
          <button
            className="portfolio-sidebar__expand"
            type="button"
            aria-label="메뉴 펼치기"
            onClick={() => setIsSidebarCollapsed(false)}
          >
            <span /><span /><span />
          </button>
        ) : (
          <>
            <div className="portfolio-sidebar__heading">
              <span>계정</span>
              <button type="button" onClick={() => setIsSidebarCollapsed(true)}>숨기기</button>
            </div>
            <nav className="portfolio-sidebar__nav">
              {accountItems.map((item, index) => (
                <button className={index === 0 ? "is-active" : undefined} type="button" key={item.label}>
                  <i><SidebarIcon kind={item.kind} /></i>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="portfolio-sidebar__section-title">기타</div>
            <nav className="portfolio-sidebar__nav">
              {otherItems.map((item) => (
                <button type="button" key={item.label}>
                  <i><SidebarIcon kind={item.kind} /></i>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            <button className="portfolio-sidebar__deposit" type="button" onClick={onDepositClick}>입금</button>
          </>
        )}
      </aside>
      <section className="portfolio-page__content" aria-label="포트폴리오 내용" />
    </main>
  );
}
