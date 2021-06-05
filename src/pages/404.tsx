import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { getYoutubeThumbnail } from '../common/util'
import Layout from '../components/Layout'
import Seo from '../components/General/Seo'
import CourseCard from '../components/Courses/CourseCard'
import { Course } from '../types/api.types'

type NotFoundPageProps = {
  data: {
    allStrapiCourse: { edges: Array<{ node: Course }> }
  }
}
const NotFoundPage: React.FC<NotFoundPageProps> = props => {
  const { data } = props
  const { t } = useTranslation()
  const {
    allStrapiCourse: { edges },
  } = data
  const coursesList = edges.map(edge => edge.node)
  const randomCourse =
    coursesList[Math.floor(Math.random() * coursesList.length)]
  const { lectures = [] } = randomCourse || {}
  let thumbnail = null
  try {
    thumbnail = getYoutubeThumbnail(lectures[0].url)
  } catch (e) {
    thumbnail = null
  }
  return (
    <Layout>
      <Seo title="404: Not found" />
      <div className="h-screen bg-gray-100 flex items-center">
        <div className="container flex flex-col items-center justify-center px-5 text-gray-700">
          <div className="max-w-md">
            <div className="text-5xl font-dark font-bold">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal">
              {t('404.title')}
            </p>
            <p className="mt-2 mb-8">{t('404.subTitle')}</p>
          </div>

          {randomCourse && thumbnail && (
            <>
              <div className="text-2xl font-dark font-bold mb-3">
                {t('404.teaser')}
              </div>
              <CourseCard course={randomCourse} image={thumbnail} />
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default NotFoundPage
export const pageQuery = graphql`
  query NotFoundPageQuery($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
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
