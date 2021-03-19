import React from 'react'
import PropTypes from 'prop-types'
import UpcomingCourseFeedback from './UpcomingCourseFeedback'

const CourseFeedback = ({ type, ...rest }) => {
  if (type === 'UpcomingCourse') return <UpcomingCourseFeedback {...rest} />
  return null
}

CourseFeedback.propTypes = {
  type: PropTypes.oneOf(['UpcomingCourse']).isRequired,
}
export default CourseFeedback
