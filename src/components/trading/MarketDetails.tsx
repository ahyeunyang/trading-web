import { useLocale } from "../../i18n/Locale";
import { ExternalIcon } from "../icons/MoreIcons";
import { Tooltip } from "../ui/Tooltip";
import { UnitBadge } from "../ui/UnitBadge";
import type { Market } from "./MarketPanel";

const resources = [
  { key: "whitepaper" as const, href: "https://bitcoin.org/bitcoin.pdf" },
  { key: "website" as const, href: "https://bitcoin.org/" },
  { key: "coinMarketCap" as const, href: "https://coinmarketcap.com/currencies/bitcoin/" },
];

const marketNames: Record<string, string> = {
  BTC: "Bitcoin", ETH: "Ethereum", XRP: "XRP", SOL: "Solana", SHIB: "Shiba Inu",
  BNB: "BNB", HYPE: "Hyperliquid", DOGE: "Dogecoin", PEPE: "Pepe", ZEC: "Zcash",
  TAO: "Bittensor", PAXG: "PAX Gold", AVAX: "Avalanche", LINK: "Chainlink",
  HBAR: "Hedera", ALGO: "Algorand", SUI: "Sui", NEAR: "NEAR Protocol",
  UNI: "Uniswap", AYXX: "AYXX",
};

export function MarketDetails({ market }: { market: Market }) {
  const { t } = useLocale();
  const specifications = [
    { label: t("ticker"), value: market.name },
    { label: t("type"), value: t("cross") },
    { label: t("tickSize"), value: "$1", tip: t("tickSizeTip") },
    {
      label: t("stepSize"),
      value: <span className="market-details__measurement"><span>0.0001</span><UnitBadge className="market-details__unit">{market.symbol}</UnitBadge></span>,
      tip: t("stepSizeTip"),
    },
    {
      label: t("minimumOrderSize"),
      value: <span className="market-details__measurement"><span>0.0001</span><UnitBadge className="market-details__unit">{market.symbol}</UnitBadge></span>,
    },
    { label: t("maxLeverage"), value: market.leverage.replace("×", ".00×"), tip: t("maxLeverageTip") },
    { label: t("maintenanceMarginRate"), value: "1.2000%", tip: t("maintenanceMarginRateTip") },
    { label: t("initialMarginRate"), value: "2.0000%", tip: t("initialMarginRateTip") },
  ];

  return (
    <div className="market-details">
      <article className="market-details__summary">
        <header>
          <img src={market.image} alt={`${marketNames[market.symbol] ?? market.symbol} logo`} />
          <h3>{marketNames[market.symbol] ?? market.symbol}</h3>
        </header>
        <p className="market-details__lead">{t("bitcoinDescription1")}</p>
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
        {specifications.map(({ label, value, tip }) => (
          <div key={label}>
            <dt>
              {tip ? (
                <Tooltip content={tip} portal>
                  <span className="market-details__label-tip">{label}</span>
                </Tooltip>
              ) : label}
            </dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
