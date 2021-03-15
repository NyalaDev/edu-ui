import React from 'react'
import PropTypes from 'prop-types'
import useLanguage from '../hooks/useLanguage'
import { appLanguages } from '../common/constants'

const DefaultLanguage = ({ onDismiss }) => {
  const { language, setCurrentLanguage } = useLanguage()

  const onLanguageButtonClick = e => {
    e.preventDefault()
    const {
      target: {
        dataset: { locale = 'en' },
      },
    } = e
    setCurrentLanguage(locale)
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

DefaultLanguage.propTypes = {
  onDismiss: PropTypes.func.isRequired,
}

export default DefaultLanguage
