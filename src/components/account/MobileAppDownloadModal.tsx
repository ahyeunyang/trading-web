import { useLocale, type Lang } from "../../i18n/Locale";
import { CloseIcon } from "../icons/CloseIcon";
import { Modal } from "../ui/Modal";
import { MobileAppQr } from "./MobileAppQr";
import "./MobileAppDownloadModal.scss";

const copy: Record<Lang, { title: string; description: string; done: string; close: string }> = {
  ko: { title: "모바일 앱 다운로드", description: "스캔하여 앱 다운로드", done: "종료", close: "닫기" },
  en: { title: "Download mobile app", description: "Scan to download the app", done: "Done", close: "Close" },
  ja: { title: "モバイルアプリをダウンロード", description: "スキャンしてアプリをダウンロード", done: "完了", close: "閉じる" },
  zh: { title: "下载移动应用", description: "扫描二维码下载应用", done: "完成", close: "关闭" },
  vi: { title: "Tải ứng dụng di động", description: "Quét để tải ứng dụng", done: "Xong", close: "Đóng" },
  fr: { title: "Télécharger l’application mobile", description: "Scannez pour télécharger l’application", done: "Terminer", close: "Fermer" },
};

export function MobileAppDownloadModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLocale();
  const text = copy[lang];

  return (
    <Modal
      className="mobile-app-download-modal"
      backdropClassName="mobile-app-download-modal__backdrop"
      labelledBy="mobile-app-download-modal-title"
      onClose={onClose}
    >
      <header className="mobile-app-download-modal__header">
        <h2 id="mobile-app-download-modal-title">{text.title}</h2>
        <button type="button" aria-label={text.close} onClick={onClose}><CloseIcon /></button>
      </header>
      <p>{text.description}</p>
      <div className="mobile-app-download-modal__qr-wrap">
        <MobileAppQr />
      </div>
      <footer>
        <button type="button" onClick={onClose}>{text.done}</button>
      </footer>
    </Modal>
  );
}
