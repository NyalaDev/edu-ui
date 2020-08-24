import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'
import { AuthContext } from '../../contexts/AuthContext'
import { addProfile } from '../../services/api'

const VideoPlayer = ({ url, lectureStrapiId, courseStrapiId }) => {
  const DEFENITION_OF_COMPLETED = 0.01
  const { currentUser, isLoggedIn, setCurrentUser } = useContext(AuthContext)
  const { t } = useTranslation()

  const lectures =
    isLoggedIn &&
    currentUser &&
    currentUser.profile &&
    currentUser.profile.completedlectures
      ? currentUser.profile.completedlectures
      : {}

  const updateCompletedLectures = async updatedLectures => {
    // try {
    const response = await addProfile({ completedlectures: updatedLectures })
    setCurrentUser({ ...currentUser, profile: response })
    toast.success(t('lectureCompletedMsg'))
    // } catch (err) {}
  }

  const handleProgress = state => {
    const isCourseInProgress = lectures[courseStrapiId]
    const isLectureCompleted =
      lectures[courseStrapiId] &&
      lectures[courseStrapiId].includes(lectureStrapiId)
    if (!isCourseInProgress || !isLectureCompleted) {
      if (state.played > DEFENITION_OF_COMPLETED) {
        const updatedLectures = lectures[courseStrapiId]
          ? {
              ...lectures,
              [courseStrapiId]: [...lectures[courseStrapiId], lectureStrapiId],
            }
          : { ...lectures, [courseStrapiId]: [lectureStrapiId] }

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
        onProgress={isLoggedIn ? handleProgress : () => {}}
      />
    </div>
  )
}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  lectureStrapiId: PropTypes.number.isRequired,
  courseStrapiId: PropTypes.number.isRequired,
}

export default VideoPlayer
