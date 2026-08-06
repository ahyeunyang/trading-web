import { useEffect, useState } from "react";
import { useLocale, type Lang } from "../../i18n/Locale";
import { CloseIcon } from "../icons/CloseIcon";
import { Modal } from "../ui/Modal";
import "./MobileLoginModal.scss";

const WAIT_SECONDS = 6;

const copy: Record<Lang, {
  title: string;
  description: string;
  warning: string;
  waiting: (seconds: number) => string;
  continue: string;
  close: string;
}> = {
  ko: {
    title: "모바일로 로그인하세요",
    description: "QR 코드를 통해 귀하의 키를 모바일 앱으로 전송하려고 합니다.",
    warning: "이 코드는 누구와도 공유하지 마세요. AYXX는 절대로 이 코드를 물어보지 않습니다.",
    waiting: (seconds) => `${seconds}초만 기다리세요...`,
    continue: "계속하기",
    close: "닫기",
  },
  en: {
    title: "Log in with mobile",
    description: "You are about to transfer your key to the mobile app using a QR code.",
    warning: "Do not share this code with anyone. AYXX will never ask you for this code.",
    waiting: (seconds) => `Please wait ${seconds} seconds...`,
    continue: "Continue",
    close: "Close",
  },
  ja: {
    title: "モバイルでログイン",
    description: "QRコードを使ってキーをモバイルアプリへ転送します。",
    warning: "このコードを誰とも共有しないでください。AYXXがこのコードを尋ねることはありません。",
    waiting: (seconds) => `${seconds}秒お待ちください...`,
    continue: "続行",
    close: "閉じる",
  },
  zh: {
    title: "使用移动设备登录",
    description: "您即将通过二维码将密钥传输到移动应用。",
    warning: "请勿与任何人分享此代码。AYXX 绝不会向您索取此代码。",
    waiting: (seconds) => `请等待 ${seconds} 秒...`,
    continue: "继续",
    close: "关闭",
  },
  vi: {
    title: "Đăng nhập bằng di động",
    description: "Bạn sắp chuyển khóa sang ứng dụng di động bằng mã QR.",
    warning: "Không chia sẻ mã này với bất kỳ ai. AYXX sẽ không bao giờ hỏi mã này.",
    waiting: (seconds) => `Vui lòng chờ ${seconds} giây...`,
    continue: "Tiếp tục",
    close: "Đóng",
  },
  fr: {
    title: "Se connecter avec un mobile",
    description: "Vous allez transférer votre clé vers l’application mobile à l’aide d’un code QR.",
    warning: "Ne partagez ce code avec personne. AYXX ne vous demandera jamais ce code.",
    waiting: (seconds) => `Veuillez patienter ${seconds} secondes...`,
    continue: "Continuer",
    close: "Fermer",
  },
};

type MobileLoginModalProps = {
  onClose: () => void;
  onContinue: () => void;
};

export function MobileLoginModal({ onClose, onContinue }: MobileLoginModalProps) {
  const { lang } = useLocale();
  const text = copy[lang];
  const [remainingSeconds, setRemainingSeconds] = useState(WAIT_SECONDS);

  useEffect(() => {
    if (remainingSeconds === 0) return;

    const timer = window.setTimeout(() => {
      setRemainingSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [remainingSeconds]);

  const canContinue = remainingSeconds === 0;

  return (
    <Modal
      className="mobile-login-modal"
      backdropClassName="mobile-login-modal__backdrop"
      labelledBy="mobile-login-modal-title"
      onClose={onClose}
    >
      <header className="mobile-login-modal__header">
        <h2 id="mobile-login-modal-title">{text.title}</h2>
        <button type="button" aria-label={text.close} onClick={onClose}><CloseIcon /></button>
      </header>
      <p>{text.description}</p>
      <strong>{text.warning}</strong>
      <button
        className={`mobile-login-modal__action${canContinue ? " is-ready" : ""}`}
        type="button"
        disabled={!canContinue}
        onClick={onContinue}
      >
        {canContinue ? text.continue : text.waiting(remainingSeconds)}
      </button>
    </Modal>
  );
}
