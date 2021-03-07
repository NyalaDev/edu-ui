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

const ResourceForm = ({ course, onSaveComplete }) => {
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      text: '',
      url: '',
      type: 'link',
    },
    validationSchema: Yup.object().shape({
      text: Yup.string().required(),
      url: Yup.string()
        .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          'Please enter a valid  URL'
        )
        .required(),
    }),
    onSubmit: async values => {
      const resources = course.resources || []
      try {
        resources.push(values)
        await teacher.patchCourse({ resources }, course.id)
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
            name="type"
            label={t('type')}
            placeholder={t('type')}
            error={touched.type && errors.type && errors.type}
            readOnly
            {...getFieldProps('type')}
          />
          <Input
            name="text"
            label={t('title')}
            placeholder={t('title')}
            error={touched.text && errors.text && errors.text}
            {...getFieldProps('text')}
          />

          <Input
            name="url"
            label={t('url')}
            placeholder="https://youtube.com?watch=1sAw2asd"
            error={touched.url && errors.url && errors.url}
            forceLtr
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

ResourceForm.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number,
    resources: PropTypes.arrayOf(PropTypes.shape),
  }),
  onSaveComplete: PropTypes.func.isRequired,
}

ResourceForm.defaultProps = {
  course: {},
}

export default ResourceForm
