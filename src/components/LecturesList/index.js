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

const LectureList = ({ lectures, courseSlug, currentLecture }) => {
  const sortedLectures = orderBy(lectures, 'position', 'asc')

  return (
    <StyledLectureList>
      {sortedLectures.map((lecture, index) => (
        <StyledLectureListItem
          key={lecture.id}
          active={currentLecture && currentLecture.strapiId === lecture.id}
        >
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
      id: PropTypes.numbe,
      url: PropTypes.string,
      title: PropTypes.title,
      duration: PropTypes.duration,
      position: PropTypes.number,
    })
  ).isRequired,
  currentLecture: PropTypes.shape({
    strapiId: PropTypes.numbe,
  }).isRequired,
  courseSlug: PropTypes.string.isRequired,
}
export default LectureList
