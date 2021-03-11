import React from 'react'
import PropTypes from 'prop-types'
import useLanguage from '../hooks/useLanguage'
import { appLanguages } from '../common/const'

const DefaultLanguage = ({ onDismiss }) => {
  const { language, isRtl, setCurrentLanguage } = useLanguage()

  const onLanguageButtonClick = e => {
    e.preventDefault()
    const {
      target: {
        dataset: { locale = 'ar' },
      },
    } = e
    setCurrentLanguage(locale)
    onDismiss()
  }

  const selectedLanguage =
    appLanguages.find(item => item.locale === language) || appLanguages[0]

  return (
    <div className="flex flex-col md:flex-row justify-center rounded-b p-2 ">
      {appLanguages.map(lang => (
        <button
          key={lang.id}
          className="flex items-center focus:outline-none border border-4 border-gray-800 px-4 py-2 m-3 rounded text-black hover:bg-purple-800"
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
  )
}

DefaultLanguage.propTypes = {
  onDismiss: PropTypes.func.isRequired,
}

export default DefaultLanguage
