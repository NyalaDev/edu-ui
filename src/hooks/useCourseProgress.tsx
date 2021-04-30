import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const useCourseProgress = (courseStrapiId: number) => {
  const { currentUser, isLoggedIn } = useContext(AuthContext)
  const isCourseInProgress =
    isLoggedIn &&
    currentUser &&
    currentUser.profile &&
    currentUser.profile.completedlectures &&
    currentUser.profile.completedlectures[courseStrapiId]
  return isCourseInProgress
}
export default useCourseProgress
