import { isDevEnvironment } from "../../util";
import i18next from "i18next";
import EnTranslation from "../../i18n/en/translation.json";
import DeTranslation from "../../i18n/de/translation.json";

// Update this to include all translation resources.
const defaultLanguage: string = "en";
const fallbackLanguage: string = "en";
const resources: i18next.Resource = {
  en: {
    translation: EnTranslation,
  },
  de: {
    translation: DeTranslation,
  },
};

// Don't modify anything from this point
export default {
  resources,
  lng: defaultLanguage,
  fallbackLng: fallbackLanguage,
  debug: isDevEnvironment,
  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
  },
};
