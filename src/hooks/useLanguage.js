import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { setLocalStorage, getLocalStorage } from '../services/localStorage'
import { DEFAULT_LANGUAGE } from '../common/constants'

/**
 * Custom hook to handle language switching
 */
const useLanguage = () => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(undefined)

  const storedLanguage = getLocalStorage(DEFAULT_LANGUAGE) || 'ar'

  const isRtl = language === 'ar'

  useEffect(() => {
    setLanguage(i18n.language || storedLanguage)
  }, [i18n.language])

  const setCurrentLanguage = useCallback(languageToSet => {
    i18n.changeLanguage(languageToSet)
    setLocalStorage(DEFAULT_LANGUAGE, i18n.language)
  })

  return {
    setCurrentLanguage,
    language,
    isRtl,
  }
}

export default useLanguage
