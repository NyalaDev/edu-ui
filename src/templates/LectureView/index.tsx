import React, { useContext } from 'react'
import { graphql, Link } from 'gatsby'
import { AiFillForward, AiFillBackward } from 'react-icons/ai'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { orderBy } from 'lodash'
import Layout from '../../components/Layout'
import LecturesList from '../../components/LecturesList'
import Seo from '../../components/Seo'
import LectureNavigationButton from '../../components/Courses/LectureNavigationButton'
import VideoPlayer from '../../components/Courses/VideoPlayer'
import { getYoutubeThumbnail } from '../../common/util'
import CourseInfoCards from '../../components/Courses/CourseInfoCards'
import CourseCard from '../../components/Courses/CourseCard'
import { AuthContext } from '../../contexts/AuthContext'
import { ALLOWED_LECTURES_WHEN_NOT_LOGGED_IN } from '../../common/constants'
import { Course, Lecture } from '../../types/api.types'

type LectureViewProps = {
  data: {
    strapiCourse: Course
    relatedCourses: { edges: { node: Course }[] }
    strapiLecture?: Lecture
  }
  location: {
    href: string
  }
}
const LectureView: React.FC<LectureViewProps> = ({ data, location }) => {
  const { t } = useTranslation()
  const { strapiLecture, strapiCourse, relatedCourses } = data
  const sortedLectures = orderBy(strapiCourse.lectures, 'position', 'asc')
  const lecture = !strapiLecture ? sortedLectures[0] : strapiLecture
  const { isLoggedIn, currentUser } = useContext(AuthContext)
  if (!strapiCourse) {
    return <div />
  }
  const { url, title: lectureTitle, position, strapiId } = lecture
  const {
    title: courseTitle,
    slug,
    lectures,
    strapiId: courseStrapiId,
  } = strapiCourse
  const isLastLecture = position === lectures.length - 1
  const isFirstLecture = position === 0
  const completedLectures =
    isLoggedIn &&
    currentUser &&
    currentUser.profile &&
    currentUser.profile.completedlectures
      ? currentUser.profile.completedlectures
      : {}
  const lectureIndex = sortedLectures.findIndex(l => l.slug === lecture.slug)
  const showFeedback =
    lectureIndex === sortedLectures.length - 1 ||
    lectureIndex === Math.floor(sortedLectures.length / 2)
  const findLectureByPosition = (index: number) => {
    const lectureByPosition = lectures.find(
      item => item.position === position + index
    )
    return lectureByPosition ? lectureByPosition.slug : ''
  }
  /**
   * Prevent the user from navigate next lecture when not logged in
   * @returns {boolean}
   */
  const canNavigateToNext = () => {
    if (isLoggedIn) return true
    return lectureIndex + 1 < ALLOWED_LECTURES_WHEN_NOT_LOGGED_IN
  }
  const thumbnail = getYoutubeThumbnail(lectures[0].url)

  return (
    <>
      <Seo
        title={`${courseTitle} | ${lectureTitle} `}
        description={lectureTitle}
        image={thumbnail}
        meta={[
          { property: 'og:url', content: location.href },
          { property: 'og:type', content: 'article' },
        ]}
      />
      <Layout>
        <div className="flex flex-col lg:flex-row">
          <div className="order-2 mx-3 w-full lg:w-1/3 lg:order-1">
            <CourseInfoCards
              location={location}
              course={strapiCourse}
              completedLectures={completedLectures}
            />
          </div>
          <div className="flex-grow mx-3 order-1 lg:order-2">
            <div>
              <div className="bg-gray-900 px-4 py-3 mb-3 flex flex-col items-end md:flex-row-reverse justify-between ">
                <div className="text-white flex flex-col items-end md:flex-row-reverse md:items-center ">
                  <Link
                    className="text-sm font-bold leading-relaxed inline-block py-2 whitespace-no-wrap text-white hover:opacity-75"
                    to={`/courses/${slug}`}
                  >
                    {courseTitle}
                  </Link>
                  <span className="text-sm mx-2">/</span>
                  <span className="text-sm text-gray-400">{lectureTitle}</span>
                </div>
                <div className="text-white">
                  <div className="flex rtl">
                    <LectureNavigationButton
                      isEdge={isLastLecture || !canNavigateToNext()}
                      courseSlug={slug}
                      lectureSlug={findLectureByPosition(1)}
                    >
                      <AiFillForward />
                    </LectureNavigationButton>

                    <LectureNavigationButton
                      isEdge={isFirstLecture}
                      courseSlug={slug}
                      lectureSlug={findLectureByPosition(-1)}
                    >
                      <AiFillBackward />
                    </LectureNavigationButton>
                  </div>
                </div>
              </div>

              <VideoPlayer
                url={url}
                lectureStrapiId={strapiId}
                courseStrapiId={courseStrapiId}
                showFeedback={showFeedback}
                courseSlug={slug}
                lectureSlug={findLectureByPosition(1)}
                isLastLecture={isLastLecture}
                isFirstLecture={isFirstLecture}
                canNavigateToNext={canNavigateToNext()}
              />
            </div>
            <div className="py-5">
              <LecturesList
                lectures={lectures}
                courseSlug={slug}
                currentLecture={lecture}
                courseStrapiId={courseStrapiId}
              />
            </div>
          </div>
        </div>
        {relatedCourses.edges.length !== 0 && (
          <div className="rounded shadow-lg bg-gray-200 my-6 py-2">
            <div className=" px-6 py-3 bg-gray-800">
              <h1 className="text-white font-semibold text-lg text-center">
                {t('relatedCourses')}
              </h1>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4 my-6 mx-3">
              {relatedCourses.edges.map(({ node: course }) => {
                const {
                  lectures: [firstLecture],
                } = course
                const imageUrl = firstLecture?.url
                if (!imageUrl) return null
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    image={getYoutubeThumbnail(imageUrl)}
                  />
                )
              })}
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}
export default LectureView
// FIXME: We might need only one query
export const pageQuery = graphql`
  query LectureByID($id: String!, $courseSlug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInfo
    }
    strapiLecture(id: { eq: $id }) {
      id
      slug
      strapiId
      url
      updated_at
      created_at
      title
      position
    }

    strapiCourse(slug: { eq: $courseSlug }) {
      id
      strapiId
      slug
      title
      description
      github_repo
      instructor {
        username
        profile {
          id
          user
          name
          bio
          github
        }
      }
      language {
        id
        name
        iso2
      }
      tags {
        tagName
      }
      lectures {
        id
        slug
        title
        position
        duration
        url
        created_at
      }
      resources {
        type
        text
      }
    }

    relatedCourses: allStrapiCourse(
      limit: 3
      filter: { language: { iso2: { eq: $language } }, id: { ne: $id } }
    ) {
      edges {
        node {
          id
          title
          description
          slug
          lectures {
            id
            slug
            title
            position
            duration
            url
          }
          tags {
            id
            tagName
          }
          language {
            id
            name
            iso2
          }
        }
      }
    }
  }
`
