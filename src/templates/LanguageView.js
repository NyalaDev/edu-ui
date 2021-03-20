import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import CourseCard from '../components/Courses/CourseCard'
import { getYoutubeThumbnail } from '../common/util'
import CourseCardUpcoming from '../components/Courses/CourseCardUpcoming'

const LanguageView = ({ data, pageContext }) => {
  const {
    allStrapiCourse: { edges: courses = [] },
  } = data
  const { language } = pageContext

  return (
    <Layout>
      <div>
        <div className="bg-gray-800 text-white text-center font-bold uppercase text-md px-4 py-4 my-8 rounded shadow hover:shadow-md outline-none focus:outline-none">
          {`${language} courses`}
        </div>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
        {courses.map(course => {
          const { lectures, status } = course.node
          const { url: imageUrl } = lectures[0] || {}

          if (status === 'Upcoming') {
            return (
              <CourseCardUpcoming key={course.node.id} course={course.node} />
            )
          }

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

LanguageView.propTypes = {
  data: PropTypes.shape({
    allStrapiCourse: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  pageContext: PropTypes.objectOf.isRequired,
}

export default LanguageView

export const pageQuery = graphql`
  query CoursesByLanguage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInfo
    }
    allStrapiCourse(filter: { language: { name: { eq: $language } } }) {
      edges {
        node {
          id
          title
          description
          slug
          level
          status
          lectures {
            url
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
