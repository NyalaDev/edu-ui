import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import LecturesList from '../../components/LecturesList'
import Seo from '../../components/Seo'

import { StyledPlayerWrap, StyledPlayer } from './styles'

const LectureView = ({ data }) => {
  const { strapiLecture, strapiCourse } = data
  const { url } = strapiLecture

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
    }

    strapiCourse(slug: { eq: $courseSlug }) {
      id
      slug
      strapiId
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
