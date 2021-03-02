import React, { useState } from 'react'
import useLanguage from '../hooks/useLanguage'

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
    languages.find(item => item.locale === language) || languages[0]

  return (
    <div className="relative group">
      <button
        className="p-1 border-2 border-transparent text-gray-400 flex items-center  hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
        type="button"
        onClick={toggleOpen}
      >
        <img
          src={`https://cdn.nyaladev.com/barmaga.io/${selectedLanguage.icon}`}
          className={`w-3 ${isRtl ? 'ml-2' : 'mr-2'}`}
          alt={`${selectedLanguage.label} Flag`}
        />
        <span>{selectedLanguage.label}</span>
      </button>

      <div
        className={`${
          open ? '' : 'hidden'
        } items-center absolute border border-t-0 rounded-b bg-white p-2`}
      >
        {languages.map(lang => (
          <button
            key={lang.id}
            className="flex items-center  focus:outline-none border-transparent px-4 py-2  text-black hover:bg-grey-lighter"
            onClick={onLanguageButtonClick}
            data-locale={lang.locale}
            type="button"
          >
            <img
              src={`https://cdn.nyaladev.com/barmaga.io/${lang.icon}`}
              className={`w-3 ${isRtl ? 'ml-2' : 'mr-2'}`}
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
