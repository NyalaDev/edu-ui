import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../../components/Layout'
import LecturesList from '../../components/LecturesList'
import Seo from '../../components/Seo'

import { StyledPlayerWrap, StyledPlayer } from './styles'

const LectureView = ({ data }) => {
  const { strapiLecture, strapiCourse } = data
  const { url, title, position } = strapiLecture
  const { title: courseTitle } = strapiCourse

  const getNextLectureId = () => {
    return strapiCourse.lectures.find(
      lecture => lecture.position === position + 1
    ).id
  }
  const getPreviousLectureId = () => {
    return strapiCourse.lectures.find(
      lecture => lecture.position === position - 1
    ).id
  }
  console.log('position', position)
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
          <div>
            <p>
              <Link to={`/courses/${strapiCourse.slug}`}>{courseTitle}</Link>/
            </p>

            <p>{title}</p>

            {position === 1 ? (
              <p className="text-gray-300">previous</p>
            ) : (
              <p>
                <Link
                  to={`/courses/${
                    strapiCourse.slug
                  }/lectures/${getPreviousLectureId()}`}
                >
                  {' '}
                  previous
                </Link>
              </p>
            )}
            {position === strapiCourse.lectures.length ? (
              <p className="text-gray-300">next</p>
            ) : (
              <p>
                <Link
                  to={`/courses/${
                    strapiCourse.slug
                  }/lectures/${getNextLectureId()}`}
                >
                  next{' '}
                </Link>
              </p>
            )}
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
