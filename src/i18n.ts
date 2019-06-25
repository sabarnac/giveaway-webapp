import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import ConfigJson from "./config/config.json";
import i18nConfig from "./store/config/i18n";

// No need to modify anything from this point.
const configLanguages: string[] = ConfigJson.lang;
const resourceLanguages: string[] = Object.keys(i18nConfig.resources);
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
  .init(i18nConfig);

export default i18n;
