import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'lodash'
import { FcCheckmark } from 'react-icons/fc'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import styled from 'styled-components'
import Modal from '../Modal'
import { formatDuration } from '../../common/util'
import useCourseProgress from '../../hooks/useCourseProgress'
import { AuthContext } from '../../contexts/AuthContext'
import useLanguage from '../../hooks/useLanguage'
import {
  StyledLectureList,
  StyledLectureListItem,
  StyledCount,
  StyledListBody,
  StyledVideoIcon,
  StyledDuration,
  StyledLockIcon,
} from './styles'
import { ALLOWED_LECTURES_WHEN_NOT_LOGGED_IN } from '../../common/constants'

const StyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: 0 !important;
  width: 100%;
  text-align: ${props => (props.isRtl ? 'right' : 'left')};
`

const LectureList = ({
  lectures,
  courseSlug,
  currentLecture,
  courseStrapiId,
}) => {
  const { t } = useTranslation()
  const { isRtl } = useLanguage()
  const { isLoggedIn } = useContext(AuthContext)
  const [open, setOpen] = useState(false)

  const getNumber = index => {
    const value = index + 1
    return value
  }
  const isCourseInProgress = useCourseProgress(courseStrapiId)
  const sortedLectures = orderBy(lectures, 'position', 'asc')

  const lectureIcon = index => {
    if (isLoggedIn || index < ALLOWED_LECTURES_WHEN_NOT_LOGGED_IN)
      return <StyledVideoIcon />
    return <StyledLockIcon />
  }

  const canWatch = index =>
    isLoggedIn || (!isLoggedIn && index < ALLOWED_LECTURES_WHEN_NOT_LOGGED_IN)

  return (
    <>
      <StyledLectureList>
        {sortedLectures.map((lecture, index) => {
          const WrapperComponent = canWatch(index) ? Link : StyledButton
          const wrapperComponentProps = canWatch(index)
            ? { to: `/courses/${courseSlug}/lectures/${lecture.slug}` }
            : { onClick: () => setOpen(true), isRtl }
          return (
            <StyledLectureListItem
              active={currentLecture && currentLecture.strapiId === lecture.id}
              key={lecture.slug}
            >
              <WrapperComponent {...wrapperComponentProps}>
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
                  <p className={`${isRtl ? 'rtl' : 'ltr'}`}>
                    <span className="text-gray-700">{lecture.title}</span>
                  </p>
                  <StyledDuration>
                    {formatDuration(lecture.duration)}
                  </StyledDuration>
                </StyledListBody>

                <div>{lectureIcon(index)}</div>
              </WrapperComponent>
            </StyledLectureListItem>
          )
        })}
      </StyledLectureList>
      {open && (
        <Modal
          title={t('signIn')}
          onDismiss={() => setOpen(false)}
          withActions={false}
        >
          <div className="p-5">
            <span>{t('signInToContinueWatch')}</span>
            <div className="mt-5 flex justify-between">
              <Link
                to="/signin"
                className="bg-purple-800 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              >
                {t('signIn')}
              </Link>
              <Link
                to="/signup"
                className="bg-gray-800 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              >
                {t('createAccount')}
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

LectureList.propTypes = {
  lectures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      slug: PropTypes.string,
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
  courseStrapiId: PropTypes.number.isRequired,
}

LectureList.defaultProps = {
  currentLecture: {},
}

export default LectureList
