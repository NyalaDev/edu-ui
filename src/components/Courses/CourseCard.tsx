import React from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import { DiGithubBadge } from 'react-icons/di'
import {
  IoTimerSharp as TimerIcon,
  IoInformationCircle as InfoIcon,
} from 'react-icons/io5'
import useLanguage from '../../hooks/useLanguage'
import HtmlViewer from './HtmlViewer'
import Badge from '../General/Badge'
import { getOriginalLanguageName } from '../../common/constants'
import { Course, Lecture } from '../../types/api.types'
import { calculateVideosDuration } from '../../common/util'
import CourseCardUpcoming from './CourseCardUpcoming'

type Props = {
  course: Course
  image: string
  lectureId?: number
  courseViewMode?: boolean
  isCourseInProgress?: boolean
  showTags?: boolean
  lectureToPlayNext?: Lecture
}

const CourseCard: React.FC<Props> = ({
  course,
  image,
  lectureId,
  courseViewMode,
  isCourseInProgress,
  showTags,
  lectureToPlayNext = course.lectures[0],
}) => {
  const { t } = useTranslation()
  const { isRtl } = useLanguage()
  const {
    language,
    title,
    description,
    slug,
    tags,
    status,
    github_repo: githubRepo,
    level,
  } = course

  if (status === 'Upcoming') {
    return <CourseCardUpcoming key={course.id} course={course} />
  }

  const cardLink = `/courses/${slug}/lectures/${lectureToPlayNext?.slug}`

  const courseDuration = calculateVideosDuration(course.lectures)

  const inLanguages = {
    ar: 'بالعربي',
    sw: 'kwa kiswahili',
    am: 'በአማርኛ',
  }
  return (
    <div
      data-testid="course-card"
      className={`bg-white flex flex-col rounded-lg mt-24 shadow ${
        isRtl ? 'rtl' : 'ltr'
      }`}
    >
      <Link
        style={{ width: '90%' }}
        className="self-center relative h-48 top-0 -mt-10"
        to={cardLink}
      >
        <img
          className="w-full h-48 rounded-lg absolute -mt-10"
          src={image}
          alt={title}
        />
      </Link>
      <div className="px-6">
        <div className="title text-brmg-subtle h-12 flex flex-col justify-items-center  text-xl mb-2">
          <Link className="text-brmg-subtle" to={cardLink}>
            {title}
          </Link>
        </div>

        <div className="flex text-brmg-success flex-wrap my-2 text-sm">
          <TimerIcon size={20} className="opacity-60" />
          <span className="text-brmg-subtle">{courseDuration}</span>
        </div>
        <div className="my-2 text-sm text-brmg-primary">
          <div className="flex flex-wrap">
            <InfoIcon size={20} className="opacity-60" />

            {level && (
              <Link className="text-brmg-subtle" to={`/levels/${level}`}>
                {t(`levels.${level}`, level)}
              </Link>
            )}
            <span className="mx-1"> | </span>
            <Link
              className="text-brmg-subtle"
              to={`/languages/${language.name}`}
            >
              {inLanguages[language.iso2 as keyof typeof inLanguages] ||
                getOriginalLanguageName(language.iso2) ||
                language.name}
            </Link>
          </div>
        </div>
        <div className={`${!courseViewMode ? 'h-48 overflow-scroll' : ''}`}>
          <HtmlViewer
            className="text-brmg-subtle text-base leading-relaxed"
            data={description}
          />
        </div>
      </div>
      <div className="px-6 py-2">
        {courseViewMode && (
          <>
            {isCourseInProgress && (
              <Link
                className="block bg-brmg-primary text-white text-center hover:opacity-80 uppercase text-md px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
                style={{ transition: 'all .15s ease' }}
                to={`/courses/${slug}/lectures/${lectureToPlayNext.slug}`}
              >
                {t('continue')}
              </Link>
            )}
            {githubRepo && (
              <div className="py-4">
                <a
                  className="flex flex-row-reverse items-center justify-center bg-gray-800 text-white text-center hover:bg-gray-900 uppercase text-md px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
                  style={{ transition: 'all .15s ease' }}
                  href={githubRepo}
                  target="_blank"
                  rel="noreferrer"
                >
                  <DiGithubBadge size={28} />
                  <span>{t('viewCode')}</span>
                </a>
              </div>
            )}
          </>
        )}
        {showTags && (
          <div className="flex overflow-x-auto justify-items-center py-4">
            {tags &&
              tags.map(({ tagName }) => (
                <Badge
                  key={`${lectureId}.${tagName}`}
                  text={tagName}
                  color="brmg-secondary"
                  link={`/tags/${tagName}`}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseCard
