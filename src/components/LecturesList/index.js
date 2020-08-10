import React from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'lodash'
import { formatDuration } from '../../common/util'

import {
  StyledLectureList,
  StyledLectureListItem,
  StyledCount,
  StyledListBody,
  StyledLink,
  StyledVideoIcon,
  StyledDuration,
} from './styles'

const LectureList = ({ lectures, courseSlug, currentLecture }) => {
  const sortedLectures = orderBy(lectures, 'position', 'asc')

  const getNumber = index => {
    const value = index + 1
    return value
  }

  return (
    <StyledLectureList>
      {sortedLectures.map((lecture, index) => (
        <StyledLectureListItem
          key={lecture.id}
          active={currentLecture && currentLecture.strapiId === lecture.id}
        >
          <StyledCount>
            <span>{getNumber(index)}</span>
          </StyledCount>
          <StyledListBody>
            <StyledVideoIcon />
            <p>
              <StyledLink to={`/courses/${courseSlug}/lectures/${lecture.id}`}>
                {lecture.title}
              </StyledLink>
            </p>
            <StyledDuration>{formatDuration(lecture.duration)}</StyledDuration>
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
      title: PropTypes.string,
      duration: PropTypes.string,
      position: PropTypes.number,
    })
  ).isRequired,
  currentLecture: PropTypes.shape({
    strapiId: PropTypes.number,
  }),
  courseSlug: PropTypes.string.isRequired,
}

LectureList.defaultProps = {
  currentLecture: {},
}

export default LectureList
