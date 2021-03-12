import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { CoursePropType, getYoutubeThumbnail } from '../../common/util'
import { AppContext } from '../../contexts/AppContext'
import CourseCard from './CourseCard'
import Filters from './Filters'

const CoursesHome = ({
  courses: coursesList,
  hidleFilters = false,
  showMoreCard = false,
}) => {
  const { courses, setCourses } = useContext(AppContext)

  useEffect(() => {
    setCourses(coursesList)
  }, [])

  return (
    <>
      {!hidleFilters && <Filters />}
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
        {courses.map(course => {
          const {
            lectures: [firstLecture],
          } = course
          const { url: imageUrl } = firstLecture
          return (
            <CourseCard
              key={course.id}
              course={course}
              image={getYoutubeThumbnail(imageUrl)}
            />
          )
        })}
        {showMoreCard && (
          <Link to="/courses">
            <div className="max-w-sm h-full items-center justify-center flex rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4 text-gray-600 text-3xl">
                And more...
              </div>
            </div>
          </Link>
        )}
      </div>
    </>
  )
}

CoursesHome.propTypes = {
  courses: PropTypes.arrayOf(CoursePropType).isRequired,
  hidleFilters: PropTypes.bool,
  showMoreCard: PropTypes.bool,
}

CoursesHome.defaultProps = {
  hidleFilters: false,
  showMoreCard: false,
}

export default CoursesHome
