import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { BitcoinIcon } from "../icons/BitcoinIcon";
import { ChevronDown, MarketDown } from "../icons/ChevronDown";

export function MarketPanel() {
  const [leverage, setLeverage] = useState(25);
  const [draftLeverage, setDraftLeverage] = useState(25);
  const [isLeverageOpen, setIsLeverageOpen] = useState(false);

  useEffect(() => {
    if (!isLeverageOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLeverageOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isLeverageOpen]);

  const openLeverageModal = () => {
    setDraftLeverage(leverage);
    setIsLeverageOpen(true);
  };

  const saveLeverage = () => {
    setLeverage(draftLeverage);
    setIsLeverageOpen(false);
  };

  return (
    <section className="panel market" aria-label="마켓 정보">
      <button className="market__select" type="button">
        <span className="market__coin">
          <BitcoinIcon />
        </span>
        <span>
          <strong>BTC-USD</strong>
        </span>
        <MarketDown className="market__arrow" />
      </button>

      <dl className="stats">
        <div className="stats__price">
          <dt className="sr-only">현재 가격</dt>
          <dd>$65,379</dd>
        </div>
        <div>
          <dt>오라클 가격</dt>
          <dd>$65,387</dd>
        </div>
        <div>
          <dt>24시간 변화</dt>
          <dd className="is-negative stats__change">
            <MarketDown className="stats__change-icon" />
            <span>$409 (0.62%)</span>
          </dd>
        </div>
        <div>
          <dt>24시간 거래량</dt>
          <dd>$38,381,437</dd>
        </div>
        <div>
          <dt>24시간 거래</dt>
          <dd>5,646</dd>
        </div>
        <div>
          <dt>미결제약정</dt>
          <dd className="stats__unit">
            308.31 <span>BTC</span>
          </dd>
        </div>
        <div>
          <dt>1시간 펀딩</dt>
          <dd className="is-negative hint">
            -0.00009%
            <span className="hint__pop">연율로 환산됨: 20%</span>
          </dd>
        </div>
        <div>
          <dt>다음 펀딩</dt>
          <dd>27:12</dd>
        </div>
        <div>
          <dt className="hint">
            최대 레버리지
            <span className="hint__pop hint__pop--wide">
              <strong>최대 레버리지</strong>
              <span>
                이 시장에 대한 최대 허용 레버리지. 위험을 제한하기 위해 최대
                레버리지는 특정 임계값 이후 포지션 크기에 비례하여 감소합니다.
              </span>
            </span>
          </dt>
          <dd>
            <button
              className="stats__leverage-button"
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isLeverageOpen}
              onClick={openLeverageModal}
            >
              50.00×
              <ChevronDown />
            </button>
          </dd>
        </div>
      </dl>

      {isLeverageOpen && (
        <div
          className="leverage-modal__backdrop"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setIsLeverageOpen(false);
          }}
        >
          <div
            className="leverage-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="leverage-modal-title"
          >
            <header className="leverage-modal__header">
              <h2 id="leverage-modal-title">시장 레버리지 설정</h2>
              <button
                className="leverage-modal__close"
                type="button"
                aria-label="닫기"
                onClick={() => setIsLeverageOpen(false)}
              >
                ×
              </button>
            </header>

            <div className="leverage-modal__market">
              <span className="leverage-modal__coin">
                <BitcoinIcon />
              </span>
              <strong>BTC-USD</strong>
              <span className="leverage-modal__max">최대 50×</span>
            </div>

            <div className="leverage-modal__control">
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={draftLeverage}
                aria-label="시장 레버리지"
                aria-valuetext={`${draftLeverage}배`}
                style={{
                  "--leverage-progress": `${((draftLeverage - 1) / 49) * 100}%`,
                } as CSSProperties}
                onChange={(event) => setDraftLeverage(Number(event.target.value))}
              />
              <output>{draftLeverage}×</output>
            </div>

            <button
              className="leverage-modal__save"
              type="button"
              onClick={saveLeverage}
            >
              저장
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
