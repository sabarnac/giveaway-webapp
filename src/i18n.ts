import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import EnTranslation from "./i18n/en/translation.json";
import DeTranslation from "./i18n/de/translation.json";
import { isDevEnvironment } from "./util";
import ConfigJson from "./store/config/config.json";

// Update this to include all translation resources.
const resources: i18next.Resource = {
  en: {
    translation: EnTranslation,
  },
  de: {
    translation: DeTranslation,
  },
};

// No need to modify anything from this point.
const configLanguages: string[] = ConfigJson.lang;
const resourceLanguages: string[] = Object.keys(resources);
resourceLanguages
  .filter(
    (language: string): boolean => configLanguages.indexOf(language) === -1,
  )
  .forEach(
    (language: string): void => {
      throw new Error(`Language "${language}" is not added in config.`);
    },
  );
configLanguages
  .filter(
    (language: string): boolean => resourceLanguages.indexOf(language) === -1,
  )
  .forEach(
    (language: string): void => {
      throw new Error(`Language "${language}" is not added in resources.`);
    },
  );

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    debug: isDevEnvironment(),
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
  });

export default i18n;
