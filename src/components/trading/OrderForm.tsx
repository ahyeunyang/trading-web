import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BitcoinIcon } from "../icons/BitcoinIcon";
import { ChevronDown } from "../icons/ChevronDown";
import { WarningIcon } from "../icons/WarningIcon";
import { CloseIcon } from "../icons/CloseIcon";
import { CheckboxField } from "../ui/CheckboxField";
import { SelectMenu } from "../ui/SelectMenu";
import { Tooltip } from "../ui/Tooltip";
import { useLocale } from "../../i18n/Locale";

type MarginMode = "cross" | "isolated";
type OrderSide = "buy" | "sell";
type OrderType = "limit" | "market";
type TimeInForce = "good-until" | "immediate-or-cancel";
type TimeUnit = "minute" | "hour" | "day" | "week";

type OrderFormProps = {
  quantityUnit: "BTC" | "USD";
  onQuantityUnitChange: (unit: "BTC" | "USD") => void;
  isDepositOpen: boolean;
  onDepositOpenChange: (isOpen: boolean) => void;
};

const BTC_USD_PRICE = 65_379;

export function OrderForm({
  quantityUnit,
  onQuantityUnitChange,
  isDepositOpen,
  onDepositOpenChange,
}: OrderFormProps) {
  const { t } = useLocale();
  const [marginMode, setMarginMode] = useState<MarginMode>("cross");
  const [orderSide, setOrderSide] = useState<OrderSide>("buy");
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("65497");
  const [percentage, setPercentage] = useState(0);
  const [hasTriggers, setHasTriggers] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(true);
  const [reduceOnly, setReduceOnly] = useState(false);
  const [postOnly, setPostOnly] = useState(false);
  const [timeInForce, setTimeInForce] = useState<TimeInForce>("good-until");
  const [timeValue, setTimeValue] = useState("28");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("day");
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const [leverage, setLeverage] = useState(50);
  const [draftLeverage, setDraftLeverage] = useState(50);
  const [isLeverageOpen, setIsLeverageOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");

  useEffect(() => {
    if (!isLeverageOpen && !isDepositOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsLeverageOpen(false);
      onDepositOpenChange(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isDepositOpen, isLeverageOpen, onDepositOpenChange]);

  const openLeverageModal = () => {
    setDraftLeverage(leverage);
    setIsLeverageOpen(true);
  };

  const saveLeverage = () => {
    setLeverage(draftLeverage);
    setIsLeverageOpen(false);
  };

  const updatePercentage = (nextPercentage: number) => {
    setPercentage(nextPercentage);
    if (nextPercentage === 0) {
      setAmount("");
      return;
    }

    const btcAmount = nextPercentage / 1000;
    setAmount(
      quantityUnit === "BTC"
        ? btcAmount.toFixed(4)
        : (btcAmount * BTC_USD_PRICE).toFixed(2),
    );
  };

  const toggleQuantityUnit = () => {
    const nextUnit = quantityUnit === "BTC" ? "USD" : "BTC";

    if (amount) {
      const numericAmount = Number(amount);
      setAmount(
        nextUnit === "USD"
          ? (numericAmount * BTC_USD_PRICE).toFixed(2)
          : (numericAmount / BTC_USD_PRICE).toFixed(4),
      );
    }

    onQuantityUnitChange(nextUnit);
  };

  const clearOrder = () => {
    setAmount("");
    setPercentage(0);
    setHasTriggers(false);
  };

  const numericAmount = Number(amount);
  const hasValidAmount =
    amount.trim() !== "" && Number.isFinite(numericAmount) && numericAmount > 0;
  const amountInUsd = quantityUnit === "USD"
    ? numericAmount
    : numericAmount * BTC_USD_PRICE;
  const amountInBtc = quantityUnit === "BTC"
    ? numericAmount
    : numericAmount / BTC_USD_PRICE;
  const positionMargin = amountInUsd / leverage;
  const estimatedFee = amountInUsd * 0.0005;
  const numericDepositAmount = Number(depositAmount);
  const hasValidDepositAmount =
    depositAmount.trim() !== "" &&
    Number.isFinite(numericDepositAmount) &&
    numericDepositAmount > 0;

  return (
    <aside className="panel order" aria-labelledby="order-form-title">
      <div className="order__account">
        <dl>
          <div>
            <dt><Tooltip content={t("portfolioValueTip")} tooltipClassName="hint__pop--account">{t("portfolioValue")}</Tooltip></dt>
            <dd>—</dd>
          </div>
          <div>
            <dt><Tooltip content={t("availableBalanceTip")} tooltipClassName="hint__pop--account">{t("availableBalance")}</Tooltip></dt>
            <dd>—</dd>
          </div>
          <div>
            <dt><Tooltip content={t("usedMarginTip")} tooltipClassName="hint__pop--account">{t("usedMargin")}</Tooltip></dt>
            <dd>—</dd>
          </div>
        </dl>
        <div className="order__account-actions">
          <button
            className="order__deposit"
            type="button"
            onClick={() => onDepositOpenChange(true)}
          >
            {t("deposit")}
          </button>
          <button
            className="order__deposit-icon"
            type="button"
            aria-label="입금 모달 열기"
            onClick={() => onDepositOpenChange(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M13.2426 6.2573C14.0817 7.09641 14.6531 8.16551 14.8846 9.3294C15.1162 10.4933 14.9973 11.6997 14.5432 12.796C14.0891 13.8924 13.32 14.8295 12.3334 15.4888C11.3467 16.148 10.1866 16.4999 8.99993 16.4999C7.81324 16.4999 6.6532 16.148 5.66651 15.4888C4.67981 14.8295 3.91078 13.8924 3.45665 12.796C3.00253 11.6997 2.88371 10.4933 3.11522 9.3294C3.34673 8.16551 3.91817 7.09641 4.75729 6.2573"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
              <path
                d="M11.25 2.9375L9 0.6875M9 0.6875L6.75 2.9375M9 0.6875V10.25"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
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
              {t("cross")}
            </button>
            <span className="order__margin-tip" role="tooltip">
              {t("crossTip")}
            </span>
          </span>
          <span className="order__margin-option">
            <button
              className={marginMode === "isolated" ? "is-active" : undefined}
              type="button"
              aria-pressed={marginMode === "isolated"}
              onClick={() => setMarginMode("isolated")}
            >
              {t("isolated")}
            </button>
            <span className="order__margin-tip" role="tooltip">
              {t("isolatedTip")}
            </span>
          </span>
        </div>
        <button
          className="order__leverage"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isLeverageOpen}
          onClick={openLeverageModal}
        >
          {leverage}×
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
          {t("buyLong")}
        </button>
        <button
          className={orderSide === "sell" ? "is-active" : undefined}
          type="button"
          aria-pressed={orderSide === "sell"}
          onClick={() => setOrderSide("sell")}
        >
          {t("sellShort")}
        </button>
      </div>

      <div className="order__types">
        <button className={orderType === "limit" ? "is-active" : undefined} type="button" onClick={() => setOrderType("limit")}>{t("limit")}</button>
        <button className={orderType === "market" ? "is-active" : undefined} type="button" onClick={() => setOrderType("market")}>{t("market")}</button>
        <details className="order__advanced-select">
          <summary>{t("advanced")}<ChevronDown /></summary>
          <div>
            {[t("stopLoss"), t("stopLoss"), t("scale")].map((option, index) => (
              <button type="button" key={`${option}-${index}`} onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}>{option}</button>
            ))}
          </div>
        </details>
      </div>

      <div className="order__scroll">
      {orderType === "limit" && (
        <label className="field field--limit" htmlFor="order-limit-price">
          <span className="field__caption"><span>{t("limitPrice")}</span><b>USD</b></span>
          <span className="field__limit-value">
            <span>$</span>
            <input id="order-limit-price" inputMode="decimal" value={limitPrice} onChange={(event) => setLimitPrice(event.target.value)} />
          </span>
          <button type="button" onClick={() => setLimitPrice("65497")}>{t("middle")}</button>
        </label>
      )}

      <div className="field field--amount">
        <label className="field__control" htmlFor="order-amount">
          <span className="field__amount-copy">
            <span className="field__caption">
              <Tooltip className="field__label" content={t("amountTip")} tooltipClassName="hint__pop--amount">{t("amount")}</Tooltip>
              <b>{quantityUnit}</b>
            </span>
            <span className="field__value">
              {quantityUnit === "USD" && <span className="field__currency">$</span>}
          <input
              id="order-amount"
            inputMode="decimal"
              placeholder={quantityUnit === "BTC" ? "0.0000" : "0.00"}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
            </span>
          </span>
          {hasValidAmount && (
            <span className="field__conversion">
              ≈ {quantityUnit === "USD"
                ? amountInBtc.toFixed(3)
                : amountInUsd.toLocaleString("en-US", { maximumFractionDigits: 2 })}
              <b>{quantityUnit === "USD" ? "BTC" : "USD"}</b>
            </span>
          )}
        </label>
        <button
          className="field__asset-switch"
          type="button"
          aria-label={`금액 단위를 ${quantityUnit === "BTC" ? "USD" : "BTC"}로 전환`}
          onClick={toggleQuantityUnit}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.6156 18.4129C25.5 18.307 25.3644 18.2247 25.2165 18.1706C25.0686 18.1165 24.9114 18.0916 24.7538 18.0975C24.5962 18.1034 24.4414 18.1398 24.298 18.2048C24.1547 18.2698 24.0258 18.362 23.9186 18.4761L20.7966 21.7955L20.7966 10.0243C20.7966 9.70993 20.6701 9.4084 20.4449 9.18608C20.2197 8.96376 19.9143 8.83887 19.5959 8.83887C19.2774 8.83887 18.972 8.96376 18.7468 9.18608C18.5216 9.4084 18.3951 9.70993 18.3951 10.0243L18.3951 21.7955L15.2732 18.4761C15.166 18.362 15.037 18.2698 14.8937 18.2048C14.7504 18.1399 14.5955 18.1034 14.4379 18.0975C14.2803 18.0917 14.1231 18.1165 13.9753 18.1706C13.8274 18.2247 13.6918 18.3071 13.5761 18.4129C13.4605 18.5188 13.3671 18.6461 13.3013 18.7876C13.2355 18.9291 13.1986 19.082 13.1926 19.2376C13.1867 19.3931 13.2118 19.5484 13.2667 19.6943C13.3215 19.8403 13.4049 19.9742 13.5121 20.0884L18.7153 25.6206C18.8277 25.7403 18.964 25.8358 19.1155 25.9011C19.267 25.9664 19.4305 26.0001 19.5959 26.0001C19.7612 26.0001 19.9247 25.9664 20.0763 25.9011C20.2278 25.8358 20.364 25.7403 20.4764 25.6206L25.6796 20.0884C25.7869 19.9742 25.8703 19.8403 25.9251 19.6943C25.9799 19.5484 26.0051 19.3931 25.9991 19.2376C25.9932 19.082 25.9563 18.9291 25.8905 18.7876C25.8247 18.6461 25.7313 18.5188 25.6156 18.4129Z"
              fill="currentColor"
            />
            <path
              d="M12.6986 7.21251C12.6328 7.354 12.5394 7.48131 12.4237 7.58716C12.3081 7.69303 12.1725 7.77538 12.0246 7.8295C11.8767 7.88363 11.7195 7.90846 11.5619 7.90259C11.4043 7.89672 11.2495 7.86026 11.1061 7.79529C10.9628 7.73032 10.8339 7.63811 10.7267 7.52394L7.60473 4.20462L7.60473 15.9757C7.60473 16.2902 7.47822 16.5917 7.25304 16.814C7.02785 17.0363 6.72244 17.1612 6.40398 17.1612C6.08552 17.1612 5.78011 17.0363 5.55493 16.814C5.32974 16.5917 5.20324 16.2902 5.20324 15.9757L5.20324 4.20462L2.0813 7.52394C1.97407 7.6381 1.84512 7.73029 1.70181 7.79526C1.55849 7.86022 1.40362 7.89668 1.24604 7.90255C1.08845 7.90842 0.931238 7.88359 0.783372 7.82947C0.635505 7.77536 0.499879 7.69302 0.384244 7.58716C0.268609 7.4813 0.175229 7.35399 0.109429 7.2125C0.0436293 7.07101 0.00670307 6.9181 0.000755968 6.76252C-0.00519114 6.60694 0.0199573 6.45173 0.0747687 6.30574C0.12958 6.15976 0.212983 6.02586 0.320208 5.91169L5.52344 0.379505C5.63584 0.259806 5.77207 0.164314 5.92359 0.0990108C6.07511 0.0337073 6.23865 -2.8716e-07 6.40398 -2.79933e-07C6.56931 -2.72706e-07 6.73286 0.0337074 6.88438 0.0990108C7.0359 0.164314 7.17213 0.259806 7.28453 0.379505L12.4878 5.9117C12.595 6.02585 12.6784 6.15975 12.7332 6.30573C12.788 6.45172 12.8132 6.60694 12.8073 6.76252C12.8013 6.91811 12.7644 7.07101 12.6986 7.21251Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className="order__size">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={percentage}
          aria-label="주문 가능 금액 비율"
          aria-valuetext={`${percentage}%`}
          onChange={(event) => updatePercentage(Number(event.target.value))}
        />
        <output>{percentage}%</output>
      </div>

      {orderType === "limit" ? (
        <div className="order__limit-advanced">
          <button className="order__limit-advanced-title" type="button" aria-expanded={isAdvancedOpen} onClick={() => setIsAdvancedOpen((value) => !value)}>
            <span>{t("advanced")}</span><i /><ChevronDown />
          </button>
          {isAdvancedOpen && (
            <div className="order__limit-advanced-content">
              <div className="order__limit-settings">
                <div className="order__limit-setting">
                  <span>{t("orderExecution")}</span>
                  <SelectMenu
                    ariaLabel="주문 실행 방식"
                    value={timeInForce}
                    onChange={setTimeInForce}
                    options={[
                      { value: "good-until", label: t("goodUntil") },
                      { value: "immediate-or-cancel", label: t("immediateOrCancel") },
                    ]}
                  />
                </div>
                <div className="order__limit-setting">
                  <span>{t("time")}</span>
                  <div className="order__time-control">
                    <input aria-label="주문 유효 시간" inputMode="numeric" type="text" value={timeValue} onChange={(event) => setTimeValue(event.target.value)} />
                    <SelectMenu
                      className="select-menu--compact"
                      ariaLabel="시간 단위"
                      value={timeUnit}
                      onChange={setTimeUnit}
                      options={[
                        { value: "minute", label: t("minute") },
                        { value: "hour", label: t("hour") },
                        { value: "day", label: t("timeDay") },
                        { value: "week", label: t("week") },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <CheckboxField
                checked={reduceOnly}
                label={t("reduceOnly")}
                onChange={setReduceOnly}
                tooltip={t("reduceOnlyTip")}
              />
              <CheckboxField
                checked={postOnly}
                label={t("postOnly")}
                onChange={setPostOnly}
                tooltip={t("postOnlyTip")}
              />
            </div>
          )}
        </div>
      ) : orderType === "market" ? (
        <CheckboxField checked={hasTriggers} label={t("takeProfitStopLoss")} onChange={setHasTriggers} />
      ) : null}

      {hasValidAmount && orderType === "market" && (
        <div className="order__margin-warning" role="alert">
          {t("marginWarning")}
        </div>
      )}
      </div>

      <div className="order__footer">
        <div className="order__summary-actions">
          {hasValidAmount && <button className="order__clear" type="button" onClick={clearOrder}>{t("clear")}</button>}
          <button
            className="order__summary-toggle"
            type="button"
            aria-expanded={isSummaryOpen}
            onClick={() => setIsSummaryOpen((isOpen) => !isOpen)}
          >
            {t("receiveAmount")}
            <ChevronDown />
          </button>
        </div>

        {isSummaryOpen && <dl className="order__summary">
            <div>
              <dt><Tooltip content={t("expectedPriceTip")} tooltipClassName="hint__pop--account">{t("expectedPrice")}</Tooltip></dt>
              <dd>{hasValidAmount ? (orderType === "limit" ? `$${Number(limitPrice || 0).toLocaleString("en-US")}` : "$65,633") : "—"}</dd>
            </div>
            <div>
              <dt><Tooltip content={t("liquidationPriceTip")} tooltipClassName="hint__pop--account">{t("liquidationPrice")}</Tooltip></dt>
              <dd>{hasValidAmount ? "— → $66,387" : "—"}</dd>
            </div>
            <div>
              <dt><Tooltip content={t("positionMarginTip")} tooltipClassName="hint__pop--account">{t("positionMargin")}</Tooltip></dt>
              <dd>{hasValidAmount ? `— → $${positionMargin.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}</dd>
            </div>
            <div>
              <dt><Tooltip content={t("feeTip")} tooltipClassName="hint__pop--account">{t("fee")}</Tooltip></dt>
              <dd>{hasValidAmount ? `$${estimatedFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}</dd>
            </div>
        </dl>}

        <button
          className={`btn btn--primary btn--full order__submit${hasValidAmount ? " is-margin-error" : ""}`}
          type="button"
          disabled
          aria-live="polite"
        >
          {!hasValidAmount ? (
            <>
              <WarningIcon />
              <span>{t("enterAmount")}</span>
            </>
          ) : (
            <>
              <WarningIcon />
              <span>{t("adjustVolume")}</span>
            </>
          )}
        </button>
      </div>

      {isLeverageOpen && createPortal(
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
              <h2 id="leverage-modal-title">{t("setMarketLeverage")}</h2>
              <button
                className="leverage-modal__close"
                type="button"
                aria-label="닫기"
                onClick={() => setIsLeverageOpen(false)}
              >
                <CloseIcon />
              </button>
            </header>

            <div className="leverage-modal__market">
              <span className="leverage-modal__coin">
                <BitcoinIcon />
              </span>
              <strong>BTC-USD</strong>
              <span className="leverage-modal__max">{t("maximum")} 50×</span>
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
                onChange={(event) => setDraftLeverage(Number(event.target.value))}
              />
              <output>{draftLeverage}×</output>
            </div>

            <button
              className="leverage-modal__save"
              type="button"
              onClick={saveLeverage}
            >
              {t("save")}
            </button>
          </div>
        </div>,
        document.body,
      )}

      {isDepositOpen && createPortal(
        <div
          className="leverage-modal__backdrop"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onDepositOpenChange(false);
          }}
        >
          <div
            className="deposit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="deposit-modal-title"
          >
            <header className="deposit-modal__header">
              <h2 id="deposit-modal-title">{t("deposit")}</h2>
              <button
                className="deposit-modal__close"
                type="button"
                aria-label="닫기"
                onClick={() => onDepositOpenChange(false)}
              >
                <CloseIcon />
              </button>
            </header>

            <p className="deposit-modal__description">
              {t("depositDescription")}
            </p>

            <label className="deposit-modal__field">
              <span>{t("asset")}</span>
              <button type="button">
                <span className="deposit-modal__asset">
                  <BitcoinIcon />
                  BTC
                </span>
                <ChevronDown />
              </button>
            </label>

            <label className="deposit-modal__field">
              <span>{t("amount")}</span>
              <span className="deposit-modal__amount">
                <input
                  inputMode="decimal"
                  placeholder="0.0000"
                  value={depositAmount}
                  onChange={(event) => setDepositAmount(event.target.value)}
                />
                <b>BTC</b>
              </span>
            </label>

            <button
              className="deposit-modal__submit"
              type="button"
              disabled={!hasValidDepositAmount}
            >
              {t("deposit")}
            </button>
          </div>
        </div>,
        document.body,
      )}
    </aside>
  );
}
