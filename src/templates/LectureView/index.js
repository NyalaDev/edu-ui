import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../../components/Layout'
import LecturesList from '../../components/LecturesList'
import Seo from '../../components/Seo'
import LectureNavigationButton from './LectureNavigationButton'

import { StyledPlayerWrap, StyledPlayer } from './styles'
import { AiFillForward, AiFillBackward } from 'react-icons/ai'

const LectureView = ({ data }) => {
  const { strapiLecture, strapiCourse } = data
  const { url, title: lectureTitle, position } = strapiLecture
  const { title: courseTitle, slug, lectures } = strapiCourse
  const isLastLecture = position === lectures.length
  const isFirstLecture = position === 1

  const findLectureByPosition = index => {
    const lecture = lectures.find(
      lecture => lecture.position === position + index
    )
    return lecture ? lecture.id : ''
  }

  return (
    <Layout>
      <Seo title="Lectures" />
      <div className="flex flex-col-reverse">
        <div className="py-5">
          <LecturesList lectures={lectures} courseSlug={slug} />
        </div>
        <div>
          <div className=" px-4 py-3 mb-3 flex flex-wrap items-center justify-between bg-gray-900">
            <div className="w-full flex justify-between lg:w-auto  pl-4  lg:block lg:justify-start">
              <Link
                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap text-white hover:opacity-75"
                to={`/courses/${slug}`}
              >
                {courseTitle}
              </Link>
            </div>
            <div className="lg:flex flex-grow items-center">
              <div className="flex flex-col lg:flex-row ml-auto">
                <div className="px-3 py-2  text-xs font-bold leading-snug text-white ">
                  {lectureTitle}
                </div>
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
          </div>

          <StyledPlayerWrap>
            <StyledPlayer url={url} width="100%" height="100%" />
          </StyledPlayerWrap>
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
