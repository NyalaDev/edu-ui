import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { navigate } from 'gatsby'

import ActivityIndicator from '../ActivityIndicator'
import Input from '../Input'
import AutoCompleteInput from '../AutocompleteInput'

import { teacher } from '../../services/api'
import { extractErrorMessage } from '../../services/auth'

const CourseForm = ({ languages, course, onSaveSuccess }) => {
  const { t } = useTranslation()

  const isNewCourse = course && !course.id
  const initialLanguageValue = course && course.language

  const formik = useFormik({
    initialValues: {
      title: course.title || '',
      slug: course.slug || '',
      description: course.description || '',
      github_repo: course.github_repo || '',
      language: (course.language && course.language.id) || 0,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      slug: Yup.string().required(),
      description: Yup.string().min(10).required(),
      language: Yup.number().min(1, 'Language is required').required(),
    }),
    onSubmit: async values => {
      try {
        const courseData = { ...values }
        if (isNewCourse) {
          courseData.slug = values.slug.replace(/\s+/g, '-')
          await teacher.saveCourse(courseData)
          formik.resetForm()
          navigate('/dashboard')
          return
        }

        await teacher.updateCourse(courseData, course.id)
        formik.resetForm()
        onSaveSuccess()
      } catch (e) {
        const message = extractErrorMessage(e)
        toast.error(message)
      }
    },
  })
  const { touched, errors, getFieldProps } = formik
  return (
    <div className="bg-white w-full rounded-lg shadow-md overflow-hidden mx-auto">
      <div className="py-4 px-6">
        <h1 className="text-3xl  text-gray-800 font-extrabold ">
          {t('courseDetails')}
        </h1>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <AutoCompleteInput
            options={languages}
            onSelect={language => formik.setFieldValue('language', language.id)}
            name="languages"
            label={t('selectLanguage')}
            placeholder={t('selectLanguage')}
            onBlur={formik.handleBlur}
            error={touched.language && errors.language && errors.language}
            initialValue={initialLanguageValue}
          />
          <Input
            name="title"
            label={t('courseTitle')}
            placeholder={t('courseTitle')}
            error={touched.title && errors.title && errors.title}
            {...getFieldProps('title')}
          />
          {isNewCourse && (
            <Input
              name="slug"
              label={t('courseSlug')}
              placeholder="Unique name for the course url"
              prefix="https://barmaga.io/"
              error={touched.slug && errors.slug && errors.slug}
              {...getFieldProps('slug')}
            />
          )}
          <Input
            name="description"
            label={t('courseDescription')}
            placeholder={t('courseDescription')}
            type="textarea"
            error={
              touched.description && errors.description && errors.description
            }
            {...getFieldProps('description')}
          />
          <Input
            name="github_repo"
            label="Github Repo"
            placeholder="https://github.com/repo"
            error={
              touched.github_repo && errors.github_repo && errors.github_repo
            }
            {...getFieldProps('github_repo')}
            forceLtr
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

CourseForm.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  course: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    slug: PropTypes.string,
    description: PropTypes.string,
    github_repo: PropTypes.string,
    language: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  onSaveSuccess: PropTypes.func,
}

CourseForm.defaultProps = {
  course: {},
  onSaveSuccess: () => {},
}

export default CourseForm
