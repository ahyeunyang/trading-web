import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

export type DemoCandle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};
type Candle = DemoCandle;
type Crosshair = { x: number; y: number; price: number; index: number };

const DEFAULT_CHART_WIDTH = 1000;
const CHART_HEIGHT = 420;
const PRICE_WIDTH = 74;
const VOLUME_HEIGHT = 72;

const pricePath = [
  [0, 75_200],
  [8, 73_400],
  [14, 61_100],
  [22, 64_600],
  [29, 66_400],
  [36, 62_400],
  [43, 59_100],
  [50, 63_700],
  [57, 64_900],
  [64, 64_100],
  [71, 65_228],
] as const;

function targetPrice(index: number) {
  const nextAnchor = pricePath.findIndex(([anchor]) => anchor >= index);
  if (nextAnchor <= 0) return pricePath[0][1];
  const [rightIndex, rightPrice] = pricePath[nextAnchor];
  const [leftIndex, leftPrice] = pricePath[nextAnchor - 1];
  const progress = (index - leftIndex) / (rightIndex - leftIndex);
  return leftPrice + (rightPrice - leftPrice) * progress;
}

function makeCandles(count = 72): Candle[] {
  let price: number = pricePath[0][1];
  return Array.from({ length: count }, (_, index) => {
    const open = price;
    const noise = Math.sin(index * 2.17) * 260 + Math.cos(index * .83) * 120;
    const close = targetPrice(index) + noise;
    const high = Math.max(open, close) + 130 + Math.abs(Math.sin(index * 1.7)) * 420;
    const low = Math.min(open, close) - 130 - Math.abs(Math.cos(index * 1.3)) * 420;
    price = close;
    const movement = Math.abs(close - open);
    return {
      time: Date.now() - (count - index) * 12 * 60 * 60 * 1000,
      open,
      high,
      low,
      close,
      volume: 18 + movement * .12 + (index % 7) * 7,
    };
  });
}

function priceLabel(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

export function DemoCandlestickChart({
  showOrderLine,
  showTrades,
  onHoverCandle,
}: {
  showOrderLine: boolean;
  showTrades: boolean;
  onHoverCandle?: (candle: DemoCandle | null) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(DEFAULT_CHART_WIDTH);
  const [candles, setCandles] = useState<Candle[]>(makeCandles);
  const [ticks, setTicks] = useState(0);
  const [crosshair, setCrosshair] = useState<Crosshair | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTicks((value) => value + 1);
      setCandles((current) => {
        const next = [...current];
        const last = { ...next[next.length - 1] };
        const movement = (Math.random() - .48) * 42;
        last.close = Math.max(1, last.close + movement);
        last.high = Math.max(last.high, last.close);
        last.low = Math.min(last.low, last.close);
        last.volume += Math.abs(movement) * .35;
        next[next.length - 1] = last;

        if ((ticks + 1) % 8 === 0) {
          next.push({
            time: Date.now(),
            open: last.close,
            high: last.close + 18,
            low: last.close - 18,
            close: last.close,
            volume: 12,
          });
          next.shift();
        }
        return next;
      });
    }, 1_200);
    return () => window.clearInterval(timer);
  }, [ticks]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setChartWidth(CHART_HEIGHT * (width / height));
    });
    resize.observe(root);
    return () => resize.disconnect();
  }, []);

  const model = useMemo(() => {
    const plotWidth = chartWidth - PRICE_WIDTH;
    const priceHeight = CHART_HEIGHT - VOLUME_HEIGHT;
    const high = Math.max(...candles.map((candle) => candle.high));
    const low = Math.min(...candles.map((candle) => candle.low));
    const range = Math.max(1, high - low);
    const maxVolume = Math.max(...candles.map((candle) => candle.volume));
    const step = plotWidth / candles.length;
    const y = (price: number) => 14 + ((high - price) / range) * (priceHeight - 28);
    return { plotWidth, priceHeight, high, low, range, maxVolume, step, y };
  }, [candles, chartWidth]);

  const last = candles[candles.length - 1];
  const gridPrices = Array.from({ length: 6 }, (_, index) => model.high - (model.range / 5) * index);
  const timeMarks = [0, 18, 36, 54, 71];
  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.min(model.plotWidth, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * chartWidth));
    const y = Math.min(model.priceHeight, Math.max(14, ((event.clientY - bounds.top) / bounds.height) * CHART_HEIGHT));
    const index = Math.min(candles.length - 1, Math.max(0, Math.floor(x / model.step)));
    const price = model.high - ((y - 14) / (model.priceHeight - 28)) * model.range;
    setCrosshair({ x, y, price, index });
    onHoverCandle?.(candles[index]);
  };
  const clearCrosshair = () => {
    setCrosshair(null);
    onHoverCandle?.(null);
  };

  return (
    <div ref={rootRef} className="demo-chart">
      <svg
        viewBox={`0 0 ${chartWidth} ${CHART_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="BTC-USD demo candlestick chart"
        onPointerMove={handlePointerMove}
        onPointerLeave={clearCrosshair}
      >
        <g className="demo-chart__grid">
          {gridPrices.map((price) => {
            const y = model.y(price);
            return <line key={price} x1="0" x2={model.plotWidth} y1={y} y2={y} />;
          })}
          {timeMarks.map((index) => {
            const x = (index + .5) * model.step;
            return <line key={index} x1={x} x2={x} y1="0" y2={CHART_HEIGHT} />;
          })}
        </g>
        <line className="demo-chart__axis-line" x1={model.plotWidth} x2={model.plotWidth} y1="0" y2={CHART_HEIGHT} />
        <line className="demo-chart__axis-line" x1="0" x2={model.plotWidth} y1={CHART_HEIGHT - 20} y2={CHART_HEIGHT - 20} />

        <g className="demo-chart__volume">
          {candles.map((candle, index) => {
            const height = (candle.volume / model.maxVolume) * (VOLUME_HEIGHT - 14);
            const x = index * model.step + model.step * .2;
            return <rect key={candle.time} className={candle.close >= candle.open ? "is-up" : "is-down"} x={x} y={CHART_HEIGHT - height} width={Math.max(2, model.step * .6)} height={height} />;
          })}
        </g>

        <g className="demo-chart__candles">
          {candles.map((candle, index) => {
            const x = (index + .5) * model.step;
            const openY = model.y(candle.open);
            const closeY = model.y(candle.close);
            const up = candle.close >= candle.open;
            return (
              <g key={candle.time} className={up ? "is-up" : "is-down"}>
                <line x1={x} x2={x} y1={model.y(candle.high)} y2={model.y(candle.low)} />
                <rect x={x - Math.max(1.5, model.step * .28)} y={Math.min(openY, closeY)} width={Math.max(3, model.step * .56)} height={Math.max(1.5, Math.abs(closeY - openY))} />
              </g>
            );
          })}
        </g>

        {showOrderLine && <line className="demo-chart__order-line" x1="0" x2={model.plotWidth} y1={model.y(last.close - 145)} y2={model.y(last.close - 145)} />}
        {showTrades && (
          <g className="demo-chart__trade-markers">
            <circle className="is-buy" cx={model.plotWidth * .68} cy={model.y(candles[48].low) + 12} r="5" />
            <circle className="is-sell" cx={model.plotWidth * .82} cy={model.y(candles[59].high) - 12} r="5" />
          </g>
        )}

        <line className={`demo-chart__current-line ${last.close >= last.open ? "is-up" : "is-down"}`} x1="0" x2={model.plotWidth} y1={model.y(last.close)} y2={model.y(last.close)} />
        <g className="demo-chart__axis">
          {gridPrices.map((price) => <text key={price} x={model.plotWidth + 10} y={model.y(price) + 4}>{priceLabel(price)}</text>)}
          {timeMarks.map((index) => {
            const date = new Date(candles[index].time);
            return <text key={index} x={(index + .5) * model.step} y={CHART_HEIGHT - 5} textAnchor="middle">{date.toLocaleDateString([], { month: "short", day: "numeric" })}</text>;
          })}
        </g>
        <g className={`demo-chart__price-tag ${last.close >= last.open ? "is-up" : "is-down"}`}>
          <rect x={model.plotWidth} y={model.y(last.close) - 10} width={PRICE_WIDTH} height="20" />
          <text x={model.plotWidth + PRICE_WIDTH / 2} y={model.y(last.close) + 4} textAnchor="middle">{priceLabel(last.close)}</text>
        </g>
        {crosshair && (
          <g className="demo-chart__crosshair">
            <line x1={crosshair.x} x2={crosshair.x} y1="0" y2={CHART_HEIGHT - 20} />
            <line x1="0" x2={model.plotWidth} y1={crosshair.y} y2={crosshair.y} />
            <g className="demo-chart__crosshair-price">
              <rect x={model.plotWidth} y={crosshair.y - 10} width={PRICE_WIDTH} height="20" />
              <text x={model.plotWidth + PRICE_WIDTH / 2} y={crosshair.y + 4} textAnchor="middle">{priceLabel(crosshair.price)}</text>
            </g>
            <g className="demo-chart__crosshair-time">
              <rect x={Math.max(0, Math.min(model.plotWidth - 94, crosshair.x - 47))} y={CHART_HEIGHT - 20} width="94" height="20" />
              <text x={Math.max(47, Math.min(model.plotWidth - 47, crosshair.x))} y={CHART_HEIGHT - 6} textAnchor="middle">
                {new Date(candles[crosshair.index].time).toISOString().slice(0, 10)}
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
