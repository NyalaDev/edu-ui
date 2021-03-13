import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANGUAGE } from '../common/constants'
import ar from '../locales/ar/messages.json'
import en from '../locales/en/messages.json'
import am from '../locales/am/messages.json'
import sw from '../locales/sw/messages.json'
import { getLocalStorage } from '../services/localStorage'

i18next.use(initReactI18next).init({
  lng: getLocalStorage(DEFAULT_LANGUAGE) || 'ar',
  fallbackLng: 'en',
  ns: ['messages'],
  defaultNS: 'messages',
  resources: {
    ar: {
      messages: ar,
    },
    en: {
      messages: en,
    },
    am: {
      messages: am,
    },
    sw: {
      messages: sw,
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

i18next.languages = ['ar', 'en', 'am']

export default i18next
