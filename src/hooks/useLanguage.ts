/* eslint-disable no-undef */
import { useI18next } from 'gatsby-plugin-react-i18next'

import { setLocalStorage } from '../services/localStorage'
import { DEFAULT_LANGUAGE } from '../common/constants'
import { logError } from '../services/helpers'

type UseLanguageHook = {
  changeLanguage: (languageToSet: string) => void
  languages: string[]
  language: string
  isRtl: boolean
}
/**
 * Custom hook to handle language switching
 */
const useLanguage = (): UseLanguageHook => {
  const { languages, language, changeLanguage } = useI18next()

  const isRtl = language === 'ar'

  const setCurrentLanguage = (languageToSet: string) => {
    changeLanguage(languageToSet)
    setLocalStorage(DEFAULT_LANGUAGE, languageToSet)

    try {
      OneSignal.push(() => {
        OneSignal.sendTag('language', languageToSet)
      })
    } catch (err) {
      logError(err)
    }
  }

  return {
    changeLanguage: setCurrentLanguage,
    languages,
    language,
    isRtl,
  }
}

export default useLanguage
