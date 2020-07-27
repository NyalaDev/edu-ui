import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const LectureNavigationButton = ({
  isEdge,
  children,
  courseSlug,
  nextLecturePosition,
}) => {
  return isEdge ? (
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
}

LectureNavigationButton.propTypes = {
  isEdge: PropTypes.bool.isRequired,
  courseSlug: PropTypes.string.isRequired,
  nextLecturePosition: PropTypes.any.isRequired,
}

export default LectureNavigationButton
