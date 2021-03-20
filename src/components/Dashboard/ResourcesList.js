import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { FaTrash, FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { uniqueId } from 'lodash'
import Clickable from '../Clickable'
import Modal from '../Modal'
import ResourceForm from './ResourceForm'
import { teacher } from '../../services/api'
import {
  StyledLectureList,
  StyledLectureListItem,
  StyledListBody,
  StyledDuration,
  StyledCount,
} from '../LecturesList/styles'
import { extractErrorMessage } from '../../services/auth'

const ResourcesList = ({ course, onSaveSuccess }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(-1)
  const resources = course.resources || []

  const handleDelete = async () => {
    try {
      resources.splice(deleteIndex, 1)
      await teacher.patchCourse({ resources }, course.id)
      setDeleteIndex(-1)
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
            className="py-2 px-4 bg-green-500 text-white rounded hover:bg-gray-600 focus:outline-none flex justify-between items-center"
            type="button"
          >
            <FaPlus size={10} />
            <span>{t('add')}</span>
          </button>
        </div>
        <h1 className="text-3xl  text-gray-800 font-extrabold ">
          {t('resources')}
        </h1>
        <hr />
        <StyledLectureList>
          {resources.map((resource, index) => (
            <StyledLectureListItem key={uniqueId('resource-')}>
              <StyledCount>
                <div className="flex justify-center items-center h-full">
                  <Clickable onClick={() => setDeleteIndex(index)}>
                    <FaTrash />
                  </Clickable>
                </div>
              </StyledCount>
              <StyledListBody>
                {resource.text}
                <StyledDuration>{resource.url}</StyledDuration>
              </StyledListBody>
            </StyledLectureListItem>
          ))}
        </StyledLectureList>
      </div>

      {open && (
        <Modal
          withActions={false}
          onDismiss={() => setOpen(false)}
          title={t('details')}
        >
          <ResourceForm onSaveComplete={onNewLectureSaved} course={course} />
        </Modal>
      )}

      {deleteIndex > -1 && (
        <Modal
          onDismiss={() => setDeleteIndex(-1)}
          title={t('delete')}
          confirmLabel={t('delete')}
          onAction={handleDelete}
        >
          <p className="p-3">
            {t('confirmDelete', { entity: t('resources') })}
          </p>
        </Modal>
      )}
    </div>
  )
}

ResourcesList.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number,
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
      })
    ),
  }).isRequired,
  onSaveSuccess: PropTypes.func,
}

ResourcesList.defaultProps = {
  onSaveSuccess: () => {},
}

export default ResourcesList
