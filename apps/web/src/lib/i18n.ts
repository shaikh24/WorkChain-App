import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
  en: { translation: { welcome: "Find your perfect freelancer" } },
  ur: { translation: { welcome: "اپنے لیے بہترین فری لانسر تلاش کریں" } }
};
i18n.use(initReactI18next).init({ resources, lng: 'en', interpolation: { escapeValue: false } });
export default i18n;
