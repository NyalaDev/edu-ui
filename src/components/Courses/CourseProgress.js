import React from 'react'
import PropTypes from 'prop-types'
import { getPercentage } from '../../common/util'

const CourseProgress = ({ isCourseInProgress, lecturesCount }) => {
  const calculateCourseProgress = () => {
    const completed = isCourseInProgress && isCourseInProgress.length
    return getPercentage(completed, lecturesCount)
  }
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg text-gray-700 px-6 py-4 mb-4">
      <div className="flex justify-between mb-2">
        <div className="text-xl "> Current progress</div>
        <div className="text-gray-700 pt-1">
          Completed {calculateCourseProgress()}%
        </div>
      </div>

      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
        <div
          style={{ width: `${calculateCourseProgress()}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-700"
        />
      </div>
      <div>
        You finished
        <span className="font-extrabold text-purple-800 text-lg px-2">
          {isCourseInProgress.length}
        </span>
        lecture(s) out of
        <span className="font-extrabold text-purple-800 text-lg px-2">
          {lecturesCount}
        </span>
        lectures
      </div>
    </div>
  )
}

CourseProgress.propTypes = {
  lecturesCount: PropTypes.number.isRequired,
  isCourseInProgress: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default CourseProgress
