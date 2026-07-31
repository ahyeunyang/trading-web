import { useRef } from "react";
import { type Lang, useLocale } from "../../i18n/Locale";
import { ChevronDown } from "../icons/ChevronDown";
import { TranslateIcon } from "../icons/HeaderIcons";

const langs: Array<{ id: Lang; label: string }> = [
  { id: "ko", label: "한국어" },
  { id: "en", label: "English" },
  { id: "ja", label: "日本語" },
  { id: "zh", label: "中文" },
  { id: "vi", label: "Tiếng Việt" },
  { id: "fr", label: "Français" },
];

export function LangSelect() {
  const { lang, setLang } = useLocale();
  const ref = useRef<HTMLDetailsElement>(null);

  const select = (next: Lang) => {
    setLang(next);
    ref.current?.removeAttribute("open");
  };

  return (
    <details className="lang" ref={ref}>
      <summary aria-label="Language">
        <TranslateIcon className="lang__icon" />
        <ChevronDown className="lang__arrow" />
      </summary>
      <div className="lang__menu">
        {langs.map((item) => (
          <button
            className={lang === item.id ? "is-active" : undefined}
            type="button"
            onClick={() => select(item.id)}
            key={item.id}
          >
            <span>{item.label}</span>
            {lang === item.id && <i aria-hidden="true">✓</i>}
          </button>
        ))}
      </div>
    </details>
  );
}
