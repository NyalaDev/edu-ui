import React, { useState } from 'react'
import useLanguage from '../../hooks/useLanguage'
import { appLanguages } from '../../common/constants'
import { AppLocale } from '../../types/api.types'

const LanguageSwitcher: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const { language, changeLanguage } = useLanguage()
  const { isRtl } = useLanguage()
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen(!open)
  }
  const onLanguageButtonClick = (
    e: React.MouseEvent<HTMLButtonElement> & {
      target: { dataset: { locale: AppLocale } }
    }
  ) => {
    e.preventDefault()
    const {
      target: {
        dataset: { locale = 'ar' },
      },
    } = e
    changeLanguage(locale)
    setOpen(false)
  }
  const selectedLanguage =
    appLanguages.find(item => item.locale === language) || appLanguages[0]
  return (
    <div className="relative group">
      <button
        className={`p-1 border-2 border-transparent ${
          !dark ? 'text-white' : ''
        } flex items-center focus:outline-none  transition duration-150 ease-in-out`}
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
