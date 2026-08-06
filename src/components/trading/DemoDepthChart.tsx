import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useLocale } from "../../i18n/Locale";

type DepthPoint = { x: number; y: number };
type HoverDepth = { x: number; y: number; price: number; size: number; side: "bid" | "ask" };

const WIDTH = 1000;
const HEIGHT = 400;
const CENTER = WIDTH / 2;
const BASE_PRICE = 65_200;
const PRICE_RANGE = 900;

function steppedPath(points: DepthPoint[]) {
  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = points[index - 1];
    return `${path} L ${point.x} ${previous.y} L ${point.x} ${point.y}`;
  }, "");
}

export function DemoDepthChart() {
  const { t } = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<HoverDepth | null>(null);
  const formatPrice = (price: number, fractionDigits = 0) =>
    price.toLocaleString("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  const model = useMemo(() => {
    const bids = Array.from({ length: 34 }, (_, index) => {
      const progress = index / 33;
      return {
        x: progress * CENTER,
        y: 28 + progress * 340 + Math.sin(index * 1.7) * 7,
      };
    });
    const asks = Array.from({ length: 34 }, (_, index) => {
      const progress = index / 33;
      return {
        x: CENTER + progress * CENTER,
        y: 368 - progress * 330 + Math.cos(index * 1.47) * 8,
      };
    });
    const bidLine = steppedPath(bids);
    const askLine = steppedPath(asks);
    return {
      bids,
      asks,
      bidLine,
      askLine,
      bidArea: `${bidLine} L ${CENTER} ${HEIGHT} L 0 ${HEIGHT} Z`,
      askArea: `${askLine} L ${WIDTH} ${HEIGHT} L ${CENTER} ${HEIGHT} Z`,
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(WIDTH, ((event.clientX - bounds.left) / bounds.width) * WIDTH));
    const side = x < CENTER ? "bid" : "ask";
    const points = side === "bid" ? model.bids : model.asks;
    const localProgress = side === "bid" ? x / CENTER : (x - CENTER) / CENTER;
    const index = Math.max(0, Math.min(points.length - 1, Math.round(localProgress * (points.length - 1))));
    const point = points[index];
    const price = BASE_PRICE + ((x - CENTER) / CENTER) * PRICE_RANGE;
    const size = side === "bid" ? (1 - localProgress) * 720 : localProgress * 210;
    setHover({ x: point.x, y: point.y, price, size, side });
  };

  return (
    <div ref={rootRef} className="depth-chart" onPointerMove={handlePointerMove} onPointerLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" aria-label={t("depth")}>
        <g className="depth-chart__grid">
          {[0, 250, 500, 750, 1000].map((x) => <line key={`x-${x}`} x1={x} x2={x} y1="0" y2={HEIGHT} />)}
          {[0, 80, 160, 240, 320, 400].map((y) => <line key={`y-${y}`} x1="0" x2={WIDTH} y1={y} y2={y} />)}
        </g>
        <path className="depth-chart__area depth-chart__area--bid" d={model.bidArea} />
        <path className="depth-chart__area depth-chart__area--ask" d={model.askArea} />
        <path className="depth-chart__line depth-chart__line--bid" d={model.bidLine} />
        <path className="depth-chart__line depth-chart__line--ask" d={model.askLine} />
        {hover && (
          <g className={`depth-chart__crosshair depth-chart__crosshair--${hover.side}`}>
            <line x1={hover.x} x2={hover.x} y1="0" y2={HEIGHT} />
            <line x1="0" x2={WIDTH} y1={hover.y} y2={hover.y} />
            <circle cx={hover.x} cy={hover.y} r="5" />
          </g>
        )}
      </svg>
      <div className="depth-chart__axis">
        <span>$64,300</span><span>$64,750</span><span>$65,200</span><span>$65,650</span><span>$66,100</span>
      </div>
      {hover && (
        <>
          <span
            className={`depth-chart__price depth-chart__price--${hover.side}`}
            style={{ left: `clamp(4.8rem, ${hover.x / 10}%, calc(100% - 4.8rem))` }}
          >
            ${formatPrice(hover.price, 2)}
          </span>
          <span className={`depth-chart__size depth-chart__size--${hover.side}`} style={{ top: `${hover.y / 4}%` }}>{hover.size.toFixed(4)} BTC</span>
          <div
            className={`depth-chart__tooltip depth-chart__tooltip--${hover.side}`}
            style={{ left: `${hover.x / 10}%`, top: `${Math.max(12, Math.min(68, hover.y / 4))}%` }}
          >
            <strong>{hover.side === "bid" ? t("buyOrders") : t("sellOrders")}</strong>
            <dl>
              <div><dt>{t("price")}</dt><dd>{hover.side === "bid" ? "≥" : "≤"} ${formatPrice(hover.price)}</dd></div>
              <div><dt>{t("totalSize")}</dt><dd>{hover.size.toFixed(4)} BTC</dd></div>
              <div><dt>{t("totalValue")}</dt><dd>${Math.round(hover.size * hover.price).toLocaleString("en-US")}</dd></div>
              <div><dt>{t("priceImpact")}</dt><dd>{Math.abs((hover.price - BASE_PRICE) / BASE_PRICE * 100).toFixed(2)}%</dd></div>
            </dl>
          </div>
        </>
      )}
    </div>
  );
}
