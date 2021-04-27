import React, { useContext, useState } from 'react'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'
import { AuthContext } from '../../contexts/AuthContext'
import { addProfile } from '../../services/api'
import CourseRating from '../../components/Courses/CourseRating'

const VideoPlayer = ({
  url,
  lectureStrapiId,
  courseStrapiId,
  showFeedback,
}) => {
  const DEFENITION_OF_COMPLETED = 0.8
  const { currentUser, isLoggedIn, setCurrentUser } = useContext(AuthContext)

  const [open, setOpen] = useState(showFeedback)

  const lectures =
    isLoggedIn &&
    currentUser &&
    currentUser.profile &&
    currentUser.profile.completedlectures
      ? currentUser.profile.completedlectures
      : {}

  const updateCompletedLectures = async updatedLectures => {
    try {
      const response = await addProfile({ completedlectures: updatedLectures })
      setCurrentUser({ ...currentUser, profile: response })
    } catch (err) {
      // FIXME: error handling
    }
  }

  const handleProgress = state => {
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
        url={url}
        width="100%"
        height="100%"
        controls
        onPlay={() => setOpen(false)}
        onProgress={isLoggedIn ? handleProgress : () => {}}
      />

      {showFeedback && open && (
        <CourseRating
          onDismiss={() => setOpen(false)}
          courseId={courseStrapiId}
          lectureId={lectureStrapiId}
        />
      )}
    </div>
  )
}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  lectureStrapiId: PropTypes.number.isRequired,
  courseStrapiId: PropTypes.number.isRequired,
  showFeedback: PropTypes.bool.isRequired,
}

export default VideoPlayer
