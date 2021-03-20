import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { getLocalStorage } from '../services/localStorage'
import Modal from '../components/Modal'
import DefaultLanguage from '../components/DefaultLanguage'
import LandingPage from '../components/LandingPage'
import CoursesHome from '../components/Courses/CoursesHome'
import { AppProvider } from '../contexts/AppContext'
import { CoursePropType } from '../common/util'

const IndexPage = ({ data }) => {
  const {
    allStrapiCourse: { edges },
  } = data

  const coursesList = edges.map(edge => edge.node)

  const [open, setOpen] = useState(false)

  const { t } = useTranslation()

  useEffect(() => {
    if (!getLocalStorage('siteLang')) {
      setOpen(true)
    }
  }, [])

  return (
    <>
      <Seo
        description={t('landingPage.heroText')}
        title={t('landingPage.heroSubtitle')}
      />
      <Layout modalOpen={open} fullPage>
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
      {open && (
        <div style={{ direction: 'ltr' }}>
          <Modal
            withActions={false}
            titleCentered
            title="Please Choose a Language"
          >
            <div className="flex justify-center items-center flex-col min-h-40">
              <div>
                <DefaultLanguage onDismiss={() => setOpen(false)} />
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({ allStrapiCourse: { edges: CoursePropType } })
    .isRequired,
}
export default IndexPage

export const query = graphql`
  fragment LanguageInfo on LocaleConnection {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
`
export const pageQuery = graphql`
  query LandingQuery($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInfo
    }
    allStrapiCourse(
      sort: { fields: created_at, order: DESC }
      filter: { status: { eq: "Published" } }
      limit: 5
    ) {
      edges {
        node {
          id
          title
          description
          slug
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
