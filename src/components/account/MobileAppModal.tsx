import { useState } from "react";
import { useLocale, type Lang } from "../../i18n/Locale";
import { CloseIcon } from "../icons/CloseIcon";
import { Modal } from "../ui/Modal";

const copy: Record<Lang, { title: string; description: string; reveal: string; hide: string; prompt: string; safePrompt: string; warning: string }> = {
  ko: { title: "앱에서 스캔하기", description: "모바일 앱으로 온보딩하는 동안 데스크톱 동기화 옵션을 선택하세요.", reveal: "코드 보기", hide: "코드 숨기기", prompt: "클릭하여 표시", safePrompt: "안전한 장소가 아닌가요?", warning: "이 코드는 누구와도 공유하지 마세요!" },
  en: { title: "Scan in the app", description: "Select the desktop sync option while onboarding in the mobile app.", reveal: "Show code", hide: "Hide code", prompt: "Click to reveal", safePrompt: "Not in a safe place?", warning: "Do not share this code with anyone!" },
  ja: { title: "アプリでスキャン", description: "モバイルアプリのオンボーディング中にデスクトップ同期を選択してください。", reveal: "コードを表示", hide: "コードを隠す", prompt: "クリックして表示", safePrompt: "安全な場所ではありませんか？", warning: "このコードを誰とも共有しないでください。" },
  zh: { title: "在应用中扫描", description: "在移动应用的引导过程中选择桌面同步选项。", reveal: "显示代码", hide: "隐藏代码", prompt: "点击显示", safePrompt: "当前环境不安全吗？", warning: "请勿与任何人分享此代码！" },
  vi: { title: "Quét trong ứng dụng", description: "Chọn tùy chọn đồng bộ máy tính trong quá trình thiết lập ứng dụng di động.", reveal: "Hiện mã", hide: "Ẩn mã", prompt: "Nhấp để hiển thị", safePrompt: "Bạn không ở nơi an toàn?", warning: "Không chia sẻ mã này với bất kỳ ai!" },
  fr: { title: "Scanner dans l’application", description: "Sélectionnez la synchronisation avec l’ordinateur pendant la configuration mobile.", reveal: "Afficher le code", hide: "Masquer le code", prompt: "Cliquer pour afficher", safePrompt: "Vous n’êtes pas dans un lieu sûr ?", warning: "Ne partagez ce code avec personne !" },
};

function MobileSyncQr() {
  const modules = Array.from({ length: 45 * 45 }, (_, index) => {
    const x = index % 45;
    const y = Math.floor(index / 45);
    const finder = (x < 7 && y < 7) || (x > 37 && y < 7) || (x < 7 && y > 37);
    const center = x >= 16 && x <= 28 && y >= 15 && y <= 29;
    if (finder || center || (x * 13 + y * 7 + x * y * 3) % 7 > 2) return null;
    return <rect key={index} x={x * 7 + 21} y={y * 7 + 21} width="4.8" height="4.8" rx="1.2" />;
  });

  return (
    <svg viewBox="0 0 360 360" aria-label="Mobile app synchronization QR code">
      <g fill="currentColor">{modules}</g>
      {[[20, 20], [298, 20], [20, 298]].map(([x, y]) => <g key={`${x}-${y}`} fill="none" stroke="currentColor" strokeWidth="7"><rect x={x} y={y} width="42" height="42" rx="6" /><rect x={x + 12} y={y + 12} width="18" height="18" rx="2" fill="currentColor" stroke="none" /></g>)}
      <g transform="translate(129.7 116.3) scale(.745)">
        <path d="M100.986 0 0 144.988h31.005L132.514 0h-31.528Z" fill="#fff" />
        <path d="m34.235 0 29.712 42.723-15.502 23.304L2.584 0h31.65Z" fill="url(#mobile-logo-top)" />
        <path d="M103.995 145 71.053 97.746 86.555 75.09 135 145h-31.005Z" fill="url(#mobile-logo-bottom)" />
      </g>
      <defs>
        <linearGradient id="mobile-logo-top" x1="27.129" y1="9.063" x2="69.773" y2="60.432" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity=".55" /></linearGradient>
        <linearGradient id="mobile-logo-bottom" x1="111.1" y1="133.996" x2="58.696" y2="63.5" gradientUnits="userSpaceOnUse"><stop stopColor="#6966ff" /><stop offset="1" stopColor="#6966ff" stopOpacity=".36" /></linearGradient>
      </defs>
    </svg>
  );
}

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
        <span><MobileSyncQr /></span>
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
