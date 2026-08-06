import { useState } from "react";
import { useLocale, type Lang } from "../../i18n/Locale";
import { CloseIcon } from "../icons/CloseIcon";
import { Modal } from "../ui/Modal";
import { BackButton } from "../ui/BackButton";
import { DangerButton } from "../ui/DangerButton";
import { HidePhraseIcon, ShowPhraseIcon } from "../icons/PhraseVisibilityIcons";
import { CopyButton } from "../ui/CopyButton";
import "./SecretPhraseModal.scss";

export type SecretPhraseKind = "turnkey" | "ayxx";

const phrases: Record<SecretPhraseKind, string> = {
  turnkey: "orbit velvet anchor maple crystal harbor meadow pulse bronze lunar canvas river",
  ayxx: "canvas river echo summit olive coral midnight feather amber stone orbit velvet",
};

const maskPhrase = (phrase: string) => phrase
  .split(" ")
  .map((word) => "*".repeat(word.length))
  .join(" ");

const copy: Record<Lang, {
  title: string;
  recoveryPhrase: string;
  warning: string;
  reauthenticate: string;
  show: string;
  hide: string;
  copyPhrase: string;
  back: string;
  turnkey: string;
  ayxx: string;
  disconnectTitle: string;
  disconnectQuestion: string;
  disconnect: string;
  cancel: string;
}> = {
  ko: { title: "비밀 문구 공개", recoveryPhrase: "비밀 복구 문구", warning: "복구 키를 아는 사람은 누구든지 사용자 자금에 접근할 수 있습니다. 안전한 비공개 위치에 저장하세요.", reauthenticate: "재인증", show: "문구 표시", hide: "문구 숨기기", copyPhrase: "복구 문구 복사", back: "뒤로", turnkey: "Turnkey", ayxx: "AYXX", disconnectTitle: "연결 해제", disconnectQuestion: "계정 연결을 해제하시겠습니까?", disconnect: "연결 해제", cancel: "취소" },
  en: { title: "Reveal Secret Phrase", recoveryPhrase: "Secret Recovery Phrase", warning: "Anyone who knows the recovery key can access your funds. Store it in a safe, private place.", reauthenticate: "Reauthenticate", show: "Show phrase", hide: "Hide phrase", copyPhrase: "Copy recovery phrase", back: "Back", turnkey: "Turnkey", ayxx: "AYXX", disconnectTitle: "Disconnect", disconnectQuestion: "Are you sure you want to disconnect your account?", disconnect: "Disconnect", cancel: "Cancel" },
  ja: { title: "秘密フレーズを表示", recoveryPhrase: "秘密のリカバリーフレーズ", warning: "リカバリーキーを知る人は資金にアクセスできます。安全な非公開の場所に保管してください。", reauthenticate: "再認証", show: "フレーズを表示", hide: "フレーズを隠す", copyPhrase: "リカバリーフレーズをコピー", back: "戻る", turnkey: "Turnkey", ayxx: "AYXX", disconnectTitle: "接続解除", disconnectQuestion: "アカウントの接続を解除しますか？", disconnect: "接続解除", cancel: "キャンセル" },
  zh: { title: "显示秘密助记词", recoveryPhrase: "秘密恢复助记词", warning: "任何知道恢复密钥的人都可以访问您的资金。请存放在安全的私密位置。", reauthenticate: "重新认证", show: "显示助记词", hide: "隐藏助记词", copyPhrase: "复制恢复助记词", back: "返回", turnkey: "Turnkey", ayxx: "AYXX", disconnectTitle: "断开连接", disconnectQuestion: "确定要断开账户连接吗？", disconnect: "断开连接", cancel: "取消" },
  vi: { title: "Hiện cụm từ bí mật", recoveryPhrase: "Cụm từ khôi phục bí mật", warning: "Bất kỳ ai biết khóa khôi phục đều có thể truy cập tiền của bạn. Hãy lưu ở nơi riêng tư, an toàn.", reauthenticate: "Xác thực lại", show: "Hiện cụm từ", hide: "Ẩn cụm từ", copyPhrase: "Sao chép cụm từ khôi phục", back: "Quay lại", turnkey: "Turnkey", ayxx: "AYXX", disconnectTitle: "Ngắt kết nối", disconnectQuestion: "Bạn có muốn ngắt kết nối tài khoản không?", disconnect: "Ngắt kết nối", cancel: "Hủy" },
  fr: { title: "Afficher la phrase secrète", recoveryPhrase: "Phrase secrète de récupération", warning: "Toute personne connaissant la clé de récupération peut accéder à vos fonds. Conservez-la dans un lieu privé et sûr.", reauthenticate: "Se réauthentifier", show: "Afficher la phrase", hide: "Masquer la phrase", copyPhrase: "Copier la phrase de récupération", back: "Retour", turnkey: "Turnkey", ayxx: "AYXX", disconnectTitle: "Déconnexion", disconnectQuestion: "Voulez-vous déconnecter votre compte ?", disconnect: "Déconnecter", cancel: "Annuler" },
};

export function SecretPhraseModal({
  kind,
  onClose,
  initialDisconnect = false,
}: {
  kind: SecretPhraseKind;
  onClose: () => void;
  initialDisconnect?: boolean;
}) {
  const { lang, t } = useLocale();
  const text = copy[lang];
  const [isVisible, setIsVisible] = useState(false);
  const [isDisconnectStep, setIsDisconnectStep] = useState(initialDisconnect);

  return (
    <Modal className={`secret-phrase-modal${isDisconnectStep ? " is-disconnect" : ""}`} backdropClassName="secret-phrase-modal__backdrop" labelledBy="secret-phrase-modal-title" onClose={onClose}>
      {isDisconnectStep ? (
        <>
          <header className="secret-phrase-modal__disconnect-header">
            <h2 id="secret-phrase-modal-title">{text.disconnectTitle}</h2>
            <button type="button" aria-label={t("close")} onClick={onClose}><CloseIcon /></button>
          </header>
          <p className="secret-phrase-modal__disconnect-question">{text.disconnectQuestion}</p>
          <div className="secret-phrase-modal__disconnect-actions">
            <DangerButton onClick={onClose}>{text.disconnect}</DangerButton>
            <button type="button" onClick={initialDisconnect ? onClose : () => setIsDisconnectStep(false)}>{text.cancel}</button>
          </div>
        </>
      ) : (
        <>
      <header className="secret-phrase-modal__header">
        <BackButton label={text.back} onClick={onClose} />
        <h2 id="secret-phrase-modal-title">{text.title}</h2>
        <button type="button" aria-label={t("close")} onClick={onClose}><CloseIcon /></button>
      </header>

      <p className="secret-phrase-modal__label"><b>{text[kind]}</b> {text.recoveryPhrase}</p>
      <div className={`secret-phrase-modal__phrase is-${kind}`}>
        <code>
          {isVisible ? phrases[kind] : maskPhrase(phrases[kind])}
        </code>
        {kind === "ayxx" && (
          <CopyButton value={phrases[kind]} label={text.copyPhrase} resetDelay={1200} />
        )}
      </div>
      <p className="secret-phrase-modal__warning">{text.warning}</p>

      {kind === "turnkey" && !isVisible ? (
        <button className="secret-phrase-modal__action" type="button" onClick={() => setIsDisconnectStep(true)}>{text.reauthenticate}</button>
      ) : (
        <button className="secret-phrase-modal__action" type="button" onClick={() => setIsVisible((visible) => !visible)}>
          {isVisible ? <HidePhraseIcon /> : <ShowPhraseIcon />}
          {isVisible ? text.hide : text.show}
        </button>
      )}
        </>
      )}
    </Modal>
  );
}
