import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: process.env !== 'production',
    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'cn'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
