import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { getLocalStorage } from '../services/localStorage'
import Spinner from '../components/Spinner'
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
    <Layout fullPage>
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

      <Spinner />

      {open && (
        <Modal
          withActions={false}
          onDismiss={() => setOpen(false)}
          title={t('preferedLanguage')}
        >
          <div className="flex justify-center items-center flex-col min-h-40">
            <div className="text-2xl font-semibold mb-3">
              {t('choosePreferedLanguage')}
            </div>
            <div>
              <DefaultLanguage onDismiss={() => setOpen(false)} />
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({ allStrapiCourse: { edges: CoursePropType } })
    .isRequired,
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
