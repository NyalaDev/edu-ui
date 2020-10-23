import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { orderBy } from 'lodash'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import CourseCard from '../components/CourseCard'
import CourseMeta from '../components/CourseMeta'
import InstructorBio from '../components/InstructorBio'
import LecturesList from '../components/LecturesList'
import CourseTags from '../components/CourseTags'
import CourseProgress from '../components/CourseProgress'
import { getYoutubeThumbnail } from '../common/util'
import { DEFAULT_PROFILE_PIC } from '../common/const'
import { getProfileById } from '../services/api'
import useCourseProgress from '../hooks/useCourseProgress'

const CourseView = ({ data }) => {
  const [instructorPhoto, setInstructorPhoto] = useState(DEFAULT_PROFILE_PIC)
  const { strapiCourse, allStrapiCourse } = data
  const {
    tags,
    lectures,
    slug,
    created_at: createdAt,
    instructor,
    strapiId: courseStrapiId,
  } = strapiCourse

  const sortedLectures = orderBy(lectures, 'position', 'asc')

  const thumbnail = getYoutubeThumbnail(sortedLectures[0].url)
  const { t } = useTranslation()
  const isCourseInProgress = useCourseProgress(courseStrapiId)

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
        <div className="flex flex-col md:col-span-1 sm:col-span-1">
          {isCourseInProgress && (
            <CourseProgress
              isCourseInProgress={isCourseInProgress}
              lecturesCount={lectures.length}
            />
          )}

          <CourseCard
            courseViewMode
            course={strapiCourse}
            image={thumbnail}
            lectureId={sortedLectures[0].id}
            isCourseInProgress={isCourseInProgress}
            showTags={false}
          />

          <CourseMeta lectures={sortedLectures} createdAt={createdAt} />

          <CourseTags tags={tags} />

          <InstructorBio instructor={instructor} photo={instructorPhoto} />
        </div>

        <div className="md:col-span-2 sm:col-span-1">
          <div>
            <h4 className="bg-gray-700 rounded-tl-md rounded-tr-md py-2 px-3 text-white">
              {t('lectures')}
            </h4>
            <LecturesList
              courseSlug={slug}
              lectures={sortedLectures}
              courseStrapiId={courseStrapiId}
            />
          </div>
        </div>
      </div>

      {allStrapiCourse.edges.length !== 0 && (
        <div className="rounded shadow-lg bg-gray-200 my-6 py-2">
          <div className=" px-6 py-3 bg-gray-800">
            <h1 className="text-white font-semibold text-lg text-center">
              {t('relatedCourses')}
            </h1>
          </div>
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4 my-6 mx-3">
            {allStrapiCourse.edges.map(({ node: course }) => {
              const {
                lectures: [firstLecture],
              } = course
              const { url: imageUrl } = firstLecture
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
      )}
    </Layout>
  )
}

CourseView.propTypes = {
  data: PropTypes.shape({
    strapiCourse: PropTypes.objectOf(PropTypes.any),
    allStrapiCourse: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
}
export default CourseView

export const pageQuery = graphql`
  query CourseByID($id: String!, $tagName: String!) {
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
      language {
        id
        name
      }
      tags {
        id
        tagName
      }
      updated_at
      created_at
    }

    allStrapiCourse(
      limit: 3
      filter: {
        tags: { elemMatch: { tagName: { eq: $tagName } } }
        id: { ne: $id }
      }
    ) {
      edges {
        node {
          id
          title
          description
          slug
          lectures {
            url
          }
          tags {
            id
            tagName
          }
          language {
            id
            name
          }
        }
      }
    }
  }
`
