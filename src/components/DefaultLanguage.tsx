import React from 'react'
import useLanguage from '../hooks/useLanguage'
import { appLanguages } from '../common/constants'
import { AppLocale } from '../types/api.types'

type DefaultLanguageProps = {
  onDismiss: (...args: any[]) => any
}
const DefaultLanguage: React.FC<DefaultLanguageProps> = ({ onDismiss }) => {
  const { language, changeLanguage } = useLanguage()
  const onLanguageButtonClick = (
    e: React.MouseEvent<HTMLButtonElement> & {
      target: { dataset: { locale: string } }
    }
  ) => {
    e.preventDefault()
    const {
      target: {
        dataset: { locale = 'en' },
      },
    } = e
    changeLanguage(locale)
    onDismiss()
  }
  const selectedLanguage =
    appLanguages.find(item => item.locale === language) || appLanguages[0]
  return (
    <div className="text-2xl md:flex-row justify-center rounded-b p-8">
      {appLanguages.map(lang => (
        <button
          key={lang.locale}
          className="flex w-48 justify-center  items-center focus:outline-none border border-gray-800 px-4 py-2 m-3 rounded text-black hover:bg-purple-800 hover:text-white"
          onClick={onLanguageButtonClick}
          data-locale={lang.locale}
          type="button"
        >
          <img
            src={`https://cdn.nyaladev.com/barmaga.io/${lang.icon}`}
            className="w-8 mr-4"
            alt={`${selectedLanguage.label} Flag`}
          />
          {lang.label}
        </button>
      ))}
    </div>
  )
}
export default DefaultLanguage
