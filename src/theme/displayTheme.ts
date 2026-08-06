export type DisplayTheme = "dark" | "light" | "classic" | "system";
export type MarketColorDirection = "green" | "red";

const THEME_KEY = "ayxx-display-theme";
const COLOR_KEY = "ayxx-market-color-direction";
const themes: DisplayTheme[] = ["dark", "light", "classic", "system"];
export const DISPLAY_THEME_CHANGE_EVENT = "ayxx-display-theme-change";

export function getDisplayTheme(): DisplayTheme {
  const stored = localStorage.getItem(THEME_KEY) as DisplayTheme | null;
  return stored && themes.includes(stored) ? stored : "dark";
}

export function setDisplayTheme(theme: DisplayTheme) {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new CustomEvent(DISPLAY_THEME_CHANGE_EVENT, { detail: { theme } }));
}

export function getMarketColorDirection(): MarketColorDirection {
  return localStorage.getItem(COLOR_KEY) === "red" ? "red" : "green";
}

export function setMarketColorDirection(direction: MarketColorDirection) {
  localStorage.setItem(COLOR_KEY, direction);
  document.documentElement.dataset.marketColors = direction;
}

export function initializeDisplayTheme() {
  document.documentElement.dataset.theme = getDisplayTheme();
  document.documentElement.dataset.marketColors = getMarketColorDirection();
}
