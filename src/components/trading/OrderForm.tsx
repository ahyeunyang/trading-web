import { useState } from "react";
import type { CSSProperties } from "react";
import { ChevronDown } from "../icons/ChevronDown";

type MarginMode = "cross" | "isolated";
type OrderSide = "buy" | "sell";

export function OrderForm() {
  const [marginMode, setMarginMode] = useState<MarginMode>("cross");
  const [orderSide, setOrderSide] = useState<OrderSide>("buy");
  const [amount, setAmount] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [hasTriggers, setHasTriggers] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);

  const updatePercentage = (nextPercentage: number) => {
    setPercentage(nextPercentage);
    setAmount(nextPercentage === 0 ? "" : (nextPercentage / 1000).toFixed(4));
  };

  const stepAmount = (direction: 1 | -1) => {
    const nextAmount = Math.max(0, Number(amount || 0) + direction * 0.0001);
    setAmount(nextAmount === 0 ? "" : nextAmount.toFixed(4));
  };

  const clearOrder = () => {
    setAmount("");
    setPercentage(0);
    setHasTriggers(false);
  };

  return (
    <aside className="panel order" aria-labelledby="order-form-title">
      <div className="order__account">
        <dl>
          <div>
            <dt className="hint" tabIndex={0}>
              포트폴리오 값
              <span className="hint__pop hint__pop--account" role="tooltip">
                계정에 보유한 전체 자산의 현재 가치입니다.
              </span>
            </dt>
            <dd>—</dd>
          </div>
          <div>
            <dt className="hint" tabIndex={0}>
              가용 잔액
              <span className="hint__pop hint__pop--account" role="tooltip">
                새로운 주문이나 포지션에 사용할 수 있는 잔액입니다.
              </span>
            </dt>
            <dd>—</dd>
          </div>
          <div>
            <dt className="hint" tabIndex={0}>
              사용된 마진
              <span className="hint__pop hint__pop--account" role="tooltip">
                현재 열린 포지션과 주문에 사용 중인 마진입니다.
              </span>
            </dt>
            <dd>—</dd>
          </div>
        </dl>
      </div>

      <div className="order__margin">
        <div className="order__margin-mode" role="group" aria-label="마진 모드">
          <span className="order__margin-option">
            <button
              className={marginMode === "cross" ? "is-active" : undefined}
              type="button"
              aria-pressed={marginMode === "cross"}
              onClick={() => setMarginMode("cross")}
            >
              교차
            </button>
            <span className="order__margin-tip" role="tooltip">
              계정의 전체 증거금을 사용해 포지션을 유지합니다.
            </span>
          </span>
          <span className="order__margin-option">
            <button
              className={marginMode === "isolated" ? "is-active" : undefined}
              type="button"
              aria-pressed={marginMode === "isolated"}
              onClick={() => setMarginMode("isolated")}
            >
              격리됨
            </button>
            <span className="order__margin-tip" role="tooltip">
              이 포지션에 할당한 증거금만 위험에 노출됩니다.
            </span>
          </span>
        </div>
        <button className="order__leverage" type="button">
          50×
          <ChevronDown />
        </button>
      </div>

      <div className={`seg seg--side is-${orderSide}`}>
        <button
          className={orderSide === "buy" ? "is-active" : undefined}
          type="button"
          aria-pressed={orderSide === "buy"}
          onClick={() => setOrderSide("buy")}
        >
          구매 | 롱
        </button>
        <button
          className={orderSide === "sell" ? "is-active" : undefined}
          type="button"
          aria-pressed={orderSide === "sell"}
          onClick={() => setOrderSide("sell")}
        >
          판매 | 숏
        </button>
      </div>

      <div className="order__types">
        <button type="button">한도</button>
        <button className="is-active" type="button">시장</button>
        <button className="order__advanced" type="button">
          고급
          <ChevronDown />
        </button>
      </div>

      <label className="field field--amount">
        <span className="field__control">
          <span className="field__label">금액</span>
          <input
            inputMode="decimal"
            placeholder="0.0000"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <b>BTC</b>
          <span className="field__steppers">
            <button type="button" aria-label="금액 증가" onClick={() => stepAmount(1)}>
              <ChevronDown />
            </button>
            <button type="button" aria-label="금액 감소" onClick={() => stepAmount(-1)}>
              <ChevronDown />
            </button>
          </span>
        </span>
      </label>

      <div className="order__size">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={percentage}
          aria-label="주문 가능 금액 비율"
          aria-valuetext={`${percentage}%`}
          style={{ "--order-progress": `${percentage}%` } as CSSProperties}
          onChange={(event) => updatePercentage(Number(event.target.value))}
        />
        <output>{percentage}%</output>
      </div>

      <label className="order__check">
        <input
          type="checkbox"
          checked={hasTriggers}
          onChange={(event) => setHasTriggers(event.target.checked)}
        />
        <span className="order__checkbox" aria-hidden="true" />
        <span>수익 실현 / 손절매</span>
      </label>

      <div className="order__footer">
        <div className="order__summary-actions">
          <button type="button" onClick={clearOrder}>지우기</button>
          <button
            className="order__summary-toggle"
            type="button"
            aria-expanded={isSummaryOpen}
            onClick={() => setIsSummaryOpen((isOpen) => !isOpen)}
          >
            수령액
            <ChevronDown />
          </button>
        </div>

        {isSummaryOpen && (
          <dl className="order__summary">
            <div>
              <dt className="hint" tabIndex={0}>
                기대 가격
                <span className="hint__pop hint__pop--account" role="tooltip">
                  현재 시장 상황을 기준으로 주문이 체결될 것으로 예상되는 가격입니다.
                </span>
              </dt>
              <dd>—</dd>
            </div>
            <div>
              <dt className="hint" tabIndex={0}>
                청산 가격
                <span className="hint__pop hint__pop--account" role="tooltip">
                  포지션을 유지할 증거금이 부족해져 강제로 청산될 것으로 예상되는 가격입니다.
                </span>
              </dt>
              <dd>—</dd>
            </div>
            <div>
              <dt className="hint" tabIndex={0}>
                포지션 마진
                <span className="hint__pop hint__pop--account" role="tooltip">
                  이 주문으로 생성되는 포지션을 유지하는 데 필요한 증거금입니다.
                </span>
              </dt>
              <dd>—</dd>
            </div>
            <div>
              <dt className="hint" tabIndex={0}>
                수수료
                <span className="hint__pop hint__pop--account" role="tooltip">
                  주문 체결 시 적용될 것으로 예상되는 거래 수수료입니다.
                </span>
              </dt>
              <dd>—</dd>
            </div>
          </dl>
        )}

        <button className="btn btn--primary btn--full" type="button">
          로그인
        </button>
      </div>
    </aside>
  );
}
