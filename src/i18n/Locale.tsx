import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Lang = "ko" | "en" | "ja" | "zh" | "vi" | "fr";

const text = {
  ko: {
    trade: "트레이드", spot: "스팟", markets: "시장", portfolio: "포트폴리오",
    rewards: "추천", more: "더 보기", login: "로그인", apiDocs: "API 문서",
    apiKeys: "API 거래 키", mintscan: "민트 스캔", funding: "펀딩 비교",
    community: "커뮤니티", terms: "이용약관", privacy: "개인정보 보호정책",
    help: "도움말", stats: "통계",
  },
  en: {
    trade: "Trade", spot: "Spot", markets: "Markets", portfolio: "Portfolio",
    rewards: "Rewards", more: "More", login: "Log in", apiDocs: "API Documentation",
    apiKeys: "API Trading Keys", mintscan: "Mintscan", funding: "Funding Comparison",
    community: "Community", terms: "Terms of Use", privacy: "Privacy Policy",
    help: "Help", stats: "Statistics",
  },
  ja: {
    trade: "トレード", spot: "スポット", markets: "市場", portfolio: "ポートフォリオ",
    rewards: "報酬", more: "もっと見る", login: "ログイン", apiDocs: "API ドキュメント",
    apiKeys: "API 取引キー", mintscan: "ミントスキャン", funding: "資金調達比較",
    community: "コミュニティ", terms: "利用規約", privacy: "プライバシーポリシー",
    help: "ヘルプ", stats: "統計",
  },
  zh: {
    trade: "交易", spot: "现货", markets: "市场", portfolio: "投资组合",
    rewards: "奖励", more: "更多", login: "登录", apiDocs: "API 文档",
    apiKeys: "API 交易密钥", mintscan: "Mintscan", funding: "资金费率比较",
    community: "社区", terms: "使用条款", privacy: "隐私政策",
    help: "帮助", stats: "统计",
  },
  vi: {
    trade: "Giao dịch", spot: "Giao ngay", markets: "Thị trường", portfolio: "Danh mục",
    rewards: "Phần thưởng", more: "Xem thêm", login: "Đăng nhập", apiDocs: "Tài liệu API",
    apiKeys: "Khóa giao dịch API", mintscan: "Mintscan", funding: "So sánh funding",
    community: "Cộng đồng", terms: "Điều khoản sử dụng", privacy: "Chính sách riêng tư",
    help: "Trợ giúp", stats: "Thống kê",
  },
  fr: {
    trade: "Trader", spot: "Spot", markets: "Marchés", portfolio: "Portefeuille",
    rewards: "Récompenses", more: "Plus", login: "Connexion", apiDocs: "Documentation API",
    apiKeys: "Clés de trading API", mintscan: "Mintscan", funding: "Comparaison du financement",
    community: "Communauté", terms: "Conditions d’utilisation", privacy: "Politique de confidentialité",
    help: "Aide", stats: "Statistiques",
  },
} as const;

type Key = keyof typeof text.ko;

type LocaleValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: Key) => string;
};

const LocaleContext = createContext<LocaleValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ko");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LocaleValue>(
    () => ({ lang, setLang, t: (key) => text[lang][key] }),
    [lang],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used within LocaleProvider");
  return value;
}
