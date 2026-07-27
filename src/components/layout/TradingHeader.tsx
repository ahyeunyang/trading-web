import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "../icons/ChevronDown";
import { useLocale } from "../../i18n/Locale";
import { LangSelect } from "./LangSelect";
import {
  ApiDocIcon, ApiKeyIcon, ChartIcon, CommunityIcon, HelpIcon,
  ExternalIcon, MintscanIcon, PrivacyIcon, TermsIcon,
} from "../icons/MoreIcons";
import { BrandLogo } from "../icons/BrandLogo";
import { BellIcon, DeviceIcon } from "../icons/HeaderIcons";
import { SolanaIcon } from "../icons/SolanaIcon";
import dydxCoinImage from "../../assets/images/coins/dydx.png";
import usdcCoinImage from "../../assets/images/coins/usdc.png";
import appStoreBadge from "../../assets/images/stores/app-store-badge.png";
import googlePlayBadge from "../../assets/images/stores/google-play-badge.png";

export function TradingHeader() {
  const { t } = useLocale();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="topbar">
      <a className="topbar__brand" href="/" aria-label="홈">
        <BrandLogo className="topbar__logo" />
      </a>

      <LangSelect />

      <button className="topbar__net" type="button">Mainnet</button>

      <nav className="topbar__nav" aria-label="주요 메뉴">
        <a className="is-active" href="#trade">
          {t("trade")}
        </a>
        <a href="#spot">{t("spot")}</a>
        <a href="#markets">{t("markets")}</a>
        <a href="#portfolio">{t("portfolio")}</a>
        <a href="#megavault">MegaVault</a>
        <a href="#rewards">{t("rewards")}</a>
        <a className="topbar__dydx" href="#dydx">DYDX <i /></a>
        <details className="more">
          <summary>{t("more")}<ChevronDown /></summary>
          <div className="more__menu">
            <a href="#api-docs"><ApiDocIcon />{t("apiDocs")}</a>
            <a href="#api-keys"><ApiKeyIcon />{t("apiKeys")}</a>
            <a href="#mintscan"><MintscanIcon />{t("mintscan")}<ExternalIcon className="more__ext" /></a>
            <a href="#funding"><ChartIcon />{t("funding")}<ExternalIcon className="more__ext" /></a>
            <a href="#community"><CommunityIcon />{t("community")}<ExternalIcon className="more__ext" /></a>
            <a href="#terms"><TermsIcon />{t("terms")}</a>
            <a href="#privacy"><PrivacyIcon />{t("privacy")}</a>
            <a href="#help"><HelpIcon />{t("help")}</a>
            <a href="#stats"><ChartIcon />{t("stats")}</a>
          </div>
        </details>
      </nav>

      <div className="topbar__actions">
        <button className="icon-btn tip" type="button" aria-label="모바일 앱" data-tip="모바일 앱">
          <DeviceIcon className="icon" />
        </button>
        <button className="icon-btn tip" type="button" aria-label="도움말" data-tip={t("help")}>
          <HelpIcon className="icon" />
        </button>
        <button className="icon-btn tip" type="button" aria-label="알림" data-tip="알림">
          <BellIcon className="icon" />
        </button>
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
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            <span>dydx1ygq...c8ah</span>
            <ChevronDown />
          </button>

          {isAccountOpen && (
            <div className="account-menu" role="menu">
              <div className="account-menu__markets">
                <button type="button"><SolanaIcon /><span>스팟</span><b>□</b></button>
                <button type="button"><img src={dydxCoinImage} alt="" /><span>무기한</span><b>□</b></button>
              </div>

              <div className="account-menu__balances">
                <div>
                  <span>DYDX 잔액 <img src={dydxCoinImage} alt="DYDX" /></span>
                  <strong>0.0000</strong>
                </div>
                <div>
                  <span>USDC 잔액 <img src={usdcCoinImage} alt="USDC" /></span>
                  <strong>0.00</strong>
                  <button type="button" aria-label="USDC 입금"><i /></button>
                </div>
                <div>
                  <span>Spot Sol Balance <SolanaIcon /></span>
                  <strong>0.0000</strong>
                  <button type="button" aria-label="SOL 입금"><i /></button>
                </div>
              </div>

              <nav className="account-menu__links" aria-label="계정 메뉴">
                <button type="button"><i /><span>계정 관리</span></button>
                <button type="button"><i /><span>친구 초대</span><b>수수료 적립</b></button>
                <button type="button"><i /><span>환경설정</span></button>
                <button type="button"><i /><span>표시 설정</span></button>
                <button type="button"><i /><span>모바일 앱 다운로드</span></button>
                <button type="button"><i /><span>모바일로 로그인하세요</span></button>
                <button type="button"><i /><span>연결 해제</span></button>
              </nav>

              <div className="account-menu__apps">
                <p>휴대폰에서 dYdX 받기</p>
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
    </header>
  );
}
