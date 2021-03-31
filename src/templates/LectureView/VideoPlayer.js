import React, { useContext } from 'react'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'
import { AuthContext } from '../../contexts/AuthContext'
import { addProfile } from '../../services/api'
import { getLocalStorage, setLocalStorage } from '../../services/localStorage'
import Modal from '../../components/Modal'
import SignupForm from '../../pages/signup/SignupForm'

const VideoPlayer = ({ url, lectureStrapiId, courseStrapiId }) => {
  const { currentUser, isLoggedIn, setCurrentUser } = useContext(AuthContext)
  const DEFENITION_OF_COMPLETED = 0.8

  let lecturesAlreadySaved
  if (isLoggedIn) {
    lecturesAlreadySaved =
      isLoggedIn &&
      currentUser &&
      currentUser.profile &&
      currentUser.profile.completedlectures
        ? currentUser.profile.completedlectures
        : {}
  } else {
    lecturesAlreadySaved =
      JSON.parse(getLocalStorage('completedLectures')) || {}
  }

  const updateCompletedLectures = async updatedLectures => {
    try {
      const response = await addProfile({ completedlectures: updatedLectures })
      setCurrentUser({ ...currentUser, profile: response })
    } catch (err) {
      // FIXME: error handling
    }
  }

  const handleProgress = state => {
    if (state.played > DEFENITION_OF_COMPLETED) {
      const isCourseInProgress = lecturesAlreadySaved[courseStrapiId]
      const isLectureAlreadySaved =
        lecturesAlreadySaved[courseStrapiId] &&
        lecturesAlreadySaved[courseStrapiId].includes(lectureStrapiId)
      console.log(isCourseInProgress, isLectureAlreadySaved, 'true')
      if (!isLectureAlreadySaved) {
        const completedCourseLectures = lecturesAlreadySaved[courseStrapiId]
        console.log(
          completedCourseLectures,
          lectureStrapiId,
          'completedCourseLectures'
        )
        const dataToSave = completedCourseLectures
          ? {
              ...lecturesAlreadySaved,
              [courseStrapiId]: [...completedCourseLectures, lectureStrapiId],
            }
          : {
              ...lecturesAlreadySaved,
              [courseStrapiId]: [lectureStrapiId],
            }
        console.log(dataToSave, 'datatosave')
        if (isLoggedIn) {
          updateCompletedLectures(dataToSave)
        } else {
          setLocalStorage('completedLectures', JSON.stringify(dataToSave))
        }
      }
    }
  }
  return (
    <div>
      <div className="relative" style={{ paddingTop: '56.25%' }}>
        <ReactPlayer
          className="absolute top-0 right-0"
          url={url}
          width="100%"
          height="100%"
          controls
          onProgress={handleProgress}
        />
      </div>
      {false && (
        <Modal>
          <div>
            <SignupForm />
          </div>
        </Modal>
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
