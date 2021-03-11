import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import LandingPage from '../components/LandingPage'
import CoursesHome from '../components/Courses/CoursesHome'
import { AppProvider } from '../contexts/AppContext'

const IndexPage = ({ data }) => {
  const {
    allStrapiCourse: { edges },
  } = data

  const coursesList = edges.map(edge => edge.node)

  return (
    <Layout>
      <Seo title="Home" />
      <LandingPage />
      <div className="container max-w-6xl w-full mx-auto pt-10">
        <div className="w-full md:mt-2 mb-16 text-black-800 leading-normal">
          <AppProvider initialCoursesList={coursesList}>
            <CoursesHome
              showMoreCard
              hidleFilters
              noFilter
              courses={coursesList}
            />
          </AppProvider>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query LandingQuery {
    allStrapiCourse(sort: { fields: created_at, order: DESC }, limit: 5) {
      edges {
        node {
          id
          title
          description
          slug
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
