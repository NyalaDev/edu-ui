import React from 'react'
import { Link } from 'gatsby-plugin-react-i18next'
import Spinner from '../Spinner'
import { getYoutubeThumbnail } from '../../common/util'

export type AlgoliaSearchResult = {
  id: number
  title: string
  slug: string
  lectures: {
    url: string
  }[]
}[]

type SearchResultProps = {
  searching: boolean
  result: AlgoliaSearchResult
}
const SearchResult: React.FC<SearchResultProps> = ({ searching, result }) => {
  if (!searching && !result?.length) return null
  return (
    <div
      className="absolute left-0 bg-white  py-2 w-64 mt-2 shadow-md z-10"
      dir="ltr"
    >
      {searching && <Spinner />}
      <ul className="w-full max-w-md">
        {result.map(course => {
          const {
            lectures: [firstLecture],
          } = course
          const { url: imageUrl } = firstLecture
          return (
            <li
              key={course.id}
              className="p-4 mb-3 flex justify-between items-center bg-white border-b-2"
            >
              <Link to={`/courses/${course.slug}`}>
                <div className="flex items-center">
                  <img
                    className="w-10 h-10"
                    src={getYoutubeThumbnail(imageUrl)}
                    alt={course.title}
                  />
                  <p className="ml-2 text-gray-700 font-semibold tracking-wide">
                    {course.title}
                  </p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
SearchResult.defaultProps = {
  result: [],
}
export default SearchResult
