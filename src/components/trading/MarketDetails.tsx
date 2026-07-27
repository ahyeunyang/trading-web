import btcIcon from "../../assets/images/coins/btc.png";
import { useLocale } from "../../i18n/Locale";
import { ExternalIcon } from "../icons/MoreIcons";

const resources = [
  { key: "whitepaper" as const, href: "https://bitcoin.org/bitcoin.pdf" },
  { key: "website" as const, href: "https://bitcoin.org/" },
  { key: "coinMarketCap" as const, href: "https://coinmarketcap.com/currencies/bitcoin/" },
];

export function MarketDetails() {
  const { t } = useLocale();
  const specifications = [
    [t("ticker"), "BTC-USD"],
    [t("type"), t("cross")],
    [t("tickSize"), "$1"],
    [t("stepSize"), <span className="market-details__unit">0.0001 BTC</span>],
    [t("minimumOrderSize"), <span className="market-details__unit">0.0001 BTC</span>],
    [t("maxLeverage"), "50.00×"],
    [t("maintenanceMarginRate"), "1.2000%"],
    [t("initialMarginRate"), "2.0000%"],
  ];

  return (
    <div className="market-details">
      <article className="market-details__summary">
        <header>
          <img src={btcIcon} alt="" />
          <h3>{t("bitcoinName")}</h3>
        </header>
        <p>{t("bitcoinDescription1")}</p>
        <p>{t("bitcoinDescription2")}</p>
        <nav className="market-details__links" aria-label={t("marketResources")}>
          {resources.map(({ key, href }) => (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer">
              {t(key)}
              <ExternalIcon />
            </a>
          ))}
        </nav>
      </article>

      <dl className="market-details__specifications">
        {specifications.map(([label, value]) => (
          <div key={label as string}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
