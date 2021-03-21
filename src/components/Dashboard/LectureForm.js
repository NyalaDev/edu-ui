import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import ActivityIndicator from '../ActivityIndicator'
import Input from '../Input'

import { teacher } from '../../services/api'
import { extractErrorMessage } from '../../services/auth'

const LectureFrorm = ({ course, onSaveComplete }) => {
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      title: '',
      url: '',
      description: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      url: Yup.string()
        .matches(
          /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/,
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
            name="title"
            label={t('lectureTitle')}
            placeholder={t('lectureTitle')}
            error={touched.title && errors.title && errors.title}
            {...getFieldProps('title')}
          />

          <Input
            name="url"
            label={t('youtubeURL')}
            placeholder="https://youtube.com?watch=1sAw2asd"
            error={touched.url && errors.url && errors.url}
            {...getFieldProps('url')}
          />

          <Input
            name="description"
            label={t('lectureDescription')}
            placeholder={t('lectureDescription')}
            type="textarea"
            error={
              touched.description && errors.description && errors.description
            }
            {...getFieldProps('description')}
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

LectureFrorm.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number,
  }),
  onSaveComplete: PropTypes.func.isRequired,
}

LectureFrorm.defaultProps = {
  course: {},
}

export default LectureFrorm
