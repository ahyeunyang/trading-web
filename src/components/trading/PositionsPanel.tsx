export function PositionsPanel() {
  return (
    <section className="panel pos" aria-labelledby="positions-title">
      <header className="panel__header">
        <div className="tabs">
          <button className="is-active" id="positions-title" type="button">
            포지션
          </button>
          <button type="button">오픈 호가</button>
          <button type="button">체결</button>
          <button type="button">주문 내역</button>
          <button type="button">펀딩 지불</button>
        </div>
      </header>
      <div className="empty empty--sm">
        <span className="pos__icon" aria-hidden="true">◇</span>
        <p>열린 포지션이 없습니다.</p>
      </div>
    </section>
  );
}
