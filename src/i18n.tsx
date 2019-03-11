import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import EnTranslation from "./i18n/en/translation.json";

const resources: i18next.Resource = {
  en: {
    translation: EnTranslation,
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
      defaultTransParent: "span",
    },
  });

export default i18n;
