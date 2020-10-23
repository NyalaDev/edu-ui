import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { formatDuration } from '../../common/util'
import Clickable from '../Clickable'
import Modal from '../Modal'
import LectureFrorm from './LectureForm'
import { teacher } from '../../services/api'
import {
  StyledLectureList,
  StyledLectureListItem,
  StyledListBody,
  StyledDuration,
  StyledVideoIcon,
  StyledCount,
} from '../LecturesList/styles'
import { extractErrorMessage } from '../../services/auth'

const LecturesList = ({ course, onSaveSuccess }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [lectureForDelete, setLectureForDelete] = useState(null)

  const { lectures = [] } = course

  const handlePreview = lecture => {
    const { url = '' } = lecture
    window.open(url, '', 'width=600,height=600')
  }

  const handleDelete = async () => {
    try {
      await teacher.deleteLecture(lectureForDelete.id)
      setLectureForDelete(null)
      onSaveSuccess()
    } catch (e) {
      const message = extractErrorMessage(e)
      toast.error(message)
    }
  }

  const onNewLectureSaved = () => {
    setOpen(false)
    onSaveSuccess()
  }

  return (
    <div className="bg-white w-full rounded-lg shadow-md overflow-hidden mx-auto">
      <div className="py-4 px-6">
        <div className="mb-8">
          <button
            onClick={() => setOpen(true)}
            className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-600 focus:outline-none"
            type="button"
          >
            {t('addLecture')}
          </button>
        </div>
        <h1 className="text-3xl  text-gray-800 font-extrabold ">
          {t('lectures')}
        </h1>
        <hr />
        <StyledLectureList>
          {lectures.map(lecture => (
            <StyledLectureListItem key={lecture.id}>
              <StyledCount>
                <div className="flex justify-center items-center h-full">
                  <Clickable onClick={() => setLectureForDelete(lecture)}>
                    <FaTrash />
                  </Clickable>
                </div>
              </StyledCount>
              <StyledListBody>
                <StyledVideoIcon />

                <Clickable onClick={() => handlePreview(lecture)}>
                  {lecture.title}
                </Clickable>
                <StyledDuration>
                  {formatDuration(lecture.duration)}
                </StyledDuration>
              </StyledListBody>
            </StyledLectureListItem>
          ))}
        </StyledLectureList>
      </div>

      {open && (
        <Modal
          withActions={false}
          onDismiss={() => setOpen(false)}
          title={t('lectureDetail')}
        >
          <LectureFrorm onSaveComplete={onNewLectureSaved} course={course} />
        </Modal>
      )}

      {lectureForDelete && (
        <Modal
          onDismiss={() => setLectureForDelete(null)}
          title={t('deleteLecture')}
          confirmLabel={t('delete')}
          onAction={handleDelete}
        >
          <p className="p-3">{t('confirmDelete', { entity: t('lecture') })}</p>
        </Modal>
      )}
    </div>
  )
}

LecturesList.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    lectures: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        url: PropTypes.string,
        description: PropTypes.string,
      })
    ),
  }).isRequired,
  onSaveSuccess: PropTypes.func,
}

LecturesList.defaultProps = {
  onSaveSuccess: () => {},
}

export default LecturesList
