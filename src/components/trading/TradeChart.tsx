import { useState } from "react";

type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <button
      className={`toggle${checked ? " is-on" : ""}`}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
    >
      <span />
    </button>
  );
}

function UndoIcon() {
  return <svg viewBox="0 0 28 28" aria-hidden="true"><path fill="currentColor" d="M8.707 13l2.647 2.646-.707.708L6.792 12.5l3.853-3.854.708.708L8.707 12H14.5a5.5 5.5 0 0 1 5.5 5.5V19h-1v-1.5a4.5 4.5 0 0 0-4.5-4.5H8.707z" /></svg>;
}

function RedoIcon() {
  return <svg viewBox="0 0 28 28" aria-hidden="true"><path fill="currentColor" d="M18.293 13l-2.647 2.646.707.708 3.854-3.854-3.854-3.854-.707.708L18.293 12H12.5A5.5 5.5 0 0 0 7 17.5V19h1v-1.5a4.5 4.5 0 0 1 4.5-4.5h5.793z" /></svg>;
}

function CandleIcon() {
  return <svg viewBox="0 0 28 28" aria-hidden="true"><path fill="currentColor" d="M17 11v6h3v-6h-3zm-.5-1h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5zM18 7h1v3.5h-1zm0 10.5h1V21h-1zM9 8v12h3V8H9zm-.5-1h4a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5zM10 4h1v3.5h-1zm0 16.5h1V24h-1z" /></svg>;
}

function IndicatorIcon() {
  return <svg viewBox="0 0 28 28" fill="none" aria-hidden="true"><path stroke="currentColor" d="m20 17-5 5m0-5 5 5M9 11.5h7M17.5 8a2.5 2.5 0 0 0-5 0v11a2.5 2.5 0 0 1-5 0" /></svg>;
}

function SearchIcon() {
  return <svg viewBox="0 0 28 28" aria-hidden="true"><path fill="currentColor" d="M15 11v4l1-1.5 2.33-3.5.67-1h-3V4l-1 1.5L12.67 9 12 10h3v1Zm2-7v4h2a1 1 0 0 1 .83 1.55l-4 6A1 1 0 0 1 14 15v-4h-2a1 1 0 0 1-.83-1.56l4-6A1 1 0 0 1 17 4ZM5 13.5a7.5 7.5 0 0 1 6-7.35v1.02A6.5 6.5 0 1 0 18.98 13h1a7.6 7.6 0 0 1-1.83 5.44l4.7 4.7-.7.71-4.71-4.7A7.5 7.5 0 0 1 5 13.5Z" /></svg>;
}

function SettingsIcon() {
  return <svg viewBox="0 0 28 28" aria-hidden="true"><g fill="currentColor" fillRule="evenodd"><path fillRule="nonzero" d="M14 17a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /><path d="M5.005 16A1.003 1.003 0 0 1 4 14.992v-1.984A.998.998 0 0 1 5 12h1.252a7.87 7.87 0 0 1 .853-2.06l-.919-.925c-.356-.397-.348-1 .03-1.379l1.42-1.42a1 1 0 0 1 1.416.007l.889.882A7.96 7.96 0 0 1 12 6.253V5c0-.514.46-1 1-1h2c.557 0 1 .44 1 1v1.253a7.96 7.96 0 0 1 2.06.852l.888-.882a1 1 0 0 1 1.416-.006l1.42 1.42a.999.999 0 0 1 .029 1.377l-.918.926a7.87 7.87 0 0 1 .853 2.06H23c.557 0 1 .447 1 1.008v1.984A.998.998 0 0 1 23 16h-1.252a7.87 7.87 0 0 1-.853 2.06l.882.888a1 1 0 0 1 .006 1.416l-1.42 1.42a1 1 0 0 1-1.415-.007l-.889-.882a7.96 7.96 0 0 1-2.059.852v1.248c0 .56-.45 1.005-1.008 1.005h-1.984A1.004 1.004 0 0 1 12 22.995v-1.248a7.96 7.96 0 0 1-2.06-.852l-.888.882a1 1 0 0 1-1.416.006l-1.42-1.42a1 1 0 0 1 .007-1.415l.882-.888A7.87 7.87 0 0 1 6.252 16H5.005zm3.378-6.193l-.227.34A6.884 6.884 0 0 0 7.14 12.6l-.082.4H5.005L5 14.992c0 .005.686.008 2.058.008l.082.4c.18.883.52 1.71 1.016 2.453l.227.34-1.45 1.46 1.41 1.422 1.464-1.458.34.227A6.959 6.959 0 0 0 12.601 20.86l.399.083v2.052L14.992 23c.005 0 .008-.686.008-2.057l.399-.083a6.959 6.959 0 0 0 2.454-1.016l.34-.227 1.46 1.45 1.422-1.41-1.458-1.464.227-.34A6.884 6.884 0 0 0 20.86 15.4l.082-.4h2.053L23 13.008c0-.005-.686-.008-2.058-.008l-.082-.4a6.884 6.884 0 0 0-1.016-2.453l-.227-.34 1.457-1.466-1.416-1.416-1.465 1.458-.34-.227A6.959 6.959 0 0 0 15.399 7.14L15 7.057V5h-1.992C13.003 5 13 5.686 13 7.057l-.399.083a6.959 6.959 0 0 0-2.454 1.016l-.34.227-1.46-1.45-1.421 1.408 1.457 1.466z" /></g></svg>;
}

function ExpandIcon() {
  return <svg viewBox="0 0 28 28" aria-hidden="true"><path fill="currentColor" d="M8.5 6A2.5 2.5 0 0 0 6 8.5V11h1V8.5C7 7.67 7.67 7 8.5 7H11V6H8.5zM6 17v2.5A2.5 2.5 0 0 0 8.5 22H11v-1H8.5A1.5 1.5 0 0 1 7 19.5V17H6zM19.5 7H17V6h2.5A2.5 2.5 0 0 1 22 8.5V11h-1V8.5c0-.83-.67-1.5-1.5-1.5zM22 19.5V17h-1v2.5c0 .83-.67 1.5-1.5 1.5H17v1h2.5a2.5 2.5 0 0 0 2.5-2.5z" /></svg>;
}

function CameraIcon() {
  return <svg viewBox="0 0 28 28" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M11.118 6a.5.5 0 0 0-.447.276L9.809 8H5.5A1.5 1.5 0 0 0 4 9.5v10A1.5 1.5 0 0 0 5.5 21h16a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 21.5 8h-4.309l-.862-1.724A.5.5 0 0 0 15.882 6h-4.764zm-1.342-.17A1.5 1.5 0 0 1 11.118 5h4.764a1.5 1.5 0 0 1 1.342.83L17.809 7H21.5A2.5 2.5 0 0 1 24 9.5v10a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 3 19.5v-10A2.5 2.5 0 0 1 5.5 7h3.691l.585-1.17zM13.5 18a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0 1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z" /></svg>;
}

export function TradeChart() {
  const [lines, setLines] = useState(true);
  const [trades, setTrades] = useState(true);

  return (
    <section className="panel chart" aria-labelledby="chart-title">
      <div className="chart__tabs">
        <button className="is-active" type="button">가격</button>
        <button type="button">깊이</button>
        <button type="button">펀딩</button>
        <button type="button">세부 사항</button>
      </div>
      <header className="panel__header">
        <div className="chart-tools" aria-label="차트 도구">
          <div className="chart-tools__group">
            <button type="button">날</button>
            <button className="chart-tools__item chart-tools__icon" type="button" aria-label="캔들"><CandleIcon /></button>
            <button className="chart-tools__item" type="button"><IndicatorIcon />지표</button>
          </div>
          <div className="chart-tools__group">
            <span>주문 라인</span>
            <Toggle label="주문 라인 표시" checked={lines} onChange={() => setLines(!lines)} />
          </div>
          <div className="chart-tools__group">
            <span>매수/매도</span>
            <Toggle label="매수 및 매도 표시" checked={trades} onChange={() => setTrades(!trades)} />
            <button className="chart-tools__icon" type="button" aria-label="실행 취소"><UndoIcon /></button>
            <button className="chart-tools__icon" type="button" aria-label="다시 실행"><RedoIcon /></button>
          </div>
          <div className="chart-tools__group chart-tools__group--end">
            <button className="chart-tools__icon" type="button" aria-label="빠른 검색"><SearchIcon /></button>
            <button className="chart-tools__icon" type="button" aria-label="차트 설정"><SettingsIcon /></button>
            <button className="chart-tools__icon" type="button" aria-label="전체 화면"><ExpandIcon /></button>
            <button className="chart-tools__icon" type="button" aria-label="차트 캡처"><CameraIcon /></button>
          </div>
        </div>
      </header>
      <h2 className="sr-only" id="chart-title">BTC-USD 가격 차트</h2>
      <div className="chart__canvas">
        <div className="chart__legend">
          <strong>BTC-USD · 1날 · dYdX</strong>
          <span>시 <b>66101</b> 고 <b>66273</b> 저 <b>65320</b> 종 <b>65403</b></span>
        </div>
        <div className="chart__mock" aria-label="차트 라이브러리 적용 예정">
          <span className="chart__line" />
          <span className="chart__price">$65,403</span>
        </div>
      </div>
    </section>
  );
}
