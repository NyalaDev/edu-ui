import React from 'react'
import { IoInformationCircle as InfoIcon } from 'react-icons/io5'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import HtmlViewer from './HtmlViewer'
import Badge from '../General/Badge'
import CourseFeedback from './Feedback/CourseFeedback'
import { getOriginalLanguageName } from '../../common/constants'
import { Course } from '../../types/api.types'

type Props = {
  course: Course
}

const CourseCardUpcoming: React.FC<Props> = ({ course }) => {
  const { t } = useTranslation()
  const { language, title, description } = course

  return (
    <div className="max-w-sm flex flex-col rounded overflow-hidden shadow-lg">
      <div className="h-56 bg-green-400 text-blue-900 font-bold text-xl flex-none flex justify-center items-center">
        <span>{t('upcomingCourse.courseComingSoon')}</span>
      </div>
      <div className="flex-grow px-6 py-4">
        <div className="title text-xl mb-2">{title}</div>

        <div className="my-2 text-sm text-brmg-primary">
          <div className="flex flex-wrap">
            <InfoIcon size={20} className="opacity-60" />

            <Link className="text-brmg-subtle" to={`/levels/${course.level}`}>
              {t(`levels.${course.level || 'Intermediate'}`)}
            </Link>
            <span className="mx-1"> | </span>
            <Link
              className="text-brmg-subtle"
              to={`/languages/${language.name}`}
            >
              {getOriginalLanguageName(language.iso2) || language.name}
            </Link>
          </div>
        </div>
        <div className="h-48 overflow-scroll">
          <HtmlViewer
            className="text-brmg-subtle text-base leading-relaxed"
            data={description}
          />
        </div>
      </div>
      <CourseFeedback course={course} type="UpcomingCourse" />
    </div>
  )
}

export default CourseCardUpcoming
