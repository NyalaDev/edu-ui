import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import ActivityIndicator from '../ActivityIndicator'
import Input from '../Input'

import { teacher } from '../../services/api'
import { extractErrorMessage } from '../../services/auth'

const ImportLecturesForm = ({ course, onSaveComplete }) => {
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema: Yup.object().shape({
      url: Yup.string()
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^.*(youtu.be\/|list=)([^#\&\?]*).*/,
          'Please enter a valid youtube URL'
        )
        .required(),
    }),
    onSubmit: async values => {
      try {
        await teacher.saveLecture({ ...values, course: course.id })
        onSaveComplete()
      } catch (e) {
        const message = extractErrorMessage(e)
        toast.error(message)
      }
    },
  })
  const { touched, errors, getFieldProps } = formik
  return (
    <div className="w-full">
      <div className="py-4 px-6">
        <form onSubmit={formik.handleSubmit}>
          <Input
            name="url"
            label={t('youtubeURL')}
            placeholder="https://youtube.com/playlists?s="
            error={touched.url && errors.url && errors.url}
            {...getFieldProps('url')}
          />

          <div className="flex justify-between items-center mt-6">
            <ActivityIndicator active={formik.isSubmitting}>
              <button
                className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
                type="submit"
              >
                {t('save')}
              </button>
            </ActivityIndicator>
          </div>
        </form>
      </div>
    </div>
  )
}

ImportLecturesForm.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number,
  }),
  onSaveComplete: PropTypes.func.isRequired,
}

ImportLecturesForm.defaultProps = {
  course: {},
}

export default ImportLecturesForm
