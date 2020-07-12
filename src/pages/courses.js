import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import CourseCard from '../components/CourseCard'
import { getYoutubeThumbnail } from '../services/util'

const CoursesPage = ({ data }) => {
  const {
    allStrapiCourse: { edges: courses },
  } = data

  return (
    <Layout>
      <Seo title="Courses" />
      <div>
        <div className="grid grid-cols-2 gap-4">
          {courses.map(({ node: course }) => {
            const {
              lectures: [firstLecture],
            } = course
            const { url: imageUrl } = firstLecture

            return (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                image={getYoutubeThumbnail(imageUrl)}
                link={`/courses/${course.id}/${course.slug}`}
              />
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

CoursesPage.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
}
export default CoursesPage

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiCourse {
      edges {
        node {
          id
          title
          description
          slug
          lectures {
            url
          }
        }
      }
    }
  }
`
