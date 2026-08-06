import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "../icons/ChevronDown";
import { useLocale } from "../../i18n/Locale";
import { LangSelect } from "./LangSelect";
import {
  ApiDocIcon,
  ApiKeyIcon,
  ChartIcon,
  CommunityIcon,
  HelpIcon,
  ExternalIcon,
  MintscanIcon,
  PrivacyIcon,
  TermsIcon,
} from "../icons/MoreIcons";
import { BrandLogo } from "../icons/BrandLogo";
import { BellIcon, DeviceIcon } from "../icons/HeaderIcons";
import { CloseIcon } from "../icons/CloseIcon";
import { SolanaIcon } from "../icons/SolanaIcon";
import {
  AccountIcon,
  BalanceActionIcon,
  CopyIcon,
  DisconnectIcon,
  GiftIcon,
  HeaderDepositIcon,
  QrIcon,
  SettingsIcon,
} from "../icons/AccountMenuIcons";
import ayxxCoinImage from "../../assets/images/coins/ayxx.png";
import usdcCoinImage from "../../assets/images/coins/usdc.png";
import appStoreBadge from "../../assets/images/stores/app-store-badge.png";
import googlePlayBadge from "../../assets/images/stores/google-play-badge.png";
import type { AppPage } from "../../App";
import type { Lang } from "../../i18n/Locale";
import { Modal } from "../ui/Modal";
import { DiscordIcon, LiveChatIcon, SupportCenterIcon } from "../icons/HelpMenuIcons";
import { ApiKeysModal } from "../account/ApiKeysModal";
import { MobileAppModal } from "../account/MobileAppModal";
import { MobileAppDownloadModal } from "../account/MobileAppDownloadModal";
import { MobileLoginModal } from "../account/MobileLoginModal";
import { SecretPhraseModal } from "../account/SecretPhraseModal";
import { DepositModal } from "../account/DepositModal";
import { NotificationsPanel } from "../account/NotificationsPanel";
import { AccountManagementModal } from "../account/AccountManagementModal";
import { NotificationSettingsModal } from "../account/NotificationSettingsModal";
import { DisplaySettingsModal } from "../account/DisplaySettingsModal";
import { AffiliateProgramModal } from "../account/AffiliateProgramModal";
import { ThemeModeIcon } from "../icons/ThemeModeIcon";
import { Tooltip } from "../ui/Tooltip";

const helpMenuCopy: Record<Lang, {
  title: string;
  supportCenter: string;
  supportDescription: string;
  liveChat: string;
  chatDescription: string;
  community: string;
  communityDescription: string;
  disclaimerPrefix: string;
  disclaimerMiddle: string;
  disclaimerSuffix: string;
}> = {
  ko: { title: "도움말", supportCenter: "고객 지원 센터", supportDescription: "튜토리얼 및 도움말 게시글 둘러보기", liveChat: "라이브 채팅", chatDescription: "실시간 지원 및 도움 받기", community: "커뮤니티", communityDescription: "다른 트레이더들과 대화", disclaimerPrefix: "이 사이트는 AYXX에서 운영되며, ", disclaimerMiddle: "과 ", disclaimerSuffix: "에 따라 운영됩니다." },
  en: { title: "Help", supportCenter: "Support Center", supportDescription: "Browse tutorials and help articles", liveChat: "Live Chat", chatDescription: "Get real-time support and help", community: "Community", communityDescription: "Chat with other traders", disclaimerPrefix: "This site is operated by AYXX and is subject to our ", disclaimerMiddle: " and ", disclaimerSuffix: "." },
  ja: { title: "ヘルプ", supportCenter: "サポートセンター", supportDescription: "チュートリアルとヘルプ記事を見る", liveChat: "ライブチャット", chatDescription: "リアルタイムでサポートを受ける", community: "コミュニティ", communityDescription: "ほかのトレーダーと交流", disclaimerPrefix: "本サイトはAYXXが運営し、", disclaimerMiddle: "および", disclaimerSuffix: "が適用されます。" },
  zh: { title: "帮助", supportCenter: "客户支持中心", supportDescription: "浏览教程和帮助文章", liveChat: "在线聊天", chatDescription: "获取实时支持和帮助", community: "社区", communityDescription: "与其他交易者交流", disclaimerPrefix: "本网站由AYXX运营，并受", disclaimerMiddle: "和", disclaimerSuffix: "约束。" },
  vi: { title: "Trợ giúp", supportCenter: "Trung tâm hỗ trợ", supportDescription: "Xem hướng dẫn và bài viết trợ giúp", liveChat: "Trò chuyện trực tiếp", chatDescription: "Nhận hỗ trợ theo thời gian thực", community: "Cộng đồng", communityDescription: "Trò chuyện với các nhà giao dịch khác", disclaimerPrefix: "Trang này do AYXX vận hành và tuân theo ", disclaimerMiddle: " cùng ", disclaimerSuffix: "." },
  fr: { title: "Aide", supportCenter: "Centre d’assistance", supportDescription: "Parcourir les tutoriels et articles d’aide", liveChat: "Chat en direct", chatDescription: "Obtenir une assistance en temps réel", community: "Communauté", communityDescription: "Échanger avec d’autres traders", disclaimerPrefix: "Ce site est exploité par AYXX et soumis à nos ", disclaimerMiddle: " et à notre ", disclaimerSuffix: "." },
};

type TradingHeaderProps = {
  activePage: AppPage;
  onPageChange: (page: AppPage) => void;
};

export function TradingHeader({
  activePage,
  onPageChange,
}: TradingHeaderProps) {
  const { t, lang } = useLocale();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isApiDocsModalOpen, setIsApiDocsModalOpen] = useState(false);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const [isApiKeysModalOpen, setIsApiKeysModalOpen] = useState(false);
  const [isMobileAppModalOpen, setIsMobileAppModalOpen] = useState(false);
  const [isMobileAppDownloadOpen, setIsMobileAppDownloadOpen] = useState(false);
  const [isMobileLoginOpen, setIsMobileLoginOpen] = useState(false);
  const [isDisconnectOpen, setIsDisconnectOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAccountManagementOpen, setIsAccountManagementOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isDisplaySettingsOpen, setIsDisplaySettingsOpen] = useState(false);
  const [isAffiliateProgramOpen, setIsAffiliateProgramOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!moreMenuRef.current?.contains(event.target as Node)) {
        moreMenuRef.current?.removeAttribute("open");
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        moreMenuRef.current?.removeAttribute("open");
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (!isAccountOpen) return;

    const closeAccountMenu = (event: MouseEvent) => {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsAccountOpen(false);
    };

    document.addEventListener("mousedown", closeAccountMenu);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeAccountMenu);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isAccountOpen]);

  const openApiDocsModal = () => {
    setIsApiDocsModalOpen(true);
    document.querySelector<HTMLDetailsElement>(".more")?.removeAttribute("open");
  };

  const openHelpMenu = () => {
    setIsHelpMenuOpen(true);
    document.querySelector<HTMLDetailsElement>(".more")?.removeAttribute("open");
  };

  const helpCopy = helpMenuCopy[lang];

  return (
    <header className="topbar">
      <a className="topbar__brand" href="/" aria-label="홈">
        <BrandLogo className="topbar__logo" />
      </a>

      <LangSelect />

      <button className="topbar__net" type="button">
        Mainnet
      </button>

      <nav className="topbar__nav" aria-label="주요 메뉴">
        <button
          className={activePage === "trade" ? "is-active" : undefined}
          type="button"
          onClick={() => onPageChange("trade")}
        >
          {t("trade")}
        </button>
        <button
          className={activePage === "markets" ? "is-active" : undefined}
          type="button"
          onClick={() => onPageChange("markets")}
        >
          {t("markets")}
        </button>
        <button
          className={activePage === "portfolio" ? "is-active" : undefined}
          type="button"
          onClick={() => onPageChange("portfolio")}
        >
          {t("portfolio")}
        </button>
        <a href="#megavault">MegaVault</a>
        <a href="#rewards">{t("rewards")}</a>
        <a className="topbar__ayxx" href="#ayxx">
          AYXX <i />
        </a>
        <details className="more" ref={moreMenuRef}>
          <summary>
            {t("more")}
            <ChevronDown />
          </summary>
          <div className="more__menu">
            <button type="button" onClick={openApiDocsModal}>
              <ApiDocIcon />
              {t("apiDocs")}
            </button>
            <button type="button" onClick={() => { setIsApiKeysModalOpen(true); document.querySelector<HTMLDetailsElement>(".more")?.removeAttribute("open"); }}>
              <ApiKeyIcon />
              {t("apiKeys")}
            </button>
            <a href="#mintscan">
              <MintscanIcon />
              {t("mintscan")}
              <ExternalIcon className="more__ext" />
            </a>
            <a href="#funding">
              <ChartIcon />
              {t("funding")}
              <ExternalIcon className="more__ext" />
            </a>
            <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">
              <CommunityIcon />
              {t("community")}
              <ExternalIcon className="more__ext" />
            </a>
            <button
              type="button"
              onClick={() => {
                onPageChange("terms");
                document.querySelector<HTMLDetailsElement>(".more")?.removeAttribute("open");
              }}
            >
              <TermsIcon />
              {t("terms")}
            </button>
            <button
              type="button"
              onClick={() => {
                onPageChange("privacy");
                document.querySelector<HTMLDetailsElement>(".more")?.removeAttribute("open");
              }}
            >
              <PrivacyIcon />
              {t("privacy")}
            </button>
            <button type="button" onClick={openHelpMenu}>
              <HelpIcon />
              {t("help")}
            </button>
            <a href="#stats">
              <ChartIcon />
              {t("stats")}
            </a>
          </div>
        </details>
      </nav>

      <div className="topbar__actions">
        <button
          className="topbar__deposit"
          type="button"
          onClick={() => setIsDepositModalOpen(true)}
        >
          <HeaderDepositIcon />
          <span>{t("deposit")}</span>
        </button>
        <Tooltip className="hint--control" content={t("mobileApp")} portal>
          <button className="icon-btn" type="button" aria-label={t("mobileApp")} onClick={() => setIsMobileAppModalOpen(true)}>
            <DeviceIcon className="icon" />
          </button>
        </Tooltip>
        <Tooltip className="hint--control" content={t("help")} portal>
          <button className="icon-btn" type="button" aria-label={t("help")} onClick={openHelpMenu}>
            <HelpIcon className="icon" />
          </button>
        </Tooltip>
        <Tooltip className="hint--control" content={t("notifications")} portal>
          <button
            className={`icon-btn${isNotificationsOpen ? " is-active" : ""}`}
            type="button"
            aria-label={t("notifications")}
            aria-haspopup="dialog"
            aria-expanded={isNotificationsOpen}
            onClick={() => setIsNotificationsOpen((isOpen) => !isOpen)}
          >
            <BellIcon className="icon" />
          </button>
        </Tooltip>
        <div className="topbar__account-wrap" ref={accountMenuRef}>
          <button
            className="topbar__account"
            type="button"
            aria-label="Google 계정 메뉴"
            aria-haspopup="menu"
            aria-expanded={isAccountOpen}
            onClick={() => setIsAccountOpen((isOpen) => !isOpen)}
          >
            <svg
              className="topbar__google"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              aria-hidden="true"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            <span>ayxx1ygq...c8ah</span>
            <ChevronDown />
          </button>

          {isAccountOpen && (
            <div className="account-menu" role="menu">
              <div className="account-menu__markets">
                <button type="button">
                  <SolanaIcon />
                  <span>{t("spot")}</span>
                  <CopyIcon className="account-menu__copy" />
                </button>
                <button type="button">
                  <img src={ayxxCoinImage} alt="" />
                  <span>{t("perpetual")}</span>
                  <CopyIcon className="account-menu__copy" />
                </button>
              </div>

              <div className="account-menu__balances">
                <div>
                  <span>
                    {t("ayxxBalance")} <img src={ayxxCoinImage} alt="AYXX" />
                  </span>
                  <strong>0.0000</strong>
                </div>
                <div>
                  <span>
                    {t("usdcBalance")} <img src={usdcCoinImage} alt="USDC" />
                  </span>
                  <strong>0.00</strong>
                  <button type="button" aria-label="USDC 전송">
                    <BalanceActionIcon />
                  </button>
                </div>
                <div>
                  <span>
                    Spot Sol Balance <SolanaIcon />
                  </span>
                  <strong>0.0000</strong>
                  <button type="button" aria-label="SOL 전송">
                    <BalanceActionIcon />
                  </button>
                </div>
              </div>

              <nav className="account-menu__links" aria-label="계정 메뉴">
                <button type="button" onClick={() => { setIsAccountOpen(false); setIsAccountManagementOpen(true); }}>
                  <AccountIcon />
                  <span>{t("accountManagement")}</span>
                </button>
                <button type="button" onClick={() => { setIsAccountOpen(false); setIsAffiliateProgramOpen(true); }}>
                  <GiftIcon />
                  <span>{t("inviteFriends")}</span>
                  <b>{t("earnFees")}</b>
                </button>
                <button type="button" onClick={() => { setIsAccountOpen(false); setIsPreferencesOpen(true); }}>
                  <SettingsIcon />
                  <span>{t("preferences")}</span>
                </button>
                <button type="button" onClick={() => { setIsAccountOpen(false); setIsDisplaySettingsOpen(true); }}>
                  <ThemeModeIcon />
                  <span>{t("displaySettings")}</span>
                </button>
                <button type="button" onClick={() => { setIsAccountOpen(false); setIsMobileAppDownloadOpen(true); }}>
                  <QrIcon />
                  <span>{t("downloadMobileApp")}</span>
                </button>
                <button type="button" onClick={() => { setIsAccountOpen(false); setIsMobileLoginOpen(true); }}>
                  <QrIcon />
                  <span>{t("loginWithMobile")}</span>
                </button>
                <button type="button" onClick={() => { setIsAccountOpen(false); setIsDisconnectOpen(true); }}>
                  <DisconnectIcon />
                  <span>{t("disconnect")}</span>
                </button>
              </nav>

              <div className="account-menu__apps">
                <p>{t("getAyxxMobile")}</p>
                <div>
                  <button type="button" aria-label="Google Play에서 다운로드">
                    <img src={googlePlayBadge} alt="Google Play에서 다운로드" />
                  </button>
                  <button type="button" aria-label="App Store에서 다운로드">
                    <img src={appStoreBadge} alt="App Store에서 다운로드" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isApiDocsModalOpen && (
        <Modal
          className="external-site-modal"
          backdropClassName="external-site-modal__backdrop"
          labelledBy="external-site-modal-title"
          onClose={() => setIsApiDocsModalOpen(false)}
        >
            <header className="external-site-modal__header">
              <h2 id="external-site-modal-title">웹사이트에서 나가는 중</h2>
              <button
                className="external-site-modal__close"
                type="button"
                aria-label="닫기"
                onClick={() => setIsApiDocsModalOpen(false)}
              >
                <CloseIcon />
              </button>
            </header>
            <p>
              계속하면 당사 웹사이트를 떠나 당사와 독립적이며 관련이 없는 제3자가
              제공하는 웹사이트에 가입하게 됩니다.
            </p>
            <strong>
              당사는 타사 웹 사이트에서 취한 조치나 콘텐츠에 대해 책임을 지지
              않습니다.
            </strong>
            <button
              className="external-site-modal__continue"
              type="button"
            >
              계속하기
            </button>
        </Modal>
      )}

      {isApiKeysModalOpen && <ApiKeysModal onClose={() => setIsApiKeysModalOpen(false)} />}
      {isMobileAppModalOpen && <MobileAppModal onClose={() => setIsMobileAppModalOpen(false)} />}
      {isMobileAppDownloadOpen && <MobileAppDownloadModal onClose={() => setIsMobileAppDownloadOpen(false)} />}
      {isMobileLoginOpen && (
        <MobileLoginModal
          onClose={() => setIsMobileLoginOpen(false)}
          onContinue={() => {
            setIsMobileLoginOpen(false);
            setIsMobileAppModalOpen(true);
          }}
        />
      )}
      {isDepositModalOpen && <DepositModal onClose={() => setIsDepositModalOpen(false)} />}
      {isNotificationsOpen && <NotificationsPanel onClose={() => setIsNotificationsOpen(false)} />}
      {isAccountManagementOpen && <AccountManagementModal onClose={() => setIsAccountManagementOpen(false)} />}
      {isPreferencesOpen && <NotificationSettingsModal onClose={() => setIsPreferencesOpen(false)} />}
      {isDisplaySettingsOpen && <DisplaySettingsModal onClose={() => setIsDisplaySettingsOpen(false)} />}
      {isAffiliateProgramOpen && <AffiliateProgramModal onClose={() => setIsAffiliateProgramOpen(false)} />}
      {isDisconnectOpen && (
        <SecretPhraseModal
          kind="ayxx"
          initialDisconnect
          onClose={() => setIsDisconnectOpen(false)}
        />
      )}

      {isHelpMenuOpen && (
        <Modal
          className="help-menu-modal"
          backdropClassName="help-menu-modal__backdrop"
          labelledBy="help-menu-modal-title"
          onClose={() => setIsHelpMenuOpen(false)}
        >
            <header className="help-menu-modal__header">
              <h2 id="help-menu-modal-title">{helpCopy.title}</h2>
              <button type="button" aria-label={t("close")} onClick={() => setIsHelpMenuOpen(false)}><CloseIcon /></button>
            </header>
            <div className="help-menu-modal__actions">
              <button
                type="button"
                onClick={() => {
                  setIsHelpMenuOpen(false);
                  window.dispatchEvent(new CustomEvent("open-ayxx-help", { detail: { tab: "help" } }));
                }}
              >
                <SupportCenterIcon />
                <span><strong>{helpCopy.supportCenter}</strong><small>{helpCopy.supportDescription}</small></span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsHelpMenuOpen(false);
                  window.dispatchEvent(new CustomEvent("open-ayxx-help", { detail: { tab: "messages" } }));
                }}
              >
                <LiveChatIcon />
                <span><strong>{helpCopy.liveChat}</strong><small>{helpCopy.chatDescription}</small></span>
              </button>
              <button
                type="button"
                onClick={() => window.open("https://discord.com/", "_blank", "noopener,noreferrer")}
              >
                <DiscordIcon />
                <span><strong>{helpCopy.community}</strong><small>{helpCopy.communityDescription}</small></span>
              </button>
            </div>
            <div className="help-menu-modal__version">Release - 64e4587<br />Version - 2.19.8</div>
            <p>
              {helpCopy.disclaimerPrefix}
              <button type="button" onClick={() => { setIsHelpMenuOpen(false); onPageChange("terms"); }}>{t("terms")}</button>
              {helpCopy.disclaimerMiddle}
              <button type="button" onClick={() => { setIsHelpMenuOpen(false); onPageChange("privacy"); }}>{t("privacy")}</button>
              {helpCopy.disclaimerSuffix}
            </p>
        </Modal>
      )}
    </header>
  );
}
