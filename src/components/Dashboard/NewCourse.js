import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import Layout from '../Layout'
import SEO from '../Seo'
import CourseForm from './CourseForm'
import ActivityIndicator from '../ActivityIndicator'
import { AdminContext } from '../../contexts/AdminContext'
import Breadcrumbs from './Breadcrumb'

const NewCourse = () => {
  const { fetching, languages } = useContext(AdminContext)

  const { t } = useTranslation()

  return (
    <Layout pageTitle={t('newCourse')}>
      <SEO title="Create new course" />
      <Breadcrumbs name="New Course" />
      <ActivityIndicator active={fetching}>
        <CourseForm languages={languages} />
      </ActivityIndicator>
    </Layout>
  )
}

export default NewCourse
