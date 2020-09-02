import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const useCourseProgress = courseStrapiId => {
  const { currentUser, isLoggedIn } = useContext(AuthContext)
  const isCourseInProgress =
    isLoggedIn &&
    currentUser.profile &&
    currentUser.profile.completedlectures[courseStrapiId]

  return isCourseInProgress
}

export default useCourseProgress
