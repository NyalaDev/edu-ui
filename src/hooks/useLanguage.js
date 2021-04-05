/* eslint-disable no-undef */
import { useCallback } from 'react'
import { useI18next } from 'gatsby-plugin-react-i18next'

import { setLocalStorage } from '../services/localStorage'
import { DEFAULT_LANGUAGE } from '../common/constants'

/**
 * Custom hook to handle language switching
 */
const useLanguage = () => {
  const { languages, language, changeLanguage } = useI18next()

  const isRtl = language === 'ar'

  const setCurrentLanguage = useCallback(languageToSet => {
    changeLanguage(languageToSet)
    setLocalStorage(DEFAULT_LANGUAGE, languageToSet)

    try {
      OneSignal.push(() => {
        OneSignal.sendTag('language', languageToSet)
      })
    } catch (err) {
      console.error(err)
    }
  })

  return {
    changeLanguage: setCurrentLanguage,
    languages,
    language,
    isRtl,
  }
}

export default useLanguage
