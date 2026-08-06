import { useState } from "react";
import "./MobileAppModal.scss";
import { useLocale, type Lang } from "../../i18n/Locale";
import { CloseIcon } from "../icons/CloseIcon";
import { Modal } from "../ui/Modal";
import { MobileAppQr } from "./MobileAppQr";

const copy: Record<Lang, { title: string; description: string; reveal: string; hide: string; prompt: string; safePrompt: string; warning: string }> = {
  ko: { title: "앱에서 스캔하기", description: "모바일 앱으로 온보딩하는 동안 데스크톱 동기화 옵션을 선택하세요.", reveal: "코드 보기", hide: "코드 숨기기", prompt: "클릭하여 표시", safePrompt: "안전한 장소가 아닌가요?", warning: "이 코드는 누구와도 공유하지 마세요!" },
  en: { title: "Scan in the app", description: "Select the desktop sync option while onboarding in the mobile app.", reveal: "Show code", hide: "Hide code", prompt: "Click to reveal", safePrompt: "Not in a safe place?", warning: "Do not share this code with anyone!" },
  ja: { title: "アプリでスキャン", description: "モバイルアプリのオンボーディング中にデスクトップ同期を選択してください。", reveal: "コードを表示", hide: "コードを隠す", prompt: "クリックして表示", safePrompt: "安全な場所ではありませんか？", warning: "このコードを誰とも共有しないでください。" },
  zh: { title: "在应用中扫描", description: "在移动应用的引导过程中选择桌面同步选项。", reveal: "显示代码", hide: "隐藏代码", prompt: "点击显示", safePrompt: "当前环境不安全吗？", warning: "请勿与任何人分享此代码！" },
  vi: { title: "Quét trong ứng dụng", description: "Chọn tùy chọn đồng bộ máy tính trong quá trình thiết lập ứng dụng di động.", reveal: "Hiện mã", hide: "Ẩn mã", prompt: "Nhấp để hiển thị", safePrompt: "Bạn không ở nơi an toàn?", warning: "Không chia sẻ mã này với bất kỳ ai!" },
  fr: { title: "Scanner dans l’application", description: "Sélectionnez la synchronisation avec l’ordinateur pendant la configuration mobile.", reveal: "Afficher le code", hide: "Masquer le code", prompt: "Cliquer pour afficher", safePrompt: "Vous n’êtes pas dans un lieu sûr ?", warning: "Ne partagez ce code avec personne !" },
};

function EyeIcon({ hidden }: { hidden: boolean }) {
  return <svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M1.8 9s2.6-4 7.2-4 7.2 4 7.2 4-2.6 4-7.2 4-7.2-4-7.2-4Z" stroke="currentColor" strokeWidth="1.4" /><circle cx="9" cy="9" r="2" fill="currentColor" />{hidden && <path d="m3 3 12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}</svg>;
}

export function MobileAppModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLocale();
  const text = copy[lang];
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  return (
    <Modal className="mobile-app-modal" backdropClassName="mobile-app-modal__backdrop" labelledBy="mobile-app-modal-title" onClose={onClose}>
      <header className="mobile-app-modal__header">
        <h2 id="mobile-app-modal-title">{text.title}</h2>
        <button type="button" aria-label="Close" onClick={onClose}><CloseIcon /></button>
      </header>
      <p className="mobile-app-modal__description">{text.description}</p>
      <p className="mobile-app-modal__key">Encryption Key: <strong>891209</strong></p>
      <button className={`mobile-app-modal__qr${isCodeVisible ? " is-visible" : ""}`} type="button" onClick={() => setIsCodeVisible((visible) => !visible)}>
        <span><MobileAppQr /></span>
        {!isCodeVisible && <strong>{text.prompt}</strong>}
      </button>
      <p className="mobile-app-modal__warning">{text.warning}</p>
      <footer className="mobile-app-modal__footer">
        <span>{isCodeVisible ? text.safePrompt : ""}</span>
        <button type="button" onClick={() => setIsCodeVisible((visible) => !visible)}><EyeIcon hidden={isCodeVisible} />{isCodeVisible ? text.hide : text.reveal}</button>
      </footer>
    </Modal>
  );
}
