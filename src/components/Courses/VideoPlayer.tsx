import React, { useContext, useState } from 'react'
import ReactPlayer from 'react-player'
import { navigate } from 'gatsby'
import { AuthContext } from '../../contexts/AuthContext'
import { addProfile } from '../../services/api'
import CourseRating from './CourseRating'

type VideoPlayerProps = {
  url: string
  lectureStrapiId: number
  courseStrapiId: number
  showFeedback: boolean
  courseSlug: string
  lectureSlug: string
  isLastLecture: boolean
  isFirstLecture: boolean
  canNavigateToNext: boolean
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  lectureStrapiId,
  courseStrapiId,
  showFeedback,
  courseSlug,
  lectureSlug,
  isLastLecture,
  isFirstLecture,
  canNavigateToNext,
}) => {
  const DEFENITION_OF_COMPLETED = 0.8
  const { currentUser, isLoggedIn, setCurrentUser } = useContext(AuthContext)
  const [open, setOpen] = useState(showFeedback && isLoggedIn)
  const lectures =
    isLoggedIn &&
    currentUser &&
    currentUser.profile &&
    currentUser.profile.completedlectures
      ? currentUser.profile.completedlectures
      : {}
  const updateCompletedLectures = async (updatedLectures: {
    course: number
    lecture: number
  }) => {
    try {
      const response = await addProfile({ completedlectures: updatedLectures })
      setCurrentUser({ ...currentUser!, profile: response })
    } catch (err) {
      // FIXME: error handling
    }
  }

  const handleCompleteVideo = () => {
    if (!isLastLecture && canNavigateToNext) {
      navigate(`/courses/${courseSlug}/lectures/${lectureSlug}`)
    }
  }

  const handleProgress = (state: { played: number }) => {
    const isCourseInProgress = lectures[courseStrapiId]
    const isLectureCompleted =
      lectures[courseStrapiId] &&
      lectures[courseStrapiId].includes(lectureStrapiId)
    if (!isCourseInProgress || !isLectureCompleted) {
      if (state.played > DEFENITION_OF_COMPLETED) {
        const updatedLectures = {
          course: courseStrapiId,
          lecture: lectureStrapiId,
        }
        updateCompletedLectures(updatedLectures)
      }
    }
  }
  return (
    <div className="relative " style={{ paddingTop: '56.25%' }}>
      <ReactPlayer
        className="absolute top-0 right-0"
        playing={!open && !isFirstLecture}
        url={url}
        width="100%"
        height="100%"
        controls
        onProgress={isLoggedIn ? handleProgress : () => {}}
        onEnded={handleCompleteVideo}
      />

      {open && (
        <CourseRating
          onDismiss={() => setOpen(false)}
          courseId={courseStrapiId}
          lectureId={lectureStrapiId}
        />
      )}
    </div>
  )
}
export default VideoPlayer
