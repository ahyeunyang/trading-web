import { useEffect, useState } from "react";
import { DISPLAY_THEME_CHANGE_EVENT, getDisplayTheme } from "../../theme/displayTheme";

function isLightMode() {
  const theme = getDisplayTheme();
  return theme === "light" || (theme === "system" && window.matchMedia("(prefers-color-scheme: light)").matches);
}

export function ThemeModeIcon() {
  const [isLight, setIsLight] = useState(isLightMode);

  useEffect(() => {
    const colorScheme = window.matchMedia("(prefers-color-scheme: light)");
    const updateIcon = () => setIsLight(isLightMode());

    window.addEventListener(DISPLAY_THEME_CHANGE_EVENT, updateIcon);
    colorScheme.addEventListener("change", updateIcon);
    return () => {
      window.removeEventListener(DISPLAY_THEME_CHANGE_EVENT, updateIcon);
      colorScheme.removeEventListener("change", updateIcon);
    };
  }, []);

  if (isLight) {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 1V3.5M18.0711 3.92889L16.3033 5.69667M21 11H18.5M18.0711 18.0711L16.3033 16.3033M11 18.5V21M5.69667 16.3033L3.92889 18.0711M3.5 11H1M5.69667 5.69667L3.92889 3.92889M15.1667 11C15.1667 12.1051 14.7277 13.1649 13.9463 13.9463C13.1649 14.7277 12.1051 15.1667 11 15.1667C9.89493 15.1667 8.83512 14.7277 8.05372 13.9463C7.27232 13.1649 6.83333 12.1051 6.83333 11C6.83333 9.89493 7.27232 8.83512 8.05372 8.05372C8.83512 7.27232 9.89493 6.83333 11 6.83333C12.1051 6.83333 13.1649 7.27232 13.9463 8.05372C14.7277 8.83512 15.1667 9.89493 15.1667 11Z" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
  );
}
