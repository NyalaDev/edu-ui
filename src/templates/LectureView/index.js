import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { AiFillForward, AiFillBackward } from 'react-icons/ai'

import { useTranslation } from 'react-i18next'
import Layout from '../../components/Layout'
import LecturesList from '../../components/LecturesList'
import Seo from '../../components/Seo'
import LectureNavigationButton from './LectureNavigationButton'
import VideoPlayer from './VideoPlayer'
import { CoursePropType, getYoutubeThumbnail } from '../../common/util'
import CourseInfoCards from '../../components/Courses/CourseInfoCards'
import CourseCard from '../../components/Courses/CourseCard'
import Modal from '../../components/Modal'
import { AuthContext } from '../../contexts/AuthContext'

const LectureView = ({ data, location }) => {
  const { strapiLecture = {}, strapiCourse = {}, relatedCourses = [] } = data
  const lecture = !strapiLecture ? strapiCourse.lectures[0] : strapiLecture
  const { isLoggedIn } = useContext(AuthContext)
  const [isOpened, setIsOpened] = useState(true)
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
  const isLastLecture = position === lectures.length
  const isFirstLecture = position === 1

  const findLectureByPosition = index => {
    const lectureByPosition = lectures.find(
      item => item.position === position + index
    )
    return lectureByPosition ? lectureByPosition.id : ''
  }

  const thumbnail = getYoutubeThumbnail(lectures[0].url)

  const { t } = useTranslation()

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
              instructor={strapiCourse.instructor}
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
                  <div className="flex">
                    <LectureNavigationButton
                      isEdge={isLastLecture}
                      courseSlug={slug}
                      nextLecturePosition={findLectureByPosition(1)}
                    >
                      <AiFillForward />
                    </LectureNavigationButton>

                    <LectureNavigationButton
                      isEdge={isFirstLecture}
                      courseSlug={slug}
                      nextLecturePosition={findLectureByPosition(-1)}
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
                  lectures: [firstLecture = {}],
                } = course
                const { url: imageUrl } = firstLecture
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

        {Number(strapiId) % 2 === 0 && isOpened && !isLoggedIn && (
          <Modal
            title="Please signup or signin to continue to see the course"
            withActions={false}
            onDismiss={() => setIsOpened(false)}
          >
            <div className="text-center h-40">
              <span>Please </span>
              <Link to="/signup" className="no-underline text-blue font-bold">
                {t('createAccount')}
              </Link>
              <span> or </span>
              <Link to="/signin" className="no-underline text-blue font-bold">
                {t('signIn')}
              </Link>
            </div>
          </Modal>
        )}
      </Layout>
    </>
  )
}

LectureView.propTypes = {
  data: PropTypes.shape({
    strapiCourse: PropTypes.objectOf(CoursePropType).isRequired,
    relatedCourses: PropTypes.arrayOf(CoursePropType).isRequired,
    strapiLecture: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  location: PropTypes.shape({
    href: PropTypes.string.isRequired,
  }).isRequired,
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
        title
        position
        duration
        url
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
