import { useMemo, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useLocale } from "../../i18n/Locale";

type FundingMode = "hourly" | "eightHour" | "annualized";
type FundingPoint = { x: number; y: number; raw: number; time: number };

const WIDTH = 1000;
const HEIGHT = 400;
const LEFT_AXIS = 66;
const BOTTOM_AXIS = 30;

const modeScale: Record<FundingMode, number> = {
  hourly: 1,
  eightHour: 8,
  annualized: 8_760,
};

const fundingPath = [
  [0, .0002], [5, .0011], [10, .0001], [17, -.0002], [23, .0015],
  [29, .0001], [35, .0008], [42, -.0004], [48, -.0011], [52, -.0003],
  [55, -.0062], [58, -.0068], [60, -.0004], [64, .0001], [67, .0041],
  [69, .0018], [71, -.0063], [74, -.0051], [76, .0062], [79, .0021],
  [81, -.0002], [88, -.0001], [92, -.0068], [96, -.0049], [101, -.0042],
  [103, .0023], [107, .0031], [111, .0014], [113, -.0051], [115, .0084],
  [118, .0023], [121, .0002], [128, .0004], [135, -.0001], [141, .0012],
  [149, .00127],
] as const;

function fundingAt(index: number) {
  const rightAnchor = fundingPath.findIndex(([anchor]) => anchor >= index);
  if (rightAnchor <= 0) return fundingPath[0][1];
  const [rightIndex, rightValue] = fundingPath[rightAnchor];
  const [leftIndex, leftValue] = fundingPath[rightAnchor - 1];
  const progress = (index - leftIndex) / (rightIndex - leftIndex);
  const interpolated = leftValue + (rightValue - leftValue) * progress;
  const quietNoise = Math.sin(index * 2.43) * .00022 + Math.cos(index * 1.17) * .00012;
  const steepMove = Math.abs(rightValue - leftValue) > .003;
  return (interpolated + (steepMove ? quietNoise * .25 : quietNoise)) / 100;
}

export function DemoFundingChart() {
  const { lang, t } = useLocale();
  const [mode, setMode] = useState<FundingMode>("hourly");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const points = useMemo(() => {
    const endTime = new Date();
    endTime.setHours(0, 0, 0, 0);
    return Array.from({ length: 150 }, (_, index) => ({
      raw: fundingAt(index),
      time: endTime.getTime() - (149 - index) * (168 / 149) * 60 * 60 * 1000,
    }));
  }, []);
  const scale = modeScale[mode];
  const limit = mode === "annualized" ? .88 : mode === "eightHour" ? .0008 : .0001;
  const chartPoints: FundingPoint[] = points.map((point, index) => ({
    x: LEFT_AXIS + (index / (points.length - 1)) * (WIDTH - LEFT_AXIS),
    y: ((limit - point.raw * scale) / (limit * 2)) * (HEIGHT - BOTTOM_AXIS),
    raw: point.raw,
    time: point.time,
  }));
  const line = chartPoints.map((point, index) => `${index ? "L" : "M"} ${point.x} ${point.y}`).join(" ");
  const hover = hoverIndex === null ? null : chartPoints[hoverIndex];
  const current = points[points.length - 1].raw * scale;
  const percentage = (value: number) => `${value >= 0 ? "+" : ""}${(value * 100).toFixed(mode === "annualized" ? 5 : 5)}%`;
  const yLabels = Array.from({ length: 9 }, (_, index) => limit - (limit * 2 / 8) * index);
  const dateIndexes = [0, 21, 43, 64, 85, 106, 128, 149];
  const locale = { ko: "ko-KR", en: "en-US", ja: "ja-JP", zh: "zh-CN", vi: "vi-VN", fr: "fr-FR" }[lang];
  const axisTime = (time: number) => new Date(time).toLocaleString(locale, {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    hour12: true,
  });

  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * WIDTH;
    const progress = Math.max(0, Math.min(1, (x - LEFT_AXIS) / (WIDTH - LEFT_AXIS)));
    setHoverIndex(Math.round(progress * (points.length - 1)));
  };

  return (
    <div className="funding-chart">
      <div className="funding-chart__modes">
        <button className={mode === "hourly" ? "is-active" : undefined} type="button" onClick={() => setMode("hourly")}>{t("hourlyRate")}</button>
        <button className={mode === "eightHour" ? "is-active" : undefined} type="button" onClick={() => setMode("eightHour")}>{t("eightHourRate")}</button>
        <button className={mode === "annualized" ? "is-active" : undefined} type="button" onClick={() => setMode("annualized")}>{t("annualized")}</button>
      </div>
      <div className={`funding-chart__current${hover ? " is-hidden" : ""}`} aria-hidden={Boolean(hover)}>
        <span>{mode === "annualized" ? t("currentAnnualizedRate") : mode === "eightHour" ? t("currentEightHourRate") : t("currentHourlyRate")}</span>
        <strong>{percentage(current)}</strong>
      </div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        aria-label={t("fundingTab")}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverIndex(null)}
      >
        <g className="funding-chart__grid">
          {yLabels.map((_, index) => {
            const y = index * ((HEIGHT - BOTTOM_AXIS) / 8);
            return <line key={index} x1={LEFT_AXIS} x2={WIDTH} y1={y} y2={y} />;
          })}
        </g>
        <line className="funding-chart__zero" x1={LEFT_AXIS} x2={WIDTH} y1={(HEIGHT - BOTTOM_AXIS) / 2} y2={(HEIGHT - BOTTOM_AXIS) / 2} />
        <path className="funding-chart__line" d={line} />
        {hover && (
          <g className="funding-chart__crosshair">
            <line x1={hover.x} x2={hover.x} y1="0" y2={HEIGHT - BOTTOM_AXIS} />
            <line x1={LEFT_AXIS} x2={WIDTH} y1={hover.y} y2={hover.y} />
            <circle cx={hover.x} cy={hover.y} r="4" />
          </g>
        )}
      </svg>
      <div className="funding-chart__y-axis">
        {yLabels.map((value) => <span key={value}>{(value * 100).toFixed(mode === "annualized" ? 0 : 4)}%</span>)}
      </div>
      <div className="funding-chart__x-axis">
        {dateIndexes.map((index) => <span key={index}>{axisTime(points[index].time)}</span>)}
      </div>
      {hover && (
        <>
          <span className={`funding-chart__value${hover.raw < 0 ? " is-negative" : ""}`} style={{ top: `${hover.y / 4}%` }}>{percentage(hover.raw * scale)}</span>
          <span
            className="funding-chart__date"
            style={{ left: `clamp(5.6rem, ${hover.x / 10}%, calc(100% - 5.6rem))` }}
          >
            {axisTime(hover.time)}
          </span>
          <div
            className={`funding-chart__tooltip${hover.raw < 0 ? " is-negative" : ""}${hover.x > WIDTH * .76 ? " is-left" : ""}`}
            style={{ left: `${hover.x / 10}%`, top: `${Math.max(14, Math.min(72, hover.y / 4))}%` }}
          >
            <strong>{t("pastFundingRate")}</strong>
            <dl>
              <div><dt>{t("direction")}</dt><dd>{hover.raw >= 0 ? t("longToShort") : t("shortToLong")}</dd></div>
              <div><dt>{mode === "hourly" ? t("hourlyRate") : mode === "eightHour" ? t("eightHourRate") : t("annualized")}</dt><dd>{percentage(hover.raw * scale)}</dd></div>
              <div><dt>{t("time")}</dt><dd>{new Date(hover.time).toLocaleString(locale)}</dd></div>
            </dl>
          </div>
        </>
      )}
    </div>
  );
}
