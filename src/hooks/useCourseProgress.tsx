import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const useCourseProgress = (courseStrapiId: number): number[] => {
  const { currentUser, isLoggedIn } = useContext(AuthContext)
  const coursesCompleted =
    isLoggedIn &&
    currentUser &&
    currentUser.profile &&
    currentUser.profile.completedlectures &&
    currentUser.profile.completedlectures[courseStrapiId]
  return coursesCompleted || []
}
export default useCourseProgress
