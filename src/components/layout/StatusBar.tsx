import { useLocale } from "../../i18n/Locale";

export function StatusBar() {
  const { t } = useLocale();
  return (
    <footer className="status">
      <button className="status__live" type="button">
        <i />
        <span>{t("operational")}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M5.07692 4.25H4.38462C3.61991 4.25 3 4.86991 3 5.63462V11.8654C3 12.6301 3.61991 13.25 4.38462 13.25H10.6154C11.3801 13.25 12 12.6301 12 11.8654V10.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 8.5L13 3.5M13 3.5H9M13 3.5V7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      </button>
      <button type="button">{t("chat")}</button>
      <button type="button">{t("helpSupport")}</button>
      <span className="status__notice">
        <span>{t("openSourceNotice")}</span>
        <button type="button">{t("learnMore")}</button>
      </span>
    </footer>
  );
}
