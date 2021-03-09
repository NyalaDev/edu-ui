import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CoursePropType, getYoutubeThumbnail } from '../../common/util'
import { AppContext } from '../../contexts/AppContext'
import CourseCard from './CourseCard'
import Filters from './Filters'

const CoursesHome = ({ courses: coursesList }) => {
  const { courses, setCourses } = useContext(AppContext)

  useEffect(() => {
    setCourses(coursesList)
  }, [])

  return (
    <>
      <Filters />
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
      </div>
    </>
  )
}

CoursesHome.propTypes = {
  courses: PropTypes.arrayOf(CoursePropType).isRequired,
}

export default CoursesHome
