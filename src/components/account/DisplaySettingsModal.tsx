import { useState } from "react";
import { useLocale, type Lang } from "../../i18n/Locale";
import chartBars from "../../assets/images/chart-bars.svg";
import { CloseIcon } from "../icons/CloseIcon";
import { Modal } from "../ui/Modal";
import {
  getDisplayTheme,
  getMarketColorDirection,
  setDisplayTheme,
  setMarketColorDirection,
  type DisplayTheme,
  type MarketColorDirection,
} from "../../theme/displayTheme";
import "./DisplaySettingsModal.scss";

const copy: Record<Lang, {
  title: string;
  theme: string;
  dark: string;
  light: string;
  classicDark: string;
  system: string;
  color: string;
  greenUp: string;
  redUp: string;
}> = {
  ko: { title: "표시 설정", theme: "테마", dark: "어두운", light: "라이트", classicDark: "클래식 다크", system: "시스템", color: "색상 설정", greenUp: "녹색 강화", redUp: "적색 강화" },
  en: { title: "Display Settings", theme: "Theme", dark: "Dark", light: "Light", classicDark: "Classic Dark", system: "System", color: "Color Settings", greenUp: "Green Up", redUp: "Red Up" },
  ja: { title: "表示設定", theme: "テーマ", dark: "ダーク", light: "ライト", classicDark: "クラシックダーク", system: "システム", color: "カラー設定", greenUp: "緑の上昇", redUp: "赤の上昇" },
  zh: { title: "显示设置", theme: "主题", dark: "深色", light: "浅色", classicDark: "经典深色", system: "跟随系统", color: "颜色设置", greenUp: "绿色上涨", redUp: "红色上涨" },
  vi: { title: "Cài đặt hiển thị", theme: "Chủ đề", dark: "Tối", light: "Sáng", classicDark: "Tối cổ điển", system: "Hệ thống", color: "Cài đặt màu", greenUp: "Xanh tăng", redUp: "Đỏ tăng" },
  fr: { title: "Paramètres d’affichage", theme: "Thème", dark: "Sombre", light: "Clair", classicDark: "Sombre classique", system: "Système", color: "Réglages des couleurs", greenUp: "Hausse en vert", redUp: "Hausse en rouge" },
};

export function DisplaySettingsModal({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLocale();
  const text = copy[lang];
  const themes = [
    { key: "dark", label: text.dark, tone: "dark" },
    { key: "light", label: text.light, tone: "light" },
    { key: "classic", label: text.classicDark, tone: "classic" },
    { key: "system", label: text.system, tone: "light" },
  ] as const;
  const [selectedTheme, setSelectedTheme] = useState<DisplayTheme>(getDisplayTheme);
  const [selectedColor, setSelectedColor] = useState<MarketColorDirection>(getMarketColorDirection);

  const selectTheme = (theme: DisplayTheme) => {
    setSelectedTheme(theme);
    setDisplayTheme(theme);
  };

  const selectColor = (direction: MarketColorDirection) => {
    setSelectedColor(direction);
    setMarketColorDirection(direction);
  };

  return (
    <Modal className="display-settings-modal" backdropClassName="display-settings-modal__backdrop" labelledBy="display-settings-modal-title" onClose={onClose}>
      <header className="display-settings-modal__header">
        <h2 id="display-settings-modal-title">{text.title}</h2>
        <button type="button" aria-label={t("close")} onClick={onClose}><CloseIcon /></button>
      </header>

      <fieldset className="display-settings-modal__themes">
        <legend>{text.theme}</legend>
        <div>
          {themes.map((theme) => (
            <button
              className={`display-settings-modal__theme is-${theme.tone}${selectedTheme === theme.key ? " is-selected" : ""}`}
              type="button"
              role="radio"
              aria-checked={selectedTheme === theme.key}
              key={theme.key}
              onClick={() => selectTheme(theme.key)}
            >
              <span>{theme.label}</span>
              <div className="display-settings-modal__preview"><img src={chartBars} alt="" /></div>
              {selectedTheme === theme.key && <i aria-hidden="true">✓</i>}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="display-settings-modal__colors">
        <legend>{text.color}</legend>
        <button className={selectedColor === "green" ? "is-selected" : undefined} type="button" role="radio" aria-checked={selectedColor === "green"} onClick={() => selectColor("green")}>
          <span><i className="is-green">↑</i><i className="is-red">↓</i></span>
          <strong>{text.greenUp}</strong><b aria-hidden="true" />
        </button>
        <button className={selectedColor === "red" ? "is-selected" : undefined} type="button" role="radio" aria-checked={selectedColor === "red"} onClick={() => selectColor("red")}>
          <span><i className="is-red">↑</i><i className="is-green">↓</i></span>
          <strong>{text.redUp}</strong><b aria-hidden="true" />
        </button>
      </fieldset>
    </Modal>
  );
}
