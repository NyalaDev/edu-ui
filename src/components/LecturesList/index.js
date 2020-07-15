import React from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'lodash'

import {
  StyledLectureList,
  StyledLectureListItem,
  StyledCount,
  StyledListBody,
  StyledLink,
  StyledVideoIcon,
  StyledDuration,
} from './styles'

const LectureList = ({ lectures, courseSlug }) => {
  // FIXME: sort data from query?
  const sortedLectures = orderBy(lectures, 'position', 'asc')

  return (
    <StyledLectureList>
      {sortedLectures.map((lecture, index) => (
        <StyledLectureListItem key={lecture.id}>
          <StyledCount>
            <span>{++index}</span>
          </StyledCount>
          <StyledListBody>
            <StyledVideoIcon />
            <p>
              <StyledLink to={`/courses/${courseSlug}/lectures/${lecture.id}`}>
                {lecture.title}
              </StyledLink>
            </p>
            <StyledDuration>{lecture.duration}</StyledDuration>
          </StyledListBody>
        </StyledLectureListItem>
      ))}
    </StyledLectureList>
  )
}

LectureList.propTypes = {
  lectures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
      title: PropTypes.title,
      duration: PropTypes.duration,
      position: PropTypes.number,
    })
  ).isRequired,
  courseSlug: PropTypes.string.isRequired,
}
export default LectureList
