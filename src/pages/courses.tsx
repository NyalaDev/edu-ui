import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { AppProvider } from '../contexts/AppContext'
import CoursesHome from '../components/Courses/CoursesHome'
import { Course } from '../types/api.types'

type CoursesPageProps = {
  data: {
    allStrapiCourse: { edges: { node: Course }[] }
  }
}
const CoursesPage: React.SFC<CoursesPageProps> = ({ data }) => {
  const {
    allStrapiCourse: { edges },
  } = data
  const coursesList = edges.map(edge => edge.node)
  const { t } = useTranslation()
  return (
    <>
      <Seo title={t('courses')} />
      <Layout>
        <AppProvider initialCoursesList={coursesList}>
          <CoursesHome courses={coursesList} />
        </AppProvider>
      </Layout>
    </>
  )
}
export default CoursesPage
export const pageQuery = graphql`
  query IndexQuery($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInfo
    }
    allStrapiCourse(
      sort: { fields: [status, created_at], order: [ASC, DESC] }
    ) {
      edges {
        node {
          id
          title
          description
          slug
          level
          status
          tags {
            tagName
          }
          lectures {
            slug
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
