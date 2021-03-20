import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CoursePropType } from '../../../common/util'
import useLanguage from '../../../hooks/useLanguage'
import { sendEvent } from '../../../services/analytics'
import {
  getLocalStorage,
  setLocalStorage,
} from '../../../services/localStorage'

const LOCAL_STORAGE_COURSE_FEEDBACK = 'course_feedback'

const getCourseFeedbackGiven = courseId => {
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
const setCourseFeedbackGiven = courseId => {
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

const UpcomingCourseFeedback = ({ course }) => {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [feedbackAlreadyGiven, setFeedbackAlreadyGiven] = useState(false)

  useEffect(() => {
    if (getCourseFeedbackGiven(course.id)) {
      setFeedbackAlreadyGiven(true)
    }
  }, [])
  const interested = isInterested => {
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

UpcomingCourseFeedback.propTypes = {
  course: CoursePropType.isRequired,
}

export default UpcomingCourseFeedback
