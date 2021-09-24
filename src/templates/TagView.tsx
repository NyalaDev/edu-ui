import React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/General/Seo'
import Layout from '../components/Layout'
import CourseCard from '../components/Courses/CourseCard'
import { getYoutubeThumbnail } from '../common/util'
import { Course } from '../types/api.types'

type TagViewProps = {
  data: {
    strapiTag: {
      courses: Course[]
      tagName: string
    }
  }
  location: {
    href: string
  }
}
const TagView: React.FC<TagViewProps> = ({ data, location }) => {
  const { courses = [], tagName } = data.strapiTag
  return (
    <>
      <Seo
        title={tagName}
        meta={[{ property: 'og:url', content: location.href }]}
      />
      <Layout>
        <div>
          <div className="bg-gray-800 text-white text-center font-bold uppercase text-md px-4 py-4 my-8 rounded shadow hover:shadow-md outline-none focus:outline-none">
            {`${tagName} courses`}
          </div>
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
            {courses.map(course => {
              const { lectures } = course
              const { url: imageUrl } = lectures[0] || {}
              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  image={getYoutubeThumbnail(imageUrl)}
                />
              )
            })}
          </div>
        </div>
      </Layout>
    </>
  )
}
export default TagView
export const pageQuery = graphql`
  query TagByID($id: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInfo
    }
    strapiTag(id: { eq: $id }) {
      id
      tagName
      courses {
        id
        title
        description
        slug
        level
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
`
