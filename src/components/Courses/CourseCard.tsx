import React from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import { DiGithubBadge } from 'react-icons/di'
import useLanguage from '../../hooks/useLanguage'
import HtmlViewer from '../HtmlViewer'
import Badge from '../Badge'
import { getOriginalLanguageName } from '../../common/constants'
import { Course, Lecture } from '../../types/api.types'

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
    github_repo: githubRepo,
    level,
  } = course

  const cardLink = `/courses/${slug}/lectures/${lectureToPlayNext.slug}`

  return (
    <div
      className={`rounded max-w-sm overflow-hidden shadow-lg ${
        isRtl ? 'rtl' : 'ltr'
      }`}
    >
      <Link to={cardLink}>
        <img className="w-full h-56" src={image} alt={title} />
      </Link>
      <div className="px-6 py-4">
        <div className="title text-xl mb-2">
          <Link to={cardLink}>{title}</Link>
        </div>

        <div className="flex flex-wrap my-2">
          <Badge
            text={getOriginalLanguageName(language.iso2) || language.name}
            languageBadge={language.iso2}
            link={`/languages/${language.name}`}
          />
        </div>

        <HtmlViewer className="text-gray-700 text-base" data={description} />
      </div>
      <div className="px-6 py-2">
        {courseViewMode && (
          <>
            <Link
              className="block bg-purple-800 text-white text-center hover:bg-purple-900 uppercase text-md px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
              style={{ transition: 'all .15s ease' }}
              to={`/courses/${slug}/lectures/${lectureToPlayNext.slug}`}
            >
              {isCourseInProgress ? t('continue') : t('start')}
            </Link>
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
          <div className="flex flex-wrap">
            {tags &&
              tags.map(({ tagName }) => (
                <Badge
                  key={`${lectureId}.${tagName}`}
                  text={tagName}
                  color="purple-800"
                  link={`/tags/${tagName}`}
                />
              ))}
            {level && (
              <Badge text={level} color="pink-800" link={`/levels/${level}`} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseCard
