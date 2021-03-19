import React from 'react'
import { useTranslation } from 'react-i18next'
import HtmlViewer from '../HtmlViewer'
import Badge from '../Badge'
import { CoursePropType } from '../../common/util'
import CourseFeedback from './Feedback/CourseFeedback'
import { getOriginalLanguageName } from '../../common/constants'

const CourseCardUpcoming = ({ course }) => {
  const { t } = useTranslation()
  const { language, title, description } = course

  return (
    <div className="max-w-sm flex flex-col rounded overflow-hidden shadow-lg">
      <div className="h-56 bg-green-400 text-blue-900 font-bold text-xl flex-none flex justify-center items-center">
        <span>{t('upcomingCourse.courseComingSoon')}</span>
      </div>
      <div className="flex-grow px-6 py-4">
        <div className="title text-xl mb-2">{title}</div>

        <div className="flex flex-wrap my-2">
          <Badge
            text={getOriginalLanguageName(language.iso2) || language.name}
            languageBadge={language.iso2}
            link={`/languages/${language.name}`}
          />
        </div>

        <HtmlViewer className="text-gray-700 text-base" data={description} />
      </div>
      <CourseFeedback course={course} type="UpcomingCourse" />
    </div>
  )
}

CourseCardUpcoming.propTypes = {
  course: CoursePropType.isRequired,
}

export default CourseCardUpcoming
