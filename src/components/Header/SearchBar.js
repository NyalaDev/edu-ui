import React from 'react'
// import { useTranslation } from 'react-i18next'
import Search from './search'

const indexName = `dev_course`
const searchIndices = [{ name: indexName, title: `courses` }]

const SearchBar = () => {
  // const { t } = useTranslation()
  return (
    <div className="relative">
      <Search indices={searchIndices} />
    </div>
  )
}

export default SearchBar
