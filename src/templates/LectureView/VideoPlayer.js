import React, { useContext } from 'react'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'
import { AuthContext } from '../../contexts/AuthContext'
import { addProfile } from '../../services/api'

const VideoPlayer = ({
  url,
  lectureStrapiId,
  courseStrapiId,
  // eslint-disable-next-line react/prop-types
  isLastLecture,
}) => {
  const DEFENITION_OF_COMPLETED = 0.8
  const { currentUser, isLoggedIn, setCurrentUser } = useContext(AuthContext)

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
    <div className="relative" style={{ paddingTop: '56.25%' }}>
      <ReactPlayer
        className="absolute top-0 right-0"
        url={url}
        width="100%"
        height="100%"
        controls
        onProgress={isLoggedIn ? handleProgress : () => {}}
      />
      {isLastLecture && (
        <div className="absolute top-0 right-0 w-full h-full bg-red-600">
          als
        </div>
      )}
    </div>
  )
}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  lectureStrapiId: PropTypes.number.isRequired,
  courseStrapiId: PropTypes.number.isRequired,
}

export default VideoPlayer
