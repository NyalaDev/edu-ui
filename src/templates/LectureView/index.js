import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../../components/Layout'
import LecturesList from '../../components/LecturesList'
import Seo from '../../components/Seo'

import { StyledPlayerWrap, StyledPlayer } from './styles'
import { AiFillForward, AiFillBackward } from 'react-icons/ai'

const LectureView = ({ data }) => {
  const { strapiLecture, strapiCourse } = data
  const { url, title, position } = strapiLecture
  const { title: courseTitle } = strapiCourse

  const findLectureByPosition = index => {
    return strapiCourse.lectures.find(
      lecture => lecture.position === position + index
    ).id
  }

  return (
    <Layout>
      <Seo title="Lectures" />
      <div className="flex flex-col-reverse">
        <div className="py-5">
          <LecturesList
            lectures={strapiCourse.lectures}
            courseSlug={strapiCourse.slug}
          />
        </div>
        <div>
          <div className=" px-4 py-3 mb-3 flex flex-wrap items-center justify-between bg-gray-900">
            <div className="w-full flex justify-between lg:w-auto  pl-4  lg:block lg:justify-start">
              <Link
                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap text-white hover:opacity-75"
                to={`/courses/${strapiCourse.slug}`}
              >
                {courseTitle}
              </Link>
            </div>
            <div className="lg:flex flex-grow items-center">
              <div className="flex flex-col lg:flex-row ml-auto">
                <div className="px-3 py-2  text-xs font-bold leading-snug text-white ">
                  {title}
                </div>
                <div className="flex">
                  {position === strapiCourse.lectures.length ? (
                    <div className="px-3 py-1 text-xl text-white text-gray-600 leading-snug">
                      <AiFillForward />
                    </div>
                  ) : (
                    <Link
                      to={`/courses/${
                        strapiCourse.slug
                      }/lectures/${findLectureByPosition(1)}`}
                      className=" px-3 py-1 text-xl text-white hover:opacity-75 leading-snug"
                    >
                      <AiFillForward />
                    </Link>
                  )}

                  {position === 1 ? (
                    <div className=" px-3 py-1 text-xl text-gray-600 leading-snug">
                      <AiFillBackward />
                    </div>
                  ) : (
                    <Link
                      to={`/courses/${
                        strapiCourse.slug
                      }/lectures/${findLectureByPosition(-1)}`}
                      className=" px-3 py-1 text-xl text-white hover:opacity-75 leading-snug"
                    >
                      <AiFillBackward />
                    </Link>
                  )}
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
