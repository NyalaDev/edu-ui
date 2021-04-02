import React from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'lodash'
import { FcCheckmark } from 'react-icons/fc'
import { formatDuration } from '../../common/util'

import {
  StyledLectureList,
  StyledLectureListItem,
  StyledCount,
  StyledListBody,
  StyledVideoIcon,
  StyledDuration,
} from './styles'
import useCourseProgress from '../../hooks/useCourseProgress'

const LectureList = ({
  lectures,
  currentLecture,
  courseStrapiId,
  language,
  x,
}) => {
  const getNumber = index => {
    const value = index + 1
    return value
  }
  const isCourseInProgress = useCourseProgress(courseStrapiId)
  const sortedLectures = orderBy(lectures, 'position', 'asc')
  const isRtl = language === 'Arabic'

  return (
    <StyledLectureList>
      {sortedLectures.map((lecture, index) => (
        <StyledLectureListItem
          active={currentLecture && currentLecture.strapiId === lecture.id}
          key={lecture.id}
          onClick={() => x(lecture.url, lecture.id)}
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
            <p className={`${isRtl ? 'rtl' : 'ltr'}`}>{lecture.title}</p>
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
  courseStrapiId: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
}

LectureList.defaultProps = {
  currentLecture: {},
}

export default LectureList
