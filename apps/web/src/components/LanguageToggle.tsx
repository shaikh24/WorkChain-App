import { useTranslation } from "react-i18next";
export function LanguageToggle() {
  const { i18n } = useTranslation();
  const next = i18n.language === "en" ? "ur" : "en";
  return (
    <button className="text-sm opacity-80 hover:opacity-100" onClick={() => i18n.changeLanguage(next)}>
      {i18n.language.toUpperCase()}
    </button>
  );
}
