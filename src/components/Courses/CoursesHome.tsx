import React, { useContext, useEffect } from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

import { getYoutubeThumbnail } from '../../common/util'
import { AppContext } from '../../contexts/AppContext'
import CourseCard from './CourseCard'
import Filters from './Filters'
import { Course } from '../../types/api.types'
import Button from '../General/Button'

type Props = {
  courses: Course[]
  hidleFilters?: boolean
  showMoreCard?: boolean
}

const CoursesHome: React.FC<Props> = ({
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-2">
        {courses.map(course => {
          const { lectures = [] } = course
          const firstLecture = lectures[0] || {}
          const { url: imageUrl } = firstLecture

          return (
            <CourseCard
              key={course.id}
              course={course}
              image={getYoutubeThumbnail(imageUrl)}
              lectureToPlayNext={firstLecture}
              showTags
            />
          )
        })}
      </div>
      {showMoreCard && (
        <div className="flex flex-col mt-16 justify-items-center items-center">
          <div className="w-3/4 md:w-1/3">
            <Link to="/courses">
              <Button extraClasses="title" mode="primary">
                {t('moreCourses')}
              </Button>
            </Link>
          </div>
        </div>
      )}

      {courses.length === 0 && (
        <div className="text-center text-brmg-disabled mt-5 text-xl">
          {t('noCourse')}
        </div>
      )}
    </div>
  )
}

export default CoursesHome
