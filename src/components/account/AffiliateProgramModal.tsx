import { useLocale, type Lang } from "../../i18n/Locale";
import { CloseIcon } from "../icons/CloseIcon";
import { Modal } from "../ui/Modal";
import "./AffiliateProgramModal.scss";

const copy: Record<Lang, {
  title: string;
  description: string;
  learnMore: string;
  becomeAffiliate: string;
  moreVolume: string;
  traded: string;
  remaining: string;
  benefits: string;
  benefitEarnings: string;
  benefitSavings: string;
  close: string;
}> = {
  ko: {
    title: "제휴 프로그램 잠금 해제",
    description: "제휴사가 되려면 최소 $10의 거래량을 거래해야 합니다.",
    learnMore: "자세히 보기",
    becomeAffiliate: "제휴사 되기",
    moreVolume: "더 많은 거래량을 거래해야 합니다.",
    traded: "$0.00 거래됨",
    remaining: "$10.00 잔여",
    benefits: "혜택",
    benefitEarnings: "신규 트레이더 각각에 대해 매달 최대 $10,000의 수익을 획득하세요.",
    benefitSavings: "추천받은 사람은 최대 $550의 수수료를 절약할 수 있습니다.",
    close: "닫기",
  },
  en: {
    title: "Unlock the affiliate program",
    description: "Trade at least $10 in volume to become an affiliate.",
    learnMore: "Learn more",
    becomeAffiliate: "Become an affiliate",
    moreVolume: "You need to trade more volume.",
    traded: "$0.00 traded",
    remaining: "$10.00 remaining",
    benefits: "Benefits",
    benefitEarnings: "Earn up to $10,000 per month for each new trader.",
    benefitSavings: "People you refer can save up to $550 in fees.",
    close: "Close",
  },
  ja: {
    title: "アフィリエイトプログラムを解除",
    description: "アフィリエイトになるには、最低$10の取引量が必要です。",
    learnMore: "詳細を見る",
    becomeAffiliate: "アフィリエイトになる",
    moreVolume: "さらに取引量が必要です。",
    traded: "$0.00 取引済み",
    remaining: "残り $10.00",
    benefits: "特典",
    benefitEarnings: "新規トレーダー1人につき毎月最大$10,000を獲得できます。",
    benefitSavings: "紹介された方は手数料を最大$550節約できます。",
    close: "閉じる",
  },
  zh: {
    title: "解锁联盟计划",
    description: "要成为联盟伙伴，交易量至少需要达到 $10。",
    learnMore: "了解更多",
    becomeAffiliate: "成为联盟伙伴",
    moreVolume: "您还需要完成更多交易量。",
    traded: "已交易 $0.00",
    remaining: "剩余 $10.00",
    benefits: "权益",
    benefitEarnings: "每位新交易者每月最高可为您带来 $10,000 收益。",
    benefitSavings: "您推荐的用户最多可节省 $550 手续费。",
    close: "关闭",
  },
  vi: {
    title: "Mở khóa chương trình liên kết",
    description: "Giao dịch tối thiểu $10 khối lượng để trở thành đối tác liên kết.",
    learnMore: "Tìm hiểu thêm",
    becomeAffiliate: "Trở thành đối tác",
    moreVolume: "Bạn cần giao dịch thêm khối lượng.",
    traded: "Đã giao dịch $0.00",
    remaining: "Còn lại $10.00",
    benefits: "Quyền lợi",
    benefitEarnings: "Kiếm tối đa $10.000 mỗi tháng cho mỗi nhà giao dịch mới.",
    benefitSavings: "Người được bạn giới thiệu có thể tiết kiệm tối đa $550 phí.",
    close: "Đóng",
  },
  fr: {
    title: "Débloquer le programme d’affiliation",
    description: "Négociez au moins 10 $ de volume pour devenir affilié.",
    learnMore: "En savoir plus",
    becomeAffiliate: "Devenir affilié",
    moreVolume: "Vous devez négocier davantage de volume.",
    traded: "0,00 $ négocié",
    remaining: "10,00 $ restants",
    benefits: "Avantages",
    benefitEarnings: "Gagnez jusqu’à 10 000 $ par mois pour chaque nouveau trader.",
    benefitSavings: "Les personnes parrainées peuvent économiser jusqu’à 550 $ de frais.",
    close: "Fermer",
  },
};

export function AffiliateProgramModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLocale();
  const text = copy[lang];
  const progress = 0;

  return (
    <Modal
      className="affiliate-program-modal"
      backdropClassName="affiliate-program-modal__backdrop"
      labelledBy="affiliate-program-modal-title"
      onClose={onClose}
    >
      <header className="affiliate-program-modal__header">
        <h2 id="affiliate-program-modal-title">{text.title}</h2>
        <button type="button" aria-label={text.close} onClick={onClose}><CloseIcon /></button>
      </header>

      <p className="affiliate-program-modal__description">
        {text.description}{" "}
        <a href="#affiliate-program-details">{text.learnMore}<span aria-hidden="true">→</span></a>
      </p>

      <section className="affiliate-program-modal__progress-card">
        <div className="affiliate-program-modal__progress-heading">
          <strong>{text.becomeAffiliate}</strong>
          <b>{progress}%</b>
        </div>
        <p>{text.moreVolume}</p>
        <div className="affiliate-program-modal__progress-values">
          <strong>{text.traded}</strong>
          <span>{text.remaining}</span>
        </div>
        <div
          className="affiliate-program-modal__progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <i style={{ width: `${progress}%` }} />
        </div>
      </section>

      <section className="affiliate-program-modal__benefits">
        <h3>{text.benefits}</h3>
        <ul>
          <li>{text.benefitEarnings}</li>
          <li>{text.benefitSavings}</li>
        </ul>
      </section>
    </Modal>
  );
}
