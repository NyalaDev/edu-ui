import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

import { CoursePropType, getYoutubeThumbnail } from '../../common/util'
import { AppContext } from '../../contexts/AppContext'
import CourseCard from './CourseCard'
import Filters from './Filters'
import CourseCardUpcoming from './CourseCardUpcoming'
import SubscribeEmail from '../LandingPage/SubscribeEmail'

const CoursesHome = ({
  courses: coursesList,
  hidleFilters = false,
  showMoreCard = false,
}) => {
  const { courses, setCourses } = useContext(AppContext)
  const { t } = useTranslation()

  useEffect(() => {
    setCourses(coursesList)
  }, [])

  return (
    <div className="mx-2 sm:mx-0">
      {!hidleFilters && <Filters />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4">
        {courses.map(course => {
          const { lectures: [firstLecture = {}] = [] } = course
          const { url: imageUrl } = firstLecture

          if (course.status === 'Upcoming') {
            return <CourseCardUpcoming key={course.id} course={course} />
          }

          return (
            <CourseCard
              key={course.id}
              course={course}
              image={getYoutubeThumbnail(imageUrl)}
              lectureToPlayNext={firstLecture}
            />
          )
        })}
        {showMoreCard && (
          <Link to="/courses">
            <div className="mx-5 h-full items-center justify-center flex rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4 text-gray-600 text-3xl">
                {t('moreCourses')}
              </div>
            </div>
          </Link>
        )}
      </div>
      {courses.length === 0 && (
        <div className="text-center mt-5 text-xl">{t('noCourse')}</div>
      )}
      <div className="mt-6 px-6 py-2">
        <SubscribeEmail title={t('upcomingCourse.notifyMe')} />
      </div>
    </div>
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
