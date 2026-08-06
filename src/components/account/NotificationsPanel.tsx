import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale, type Lang } from "../../i18n/Locale";
import { CloseIcon } from "../icons/CloseIcon";
import { SettingsIcon } from "../icons/AccountMenuIcons";
import { DangerButton } from "../ui/DangerButton";
import { LoadingButton } from "../ui/LoadingButton";
import { NotificationSettingsModal } from "./NotificationSettingsModal";
import "./NotificationsPanel.scss";

type NotificationKind = "notice" | "maintenance" | "trading";
type NotificationItem = { id: string; kind: NotificationKind; createdAt: number };

const STORAGE_KEY = "ayxx-notifications";
const LAST_NOTIFICATION_KEY = "ayxx-notifications-last-created";
const PUSH_KEY = "ayxx-push-enabled";
const HOUR = 60 * 60 * 1000;

const copy: Record<Lang, {
  search: string;
  enablePush: string;
  disablePush: string;
  clearAll: string;
  settings: string;
  empty: string;
  noResults: string;
  items: Record<NotificationKind, { title: string; body: string }>;
}> = {
  ko: {
    search: "검색", enablePush: "푸시 알림 사용", disablePush: "푸시 알림 사용 안 함", clearAll: "모두 지우기", settings: "알림 설정", empty: "새로운 알림이 없습니다.", noResults: "검색 결과가 없습니다.",
    items: {
      notice: { title: "공지사항", body: "AYXX 거래 서비스의 새로운 소식과 업데이트를 확인해 주세요." },
      maintenance: { title: "서비스 점검 안내", body: "안정적인 서비스 제공을 위해 일부 기능이 잠시 중단될 수 있습니다." },
      trading: { title: "거래 안내", body: "시장 변동성이 높습니다. 주문 전 가격과 포지션을 다시 확인해 주세요." },
    },
  },
  en: {
    search: "Search", enablePush: "Enable push notifications", disablePush: "Disable push notifications", clearAll: "Clear all", settings: "Notification settings", empty: "No new notifications.", noResults: "No notifications found.",
    items: {
      notice: { title: "Announcement", body: "Check out the latest AYXX trading service news and updates." },
      maintenance: { title: "Maintenance notice", body: "Some features may pause briefly while we improve service stability." },
      trading: { title: "Trading notice", body: "Market volatility is high. Review your price and position before ordering." },
    },
  },
  ja: {
    search: "検索", enablePush: "プッシュ通知を有効化", disablePush: "プッシュ通知を無効化", clearAll: "すべて消去", settings: "通知設定", empty: "新しい通知はありません。", noResults: "通知が見つかりません。",
    items: {
      notice: { title: "お知らせ", body: "AYXX取引サービスの最新情報をご確認ください。" },
      maintenance: { title: "メンテナンスのお知らせ", body: "安定性向上のため一部機能を一時停止する場合があります。" },
      trading: { title: "取引のお知らせ", body: "市場の変動性が高まっています。注文前に価格とポジションをご確認ください。" },
    },
  },
  zh: {
    search: "搜索", enablePush: "启用推送通知", disablePush: "停用推送通知", clearAll: "全部清除", settings: "通知设置", empty: "没有新通知。", noResults: "未找到通知。",
    items: {
      notice: { title: "公告", body: "请查看 AYXX 交易服务的最新消息和更新。" },
      maintenance: { title: "维护通知", body: "为提高服务稳定性，部分功能可能会短暂停止。" },
      trading: { title: "交易提示", body: "市场波动较大，下单前请再次确认价格和仓位。" },
    },
  },
  vi: {
    search: "Tìm kiếm", enablePush: "Bật thông báo đẩy", disablePush: "Tắt thông báo đẩy", clearAll: "Xóa tất cả", settings: "Cài đặt thông báo", empty: "Không có thông báo mới.", noResults: "Không tìm thấy thông báo.",
    items: {
      notice: { title: "Thông báo", body: "Xem tin tức và cập nhật mới nhất về dịch vụ giao dịch AYXX." },
      maintenance: { title: "Thông báo bảo trì", body: "Một số tính năng có thể tạm dừng để cải thiện độ ổn định." },
      trading: { title: "Lưu ý giao dịch", body: "Thị trường đang biến động mạnh. Hãy kiểm tra giá và vị thế trước khi đặt lệnh." },
    },
  },
  fr: {
    search: "Rechercher", enablePush: "Activer les notifications", disablePush: "Désactiver les notifications", clearAll: "Tout effacer", settings: "Paramètres de notification", empty: "Aucune nouvelle notification.", noResults: "Aucune notification trouvée.",
    items: {
      notice: { title: "Annonce", body: "Consultez les dernières actualités et mises à jour du service AYXX." },
      maintenance: { title: "Avis de maintenance", body: "Certaines fonctions peuvent être suspendues brièvement pour améliorer la stabilité." },
      trading: { title: "Avis de trading", body: "La volatilité est élevée. Vérifiez le prix et la position avant de passer un ordre." },
    },
  },
};

const kinds: NotificationKind[] = ["notice", "maintenance", "trading"];

function loadNotifications(): NotificationItem[] {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (Array.isArray(stored)) return stored;
  } catch {
    // Ignore invalid browser storage and restore the sample notifications.
  }

  const now = Date.now();
  return [
    { id: `notice-${now}`, kind: "notice", createdAt: now - 12 * 60 * 1000 },
    { id: `maintenance-${now}`, kind: "maintenance", createdAt: now - 48 * 60 * 1000 },
  ];
}

export function NotificationsPanel({ onClose }: { onClose: () => void }) {
  const { t, lang } = useLocale();
  const text = copy[lang];
  const [query, setQuery] = useState("");
  const [notifications, setNotifications] = useState<NotificationItem[]>(loadNotifications);
  const [isPushEnabled, setIsPushEnabled] = useState(() => {
    const storedPreference = localStorage.getItem(PUSH_KEY);
    return storedPreference === null ? true : storedPreference === "true";
  });
  const [isPushLoading, setIsPushLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pushTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSettingsOpen) onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isSettingsOpen, onClose]);

  useEffect(() => {
    if (!isPushEnabled) {
      localStorage.setItem(LAST_NOTIFICATION_KEY, String(Date.now()));
      return;
    }

    const createDueNotifications = () => {
      const now = Date.now();
      const lastCreated = Number(localStorage.getItem(LAST_NOTIFICATION_KEY)) || now;
      const dueCount = Math.min(Math.floor((now - lastCreated) / HOUR), 24);
      if (dueCount < 1) {
        if (!localStorage.getItem(LAST_NOTIFICATION_KEY)) localStorage.setItem(LAST_NOTIFICATION_KEY, String(now));
        return;
      }

      setNotifications((current) => {
        const additions = Array.from({ length: dueCount }, (_, index) => ({
          id: `${now}-${index}`,
          kind: kinds[(current.length + index) % kinds.length],
          createdAt: lastCreated + (index + 1) * HOUR,
        }));
        return [...additions.reverse(), ...current].slice(0, 50);
      });
      localStorage.setItem(LAST_NOTIFICATION_KEY, String(lastCreated + dueCount * HOUR));
    };

    createDueNotifications();
    const interval = window.setInterval(createDueNotifications, 60 * 1000);
    return () => window.clearInterval(interval);
  }, [isPushEnabled]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => () => {
    if (pushTimerRef.current !== null) window.clearTimeout(pushTimerRef.current);
  }, []);

  const filteredNotifications = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return notifications;
    return notifications.filter(({ kind }) => {
      const item = text.items[kind];
      return `${item.title} ${item.body}`.toLocaleLowerCase().includes(normalizedQuery);
    });
  }, [notifications, query, text]);

  const togglePushNotifications = () => {
    setIsPushLoading(true);
    pushTimerRef.current = window.setTimeout(() => {
      setIsPushEnabled((current) => {
        localStorage.setItem(PUSH_KEY, String(!current));
        return !current;
      });
      setIsPushLoading(false);
      pushTimerRef.current = null;
    }, 700);
  };

  return createPortal(
    <div className="notifications-panel__backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <aside className="notifications-panel" role="dialog" aria-modal="true" aria-labelledby="notifications-panel-title">
        <header className="notifications-panel__header">
          <h2 id="notifications-panel-title">{t("notifications")}</h2>
          <div>
            <button type="button" aria-label={text.settings} onClick={() => setIsSettingsOpen(true)}><SettingsIcon /></button>
            <button type="button" aria-label={t("close")} onClick={onClose}><CloseIcon /></button>
          </div>
        </header>

        <label className="notifications-panel__search">
          <span className="sr-only">{text.search}</span>
          <input type="search" placeholder={text.search} value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>

        <div className="notifications-panel__content">
          {filteredNotifications.map(({ id, kind, createdAt }) => {
            const item = text.items[kind];
            return (
              <article className="notifications-panel__item" key={id}>
                <i aria-hidden="true" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                  <time dateTime={new Date(createdAt).toISOString()}>
                    {new Intl.DateTimeFormat(lang, { hour: "2-digit", minute: "2-digit" }).format(createdAt)}
                  </time>
                </div>
              </article>
            );
          })}
          {notifications.length === 0 && <p className="notifications-panel__empty">{text.empty}</p>}
          {notifications.length > 0 && filteredNotifications.length === 0 && <p className="notifications-panel__empty">{text.noResults}</p>}
        </div>

        <footer className="notifications-panel__footer">
          <LoadingButton
            className={`notifications-panel__push${isPushEnabled ? " is-enabled" : ""}`}
            isLoading={isPushLoading}
            onClick={togglePushNotifications}
          >
            {isPushEnabled ? text.disablePush : text.enablePush}
          </LoadingButton>
          <DangerButton disabled={notifications.length === 0} onClick={() => setNotifications([])}>{text.clearAll}</DangerButton>
        </footer>
      </aside>
      {isSettingsOpen && <NotificationSettingsModal onClose={() => setIsSettingsOpen(false)} />}
    </div>,
    document.body,
  );
}
