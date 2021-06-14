import React, { useState } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import useLanguage from '../../hooks/useLanguage'

type SearchBoxProps = {
  onSearch: (...args: any[]) => any
}
const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [text, setText] = useState('')
  const { isRtl } = useLanguage()
  const { t } = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onSearch(text)
    }
  }

  return (
    <>
      <input
        value={text}
        type="search"
        placeholder={t('search')}
        onChange={handleChange}
        className={`w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-gray-700 rounded py-1 px-2 ${
          isRtl ? 'pl-10' : 'pr-10'
        } appearance-none leading-normal`}
        onKeyDown={handleKeyDown}
      />
      <div
        className="absolute search-icon"
        style={{ top: '0.375rem', [isRtl ? 'left' : 'right']: '1.75rem' }}
      >
        <svg
          className="fill-current pointer-events-none text-gray-800 w-4 h-4"
          xmlns="https://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
      </div>
    </>
  )
}
export default SearchBox
