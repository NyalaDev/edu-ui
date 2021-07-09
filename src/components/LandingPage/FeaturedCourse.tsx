import { Link } from 'gatsby-plugin-react-i18next'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { getYoutubeThumbnail } from '../../common/util'
import { AppContext } from '../../contexts/AppContext'
import useLanguage from '../../hooks/useLanguage'
import CourseCard from '../Courses/CourseCard'
import Button from '../General/Button'

const FeaturedCourse: React.FC = () => {
  const { courses } = useContext(AppContext)
  const { language } = useLanguage()
  const { t } = useTranslation()

  let coursesInLanguage = courses
    .filter(c => c.language.iso2 === language && c.status === 'Published')
    .reverse()

  if (!coursesInLanguage.length) {
    coursesInLanguage = courses
      .filter(c => c.language.iso2 === 'ar' && c.status === 'Published')
      .reverse()
  }

  const course = coursesInLanguage[coursesInLanguage.length - 1]
  if (!course) return null
  const firstLecture = course.lectures[0] || {}
  const { url: imageUrl } = firstLecture
  const cardLink = `/courses/${course.slug}/lectures/${firstLecture?.slug}`

  return (
    <>
      <h2 className="brmg-container title text-3xl px-8 md:px-0 mt-20">
        {t('newCourse')}
      </h2>
      <div className="brmg-container flex mb-16 md:mb-32 mt-8 p-8 h-128 text-white title bg-brmg-success rounded-lg">
        <div className="w-full md:w-3/5">
          <h2 className="text-3xl">{course.title}</h2>
          <h2 className="text-base leading-loose md:w-3/4 mt-8">
            {course.description}
          </h2>
          <div className="w-full md:w-1/3 my-6">
            <Link to={cardLink}>
              <Button extraClasses="title" mode="primary">
                {t('start')}
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 md:w-1/3 relative hidden md:block">
          <div className="absolute top-0 -mt-36">
            <CourseCard
              showTags
              fluidHeight
              image={getYoutubeThumbnail(imageUrl)}
              course={course}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FeaturedCourse
