import React from 'react'
import PropTypes from 'prop-types'
import { FcCheckmark } from 'react-icons/fc'
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
import useCourseProgress from '../../hooks/useCourseProgress'

const LectureList = ({
  lectures,
  courseSlug,
  currentLecture,
  courseStrapiId,
}) => {
  const getNumber = index => {
    const value = index + 1
    return value
  }
  const isCourseInProgress = useCourseProgress(courseStrapiId)
  return (
    <StyledLectureList>
      {lectures.map((lecture, index) => (
        <StyledLectureListItem
          key={lecture.id}
          active={currentLecture && currentLecture.strapiId === lecture.id}
        >
          <StyledCount>
            <span>
              {getNumber(index)}
              {isCourseInProgress &&
                isCourseInProgress.includes(lecture.id) && (
                  <FcCheckmark className="m-auto" />
                )}
            </span>
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
