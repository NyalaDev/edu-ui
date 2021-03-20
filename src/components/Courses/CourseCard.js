import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { DiGithubBadge } from 'react-icons/di'
import { useTranslation } from 'react-i18next'
import HtmlViewer from '../HtmlViewer'
import Badge from '../Badge'
import { CoursePropType } from '../../common/util'
import { getOriginalLanguageName } from '../../common/constants'

const CourseCard = ({
  course,
  image,
  lectureId,
  courseViewMode,
  isCourseInProgress,
  forDashboard,
  showTags,
}) => {
  const { t } = useTranslation()
  const {
    language,
    title,
    description,
    slug,
    status,
    tags,
    github_repo: githubRepo,
    level,
  } = course

  const isRtl = language.name === 'Arabic'
  const cardLink = forDashboard
    ? `/dashboard/manage/${slug}`
    : `/courses/${slug}`

  return (
    <div
      className={`max-w-sm rounded overflow-hidden shadow-lg ${
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
          {forDashboard && status && (
            <Badge
              text={status}
              color={`${status === 'Published' ? 'green' : 'red'}-600`}
            />
          )}
        </div>

        <HtmlViewer className="text-gray-700 text-base" data={description} />
      </div>
      <div className="px-6 py-2">
        {courseViewMode && (
          <>
            <Link
              className="block bg-purple-800 text-white text-center hover:bg-purple-900 uppercase text-md px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
              style={{ transition: 'all .15s ease' }}
              to={`/courses/${slug}/lectures/${lectureId}`}
            >
              {isCourseInProgress && isCourseInProgress.length > 0
                ? t('continue')
                : t('start')}
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

CourseCard.propTypes = {
  course: CoursePropType.isRequired,

  image: PropTypes.string.isRequired,
  lectureId: PropTypes.number,
  courseViewMode: PropTypes.bool,
  isCourseInProgress: PropTypes.arrayOf(PropTypes.number),
  forDashboard: PropTypes.bool,
  showTags: PropTypes.bool,
}

CourseCard.defaultProps = {
  lectureId: 0,
  courseViewMode: false,
  isCourseInProgress: [],
  forDashboard: false,
  showTags: true,
}

export default CourseCard
