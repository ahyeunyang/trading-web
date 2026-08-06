import { useEffect, useState } from "react";
import { useLocale, type Lang } from "../../i18n/Locale";
import { CloseIcon } from "../icons/CloseIcon";
import { Modal } from "../ui/Modal";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import "./NotificationSettingsModal.scss";

type Settings = {
  general: boolean;
  transfers: boolean;
  trading: boolean;
  marketEvents: boolean;
  chat: boolean;
};

const STORAGE_KEY = "ayxx-notification-settings";
const defaults: Settings = { general: true, transfers: true, trading: true, marketEvents: true, chat: false };

const copy: Record<Lang, {
  title: string;
  notifications: string;
  general: string;
  transfers: string;
  trading: string;
  other: string;
  marketEvents: string;
  chat: string;
}> = {
  ko: { title: "환경설정", notifications: "알림", general: "일반", transfers: "전송", trading: "거래", other: "기타", marketEvents: "포지션/주문/채우기의 모든 시장 기본값", chat: "채팅 활성화" },
  en: { title: "Preferences", notifications: "Notifications", general: "General", transfers: "Transfers", trading: "Trading", other: "Other", marketEvents: "Default all markets for positions/orders/fills", chat: "Enable chat" },
  ja: { title: "環境設定", notifications: "通知", general: "一般", transfers: "送金", trading: "取引", other: "その他", marketEvents: "ポジション・注文・約定の全市場デフォルト", chat: "チャットを有効化" },
  zh: { title: "偏好设置", notifications: "通知", general: "常规", transfers: "转账", trading: "交易", other: "其他", marketEvents: "持仓、订单和成交的所有市场默认值", chat: "启用聊天" },
  vi: { title: "Tùy chọn", notifications: "Thông báo", general: "Chung", transfers: "Chuyển tiền", trading: "Giao dịch", other: "Khác", marketEvents: "Mặc định mọi thị trường cho vị thế/lệnh/khớp lệnh", chat: "Bật trò chuyện" },
  fr: { title: "Préférences", notifications: "Notifications", general: "Général", transfers: "Transferts", trading: "Trading", other: "Autre", marketEvents: "Tous les marchés par défaut pour positions/ordres/exécutions", chat: "Activer le chat" },
};

function loadSettings(): Settings {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (stored && typeof stored === "object") return { ...defaults, ...stored };
  } catch {
    // Restore defaults when browser storage contains invalid data.
  }
  return defaults;
}

export function NotificationSettingsModal({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLocale();
  const text = copy[lang];
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const update = (key: keyof Settings, checked: boolean) => {
    setSettings((current) => ({ ...current, [key]: checked }));
  };

  const row = (key: keyof Settings, label: string) => (
    <div className="notification-settings-modal__row">
      <span>{label}</span>
      <ToggleSwitch checked={settings[key]} aria-label={label} onChange={(checked) => update(key, checked)} />
    </div>
  );

  return (
    <Modal className="notification-settings-modal" backdropClassName="notification-settings-modal__backdrop" labelledBy="notification-settings-modal-title" onClose={onClose}>
      <header className="notification-settings-modal__header">
        <h2 id="notification-settings-modal-title">{text.title}</h2>
        <button type="button" aria-label={t("close")} onClick={onClose}><CloseIcon /></button>
      </header>
      <section>
        <h3>{text.notifications}</h3>
        {row("general", text.general)}
        {row("transfers", text.transfers)}
        {row("trading", text.trading)}
      </section>
      <section className="notification-settings-modal__other">
        <h3>{text.other}</h3>
        {row("marketEvents", text.marketEvents)}
        {row("chat", text.chat)}
      </section>
    </Modal>
  );
}
