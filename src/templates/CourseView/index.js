import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import CourseViewCard from '../../components/CourseViewCard'
import { getYoutubeThumbnail } from '../../services/util'

import {
  StyledLectureList,
  StyledLectureListItem,
  StyledCount,
  StyledListBody,
  StyledDuration,
  StyledLink,
  StyledVideoIcon,
} from './styles'

const CourseView = ({ data }) => {
  const { strapiCourse } = data
  const { lectures, description, slug, github_repo } = strapiCourse
  const thumbnail = getYoutubeThumbnail(lectures[0].url)

  return (
    <Layout>
      <Seo title="Courses" />
      <div className="grid md:grid-cols-3 sm:grid-col-1 gap-4">
        <div className="md:col-span-1 sm:col-span-1">
          <CourseViewCard
            image={thumbnail}
            description={description}
            githubRepo={github_repo}
          />
        </div>

        <div className="md:col-span-2 sm:col-span-1">
          <div>
            <h4 className="bg-gray-700 rounded-tl-md rounded-tr-md py-2 px-3 text-white">
              Lectures
            </h4>
            <StyledLectureList>
              {lectures.map((lecture, index) => (
                <StyledLectureListItem key={lecture.id}>
                  <StyledCount>
                    <span>{++index}</span>
                  </StyledCount>
                  <StyledListBody>
                    <StyledVideoIcon />
                    <p>
                      <StyledLink
                        to={`/courses/${slug}/lectures/${lecture.id}`}
                      >
                        {lecture.title}
                      </StyledLink>
                    </p>
                    <StyledDuration>{lecture.duration}</StyledDuration>
                  </StyledListBody>
                </StyledLectureListItem>
              ))}
            </StyledLectureList>
          </div>
        </div>
      </div>
    </Layout>
  )
}

CourseView.propTypes = {
  data: PropTypes.shape({
    strapiCourse: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
}
export default CourseView

export const pageQuery = graphql`
  query CourseByID($id: String!) {
    strapiCourse(id: { eq: $id }) {
      id
      strapiId
      slug
      title
      description
      github_repo
      lectures {
        id
        title
        duration
        url
      }
      updated_at
      created_at
    }
  }
`
