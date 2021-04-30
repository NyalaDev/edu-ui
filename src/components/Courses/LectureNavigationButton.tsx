import React from 'react'
import { Link } from 'gatsby-plugin-react-i18next'

type LectureNavigationButtonProps = {
  isEdge: boolean
  courseSlug: string
  lectureSlug: string
}
const LectureNavigationButton: React.SFC<LectureNavigationButtonProps> = ({
  isEdge,
  children,
  courseSlug,
  lectureSlug,
}) =>
  isEdge ? (
    <div className="px-3 py-1 text-xl text-gray-600 leading-snug">
      {children}
    </div>
  ) : (
    <Link
      to={`/courses/${courseSlug}/lectures/${lectureSlug}`}
      className=" px-3 py-1 text-xl text-white hover:opacity-75 leading-snug"
    >
      {children}
    </Link>
  )
export default LectureNavigationButton
