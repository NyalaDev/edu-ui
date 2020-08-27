import React, { useState, useEffect } from 'react'
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
import { DEFAULT_PROFILE_PIC } from '../common/const'
import { getProfileById } from '../services/api'

const CourseView = ({ data }) => {
  const [instructorPhoto, setInstructorPhoto] = useState(DEFAULT_PROFILE_PIC)
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

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const { profile } = instructor
        if (!profile.id) return
        const { data: profileData } = await getProfileById(profile.id)
        if (profileData.profilepicture) {
          setInstructorPhoto(profileData.profilepicture.url)
        }
      } catch (e) {
        //
      }
    }

    fetchPhoto()
  }, [])

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
          <InstructorBio instructor={instructor} photo={instructorPhoto} />
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
          id
          user
          name
          bio
        }
      }
      updated_at
      created_at
    }
  }
`
