import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Spinner from '../Spinner'
import { getYoutubeThumbnail } from '../../common/util'

const SearchResult = ({ searching, result }) => {
  if (!searching && result.length === 0) return null
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

SearchResult.propTypes = {
  searching: PropTypes.bool.isRequired,
  result: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      lectures: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
}

SearchResult.defaultProps = {
  result: [],
}

export default SearchResult
