import { ChevronDown } from "../icons/ChevronDown";
import { useLocale } from "../../i18n/Locale";
import { LangSelect } from "./LangSelect";
import {
  ApiDocIcon, ApiKeyIcon, ChartIcon, CommunityIcon, HelpIcon,
  ExternalIcon, MintscanIcon, PrivacyIcon, TermsIcon,
} from "../icons/MoreIcons";
import { BrandLogo } from "../icons/BrandLogo";
import { BellIcon, DeviceIcon } from "../icons/HeaderIcons";

export function TradingHeader() {
  const { t } = useLocale();

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
        <button className="btn btn--primary topbar__login" type="button">
          {t("login")}
        </button>
      </div>
    </header>
  );
}
