
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "English" },
  { code: "bn", name: "বাংলা" },
  { code: "ar", name: "العربية" }
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = async (code) => {
    await i18n.changeLanguage(code);

    document.documentElement.lang = code;
    document.documentElement.dir =
      ["ar", "ur"].includes(code) ? "rtl" : "ltr";

    const url = new URL(window.location.href);
    url.searchParams.set("lang", code);
    window.history.replaceState({}, "", url);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language">
        Language
      </label>

      <select
        id="language"
        value={i18n.resolvedLanguage || i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        {languages.map((language) => (
          <option
            key={language.code}
            value={language.code}
          >
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}
