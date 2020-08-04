import React from 'react'
import { useTranslation } from 'react-i18next'

const SearchBar = () => {
  const { t } = useTranslation()
  return (
    <div className="relative">
      <input
        type="search"
        placeholder={t('search')}
        className="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-gray-700 rounded py-1 px-2 pl-10 appearance-none leading-normal"
      />
      <div
        className="absolute search-icon"
        style={{ top: '0.375rem', left: '1.75rem' }}
      >
        <svg
          className="fill-current pointer-events-none text-gray-800 w-4 h-4"
          xmlns="https://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
      </div>
    </div>
  )
}

export default SearchBar
