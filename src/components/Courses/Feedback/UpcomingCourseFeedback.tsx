import React, { useEffect, useState } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import useLanguage from '../../../hooks/useLanguage'
import { sendEvent } from '../../../services/analytics'
import {
  getLocalStorage,
  setLocalStorage,
} from '../../../services/localStorage'
import { Course } from '../../../types/api.types'

const LOCAL_STORAGE_COURSE_FEEDBACK = 'course_feedback'

type UpcomingCourseFeedbackProps = {
  course: Course
}

const getCourseFeedbackGiven = (courseId: string) => {
  try {
    const feedback = JSON.parse(
      getLocalStorage(LOCAL_STORAGE_COURSE_FEEDBACK) || '{}'
    )
    return feedback[courseId]
  } catch (err) {
    // fail silently
    return false
  }
}
const setCourseFeedbackGiven = (courseId: string) => {
  try {
    const feedback = JSON.parse(
      getLocalStorage(LOCAL_STORAGE_COURSE_FEEDBACK) || '{}'
    )
    feedback[courseId] = true
    setLocalStorage(LOCAL_STORAGE_COURSE_FEEDBACK, JSON.stringify(feedback))
    return true
  } catch (e) {
    // fail silently
    return false
  }
}

const UpcomingCourseFeedback: React.FC<UpcomingCourseFeedbackProps> = ({
  course,
}) => {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [feedbackAlreadyGiven, setFeedbackAlreadyGiven] = useState(false)

  useEffect(() => {
    if (getCourseFeedbackGiven(course.id)) {
      setFeedbackAlreadyGiven(true)
    }
  }, [])
  const interested = (isInterested: boolean) => {
    setFeedbackSent(true)
    sendEvent('Course Interest', {
      isInterested,
      course: course.title,
      language,
    })
    setCourseFeedbackGiven(course.id)
  }

  if (feedbackAlreadyGiven) {
    return null
  }

  if (feedbackSent) {
    return (
      <div className="flex-none h-12 m-4 text-center text-gray-600">
        <span>{t('upcomingCourse.feedbackReceived')}</span>
      </div>
    )
  }
  return (
    <div className="flex-none h-12 text-center text-gray-600">
      <span>{t('upcomingCourse.interestedInCourse')}</span>
      <button
        type="button"
        onClick={() => interested(true)}
        className="text-green-500 mx-2 font-bold cursor-pointer"
      >
        {t('yes')}
      </button>{' '}
      -
      <button
        type="button"
        onClick={() => interested(false)}
        className="text-red-600 mx-2 font-bold cursor-pointer"
      >
        {t('no')}
      </button>
    </div>
  )
}

export default UpcomingCourseFeedback
