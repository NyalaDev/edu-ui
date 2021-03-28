import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import CourseCard from '../components/Courses/CourseCard'
import { getYoutubeThumbnail } from '../common/util'

const InstructorView = ({ data }) => {
  const {
    allStrapiCourse: { edges: courses = [] },
  } = data

  return (
    <Layout>
      <div>
        <div className="bg-gray-800 text-white text-center font-bold uppercase text-md px-4 py-4 my-8 rounded shadow hover:shadow-md outline-none focus:outline-none">
          {courses[0].node.instructor.profile.name}
        </div>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
        {courses.map(course => {
          const { lectures } = course.node
          const { url: imageUrl } = lectures[0] || {}

          return (
            <CourseCard
              key={course.node.id}
              course={course.node}
              image={getYoutubeThumbnail(imageUrl)}
            />
          )
        })}
      </div>
    </Layout>
  )
}

InstructorView.propTypes = {
  data: PropTypes.shape({
    allStrapiCourse: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
}

export default InstructorView

export const pageQuery = graphql`
  query CoursesByInstructor() {
    allStrapiCourse(
      filter: { instructor: { profile: { github: { eq: $instructor } } } }
    ) {
      edges {
        node {
          id
          title
          description
          slug
          level
          lectures {
            url
          }
          language {
            id
            name
          }
          instructor {
            profile {
              name
            }
          }
        }
      }
    }
  }
`
