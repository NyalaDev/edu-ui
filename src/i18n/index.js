import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import ar from '../locales/ar/messages.json'
import en from '../locales/en/messages.json'
import { getLocalStorage, LANG_KEY } from '../services/localStorage'

i18next.use(initReactI18next).init({
  lng: getLocalStorage(LANG_KEY),
  fallbackLng: 'ar',
  ns: ['messages'],
  defaultNS: 'messages',
  resources: {
    ar: {
      messages: ar,
    },
    en: {
      messages: en,
    },
  },
  // debug: process.env.NODE_ENV !== 'production',
  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
  },
})

i18next.languages = ['ar', 'en']

export default i18next
