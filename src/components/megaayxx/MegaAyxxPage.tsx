import { useMemo, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useLocale, type Lang } from "../../i18n/Locale";
import { BrandLogo } from "../icons/BrandLogo";
import { DataTable, DataTableBody, DataTableHead, DataTablePagination, TableSearch } from "../ui/DataTable";
import { Tooltip } from "../ui/Tooltip";
import { VolumeSortButton, type SortDirection } from "../ui/VolumeSortButton";
import usdcImage from "../../assets/images/coins/usdc.png";
import solImage from "../../assets/images/coins/sol.png";
import btcImage from "../../assets/images/coins/btc.png";
import ethImage from "../../assets/images/coins/eth.png";
import xrpImage from "../../assets/images/coins/xrp.png";
import hypeImage from "../../assets/images/coins/hype.png";
import avaxImage from "../../assets/images/coins/avax.png";
import bnbImage from "../../assets/images/coins/bnb.png";
import uniImage from "../../assets/images/coins/uni.png";
import zecImage from "../../assets/images/coins/zec.png";
import dogeImage from "../../assets/images/coins/doge.png";
import "./MegaAyxxPage.scss";

type ChartMetric = "pnl" | "tvl";
type ChartPeriod = 7 | 30 | 90;
type FundingMode = "add" | "remove";

type MegaAyxxCopy = {
  apr: string;
  aprTooltip: string;
  tvl: string;
  grossPnl: string;
  grossTvl: string;
  thirtyDayPnl: string;
  warning: string;
  assets: string;
  index: string;
  search: string;
  market: string;
  size: string;
  pastThirtyDays: string;
  equity: string;
  addFunds: string;
  removeFunds: string;
  amount: string;
  max: string;
  freeCollateral: string;
  freeCollateralTooltip: string;
  crossMargin: string;
  marginUsage: string;
  marginUsageTooltip: string;
  vaultBalance: string;
  vaultBalanceTooltip: string;
  totalPnl: string;
  totalPnlTooltip: string;
  withdrawable: string;
  withdrawableTooltip: string;
  estimatedSlippage: string;
  estimatedSlippageTooltip: string;
  estimatedReceived: string;
  estimatedReceivedTooltip: string;
  enterAmount: string;
  enterRemoveAmount: string;
  noBalance: string;
  showing: string;
};

const copy: Record<Lang, MegaAyxxCopy> = {
  ko: {
    apr: "예상 APR", aprTooltip: "추정. 연간 수익률(APR)은 지난달 수익을 연간화한 값입니다. 실제 수익은 불확실한 미래 수익(프로토콜 수익 분배 및 손익)에 따라 달라지며 보장되지 않습니다.", tvl: "TVL", grossPnl: "금고 P&L", grossTvl: "금고 TVL", thirtyDayPnl: "30일 손익",
    warning: "Megaayxx에 예치된 USDC의 일부 또는 전부를 잃을 위험이 있습니다. AYXX 커뮤니티가 투표 완료를 통해 Megaayxx의 운영자를 제거하고 Megaayxx를 기준 포지션만 청산하도록 제한합니다.",
    assets: "보유 자산", index: "지표", search: "검색 유형", market: "시장", size: "규모", pastThirtyDays: "지난 30일", equity: "자본",
    addFunds: "자금 추가", removeFunds: "자금 제거", amount: "추가할 금액", max: "최대", freeCollateral: "교차 프리 담보", freeCollateralTooltip: "교차 마진 계정에서 거래 또는 인출 가능한 담보 금액입니다.", crossMargin: "교차 격리 담보", marginUsage: "크로스 마진 사용", marginUsageTooltip: "오픈 포지션에 의해 사용된 총 교차 마진 비율입니다.", vaultBalance: "금고 잔액", vaultBalanceTooltip: "예치금의 현재 가치. 금고의 현재 자산 및 포지션을 기준으로 계산됩니다.", totalPnl: "전체 시간 P&L", totalPnlTooltip: "시간 경과에 따른 총 손익(PnL)입니다. 여기에는 금고 예치금의 과거 손익이 포함됩니다.", withdrawable: "제거 가능", withdrawableTooltip: "인출할 수 있는 금액으로, 금고 잔액에서 신규 시장 상장을 위해 잠긴 금액을 뺀 액수입니다.", estimatedSlippage: "예상 슬리피지", estimatedSlippageTooltip: "인출 시 예상되는 슬리피지 금액입니다. 슬리피지는 금고에서 인출 금액을 충족하기 위해 마진을 확보하고자 현재 포지션을 업데이트하는 과정에서 발생합니다. 이 금액은 현재 조건을 기준으로 한 추정액입니다. 실제 금액은 실행 시점의 실제 조건에 따라 달라질 수 있습니다.", estimatedReceived: "예상 수령 금액", estimatedReceivedTooltip: "인출 시 수령할 것으로 예상되는 금액으로, 인출 금액에서 예상 슬리피지 금액을 뺀 금액입니다. 이 금액은 현재 포지션 기준으로 한 추정액입니다. 실제 금액은 실행 시점의 실제 조건에 따라 달라질 수 있습니다.", enterAmount: "추가할 금액을 입력하세요", enterRemoveAmount: "제거할 금액을 입력하세요", noBalance: "금고 잔액이 없습니다.", showing: "{start}–{end} / {total} 표시 중",
  },
  en: {
    apr: "Estimated APR", aprTooltip: "Estimate. The annual percentage rate (APR) annualizes last month's returns. Actual returns depend on uncertain future protocol revenue distributions and profit or loss and are not guaranteed.", tvl: "TVL", grossPnl: "Vault P&L", grossTvl: "Vault TVL", thirtyDayPnl: "30D P&L",
    warning: "Some or all USDC deposited in Megaayxx may be lost. The AYXX community can remove the Megaayxx operator through a completed vote and restrict Megaayxx to closing only its base positions.",
    assets: "Holdings", index: "Index", search: "Search assets", market: "Market", size: "Size", pastThirtyDays: "Past 30 days", equity: "Equity",
    addFunds: "Add funds", removeFunds: "Remove funds", amount: "Amount to add", max: "Max", freeCollateral: "Cross free collateral", freeCollateralTooltip: "The amount of collateral available for trading or withdrawal in your cross-margin account.", crossMargin: "Cross margin collateral", marginUsage: "Cross margin usage", marginUsageTooltip: "The percentage of total cross margin used by open positions.", vaultBalance: "Vault balance", vaultBalanceTooltip: "The current value of your deposit, calculated from the vault's current assets and positions.", totalPnl: "All-time P&L", totalPnlTooltip: "Your total profit and loss (PnL) over time, including historical profit and loss from vault deposits.", withdrawable: "Available to remove", withdrawableTooltip: "The amount available to withdraw, calculated as your vault balance minus funds locked for new market listings.", estimatedSlippage: "Estimated slippage", estimatedSlippageTooltip: "The estimated slippage amount when withdrawing. Slippage occurs as current positions are updated to free the margin needed to fulfill the withdrawal. This is an estimate based on current conditions. The actual amount may vary depending on conditions at execution.", estimatedReceived: "Estimated amount received", estimatedReceivedTooltip: "The amount you are expected to receive on withdrawal, calculated by subtracting estimated slippage from the withdrawal amount. This is an estimate based on current positions. The actual amount may vary depending on conditions at execution.", enterAmount: "Enter an amount to add", enterRemoveAmount: "Enter an amount to remove", noBalance: "No vault balance.", showing: "Showing {start}–{end} of {total}",
  },
  ja: {
    apr: "予想APR", aprTooltip: "推定値です。年率（APR）は先月の収益を年率換算したものです。実際の収益は将来のプロトコル収益分配と損益によって変動し、保証されません。", tvl: "TVL", grossPnl: "ボールト損益", grossTvl: "ボールトTVL", thirtyDayPnl: "30日損益",
    warning: "Megaayxxに預けたUSDCの一部または全部を失う可能性があります。AYXXコミュニティは投票により運営者を解任し、基準ポジションの決済のみに制限できます。",
    assets: "保有資産", index: "指数", search: "資産を検索", market: "市場", size: "規模", pastThirtyDays: "過去30日", equity: "資本",
    addFunds: "資金を追加", removeFunds: "資金を削除", amount: "追加金額", max: "最大", freeCollateral: "クロス利用可能担保", freeCollateralTooltip: "クロスマージン口座で取引または出金に使用できる担保額です。", crossMargin: "クロスマージン担保", marginUsage: "クロスマージン使用率", marginUsageTooltip: "オープンポジションによって使用されているクロスマージン合計の割合です。", vaultBalance: "ボールト残高", vaultBalanceTooltip: "預入金の現在価値です。ボールトの現在の資産とポジションに基づいて計算されます。", totalPnl: "全期間P&L", totalPnlTooltip: "時間の経過に伴う総損益（PnL）です。ボールト預入金の過去の損益が含まれます。", withdrawable: "削除可能", withdrawableTooltip: "出金可能な金額です。ボールト残高から新規市場上場のためにロックされた金額を差し引いて計算されます。", estimatedSlippage: "予想スリッページ", estimatedSlippageTooltip: "出金時に予想されるスリッページ額です。出金額を満たすためのマージンを確保する際に、現在のポジションを更新する過程で発生します。現在の条件に基づく推定値であり、実際の金額は実行時の条件によって異なる場合があります。", estimatedReceived: "予想受取額", estimatedReceivedTooltip: "出金額から予想スリッページ額を差し引いた、受取予定額です。現在のポジションに基づく推定値であり、実際の金額は実行時の条件によって異なる場合があります。", enterAmount: "追加金額を入力", enterRemoveAmount: "削除金額を入力", noBalance: "ボールト残高がありません。", showing: "{total}件中{start}～{end}件を表示",
  },
  zh: {
    apr: "预计 APR", aprTooltip: "此为估算值。年化收益率（APR）是将上月收益年化后的结果。实际收益取决于不确定的未来协议收益分配及盈亏，不作保证。", tvl: "TVL", grossPnl: "金库盈亏", grossTvl: "金库 TVL", thirtyDayPnl: "30天盈亏",
    warning: "存入 Megaayxx 的部分或全部 USDC 可能会损失。AYXX 社区可通过投票移除运营者，并将 Megaayxx 限制为仅平仓基础仓位。",
    assets: "持有资产", index: "指数", search: "搜索资产", market: "市场", size: "规模", pastThirtyDays: "过去30天", equity: "权益",
    addFunds: "添加资金", removeFunds: "移除资金", amount: "添加金额", max: "最大", freeCollateral: "全仓可用抵押品", freeCollateralTooltip: "全仓保证金账户中可用于交易或提取的抵押品金额。", crossMargin: "全仓保证金", marginUsage: "全仓保证金使用率", marginUsageTooltip: "未平仓仓位所使用的全仓保证金总额比例。", vaultBalance: "金库余额", vaultBalanceTooltip: "存款的当前价值，根据金库当前的资产和仓位计算。", totalPnl: "全时段盈亏", totalPnlTooltip: "随时间累计的总盈亏（PnL），包括金库存款的历史盈亏。", withdrawable: "可移除", withdrawableTooltip: "可提取金额，按金库余额减去为新市场上线而锁定的资金计算。", estimatedSlippage: "预计滑点", estimatedSlippageTooltip: "提取时预计产生的滑点金额。为满足提取金额而释放保证金并更新当前仓位时会产生滑点。此金额基于当前条件估算，实际金额可能因执行时的实际条件而异。", estimatedReceived: "预计到账金额", estimatedReceivedTooltip: "提取时预计收到的金额，即提取金额减去预计滑点金额。此金额基于当前仓位估算，实际金额可能因执行时的实际条件而异。", enterAmount: "输入添加金额", enterRemoveAmount: "输入移除金额", noBalance: "暂无金库余额。", showing: "显示 {start}–{end} / {total}",
  },
  vi: {
    apr: "APR ước tính", aprTooltip: "Đây là ước tính. APR quy đổi lợi nhuận của tháng trước thành tỷ lệ hằng năm. Lợi nhuận thực tế phụ thuộc vào phân phối doanh thu giao thức và lãi/lỗ trong tương lai, không được bảo đảm.", tvl: "TVL", grossPnl: "Lãi/lỗ kho", grossTvl: "TVL kho", thirtyDayPnl: "Lãi/lỗ 30 ngày",
    warning: "Một phần hoặc toàn bộ USDC gửi vào Megaayxx có thể bị mất. Cộng đồng AYXX có thể bỏ phiếu loại bỏ đơn vị vận hành và giới hạn Megaayxx chỉ đóng các vị thế cơ sở.",
    assets: "Tài sản nắm giữ", index: "Chỉ số", search: "Tìm tài sản", market: "Thị trường", size: "Quy mô", pastThirtyDays: "30 ngày qua", equity: "Vốn",
    addFunds: "Thêm tiền", removeFunds: "Rút tiền", amount: "Số tiền thêm", max: "Tối đa", freeCollateral: "Tài sản chéo khả dụng", freeCollateralTooltip: "Số tiền thế chấp có thể dùng để giao dịch hoặc rút trong tài khoản ký quỹ chéo.", crossMargin: "Tài sản ký quỹ chéo", marginUsage: "Mức dùng ký quỹ chéo", marginUsageTooltip: "Tỷ lệ tổng ký quỹ chéo đang được các vị thế mở sử dụng.", vaultBalance: "Số dư kho", vaultBalanceTooltip: "Giá trị hiện tại của khoản tiền gửi, được tính theo tài sản và vị thế hiện tại của kho.", totalPnl: "P&L toàn thời gian", totalPnlTooltip: "Tổng lãi và lỗ (PnL) theo thời gian, bao gồm lãi lỗ trước đây của tiền gửi trong kho.", withdrawable: "Có thể rút", withdrawableTooltip: "Số tiền có thể rút, được tính bằng số dư kho trừ đi khoản tiền bị khóa để niêm yết thị trường mới.", estimatedSlippage: "Trượt giá ước tính", estimatedSlippageTooltip: "Số tiền trượt giá dự kiến khi rút. Trượt giá phát sinh trong quá trình cập nhật các vị thế hiện tại để giải phóng ký quỹ cần thiết cho khoản rút. Đây là ước tính theo điều kiện hiện tại; số tiền thực tế có thể thay đổi theo điều kiện khi thực hiện.", estimatedReceived: "Số tiền nhận ước tính", estimatedReceivedTooltip: "Số tiền dự kiến nhận khi rút, được tính bằng số tiền rút trừ đi trượt giá ước tính. Đây là ước tính theo các vị thế hiện tại; số tiền thực tế có thể thay đổi theo điều kiện khi thực hiện.", enterAmount: "Nhập số tiền cần thêm", enterRemoveAmount: "Nhập số tiền cần rút", noBalance: "Không có số dư trong kho.", showing: "Hiển thị {start}–{end} / {total}",
  },
  fr: {
    apr: "APR estimé", aprTooltip: "Estimation. Le taux annuel (APR) annualise les rendements du mois précédent. Les rendements réels dépendent des futures distributions de revenus du protocole et des profits ou pertes et ne sont pas garantis.", tvl: "TVL", grossPnl: "P&L du coffre", grossTvl: "TVL du coffre", thirtyDayPnl: "P&L sur 30 j",
    warning: "Une partie ou la totalité des USDC déposés dans Megaayxx peut être perdue. La communauté AYXX peut révoquer l'opérateur par vote et limiter Megaayxx à la clôture de ses positions de base.",
    assets: "Actifs détenus", index: "Indice", search: "Rechercher un actif", market: "Marché", size: "Taille", pastThirtyDays: "30 derniers jours", equity: "Capital",
    addFunds: "Ajouter des fonds", removeFunds: "Retirer des fonds", amount: "Montant à ajouter", max: "Max", freeCollateral: "Garantie croisée libre", freeCollateralTooltip: "Le montant de garantie disponible pour négocier ou effectuer un retrait sur le compte à marge croisée.", crossMargin: "Garantie marge croisée", marginUsage: "Utilisation marge croisée", marginUsageTooltip: "Le pourcentage de la marge croisée totale utilisé par les positions ouvertes.", vaultBalance: "Solde du coffre", vaultBalanceTooltip: "La valeur actuelle du dépôt, calculée selon les actifs et positions actuels du coffre.", totalPnl: "P&L total", totalPnlTooltip: "Le total des profits et pertes (PnL) dans le temps, y compris l'historique des gains et pertes des dépôts du coffre.", withdrawable: "Disponible au retrait", withdrawableTooltip: "Le montant disponible au retrait, calculé en soustrayant du solde du coffre les fonds bloqués pour les nouvelles cotations de marché.", estimatedSlippage: "Glissement estimé", estimatedSlippageTooltip: "Le montant du glissement estimé lors du retrait. Il se produit lorsque les positions actuelles sont mises à jour afin de libérer la marge nécessaire au retrait. Cette estimation repose sur les conditions actuelles ; le montant réel peut varier selon les conditions au moment de l'exécution.", estimatedReceived: "Montant reçu estimé", estimatedReceivedTooltip: "Le montant que vous devriez recevoir lors du retrait, calculé en soustrayant le glissement estimé du montant retiré. Cette estimation repose sur les positions actuelles ; le montant réel peut varier selon les conditions au moment de l'exécution.", enterAmount: "Saisissez un montant", enterRemoveAmount: "Saisissez le montant à retirer", noBalance: "Aucun solde du coffre.", showing: "Affichage de {start} à {end} sur {total}",
  },
};

const holdings = [
  { name: "USDC", symbol: "USDC", size: "$940,477", units: "940,477.091", equity: "$940,477", image: usdcImage },
  { name: "Solana", symbol: "SOL", equity: "$16,121", image: solImage },
  { name: "Bitcoin", symbol: "BTC", equity: "$15,977", image: btcImage },
  { name: "Ethereum", symbol: "ETH", equity: "$15,646", image: ethImage },
  { name: "XRP", symbol: "XRP", equity: "$14,103", image: xrpImage },
  { name: "Hyperliquid", symbol: "HYPE", equity: "$12,555", image: hypeImage },
  { name: "Avalanche", symbol: "AVAX", equity: "$12,314", image: avaxImage },
  { name: "AI16Z", symbol: "AI16Z", equity: "$11,836", tone: "#44454c" },
  { name: "Cardano", symbol: "ADA", equity: "$10,591", tone: "#f5f6fa" },
  { name: "BNB", symbol: "BNB", equity: "$9,564", image: bnbImage },
  { name: "Uniswap", symbol: "UNI", equity: "$8,440", image: uniImage },
  { name: "Dymension", symbol: "DYM", equity: "$8,239", tone: "#5b4b43" },
  { name: "Aster", symbol: "ASTER", equity: "$7,601", tone: "#b89669" },
  { name: "Aptos", symbol: "APT", equity: "$7,386", tone: "#111114" },
  { name: "Aerodrome Finance", symbol: "AERO", equity: "$7,262", tone: "#f3f4f7" },
  { name: "Zcash", symbol: "ZEC", equity: "$6,913", image: zecImage },
  { name: "aixbt", symbol: "AIXBT", equity: "$6,792", tone: "#6659b7" },
  { name: "Dogecoin", symbol: "DOGE", equity: "$6,095", image: dogeImage },
  { name: "Arkham", symbol: "ARKM", equity: "$6,080", tone: "#0c0c0f" },
  { name: "XDC Network", symbol: "XDC", equity: "$6,032", tone: "#3567a1" },
];

function ExternalIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5H5v10h10v-2M10 4h6v6M16 4l-7 7" /></svg>;
}

const chartShapes: Record<ChartMetric, Record<ChartPeriod, number[]>> = {
  pnl: {
    7: [0.08, 0.12, 0.18, 0.16, 0.23, 0.29, 0.36, 0.34, 0.43, 0.51, 0.48, 0.57, 0.63, 0.61, 0.7, 0.76, 0.73, 0.82, 0.86, 0.91, 0.89, 0.96, 0.94, 1],
    30: [0, 0.24, 0.31, 0.42, 0.47, 0.63, 0.69, 0.7, 0.79, 0.83, 0.84, 0.87, 0.9, 0.91, 0.93, 0.94, 0.95, 0.96, 1],
    90: [0.1, 0.16, 0.13, 0.25, 0.29, 0.37, 0.34, 0.45, 0.52, 0.49, 0.58, 0.62, 0.66, 0.64, 0.71, 0.78, 0.75, 0.84, 0.82, 0.9, 0.94, 0.92, 0.97, 1],
  },
  tvl: {
    7: [1, 0.94, 0.97, 0.88, 0.83, 0.79, 0.72, 0.76, 0.66, 0.61, 0.57, 0.51, 0.55, 0.43, 0.4, 0.33, 0.37, 0.28, 0.23, 0.25, 0.17, 0.13, 0.15, 0.08],
    30: [1, 0.96, 0.92, 0.9, 0.86, 0.82, 0.8, 0.75, 0.7, 0.66, 0.62, 0.58, 0.53, 0.5, 0.45, 0.41, 0.36, 0.32, 0.27, 0.22, 0.18, 0.15, 0.11, 0.08],
    90: [0.95, 1, 0.91, 0.94, 0.84, 0.79, 0.82, 0.71, 0.68, 0.61, 0.64, 0.53, 0.55, 0.44, 0.4, 0.43, 0.31, 0.34, 0.26, 0.2, 0.22, 0.14, 0.11, 0.08],
  },
};

function VaultChart({ metric, period, locale }: { metric: ChartMetric; period: ChartPeriod | null; locale: string }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const effectivePeriod = period ?? 30;
  const shape = chartShapes[metric][effectivePeriod];
  const points = useMemo(() => shape.map((level, index) => ({
    x: (index / (shape.length - 1)) * 760,
    y: 245 - level * 210,
    progress: index / (shape.length - 1),
  })), [shape]);
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const axis = metric === "pnl"
    ? ["US$466.8만", "US$466.4만", "US$466.0만", "US$465.6만", "US$465.2만"]
    : ["US$184만", "US$182만", "US$180만", "US$178만", "US$176만"];
  const currentIndex = hoverIndex ?? points.length - 1;
  const activePoint = points[currentIndex];
  const startDate = new Date(2026, 7, 6, 12, 0);
  startDate.setDate(startDate.getDate() - effectivePeriod);
  const pointDate = new Date(startDate);
  pointDate.setTime(startDate.getTime() + activePoint.progress * effectivePeriod * 86_400_000);
  const dateFormatter = new Intl.DateTimeFormat(locale, hoverIndex === null
    ? { year: "numeric", month: "numeric", day: "numeric" }
    : { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit" });
  const shortDateFormatter = new Intl.DateTimeFormat(locale, { month: "numeric", day: "numeric", hour: "numeric" });
  const baseValue = metric === "pnl" ? 4_652_232 : 1_827_441;
  const finalChange = metric === "pnl" ? 10_729 : -56_072;
  const value = baseValue + finalChange * activePoint.progress;
  const change = finalChange * activePoint.progress;
  const percent = (metric === "pnl" ? 0.59 : -3.07) * activePoint.progress;
  const chartDates = [0, 1 / 3, 2 / 3, 1].map((progress) => {
    const date = new Date(startDate.getTime() + progress * effectivePeriod * 86_400_000);
    return shortDateFormatter.format(date);
  });
  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    setHoverIndex(Math.round(ratio * (points.length - 1)));
  };

  return (
    <>
      <div className="megaayxx-chart__summary">
        <span>{dateFormatter.format(pointDate)}</span>
        <strong>
          ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <em className={metric === "pnl" ? "is-pnl" : "is-tvl"}>
            {change >= 0 ? "▲" : "−"} ${Math.abs(change).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({Math.abs(percent).toFixed(2)}%)
          </em>
        </strong>
      </div>
      <div className={`megaayxx-chart__plot ${metric === "pnl" ? "is-pnl" : "is-tvl"}`}>
        <svg
          viewBox="0 0 760 250"
          preserveAspectRatio="none"
          role="img"
          aria-label={metric === "pnl" ? "Vault P&L chart" : "Vault TVL chart"}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
        >
          <defs>
            <pattern id={`megaayxx-grid-${metric}`} width="12" height="12" patternUnits="userSpaceOnUse">
              <circle className="megaayxx-chart__grid-dot" cx="1.2" cy="1.2" r="1" />
            </pattern>
            <clipPath id={`megaayxx-clip-${metric}`}><rect width="760" height="250" /></clipPath>
          </defs>
          <rect className="megaayxx-chart__grid" width="760" height="250" fill={`url(#megaayxx-grid-${metric})`} />
          <path className="megaayxx-chart__line" d={path} clipPath={`url(#megaayxx-clip-${metric})`} />
          {hoverIndex !== null && (
            <g className="megaayxx-chart__crosshair" aria-hidden="true">
              <line x1={activePoint.x} x2={activePoint.x} y1="0" y2="250" />
              <line x1="0" x2="760" y1={activePoint.y} y2={activePoint.y} />
              <circle cx={activePoint.x} cy={activePoint.y} r="4" />
            </g>
          )}
          <rect className="megaayxx-chart__hit-area" width="760" height="250" fill="transparent" />
        </svg>
        <div className="megaayxx-chart__axis">{axis.map((label) => <span key={label}>{label}</span>)}</div>
        <div className="megaayxx-chart__dates">{chartDates.map((label, index) => <span key={`${label}-${index}`}>{label}</span>)}</div>
      </div>
    </>
  );
}

function AssetIcon({ asset }: { asset: (typeof holdings)[number] }) {
  if (asset.image) return <img src={asset.image} alt="" />;
  return <span style={{ background: asset.tone }}>{asset.symbol.slice(0, 1)}</span>;
}

export function MegaAyxxPage() {
  const { lang, t } = useLocale();
  const text = copy[lang];
  const [metric, setMetric] = useState<ChartMetric>("pnl");
  const [period, setPeriod] = useState<ChartPeriod | null>(null);
  const [fundingMode, setFundingMode] = useState<FundingMode>("add");
  const [amount, setAmount] = useState("");
  const [query, setQuery] = useState("");
  const [equitySort, setEquitySort] = useState<SortDirection>("desc");
  const [assetPage, setAssetPage] = useState(1);
  const [assetPageSize, setAssetPageSize] = useState(20);

  const filteredHoldings = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = normalized
      ? holdings.filter((asset) => `${asset.name} ${asset.symbol}`.toLowerCase().includes(normalized))
      : holdings;
    return [...filtered].sort((first, second) => {
      const firstValue = Number(first.equity.replace(/[^0-9.]/g, ""));
      const secondValue = Number(second.equity.replace(/[^0-9.]/g, ""));
      return equitySort === "desc" ? secondValue - firstValue : firstValue - secondValue;
    });
  }, [equitySort, query]);

  const assetTotal = query.trim() ? filteredHoldings.length : 269;
  const assetPageCount = Math.max(1, Math.ceil(assetTotal / assetPageSize));
  const visibleHoldings = useMemo(() => {
    const start = (assetPage - 1) * assetPageSize;
    const rowCount = Math.max(0, Math.min(assetPageSize, assetTotal - start));
    if (query.trim()) return filteredHoldings.slice(start, start + rowCount);
    return Array.from({ length: rowCount }, (_, index) => filteredHoldings[(start + index) % filteredHoldings.length]);
  }, [assetPage, assetPageSize, assetTotal, filteredHoldings, query]);
  const formatCopy = (template: string, values: Record<string, number>) => Object.entries(values)
    .reduce((message, [key, value]) => message.replace(`{${key}}`, String(value)), template);

  const locale = { ko: "ko-KR", en: "en-US", ja: "ja-JP", zh: "zh-CN", vi: "vi-VN", fr: "fr-FR" }[lang];
  const periodSuffix = { ko: "일", en: "d", ja: "日", zh: "天", vi: " ngày", fr: " j" }[lang];
  const removeAmountLabel = { ko: "제거할 금액", en: "Amount to remove", ja: "削除する金額", zh: "移除金额", vi: "Số tiền cần rút", fr: "Montant à retirer" }[lang];
  const isAddingFunds = fundingMode === "add";

  return (
    <main className="megaayxx-page">
      <div className="megaayxx-page__layout">
        <section className="megaayxx-page__main">
          <header className="megaayxx-hero">
            <div className="megaayxx-hero__identity">
              <span className="megaayxx-hero__logo"><BrandLogo /></span>
              <h1>Megaayxx</h1>
            </div>
            <dl>
              <div><dt><Tooltip content={text.aprTooltip} tooltipClassName="hint__pop--wide" portal>{text.apr}</Tooltip></dt><dd className="is-positive">7%</dd></div>
              <div><dt>{text.tvl}</dt><dd>$1,771,370</dd></div>
            </dl>
          </header>

          <section className="megaayxx-chart">
            <div className="megaayxx-chart__toolbar">
              <div className="megaayxx-chart__metrics">
                <button className={metric === "pnl" ? "is-active" : undefined} type="button" onClick={() => setMetric("pnl")}>{text.grossPnl}</button>
                <button className={metric === "tvl" ? "is-active" : undefined} type="button" onClick={() => setMetric("tvl")}>{text.grossTvl}</button>
              </div>
              <div className="megaayxx-chart__periods">
                {([7, 30, 90] as const).map((item) => <button className={period === item ? "is-active" : undefined} type="button" onClick={() => setPeriod(item)} key={item}>{item}{periodSuffix}</button>)}
              </div>
            </div>
            <VaultChart key={`${metric}-${period ?? "default"}`} metric={metric} period={period} locale={locale} />
          </section>

          <p className="megaayxx-page__warning">{text.warning}</p>

          <section className="megaayxx-assets">
            <header>
              <h2>{text.assets} <span>269</span></h2>
              <a href="#megaayxx-index">{text.index}<ExternalIcon /></a>
            </header>
            <TableSearch
              id="megaayxx-asset-search"
              className="megaayxx-assets__search"
              value={query}
              onChange={(value) => {
                setQuery(value);
                setAssetPage(1);
              }}
              placeholder={text.search}
            />
            <div className="megaayxx-assets__table-wrap">
              <DataTable className="megaayxx-assets__table">
                <DataTableHead className="megaayxx-assets__head">
                  <span>{text.market}</span>
                  <span>{text.size}</span>
                  <span>{text.pastThirtyDays}</span>
                  <VolumeSortButton
                    className="megaayxx-assets__sort"
                    label={text.equity}
                    direction={equitySort}
                    onToggle={() => setEquitySort((current) => current === "desc" ? "asc" : "desc")}
                  />
                </DataTableHead>
                <DataTableBody className="megaayxx-assets__body">
                  {visibleHoldings.map((asset, index) => (
                    <div className="megaayxx-assets__row" key={`${assetPage}-${index}-${asset.symbol}`}>
                      <div className="megaayxx-assets__market"><span className="megaayxx-assets__coin"><AssetIcon asset={asset} /></span><span><strong>{asset.name}</strong><small>—</small></span></div>
                      <div className="megaayxx-assets__size"><strong>{asset.size ?? "—"}</strong><small>{asset.units ?? "—"} <b>{asset.symbol}</b></small></div>
                      <div className="megaayxx-assets__pnl"><i /><strong>$0</strong></div>
                      <strong className="megaayxx-assets__equity">{asset.equity}</strong>
                    </div>
                  ))}
                </DataTableBody>
                <DataTablePagination
                  summary={formatCopy(text.showing, {
                    start: assetTotal === 0 ? 0 : (assetPage - 1) * assetPageSize + 1,
                    end: Math.min(assetPage * assetPageSize, assetTotal),
                    total: assetTotal,
                  })}
                  page={assetPage}
                  pageCount={assetPageCount}
                  pageSize={assetPageSize}
                  onPageChange={setAssetPage}
                  onPageSizeChange={(size) => {
                    setAssetPageSize(size);
                    setAssetPage(1);
                  }}
                  previousLabel={t("previousPage")}
                  nextLabel={t("nextPage")}
                  pageSizeLabel={t("marketsPerPage")}
                  viewLabel={t("view")}
                />
              </DataTable>
            </div>
          </section>
        </section>

        <aside className="megaayxx-funding">
          <div className="megaayxx-funding__balances">
            <div>
              <Tooltip content={text.vaultBalanceTooltip} tooltipClassName="hint__pop--wide" placement="bottom" portal>{text.vaultBalance}</Tooltip>
              <strong>—</strong>
            </div>
            <div>
              <Tooltip content={text.totalPnlTooltip} tooltipClassName="hint__pop--wide" placement="bottom" portal>{text.totalPnl}</Tooltip>
              <strong>—</strong>
            </div>
          </div>
          <section className="megaayxx-funding__card">
            <div className="megaayxx-funding__tabs">
              <button className={isAddingFunds ? "is-active" : undefined} type="button" onClick={() => { setFundingMode("add"); setAmount(""); }}>{text.addFunds}</button>
              <button className={!isAddingFunds ? "is-active" : undefined} type="button" onClick={() => { setFundingMode("remove"); setAmount(""); }}>{text.removeFunds}</button>
            </div>
            <div className="megaayxx-funding__amount-group">
              <label className="megaayxx-funding__amount">
                <span>{isAddingFunds ? text.amount : removeAmountLabel}</span>
                <span className="megaayxx-funding__input"><input inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value.replace(/[^0-9.]/g, ""))} placeholder="$0.00" /><button type="button" onClick={() => setAmount("0")}>{text.max}</button></span>
              </label>
              <div className="megaayxx-funding__free">
                <Tooltip
                  content={isAddingFunds ? text.freeCollateralTooltip : text.withdrawableTooltip}
                  title={isAddingFunds ? text.freeCollateral : undefined}
                  tooltipClassName="hint__pop--wide"
                  portal
                >
                  {isAddingFunds ? text.freeCollateral : text.withdrawable}
                </Tooltip>
                <strong>$0.00</strong>
              </div>
            </div>
            <div className="megaayxx-funding__result-group">
              <dl className={`megaayxx-funding__details${isAddingFunds ? "" : " is-remove"}`}>
                {isAddingFunds ? (
                  <>
                    <div><dt><Tooltip content={text.marginUsageTooltip} title={text.marginUsage} tooltipClassName="hint__pop--wide" portal>{text.marginUsage}</Tooltip></dt><dd>—</dd></div>
                    <div><dt><Tooltip content={text.vaultBalanceTooltip} tooltipClassName="hint__pop--wide" portal>{text.vaultBalance}</Tooltip></dt><dd>$0.00</dd></div>
                  </>
                ) : (
                  <>
                    <div><dt><Tooltip content={text.freeCollateralTooltip} title={text.freeCollateral} tooltipClassName="hint__pop--wide" portal>{text.freeCollateral}</Tooltip></dt><dd>$0.00</dd></div>
                    <div><dt><Tooltip content={text.estimatedSlippageTooltip} tooltipClassName="hint__pop--wide" portal>{text.estimatedSlippage}</Tooltip></dt><dd>0.00%</dd></div>
                    <div><dt><Tooltip content={text.estimatedReceivedTooltip} tooltipClassName="hint__pop--wide" portal>{text.estimatedReceived}</Tooltip></dt><dd>—</dd></div>
                  </>
                )}
              </dl>
              <button className="megaayxx-funding__submit" type="button" disabled={!Number(amount)}>{Number(amount) ? (isAddingFunds ? text.addFunds : text.removeFunds) : (isAddingFunds ? text.enterAmount : text.enterRemoveAmount)}</button>
            </div>
          </section>
          <div className="megaayxx-funding__empty"><span className="megaayxx-funding__spinner" />{text.noBalance}</div>
        </aside>
      </div>
    </main>
  );
}
