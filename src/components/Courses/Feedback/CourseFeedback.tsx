import React from 'react'
import UpcomingCourseFeedback from './UpcomingCourseFeedback'
import { Course } from '../../../types/api.types'

type Props = {
  type: string
  course: Course
}

const CourseFeedback: React.FC<Props> = ({ type, ...rest }) => {
  if (type === 'UpcomingCourse') return <UpcomingCourseFeedback {...rest} />
  return null
}

export default CourseFeedback
