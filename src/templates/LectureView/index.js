import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { AiFillForward, AiFillBackward } from 'react-icons/ai'

import Layout from '../../components/Layout'
import LecturesList from '../../components/LecturesList'
import Seo from '../../components/Seo'
import LectureNavigationButton from './LectureNavigationButton'
import VideoPlayer from './VideoPlayer'

const LectureView = ({ data }) => {
  const { strapiLecture, strapiCourse } = data
  const { url, title: lectureTitle, position, strapiId } = strapiLecture
  const {
    title: courseTitle,
    slug,
    lectures,
    strapiId: courseStrapiId,
  } = strapiCourse
  const isLastLecture = position === lectures.length
  const isFirstLecture = position === 1

  const findLectureByPosition = index => {
    const lecture = lectures.find(item => item.position === position + index)
    return lecture ? lecture.id : ''
  }

  return (
    <Layout>
      <Seo title="Lectures" />
      <div className="flex flex-col-reverse">
        <div className="py-5">
          <LecturesList
            lectures={lectures}
            courseSlug={slug}
            currentLecture={strapiLecture}
          />
        </div>
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
      </div>
    </Layout>
  )
}

LectureView.propTypes = {
  data: PropTypes.shape({
    strapiCourse: PropTypes.objectOf(PropTypes.any),
    strapiLecture: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
}

export default LectureView

// FIXME: We might need only one query
export const pageQuery = graphql`
  query LectureByID($id: String!, $courseSlug: String!) {
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
      slug
      strapiId
      title
      lectures {
        id
        title
        position
        duration
        url
      }
    }
  }
`
