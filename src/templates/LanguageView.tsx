import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import CourseCard from '../components/Courses/CourseCard'
import { getYoutubeThumbnail } from '../common/util'
import CourseCardUpcoming from '../components/Courses/CourseCardUpcoming'
import { Course } from '../types/api.types'

type LanguageViewProps = {
  data: {
    allStrapiCourse: { edges: { node: Course }[] }
  }
  pageContext: {
    languageToDisplay: string
  }
}
const LanguageView: React.FC<LanguageViewProps> = ({ data, pageContext }) => {
  const {
    allStrapiCourse: { edges: courses = [] },
  } = data
  const { languageToDisplay } = pageContext

  return (
    <Layout>
      <div>
        <div className="bg-gray-800 text-white text-center font-bold uppercase text-md px-4 py-4 my-8 rounded shadow hover:shadow-md outline-none focus:outline-none">
          {`${languageToDisplay}`}
        </div>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
        {courses.map(course => {
          const { lectures, status } = course.node
          const { url: imageUrl } = lectures[0] || {}

          return (
            <CourseCard
              key={course.node.id}
              course={course.node}
              lectureToPlayNext={lectures[0]}
              image={getYoutubeThumbnail(imageUrl)}
            />
          )
        })}
      </div>
    </Layout>
  )
}
export default LanguageView
export const pageQuery = graphql`
  query CoursesByLanguage($language: String!, $languageToDisplay: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInfo
    }
    allStrapiCourse(
      filter: { language: { name: { eq: $languageToDisplay } } }
    ) {
      edges {
        node {
          id
          title
          description
          slug
          level
          status
          thumbnail
          lectures {
            url
            slug
            duration
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
