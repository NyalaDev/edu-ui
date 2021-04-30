import React, { useEffect, useState } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { orderBy } from 'lodash'
import CourseResources from './CourseInfo/CourseResources'
import CourseMeta from './CourseInfo/CourseMeta'
import InstructorBio from './CourseInfo/InstructorBio'
import CourseExercises from './CourseInfo/CourseExercises'
import ShareButtons from './ShareButtons'
import { DEFAULT_PROFILE_PIC } from '../../common/constants'
import { getYoutubeThumbnail } from '../../common/util'
import { getProfileById } from '../../services/api'
import CourseCard from './CourseCard'
import useCourseProgress from '../../hooks/useCourseProgress'
import { Course, User } from '../../types/api.types'

type Props = {
  course: Course
  location: any
  completedLectures: any
}

const CourseInfoCards: React.FC<Props> = ({
  course,
  location,
  completedLectures,
}) => {
  const [instructorPhoto, setInstructorPhoto] = useState(DEFAULT_PROFILE_PIC)
  const { title, tags, lectures, instructor, strapiId: courseStrapiId } = course

  const coursesInProgress = useCourseProgress(courseStrapiId)
  const sortedLectures = orderBy(lectures, 'position', 'asc')

  let lectureToPlayNext = sortedLectures[0]
  if (completedLectures && completedLectures[courseStrapiId]) {
    const [lectureNotPlayed] = sortedLectures.filter(
      lecture => !completedLectures[courseStrapiId].includes(lecture.id)
    )
    lectureToPlayNext = lectureNotPlayed // eslint rule (prefer destructuring)
  }

  const thumbnail = getYoutubeThumbnail(sortedLectures[0].url)
  const { t } = useTranslation()

  const { profile } = instructor
  const resources = course.resources || []
  const exercises = resources
    ? resources.filter(resourse => resourse.type === 'exercise')
    : []

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        if (!profile.id) return
        const { data: profileData } = await getProfileById(profile.id)
        if (profileData?.profilepicture) {
          setInstructorPhoto(profileData.profilepicture.url)
        }
      } catch (e) {
        // To Do
      }
    }

    fetchPhoto()
  }, [])

  return (
    <>
      <CourseCard
        courseViewMode
        course={course}
        image={thumbnail}
        lectureId={sortedLectures[0].id}
        isCourseInProgress={Boolean(
          coursesInProgress && coursesInProgress.length > 0
        )}
        showTags={false}
        lectureToPlayNext={lectureToPlayNext}
      />

      <CourseResources course={course} />
      {exercises.length > 0 && (
        <CourseExercises exercises={exercises} courseId={course.strapiId} />
      )}
      <CourseMeta tags={tags} lectures={sortedLectures} />

      <div className="max-w-sm rounded overflow-hidden shadow-lg my-5 h-40 ">
        <div className="px-6 py-3 bg-purple-800 mb-7">
          <h1 className="text-white title text-lg items-center justify-center flex">
            <span className="mx-1">{t('shareCourse')}</span>
          </h1>
        </div>
        <ShareButtons
          url={location.href}
          title={`${title} by ${profile.name} @BarmagaIo `}
          course={course}
        />
      </div>

      <InstructorBio instructor={instructor} photo={instructorPhoto} />
    </>
  )
}

export default CourseInfoCards
