import { useEffect, useMemo, useRef, useState } from "react";
import { MarketDown } from "../icons/ChevronDown";
import { Tooltip } from "../ui/Tooltip";
import { FavoriteStar } from "../ui/FavoriteStar";
import { MarketCategoryTabs } from "../ui/MarketCategoryTabs";
import { VolumeSortButton } from "../ui/VolumeSortButton";
import { SelectMenu } from "../ui/SelectMenu";
import { useLocale } from "../../i18n/Locale";
import avaxImage from "../../assets/images/coins/avax.png";
import algoImage from "../../assets/images/coins/algo.png";
import ayxxImage from "../../assets/images/coins/ayxx.png";
import bnbImage from "../../assets/images/coins/bnb.png";
import btcImage from "../../assets/images/coins/btc.png";
import dogeImage from "../../assets/images/coins/doge.png";
import ethImage from "../../assets/images/coins/eth.png";
import hypeImage from "../../assets/images/coins/hype.png";
import hbarImage from "../../assets/images/coins/hbar.png";
import linkImage from "../../assets/images/coins/link.png";
import nearImage from "../../assets/images/coins/near.png";
import paxgImage from "../../assets/images/coins/paxg.png";
import pepeImage from "../../assets/images/coins/pepe.png";
import shibImage from "../../assets/images/coins/shib.png";
import solImage from "../../assets/images/coins/sol.png";
import suiImage from "../../assets/images/coins/sui.png";
import taoImage from "../../assets/images/coins/tao.png";
import xrpImage from "../../assets/images/coins/xrp.png";
import uniImage from "../../assets/images/coins/uni.png";
import zecImage from "../../assets/images/coins/zec.png";

type MarketPanelProps = {
  quantityUnit: "BTC" | "USD";
  selected: Market;
  onSelect: (market: Market) => void;
  favorites: Set<string>;
  onToggleFavorite: (symbol: string) => void;
};

export type Market = {
  symbol: string;
  name: string;
  leverage: string;
  price: string;
  change: number;
  volume: string;
  spotVolume: string;
  marketCap: string;
  color: string;
  category: string;
  image: string;
};

const coinCapIcon = (symbol: string) => `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
const inlineMarketIcon = (background: string, foreground: string, content: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="64" fill="${background}"/><text x="64" y="72" text-anchor="middle" fill="${foreground}" font-family="Arial,sans-serif" font-size="32" font-weight="700">${content}</text></svg>`)}`;

const marketCatalog: Market[] = [
  { symbol: "BTC", name: "BTC-USD", leverage: "50×", price: "$65,247", change: 1.19, volume: "US$486만", spotVolume: "US$162억", marketCap: "US$1.31조", color: "#f7931a", category: "전체", image: btcImage },
  { symbol: "ETH", name: "ETH-USD", leverage: "50×", price: "$1,951.7", change: 3.58, volume: "US$246만", spotVolume: "US$80.5억", marketCap: "US$2360억", color: "#8d95a5", category: "레이어 1", image: ethImage },
  { symbol: "XRP", name: "XRP-USD", leverage: "10×", price: "$1.1056", change: .43, volume: "US$40.9만", spotVolume: "US$6.85억", marketCap: "US$692억", color: "#26333a", category: "레이어 1", image: xrpImage },
  { symbol: "SOL", name: "SOL-USD", leverage: "20×", price: "$76.22", change: 1.64, volume: "US$38.8만", spotVolume: "US$11.9억", marketCap: "US$445억", color: "#7e4bf5", category: "레이어 1", image: solImage },
  { symbol: "SHIB", name: "SHIB-USD", leverage: "10×", price: "$0.₅5082", change: -6.17, volume: "US$7.69만", spotVolume: "US$4.89억", marketCap: "US$30.1억", color: "#ef6d3c", category: "밈", image: shibImage },
  { symbol: "BNB", name: "BNB-USD", leverage: "10×", price: "$573.38", change: .55, volume: "US$4.86만", spotVolume: "US$8.21억", marketCap: "US$763억", color: "#f3ba2f", category: "레이어 1", image: bnbImage },
  { symbol: "HYPE", name: "HYPE-USD", leverage: "5×", price: "$0.189", change: 2.78, volume: "US$4.82만", spotVolume: "US$2.08억", marketCap: "US$153억", color: "#3fd6b1", category: "DeFi", image: hypeImage },
  { symbol: "DOGE", name: "DOGE-USD", leverage: "10×", price: "$0.07271", change: -.45, volume: "US$4.52만", spotVolume: "US$5.72억", marketCap: "US$113억", color: "#c9ad42", category: "밈", image: dogeImage },
  { symbol: "PEPE", name: "PEPE-USD", leverage: "10×", price: "$0.₅29523", change: 1.93, volume: "US$4.25만", spotVolume: "US$3.32억", marketCap: "US$12.2억", color: "#4a9a55", category: "밈", image: pepeImage },
  { symbol: "ZEC", name: "ZEC-USD", leverage: "5×", price: "$502.84", change: 2.95, volume: "US$3.21만", spotVolume: "US$3.34억", marketCap: "US$84.7억", color: "#ecb32b", category: "외환", image: zecImage },
  { symbol: "TAO", name: "TAO-USD", leverage: "5×", price: "$198.69", change: 1.22, volume: "US$2.33만", spotVolume: "US$1.05억", marketCap: "US$22.2억", color: "#ededed", category: "AI 및 빅 데이터", image: taoImage },
  { symbol: "PAXG", name: "PAXG-USD", leverage: "5×", price: "$4,081", change: .73, volume: "US$1.75만", spotVolume: "US$7910만", marketCap: "US$18.2억", color: "#e7cc22", category: "RWA", image: paxgImage },
  { symbol: "AVAX", name: "AVAX-USD", leverage: "10×", price: "$6.691", change: -.81, volume: "US$1.71만", spotVolume: "US$2.16억", marketCap: "US$28.9억", color: "#e84142", category: "레이어 1", image: avaxImage },
  { symbol: "LINK", name: "LINK-USD", leverage: "10×", price: "$8.42", change: 1.08, volume: "US$1.62만", spotVolume: "US$1.94억", marketCap: "US$58.1억", color: "#2a5ada", category: "DeFi", image: linkImage },
  { symbol: "HBAR", name: "HBAR-USD", leverage: "10×", price: "$0.0913", change: -.32, volume: "US$1.48만", spotVolume: "US$8520만", marketCap: "US$38.4억", color: "#101010", category: "레이어 1", image: hbarImage },
  { symbol: "ALGO", name: "ALGO-USD", leverage: "10×", price: "$0.1178", change: .76, volume: "US$1.31만", spotVolume: "US$6240만", marketCap: "US$10.4억", color: "#08ced2", category: "레이어 1", image: algoImage },
  { symbol: "SUI", name: "SUI-USD", leverage: "10×", price: "$1.49", change: 2.11, volume: "US$1.18만", spotVolume: "US$3.14억", marketCap: "US$54.2억", color: "#6fbcf0", category: "레이어 1", image: suiImage },
  { symbol: "NEAR", name: "NEAR-USD", leverage: "10×", price: "$1.23", change: -.18, volume: "US$9820", spotVolume: "US$7460만", marketCap: "US$15.8억", color: "#00ec97", category: "AI 및 빅 데이터", image: nearImage },
  { symbol: "UNI", name: "UNI-USD", leverage: "10×", price: "$5.37", change: 1.34, volume: "US$8740", spotVolume: "US$1.28억", marketCap: "US$32.1억", color: "#ff4dba", category: "DeFi", image: uniImage },
  { symbol: "AYXX", name: "AYXX-USD", leverage: "5×", price: "$0.63", change: .44, volume: "US$7610", spotVolume: "US$4380만", marketCap: "US$4.8억", color: "#6966ff", category: "DeFi", image: ayxxImage },
  { symbol: "TIA", name: "TIA-USD", leverage: "10×", price: "$0.412", change: 2.34, volume: "US$7480", spotVolume: "US$6230만", marketCap: "US$3.2억", color: "#7b2bf9", category: "레이어 1", image: coinCapIcon("TIA") },
  { symbol: "SPX500", name: "SPX500-USD", leverage: "10×", price: "$6,376.4", change: .41, volume: "US$7240", spotVolume: "—", marketCap: "—", color: "#d8ae2f", category: "RWA", image: inlineMarketIcon("#d7ae34", "#111111", "S&P") },
  { symbol: "VVV", name: "VVV-USD", leverage: "5×", price: "$2.18", change: -1.24, volume: "US$6980", spotVolume: "US$890만", marketCap: "US$7880만", color: "#e44b16", category: "AI 및 빅 데이터", image: coinCapIcon("VVV") },
  { symbol: "OPEN", name: "OPEN-USD", leverage: "5×", price: "$0.214", change: 1.82, volume: "US$6740", spotVolume: "US$1240만", marketCap: "US$1.9억", color: "#e3c2ff", category: "DeFi", image: coinCapIcon("OPEN") },
  { symbol: "EUR", name: "EUR-USD", leverage: "20×", price: "$1.1412", change: .12, volume: "US$6510", spotVolume: "—", marketCap: "—", color: "#3d62f4", category: "외환", image: inlineMarketIcon("#3b61f4", "#ffffff", "€") },
  { symbol: "ASTER", name: "ASTER-USD", leverage: "10×", price: "$0.974", change: 3.76, volume: "US$6380", spotVolume: "US$4380만", marketCap: "US$16.4억", color: "#c7ff3d", category: "DeFi", image: coinCapIcon("ASTER") },
  { symbol: "FARTCOIN", name: "FARTCOIN-USD", leverage: "10×", price: "$0.352", change: -2.83, volume: "US$6140", spotVolume: "US$5740만", marketCap: "US$3.5억", color: "#b8b8b8", category: "밈", image: coinCapIcon("FARTCOIN") },
  { symbol: "RENDER", name: "RENDER-USD", leverage: "10×", price: "$1.63", change: 1.59, volume: "US$5960", spotVolume: "US$7620만", marketCap: "US$8.4억", color: "#ed1016", category: "AI 및 빅 데이터", image: coinCapIcon("RENDER") },
  { symbol: "LIT", name: "LIT-USD", leverage: "5×", price: "$1.22", change: .88, volume: "US$5720", spotVolume: "US$1840만", marketCap: "US$1.2억", color: "#f4f4f4", category: "레이어 2", image: coinCapIcon("LIT") },
  { symbol: "MOG", name: "MOG-USD", leverage: "5×", price: "$0.₆384", change: -1.17, volume: "US$5480", spotVolume: "US$2210만", marketCap: "US$1.5억", color: "#ead9d6", category: "밈", image: coinCapIcon("MOG") },
  { symbol: "BONK", name: "BONK-USD", leverage: "10×", price: "$0.₅741", change: 2.92, volume: "US$5260", spotVolume: "US$6720만", marketCap: "US$5.9억", color: "#f9a715", category: "밈", image: coinCapIcon("BONK") },
  { symbol: "CRV", name: "CRV-USD", leverage: "10×", price: "$0.371", change: .64, volume: "US$5030", spotVolume: "US$4860만", marketCap: "US$5.2억", color: "#f06b2b", category: "DeFi", image: coinCapIcon("CRV") },
  { symbol: "XPL", name: "XPL-USD", leverage: "10×", price: "$0.084", change: 1.21, volume: "US$4870", spotVolume: "US$3920만", marketCap: "US$8.4억", color: "#183a35", category: "레이어 1", image: coinCapIcon("XPL") },
  { symbol: "ZRO", name: "ZRO-USD", leverage: "10×", price: "$1.74", change: -0.71, volume: "US$4620", spotVolume: "US$4260만", marketCap: "US$2.9억", color: "#101010", category: "레이어 2", image: coinCapIcon("ZRO") },
  { symbol: "XLM", name: "XLM-USD", leverage: "10×", price: "$0.217", change: .57, volume: "US$4390", spotVolume: "US$9840만", marketCap: "US$69.2억", color: "#090909", category: "레이어 1", image: coinCapIcon("XLM") },
  { symbol: "WTI", name: "WTI-USD", leverage: "10×", price: "$69.31", change: -.38, volume: "US$4160", spotVolume: "—", marketCap: "—", color: "#15191d", category: "RWA", image: inlineMarketIcon("#15191d", "#ffffff", "WTI") },
  { symbol: "LINEA", name: "LINEA-USD", leverage: "5×", price: "$0.0128", change: 2.08, volume: "US$3940", spotVolume: "US$1180만", marketCap: "US$2.0억", color: "#2b197b", category: "레이어 2", image: coinCapIcon("LINEA") },
  { symbol: "WIF", name: "WIF-USD", leverage: "10×", price: "$0.417", change: -1.06, volume: "US$3710", spotVolume: "US$5560만", marketCap: "US$4.2억", color: "#b29077", category: "밈", image: coinCapIcon("WIF") },
  { symbol: "SOMI", name: "SOMI-USD", leverage: "5×", price: "$0.283", change: 1.46, volume: "US$3490", spotVolume: "US$1760만", marketCap: "US$9110만", color: "#e7d7ce", category: "레이어 1", image: coinCapIcon("SOMI") },
  { symbol: "BLUE", name: "BLUE-USD", leverage: "5×", price: "$0.036", change: 2.61, volume: "US$3260", spotVolume: "US$940만", marketCap: "US$4720만", color: "#4564eb", category: "DeFi", image: coinCapIcon("BLUE") },
  { symbol: "AVNT", name: "AVNT-USD", leverage: "5×", price: "$0.068", change: 1.72, volume: "US$3110", spotVolume: "US$870만", marketCap: "US$6240만", color: "#7640f5", category: "DeFi", image: coinCapIcon("AVNT") },
  { symbol: "ADI", name: "ADI-USD", leverage: "5×", price: "$0.194", change: 2.17, volume: "US$2970", spotVolume: "US$1280만", marketCap: "US$1.1억", color: "#f27622", category: "레이어 2", image: coinCapIcon("ADI") },
  { symbol: "TSLA", name: "TSLA-USD", leverage: "10×", price: "$308.27", change: -.84, volume: "US$2820", spotVolume: "—", marketCap: "US$9910억", color: "#f40032", category: "RWA", image: inlineMarketIcon("#f40032", "#ffffff", "T") },
  { symbol: "BERA", name: "BERA-USD", leverage: "5×", price: "$0.742", change: .36, volume: "US$2680", spotVolume: "US$3180만", marketCap: "US$1.6억", color: "#8b4927", category: "레이어 1", image: coinCapIcon("BERA") },
  { symbol: "BRL", name: "BRL-USD", leverage: "10×", price: "$0.1817", change: -.21, volume: "US$2540", spotVolume: "—", marketCap: "—", color: "#009c3b", category: "외환", image: inlineMarketIcon("#009c3b", "#ffdf00", "BRL") },
  { symbol: "PUMP", name: "PUMP-USD", leverage: "10×", price: "$0.00314", change: 2.43, volume: "US$2480", spotVolume: "US$9280만", marketCap: "US$11.1억", color: "#4dd698", category: "밈", image: coinCapIcon("PUMP") },
  { symbol: "XMR", name: "XMR-USD", leverage: "10×", price: "$319.48", change: .82, volume: "US$2410", spotVolume: "US$9820만", marketCap: "US$58.9억", color: "#ff6600", category: "레이어 1", image: coinCapIcon("XMR") },
  { symbol: "ETC", name: "ETC-USD", leverage: "10×", price: "$13.84", change: -.37, volume: "US$2350", spotVolume: "US$6740만", marketCap: "US$21.4억", color: "#328332", category: "레이어 1", image: coinCapIcon("ETC") },
  { symbol: "BCH", name: "BCH-USD", leverage: "10×", price: "$521.73", change: 1.08, volume: "US$2280", spotVolume: "US$2.41억", marketCap: "US$103.8억", color: "#8dc351", category: "레이어 1", image: coinCapIcon("BCH") },
  { symbol: "TRX", name: "TRX-USD", leverage: "10×", price: "$0.3142", change: .28, volume: "US$2210", spotVolume: "US$4.82억", marketCap: "US$297.6억", color: "#ef0027", category: "레이어 1", image: coinCapIcon("TRX") },
  { symbol: "ADA", name: "ADA-USD", leverage: "10×", price: "$0.3721", change: 1.31, volume: "US$2140", spotVolume: "US$2.26억", marketCap: "US$133.1억", color: "#3154a5", category: "레이어 1", image: coinCapIcon("ADA") },
  { symbol: "FIL", name: "FIL-USD", leverage: "10×", price: "$1.58", change: -.64, volume: "US$2070", spotVolume: "US$8840만", marketCap: "US$11.0억", color: "#0090ff", category: "DePIN", image: coinCapIcon("FIL") },
  { symbol: "CRO", name: "CRO-USD", leverage: "10×", price: "$0.0914", change: .46, volume: "US$1990", spotVolume: "US$3420만", marketCap: "US$28.9억", color: "#27345c", category: "레이어 1", image: coinCapIcon("CRO") },
  { symbol: "ATOM", name: "ATOM-USD", leverage: "10×", price: "$3.27", change: 1.14, volume: "US$1920", spotVolume: "US$7480만", marketCap: "US$15.3억", color: "#2e3148", category: "레이어 1", image: coinCapIcon("ATOM") },
  { symbol: "RUNE", name: "RUNE-USD", leverage: "10×", price: "$1.14", change: 2.08, volume: "US$1850", spotVolume: "US$5830만", marketCap: "US$4.0억", color: "#00d9c0", category: "DeFi", image: coinCapIcon("RUNE") },
  { symbol: "ONDO", name: "ONDO-USD", leverage: "10×", price: "$0.712", change: .91, volume: "US$1790", spotVolume: "US$1.08억", marketCap: "US$22.5억", color: "#dfd21d", category: "RWA", image: coinCapIcon("ONDO") },
  { symbol: "DOT", name: "DOT-USD", leverage: "10×", price: "$2.08", change: -.29, volume: "US$1720", spotVolume: "US$9360만", marketCap: "US$33.4억", color: "#e6007a", category: "레이어 1", image: coinCapIcon("DOT") },
  { symbol: "GRT", name: "GRT-USD", leverage: "10×", price: "$0.0418", change: 1.64, volume: "US$1660", spotVolume: "US$3860만", marketCap: "US$4.2억", color: "#6555c5", category: "AI 및 빅 데이터", image: coinCapIcon("GRT") },
  { symbol: "INJ", name: "INJ-USD", leverage: "10×", price: "$6.84", change: 2.37, volume: "US$1590", spotVolume: "US$7120만", marketCap: "US$6.8억", color: "#4e45f6", category: "DeFi", image: coinCapIcon("INJ") },
  { symbol: "AAVE", name: "AAVE-USD", leverage: "10×", price: "$182.41", change: .74, volume: "US$1530", spotVolume: "US$1.44억", marketCap: "US$27.7억", color: "#8f8cf2", category: "DeFi", image: coinCapIcon("AAVE") },
  { symbol: "1INCH", name: "1INCH-USD", leverage: "10×", price: "$0.186", change: -1.08, volume: "US$1470", spotVolume: "US$2840만", marketCap: "US$2.6억", color: "#1b314f", category: "DeFi", image: coinCapIcon("1INCH") },
  { symbol: "ICP", name: "ICP-USD", leverage: "10×", price: "$3.08", change: 1.52, volume: "US$1410", spotVolume: "US$7240만", marketCap: "US$16.4억", color: "#f15a24", category: "레이어 1", image: coinCapIcon("ICP") },
  { symbol: "ARB", name: "ARB-USD", leverage: "10×", price: "$0.314", change: .67, volume: "US$1350", spotVolume: "US$1.02억", marketCap: "US$16.2억", color: "#28a0f0", category: "레이어 2", image: coinCapIcon("ARB") },
  { symbol: "APT", name: "APT-USD", leverage: "10×", price: "$3.12", change: -.41, volume: "US$1290", spotVolume: "US$1.18억", marketCap: "US$21.0억", color: "#ffffff", category: "레이어 1", image: coinCapIcon("APT") },
  { symbol: "WLD", name: "WLD-USD", leverage: "10×", price: "$0.924", change: 1.83, volume: "US$1230", spotVolume: "US$1.36억", marketCap: "US$18.7억", color: "#ffffff", category: "AI 및 빅 데이터", image: coinCapIcon("WLD") },
  { symbol: "ZK", name: "ZK-USD", leverage: "10×", price: "$0.0514", change: .92, volume: "US$1170", spotVolume: "US$2840만", marketCap: "US$3.6억", color: "#111111", category: "레이어 2", image: coinCapIcon("ZK") },
  { symbol: "SEI", name: "SEI-USD", leverage: "10×", price: "$0.184", change: 2.16, volume: "US$1110", spotVolume: "US$8420만", marketCap: "US$10.4억", color: "#b93e4c", category: "레이어 1", image: coinCapIcon("SEI") },
  { symbol: "EIGEN", name: "EIGEN-USD", leverage: "10×", price: "$0.742", change: -.57, volume: "US$1050", spotVolume: "US$4320만", marketCap: "US$2.4억", color: "#b3a1da", category: "DeFi", image: coinCapIcon("EIGEN") },
  { symbol: "POL", name: "POL-USD", leverage: "10×", price: "$0.211", change: 1.09, volume: "US$990", spotVolume: "US$5620만", marketCap: "US$22.1억", color: "#8247e5", category: "레이어 2", image: coinCapIcon("POL") },
  { symbol: "ENA", name: "ENA-USD", leverage: "10×", price: "$0.312", change: 1.47, volume: "US$940", spotVolume: "US$1.18억", marketCap: "US$22.9억", color: "#f4f4f4", category: "DeFi", image: coinCapIcon("ENA") },
  { symbol: "PENGU", name: "PENGU-USD", leverage: "10×", price: "$0.0112", change: -1.31, volume: "US$890", spotVolume: "US$6380만", marketCap: "US$7.1억", color: "#83a8f6", category: "밈", image: coinCapIcon("PENGU") },
  { symbol: "TRUMP", name: "TRUMP-USD", leverage: "10×", price: "$8.42", change: 2.04, volume: "US$840", spotVolume: "US$2.11억", marketCap: "US$16.8억", color: "#c89a47", category: "밈", image: coinCapIcon("TRUMP") },
];

const BROKEN_COIN_IMAGE_SYMBOLS = new Set([
  "OPEN",
  "ASTER",
  "FARTCOIN",
  "XPL",
  "ZRO",
  "LINEA",
  "SOMI",
  "BLUE",
  "AVNT",
]);

const hasVerifiedCoinImage = (market: Market) =>
  !market.image.startsWith("data:") &&
  !BROKEN_COIN_IMAGE_SYMBOLS.has(market.symbol);

// 두 화면 모두 실제로 로딩되는 이미지가 있는 종목만 공유하며, 같은 심볼은 한 번만 노출한다.
export const markets: Market[] = Array.from(
  new Map(
    marketCatalog
      .filter(hasVerifiedCoinImage)
      .map((market) => [market.symbol, market]),
  ).values(),
);

function CoinMark({ market }: { market: Market }) {
  const { t } = useLocale();
  return <img src={market.image} alt={`${market.symbol} ${t("coinLogo")}`} />;
}

export function MarketPanel({ quantityUnit, selected, onSelect, favorites, onToggleFavorite }: MarketPanelProps) {
  const { lang, t } = useLocale();
  const marketValue = (value: string) => {
    if (lang === "ko") return value;
    const amount = Number(value.replace(/[^\d.]/g, ""))
      * (value.includes("조") ? 1_000_000_000_000 : value.includes("억") ? 100_000_000 : value.includes("만") ? 10_000 : 1);
    const formats = {
      en: [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "K"]],
      ja: [[1e12, "兆"], [1e8, "億"], [1e4, "万"]],
      zh: [[1e12, "万亿"], [1e8, "亿"], [1e4, "万"]],
      vi: [[1e12, " nghìn tỷ"], [1e9, " tỷ"], [1e6, " triệu"], [1e3, " nghìn"]],
      fr: [[1e12, " Bn"], [1e9, " Md"], [1e6, " M"], [1e3, " k"]],
    } as const;
    const [divisor, suffix] = formats[lang].find(([threshold]) => amount >= threshold) ?? [1, ""];
    return `US$${Number((amount / divisor).toPrecision(3))}${suffix}`;
  };
  const rootRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [volumeSort, setVolumeSort] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const filteredMarkets = useMemo(() => markets.filter((market) => {
    const matchesQuery = `${market.symbol} ${market.name}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesCategory = category === "전체" || category === "최근에 나열됨" || category === "시장 가능 신규" || market.category === category;
    return matchesQuery && matchesCategory;
  }), [category, query]);
  const sortedMarkets = useMemo(() => [...filteredMarkets].sort((a, b) => {
    const favoriteDifference = Number(favorites.has(b.symbol)) - Number(favorites.has(a.symbol));
    if (favoriteDifference) return favoriteDifference;
    const volumeValue = (value: string) => {
      const amount = Number(value.replace(/[^\d.]/g, ""));
      if (value.includes("조")) return amount * 1_000_000_000_000;
      if (value.includes("억")) return amount * 100_000_000;
      if (value.includes("만")) return amount * 10_000;
      return amount;
    };
    return volumeSort === "asc"
      ? volumeValue(a.volume) - volumeValue(b.volume)
      : volumeValue(b.volume) - volumeValue(a.volume);
  }), [favorites, filteredMarkets, volumeSort]);
  const pageCount = Math.max(1, Math.ceil(sortedMarkets.length / pageSize));
  const visibleMarkets = sortedMarkets.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [category, favorites, pageSize, query]);

  return (
    <section ref={rootRef} className="panel market" aria-label={t("market")}>
      <button className="market__select" type="button" aria-expanded={isOpen} onClick={() => setIsOpen((value) => !value)}>
        <span className="market__coin"><CoinMark market={selected} /></span>
        <span><strong>{selected.name}</strong></span>
        <MarketDown className="market__arrow" />
      </button>

      <dl className="stats">
        <div className="stats__price"><dt className="sr-only">{t("price")}</dt><dd>{selected.price}</dd></div>
        <div><dt>{t("oraclePrice")}</dt><dd>{selected.price}</dd></div>
        <div><dt>{t("change24h")}</dt><dd className={selected.change < 0 ? "is-negative stats__change" : "is-positive stats__change"}>{selected.change.toFixed(2)}%</dd></div>
        <div><dt>{t("volume24h")}</dt><dd>{selected.volume}</dd></div>
        <div><dt>{t("trades24h")}</dt><dd>2,781</dd></div>
        <div><dt>{t("openInterest")}</dt><dd className="stats__unit">{quantityUnit === "BTC" ? "308.31" : "19,588,069"} <span>{quantityUnit}</span></dd></div>
        <div><dt>{t("funding1h")}</dt><dd className="is-positive"><Tooltip content={t("fundingAnnualized")}>0.00006%</Tooltip></dd></div>
        <div><dt>{t("nextFunding")}</dt><dd>41:10</dd></div>
        <div>
          <dt>
            <Tooltip
              title={t("maxLeverage")}
              content={t("maxLeverageTip")}
              tooltipClassName="hint__pop--wide"
            >
              {t("maxLeverage")}
            </Tooltip>
          </dt>
          <dd>50.00×</dd>
        </div>
      </dl>

      {isOpen && (
        <div className="market-picker">
          <label className="market-picker__search">
            <svg width="12" height="15" viewBox="0 0 12 15" fill="none" aria-hidden="true">
              <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M10.5 6.5C10.5 8.98528 8.48528 11 6 11C3.51472 11 1.5 8.98528 1.5 6.5C1.5 4.01472 3.51472 2 6 2C8.48528 2 10.5 4.01472 10.5 6.5ZM12 6.5C12 9.81371 9.31371 12.5 6 12.5C5.0458 12.5 4.14363 12.2773 3.34264 11.8809L2.04742 14.0142C1.83245 14.3683 1.37116 14.4811 1.0171 14.2661C0.663032 14.0511 0.550271 13.5898 0.765239 13.2358L2.09105 11.0521C0.810824 9.95171 0 8.32054 0 6.5C0 3.18629 2.68629 0.5 6 0.5C9.31371 0.5 12 3.18629 12 6.5Z" />
            </svg>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("searchPlaceholder")} autoFocus />
          </label>

          <MarketCategoryTabs
            activeCategory={category}
            onCategoryChange={(nextCategory) => {
              setCategory(nextCategory);
              setPage(1);
            }}
          />

          <div className="market-picker__table">
            <div className="market-picker__head">
              <span>{t("market")}</span><span>{t("price")}</span><span>{t("change24h")}</span>
              <VolumeSortButton
                label={t("volume")}
                direction={volumeSort}
                onToggle={() => setVolumeSort((value) => value === "desc" ? "asc" : "desc")}
              />
              <span>{t("spotVolume24h")}</span><span>{t("marketCap")}</span>
            </div>
            <div className="market-picker__body">
              {visibleMarkets.map((market) => (
                <div className={`market-picker__row${selected.symbol === market.symbol ? " is-selected" : ""}`} key={market.symbol}>
                  <button className={`market-picker__star${favorites.has(market.symbol) ? " is-favorite" : ""}`} type="button" aria-label={`${market.name} ${t("favoriteMarket")}`} onClick={() => { onToggleFavorite(market.symbol); setPage(1); }}><FavoriteStar active={favorites.has(market.symbol)} /></button>
                  <button className="market-picker__market" type="button" onClick={() => { onSelect(market); setIsOpen(false); }}>
                    <span className="market-picker__coin"><CoinMark market={market} /></span>
                    <strong>{market.name.replace(/-USD$/, "")}</strong><small>{market.leverage}</small>
                  </button>
                  <strong>{market.price}</strong>
                  <strong className={market.change < 0 ? "is-negative" : "is-positive"}>{market.change.toFixed(2)}%</strong>
                  <strong>{marketValue(market.volume)}</strong><strong>{marketValue(market.spotVolume)}</strong><strong>{marketValue(market.marketCap)}</strong>
                </div>
              ))}
              {filteredMarkets.length === 0 && <p className="market-picker__empty">{t("noMarkets")}</p>}
            </div>
          </div>
          <div className="market-picker__footer">
            <span className="market-picker__count">
              {filteredMarkets.length} / {visibleMarkets.length} {t("showing")}
            </span>
            <nav className="market-picker__pagination" aria-label={t("marketListPages")}>
              <button type="button" aria-label={t("previousPage")} disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>‹</button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).slice(0, 4).map((number) => (
                <button className={page === number ? "is-active" : undefined} type="button" key={number} onClick={() => setPage(number)}>{number}</button>
              ))}
              <button type="button" aria-label={t("nextPage")} disabled={page === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>›</button>
            </nav>
            <div className="market-picker__page-size">
              <SelectMenu
                className="market-picker__page-size-select"
                ariaLabel={t("view")}
                value={pageSize}
                options={[5, 10, 15, 20, 50].map((size) => ({ value: size, label: String(size) }))}
                onChange={(size) => {
                  setPageSize(size);
                  setPage(1);
                }}
              />
              <span>{t("view")}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
