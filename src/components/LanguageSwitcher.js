import React, { useState } from 'react'
import useLanguage from '../hooks/useLanguage'

export const appLanguages = [
  {
    label: 'العربية',
    locale: 'ar',
    icon: 'sd.svg',
  },
  {
    label: 'English',
    locale: 'en',
    icon: 'au.svg',
  },
  {
    label: 'አማርኛ',
    locale: 'am',
    icon: 'et.svg',
  },
  {
    label: 'Swahili',
    locale: 'sw',
    icon: 'sw.svg',
  },
]

const LanguageSwitcher = () => {
  const { language, isRtl, setCurrentLanguage } = useLanguage()

  const [open, setOpen] = useState(false)

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
    setCurrentLanguage(locale)
    setOpen(false)
  }

  const selectedLanguage =
    appLanguages.find(item => item.locale === language) || appLanguages[0]

  return (
    <div className="relative group">
      <button
        className="p-1 border-2 border-transparent text-gray-400 flex items-center  hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
        type="button"
        onClick={toggleOpen}
      >
        <img
          src={`https://cdn.nyaladev.com/barmaga.io/${selectedLanguage.icon}`}
          className={`w-8 ${isRtl ? 'ml-2' : 'mr-2'}`}
          alt={`${selectedLanguage.label} Flag`}
        />
        <span>{selectedLanguage.label}</span>
      </button>

      <div
        className={`${
          open ? '' : 'hidden'
        } items-center w-32 absolute border border-t-0 rounded-b bg-white p-2 z-50`}
      >
        {appLanguages.map(lang => (
          <button
            key={lang.locale}
            className="flex items-center focus:outline-none border-transparent px-2 py-2  text-black hover:bg-grey-lighter"
            onClick={onLanguageButtonClick}
            data-locale={lang.locale}
            type="button"
          >
            <img
              src={`https://cdn.nyaladev.com/barmaga.io/${lang.icon}`}
              className={`w-4 ${isRtl ? 'ml-2' : 'mr-2'}`}
              alt={`${selectedLanguage.label} Flag`}
            />
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSwitcher
