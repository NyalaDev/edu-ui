import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getLocalStorage,
  setLocalStorage,
  LANG_KEY,
} from '../services/localStorage'

const languages = [
  {
    id: 1,
    label: 'العربية',
    locale: 'ar',
    icon: 'sd.svg',
  },
  {
    id: 2,
    label: 'English',
    locale: 'en',
    icon: 'au.svg',
  },
]

const LanguageSwitcher = () => {
  const [locale, setLocale] = useState(getLocalStorage(LANG_KEY) || 'ar')
  const [open, setOpen] = useState(false)
  const { i18n } = useTranslation()

  const toggleOpen = () => {
    setOpen(!open)
  }

  const onLanguageButtonClick = e => {
    e.preventDefault()
    const {
      target: {
        dataset: { locale = 'ar' },
      },
    } = e
    i18n.changeLanguage(locale)
    setLocale(locale)
    setOpen(false)
    setLocalStorage(LANG_KEY, locale)
  }

  const selectedLanguage =
    languages.find(item => item.locale === locale) || languages[0]

  return (
    <div className="relative group">
      <button
        className="p-1 border-2 border-transparent text-gray-400 flex items-center  hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
        onClick={toggleOpen}
      >
        <img
          src={`https://cdn.nyaladev.com/coderhub/${selectedLanguage.icon}`}
          className="w-3 ml-2"
          alt="Flag"
        />
        <span>{selectedLanguage.label}</span>
      </button>

      <div
        className={`${
          open ? '' : 'hidden'
        } items-center absolute border border-t-0 rounded-b bg-white p-2`}
      >
        {languages.map(language => (
          <button
            key={language.id}
            className="flex items-center  focus:outline-none border-transparent px-4 py-2  text-black hover:bg-grey-lighter"
            onClick={onLanguageButtonClick}
            data-locale={language.locale}
          >
            <img
              src={`https://cdn.nyaladev.com/coderhub/${language.icon}`}
              className="w-3 ml-2"
              alt="Flag"
            />
            {language.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSwitcher
