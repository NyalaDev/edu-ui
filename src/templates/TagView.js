import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Seo from '../components/Seo'
import Layout from '../components/Layout'
import CourseCard from '../components/Courses/CourseCard'
import { getYoutubeThumbnail } from '../common/util'

const TagView = ({ data, location }) => {
  const { courses = [], tagName } = data.strapiTag

  return (
    <Layout>
      <Seo title="Tags" />
      <Helmet titleTemplate="%s | barmaga.io">
        <title>{`${tagName}`}</title>
        <meta property="og:title" content={tagName} />
        <meta property="og:url" content={location.href} />
      </Helmet>
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
  )
}

TagView.propTypes = {
  data: PropTypes.shape({
    strapiTag: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  location: PropTypes.objectOf.isRequired,
}

export default TagView

export const pageQuery = graphql`
  query TagByID($id: String!) {
    strapiTag(id: { eq: $id }) {
      id
      tagName
      courses {
        id
        title
        description
        slug
        lectures {
          url
        }
        language {
          id
          name
        }
      }
    }
  }
`
