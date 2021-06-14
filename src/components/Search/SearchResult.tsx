import React from 'react'
import { Link } from 'gatsby-plugin-react-i18next'
import Spinner from '../General/Spinner'
import { getYoutubeThumbnail } from '../../common/util'
import HtmlViewer from '../Courses/HtmlViewer'

export type AlgoliaSearchResult = {
  id: number
  title: string
  slug: string
  description: string
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
    <div className="absolute z-10 -ml-4 mt-3 transform px-2 w-full md:w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
          {searching && <Spinner />}
          {result.map(course => {
            const {
              lectures: [firstLecture],
            } = course
            const { url: imageUrl } = firstLecture

            return (
              <Link
                to={`/courses/${course.slug}`}
                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
              >
                <img
                  className="w-10 h-10"
                  src={getYoutubeThumbnail(imageUrl)}
                  alt={course.title}
                />
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">
                    {course.title}
                  </p>

                  <HtmlViewer
                    className="mt-1 text-sm text-gray-500"
                    data={course.description}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
SearchResult.defaultProps = {
  result: [],
}
export default SearchResult
