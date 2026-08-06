import { useState } from "react";
import { useLocale, type Lang } from "../../i18n/Locale";
import { CloseIcon } from "../icons/CloseIcon";
import { Modal } from "../ui/Modal";
import { SecretPhraseModal, type SecretPhraseKind } from "./SecretPhraseModal";
import "./AccountManagementModal.scss";

const copy: Record<Lang, {
  title: string;
  email: string;
  emailDescription: string;
  exportTitle: string;
  exportDescription: string;
  turnkey: string;
  ayxx: string;
  privateBadge: string;
}> = {
  ko: { title: "계정 관리", email: "이메일", emailDescription: "이 이메일은 온체인 지갑을 생성하는 데 사용되었습니다. 계정 복구를 위해 액세스가 필요합니다.", exportTitle: "내보내기", exportDescription: "귀하의 턴키 시드 문구는 입금과 인출에 사용됩니다. 귀하의 AYXX 시드 문구는 AYXX 체인에서 귀하의 무기한 계정을 보호합니다. 이 모두를 안전하게 보호하세요.", turnkey: "턴키 문구 공개", ayxx: "AYXX 문구 공개", privateBadge: "개인용" },
  en: { title: "Account Management", email: "Email", emailDescription: "This email was used to create your onchain wallet. You need access to it for account recovery.", exportTitle: "Export", exportDescription: "Your Turnkey seed phrase is used for deposits and withdrawals. Your AYXX seed phrase protects your perpetual account on the AYXX chain. Keep both secure.", turnkey: "Reveal Turnkey Phrase", ayxx: "Reveal AYXX Phrase", privateBadge: "Private" },
  ja: { title: "アカウント管理", email: "メール", emailDescription: "このメールはオンチェーンウォレットの作成に使用されました。アカウント復旧にアクセスが必要です。", exportTitle: "エクスポート", exportDescription: "Turnkeyシードフレーズは入出金に使用され、AYXXシードフレーズはAYXXチェーンの無期限口座を保護します。安全に保管してください。", turnkey: "Turnkeyフレーズを表示", ayxx: "AYXXフレーズを表示", privateBadge: "非公開" },
  zh: { title: "账户管理", email: "电子邮件", emailDescription: "此电子邮件用于创建您的链上钱包，账户恢复时需要访问。", exportTitle: "导出", exportDescription: "Turnkey 助记词用于充值和提现，AYXX 助记词用于保护 AYXX 链上的永续账户。请妥善保管。", turnkey: "显示 Turnkey 助记词", ayxx: "显示 AYXX 助记词", privateBadge: "私密" },
  vi: { title: "Quản lý tài khoản", email: "Email", emailDescription: "Email này đã được dùng để tạo ví onchain. Bạn cần quyền truy cập để khôi phục tài khoản.", exportTitle: "Xuất", exportDescription: "Cụm từ Turnkey dùng cho nạp và rút tiền; cụm từ AYXX bảo vệ tài khoản vĩnh viễn trên chuỗi AYXX. Hãy giữ chúng an toàn.", turnkey: "Hiện cụm từ Turnkey", ayxx: "Hiện cụm từ AYXX", privateBadge: "Riêng tư" },
  fr: { title: "Gestion du compte", email: "E-mail", emailDescription: "Cet e-mail a servi à créer votre portefeuille onchain. Son accès est nécessaire pour récupérer le compte.", exportTitle: "Exporter", exportDescription: "La phrase Turnkey sert aux dépôts et retraits ; la phrase AYXX protège votre compte perpétuel sur la chaîne AYXX. Conservez-les en sécurité.", turnkey: "Afficher la phrase Turnkey", ayxx: "Afficher la phrase AYXX", privateBadge: "Privé" },
};

export function AccountManagementModal({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLocale();
  const text = copy[lang];
  const [activePhrase, setActivePhrase] = useState<SecretPhraseKind | null>(null);

  const phraseButton = (kind: SecretPhraseKind, label: string) => (
    <button className="account-management-modal__secret" type="button" onClick={() => setActivePhrase(kind)}>
      <span>{label} <b>{text.privateBadge}</b></span>
      <i aria-hidden="true">›</i>
    </button>
  );

  if (activePhrase) {
    return <SecretPhraseModal kind={activePhrase} onClose={() => setActivePhrase(null)} />;
  }

  return (
      <Modal className="account-management-modal" backdropClassName="account-management-modal__backdrop" labelledBy="account-management-modal-title" onClose={onClose}>
        <header className="account-management-modal__header">
          <h2 id="account-management-modal-title">{text.title}</h2>
          <button type="button" aria-label={t("close")} onClick={onClose}><CloseIcon /></button>
        </header>

        <section>
          <h3>{text.email}</h3>
          <p>{text.emailDescription}</p>
          <div className="account-management-modal__email">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2.25" y="3.75" width="15.5" height="12.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="m3.25 5 6.03 4.43a1.2 1.2 0 0 0 1.44 0L16.75 5" stroke="currentColor" strokeWidth="1.5" /></svg>
            <strong>y77013929@hanmail.net</strong>
          </div>
        </section>

        <section className="account-management-modal__export">
          <h3>{text.exportTitle}</h3>
          <p>{text.exportDescription}</p>
          {phraseButton("turnkey", text.turnkey)}
          {phraseButton("ayxx", text.ayxx)}
        </section>
      </Modal>
  );
}
