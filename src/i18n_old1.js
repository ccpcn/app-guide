
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import bn from "./locales/bn.json";
import ar from "./locales/ar.json";

const params = new URLSearchParams(window.location.search);
const requestedLanguage = params.get("lang");

const supportedLanguages = ["en", "bn", "ar"];

const initialLanguage = supportedLanguages.includes(
  requestedLanguage
)
  ? requestedLanguage
  : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    bn: { translation: bn },
    ar: { translation: ar }
  },
  lng: initialLanguage,
  fallbackLng: "en",
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
