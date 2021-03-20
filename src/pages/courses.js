import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { AppProvider } from '../contexts/AppContext'
import CoursesHome from '../components/Courses/CoursesHome'

const CoursesPage = ({ data }) => {
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

CoursesPage.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
}
export default CoursesPage

export const pageQuery = graphql`
  query IndexQuery($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInfo
    }
    allStrapiCourse(sort: { fields: created_at, order: DESC }) {
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
