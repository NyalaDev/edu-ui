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

  const coursesInLanguage = courses
    .filter(c => c.language.iso2 === language && c.status === 'Published')
    .reverse()
  const course = coursesInLanguage[coursesInLanguage.length - 1]
  if (!course) return null
  const firstLecture = course.lectures[0] || {}
  const { url: imageUrl } = firstLecture
  const cardLink = `/courses/${course.slug}/lectures/${firstLecture?.slug}`

  return (
    <>
      <div className="brmg-container title text-3xl mt-20">
        {t('newCourse')}
      </div>
      <div className="brmg-container flex mb-16 mt-8 p-8 h-128 text-white title bg-brmg-success rounded-lg">
        <div className="w-1/2 md:w-3/5">
          <div className="text-3xl">{course.title}</div>
          <div className="text-base leading-loose md:w-1/2 mt-8">
            {course.description}
          </div>
          <div className="w-4/5 md:w-1/3 my-6">
            <Link to={cardLink}>
              <Button extraClasses="title" mode="primary">
                {t('start')}
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 md:w-2/5 relative">
          <div className="absolute top-0 -mt-24">
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
