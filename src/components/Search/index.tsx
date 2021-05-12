import React, { useState, createRef } from 'react'
import algoliasearch from 'algoliasearch/lite'
import SearchBox from './SearchField'
import SearchResult, { AlgoliaSearchResult } from './SearchResult'
import useClickOutside from '../../hooks/useClickOutside'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID!,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY!
)
const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME || 'dev_course'
const Search: React.FC = () => {
  const rootRef = createRef<HTMLDivElement>()
  const [searching, setSearching] = useState(false)
  const [result, setResult] = useState<AlgoliaSearchResult>([])
  const algoliaIndex = searchClient.initIndex(indexName)
  const reset = () => {
    setSearching(false)
    setResult([])
  }
  const onSearch = async (query: string) => {
    try {
      setSearching(true)
      setResult([])
      const { hits } = await algoliaIndex.search(query)
      setResult((hits as unknown) as AlgoliaSearchResult)
      setSearching(false)
    } catch (e) {
      setSearching(false)
    }
  }
  useClickOutside(rootRef, () => reset())
  return (
    <div className="relative" ref={rootRef}>
      <SearchBox onSearch={onSearch} />
      <SearchResult searching={searching} result={result} />
    </div>
  )
}
export default Search