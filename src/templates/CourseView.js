import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import CourseCard from '../components/CourseCard'
import CourseMeta from '../components/CourseMeta'
import InstructorBio from '../components/InstructorBio'
import LecturesList from '../components/LecturesList'
import { getYoutubeThumbnail } from '../common/util'

const CourseView = ({ data }) => {
  const { strapiCourse } = data
  const {
    lectures,
    description,
    slug,
    github_repo: githubRepo,
    created_at: createdAt,
    instructor,
  } = strapiCourse
  const thumbnail = getYoutubeThumbnail(lectures[0].url)
  const { t } = useTranslation()

  return (
    <Layout>
      <Seo title="Courses" />
      <div className="grid md:grid-cols-3 sm:grid-col-1 gap-4">
        <div className="md:col-span-1 sm:col-span-1">
          <CourseCard
            courseViewMode
            image={thumbnail}
            description={description}
            githubRepo={githubRepo}
            lectureId={lectures[0].id}
            slug={slug}
          />
          <br />
          <CourseMeta lectures={lectures} createdAt={createdAt} />
          <br />
          <InstructorBio instructor={instructor} />
        </div>

        <div className="md:col-span-2 sm:col-span-1">
          <div>
            <h4 className="bg-gray-700 rounded-tl-md rounded-tr-md py-2 px-3 text-white">
              {t('lectures')}
            </h4>
            <LecturesList courseSlug={slug} lectures={lectures} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

CourseView.propTypes = {
  data: PropTypes.shape({
    strapiCourse: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
}
export default CourseView

export const pageQuery = graphql`
  query CourseByID($id: String!) {
    strapiCourse(id: { eq: $id }) {
      id
      strapiId
      slug
      title
      description
      github_repo
      lectures {
        id
        title
        position
        duration
        url
      }
      instructor {
        username
        profile {
          name
          bio
        }
      }
      updated_at
      created_at
    }
  }
`
