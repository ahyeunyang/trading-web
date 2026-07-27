import { BitcoinIcon } from "../icons/BitcoinIcon";
import { MarketDown } from "../icons/ChevronDown";

type MarketPanelProps = {
  quantityUnit: "BTC" | "USD";
};

export function MarketPanel({ quantityUnit }: MarketPanelProps) {
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
            {quantityUnit === "BTC" ? "308.31" : "19,588,069"} <span>{quantityUnit}</span>
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
          <dd>50.00×</dd>
        </div>
      </dl>
    </section>
  );
}
