import React from 'react'
import { Link } from 'gatsby-plugin-react-i18next'
import PropTypes from 'prop-types'

const LectureNavigationButton = ({
  isEdge,
  children,
  courseSlug,
  nextLecturePosition,
}) =>
  isEdge ? (
    <div className="px-3 py-1 text-xl text-gray-600 leading-snug">
      {children}
    </div>
  ) : (
    <Link
      to={`/courses/${courseSlug}/lectures/${nextLecturePosition}`}
      className=" px-3 py-1 text-xl text-white hover:opacity-75 leading-snug"
    >
      {children}
    </Link>
  )

LectureNavigationButton.propTypes = {
  isEdge: PropTypes.bool.isRequired,
  courseSlug: PropTypes.string.isRequired,
  nextLecturePosition: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
}

export default LectureNavigationButton
